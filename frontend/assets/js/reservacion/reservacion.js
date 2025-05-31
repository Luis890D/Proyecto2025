// reservacion.js
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const app = {
        clienteSeleccionado: null,
        profesionalSeleccionado: null,
        horarioSeleccionado: null,
        citaSeleccionada: null,
        modal: new bootstrap.Modal(document.getElementById('confirmacionModal')),
        
        // Inicialización
        init: function() {
            this.initDatePickers();
            this.cargarProfesionales();
            this.cargarProfesionalesParaConsulta();
            this.asignarEventos();
        },
        
        // Inicialización de datepickers
        initDatePickers: function() {
            flatpickr("#fecha-cita", {
                locale: "es",
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: [
                    function(date) {
                        return (date.getDay() === 0 || date.getDay() === 6); // Deshabilitar fines de semana
                    }
                ]
            });
            
            flatpickr("#mod-fecha-cita", {
                locale: "es",
                minDate: "today",
                dateFormat: "Y-m-d",
                disable: [
                    function(date) {
                        return (date.getDay() === 0 || date.getDay() === 6); // Deshabilitar fines de semana
                    }
                ]
            });
        },
        
        // Asignación de eventos
        asignarEventos: function() {
            document.getElementById('buscar-cliente').addEventListener('click', () => this.buscarCliente());
            document.getElementById('fecha-cita').addEventListener('change', () => this.cargarHorariosDisponibles());
            document.getElementById('confirmar-cita').addEventListener('click', () => this.confirmarCita());
            document.getElementById('buscar-citas').addEventListener('click', () => this.buscarCitas());
            document.getElementById('buscar-cita-modificar').addEventListener('click', () => this.buscarCitaModificar());
            document.getElementById('mod-fecha-cita').addEventListener('change', () => this.cargarHorariosDisponiblesModificar());
            document.getElementById('guardar-cambios').addEventListener('click', () => this.guardarCambiosCita());
            document.getElementById('cancelar-cita').addEventListener('click', () => this.cancelarCita());
            document.getElementById('confirmar-accion').addEventListener('click', () => this.ejecutarAccionConfirmada());
        },
        
        // Función para cargar profesionales
        cargarProfesionales: async function() {
            try {
                const response = await fetch('/api/profesionales');
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const profesionales = await response.json();
                const container = document.getElementById('profesionales-container');
                container.innerHTML = '';
                
                profesionales.forEach(profesional => {
                    const card = document.createElement('div');
                    card.className = 'col-md-6 mb-3';
                    card.innerHTML = `
                        <div class="card professional-card" data-id="${profesional.profesional_id}">
                            <div class="card-body">
                                <h5 class="card-title">${profesional.primer_nombre} ${profesional.primer_apellido}</h5>
                                <p class="card-text">Especialidad: ${profesional.especialidad || 'No especificada'}</p>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                    
                    // Asignar evento de clic
                    card.querySelector('.professional-card').addEventListener('click', () => {
                        document.querySelectorAll('.professional-card').forEach(c => c.classList.remove('selected'));
                        card.querySelector('.professional-card').classList.add('selected');
                        this.profesionalSeleccionado = profesional;
                        document.getElementById('fecha-cita').value = '';
                        document.getElementById('horarios-disponibles').innerHTML = 
                            '<p class="text-muted">Seleccione una fecha para ver horarios disponibles.</p>';
                    });
                });
            } catch (error) {
                console.error('Error al cargar profesionales:', error);
                this.mostrarAlerta('Error al cargar profesionales', 'danger');
            }
        },
        
        // Función para cargar profesionales en el filtro de consulta
        cargarProfesionalesParaConsulta: async function() {
            try {
                const response = await fetch('/api/profesionales');
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const profesionales = await response.json();
                const select = document.getElementById('profesional-consulta');
                
                profesionales.forEach(profesional => {
                    const option = document.createElement('option');
                    option.value = profesional.profesional_id;
                    option.textContent = `${profesional.primer_nombre} ${profesional.primer_apellido}`;
                    select.appendChild(option);
                });
            } catch (error) {
                console.error('Error al cargar profesionales para consulta:', error);
            }
        },
        
        // Función para buscar cliente
        buscarCliente: async function() {
            const busqueda = document.getElementById('cliente-busqueda').value.trim();
            if (!busqueda) {
                this.mostrarAlerta('Ingrese un término de búsqueda', 'warning');
                return;
            }
            
            try {
                const response = await fetch(`/api/clientes/buscar?q=${encodeURIComponent(busqueda)}`);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const clientes = await response.json();
                const resultados = document.getElementById('resultados-clientes');
                const lista = document.getElementById('lista-clientes');
                lista.innerHTML = '';
                
                if (clientes.length === 0) {
                    resultados.style.display = 'none';
                    this.mostrarAlerta('No se encontraron clientes', 'info');
                    return;
                }
                
                clientes.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.cliente_id;
                    option.textContent = `${cliente.primer_nombre} ${cliente.primer_apellido} - ${cliente.dpi || 'Sin DPI'}`;
                    lista.appendChild(option);
                });
                
                resultados.style.display = 'block';
                
                // Asignar evento de selección
                lista.addEventListener('change', () => {
                    const selectedOption = lista.options[lista.selectedIndex];
                    if (selectedOption) {
                        const cliente = clientes.find(c => c.cliente_id == selectedOption.value);
                        if (cliente) {
                            this.mostrarInfoCliente(cliente);
                            this.clienteSeleccionado = cliente;
                        }
                    }
                });
            } catch (error) {
                console.error('Error al buscar cliente:', error);
                this.mostrarAlerta('Error al buscar cliente', 'danger');
            }
        },
        
        // Función para mostrar información del cliente
        mostrarInfoCliente: function(cliente) {
            const infoCliente = document.getElementById('info-cliente');
            document.getElementById('cliente-nombre').textContent = 
                `${cliente.primer_nombre} ${cliente.segundo_nombre || ''} ${cliente.primer_apellido} ${cliente.segundo_apellido || ''}`;
            document.getElementById('cliente-telefono').textContent = cliente.telefono || 'No disponible';
            document.getElementById('cliente-email').textContent = cliente.email || 'No disponible';
            infoCliente.style.display = 'block';
        },
        
        // Función para cargar horarios disponibles
        cargarHorariosDisponibles: async function() {
            if (!this.profesionalSeleccionado) {
                this.mostrarAlerta('Seleccione un profesional primero', 'warning');
                document.getElementById('fecha-cita').value = '';
                return;
            }
            
            const fecha = document.getElementById('fecha-cita').value;
            if (!fecha) return;
            
            try {
                const response = await fetch(`/api/horarios/profesional/${this.profesionalSeleccionado.profesional_id}?fecha=${fecha}`);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const horarios = await response.json();
                const container = document.getElementById('horarios-disponibles');
                container.innerHTML = '';
                
                if (horarios.length === 0) {
                    container.innerHTML = '<p class="text-danger">No hay horarios disponibles para esta fecha.</p>';
                    return;
                }
                
                horarios.forEach(horario => {
                    const inicio = new Date(horario.hora_inicio);
                    const fin = new Date(horario.hora_finalizacion);
                    
                    // Crear slots de 30 minutos
                    let horaActual = new Date(inicio);
                    while (horaActual < fin) {
                        const horaFinSlot = new Date(horaActual.getTime() + 30 * 60000);
                        if (horaFinSlot > fin) break;
                        
                        const slot = document.createElement('div');
                        slot.className = 'time-slot';
                        slot.textContent = `${horaActual.getHours().toString().padStart(2, '0')}:${horaActual.getMinutes().toString().padStart(2, '0')} - ${horaFinSlot.getHours().toString().padStart(2, '0')}:${horaFinSlot.getMinutes().toString().padStart(2, '0')}`;
                        slot.dataset.inicio = horaActual.toISOString();
                        slot.dataset.fin = horaFinSlot.toISOString();
                        
                        slot.addEventListener('click', () => {
                            document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                            slot.classList.add('selected');
                            this.horarioSeleccionado = {
                                inicio: slot.dataset.inicio,
                                fin: slot.dataset.fin
                            };
                        });
                        
                        container.appendChild(slot);
                        horaActual = horaFinSlot;
                    }
                });
            } catch (error) {
                console.error('Error al cargar horarios:', error);
                this.mostrarAlerta('Error al cargar horarios disponibles', 'danger');
            }
        },
        
        // Función para confirmar cita
        confirmarCita: function() {
            if (!this.clienteSeleccionado) {
                this.mostrarAlerta('Seleccione un cliente', 'warning');
                return;
            }
            
            if (!this.profesionalSeleccionado) {
                this.mostrarAlerta('Seleccione un profesional', 'warning');
                return;
            }
            
            if (!this.horarioSeleccionado) {
                this.mostrarAlerta('Seleccione un horario', 'warning');
                return;
            }
            
            const descripcion = document.getElementById('descripcion-cita').value.trim();
            if (!descripcion) {
                this.mostrarAlerta('Ingrese una descripción', 'warning');
                return;
            }
            
            const observaciones = document.getElementById('observaciones-cita').value.trim();
            
            // Mostrar modal de confirmación
            document.getElementById('confirmacionModalTitle').textContent = 'Confirmar Cita';
            document.getElementById('confirmacionModalBody').innerHTML = `
                <p>¿Está seguro de crear la siguiente cita?</p>
                <ul>
                    <li><strong>Cliente:</strong> ${this.clienteSeleccionado.primer_nombre} ${this.clienteSeleccionado.primer_apellido}</li>
                    <li><strong>Profesional:</strong> ${this.profesionalSeleccionado.primer_nombre} ${this.profesionalSeleccionado.primer_apellido}</li>
                    <li><strong>Fecha:</strong> ${new Date(this.horarioSeleccionado.inicio).toLocaleDateString('es-ES')}</li>
                    <li><strong>Hora:</strong> ${new Date(this.horarioSeleccionado.inicio).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} - ${new Date(this.horarioSeleccionado.fin).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</li>
                    <li><strong>Descripción:</strong> ${descripcion}</li>
                </ul>
            `;
            
            // Configurar acción para confirmar
            document.getElementById('confirmar-accion').onclick = async () => {
                try {
                    const response = await fetch('/api/citas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cliente_id: this.clienteSeleccionado.cliente_id,
                            profesional_id: this.profesionalSeleccionado.profesional_id,
                            asistente_id: 1, // ID del asistente logueado (debería venir de la sesión)
                            fecha_inicio: this.horarioSeleccionado.inicio,
                            fecha_finalizacion: this.horarioSeleccionado.fin,
                            descripcion: descripcion,
                            observaciones: observaciones
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Error al crear cita');
                    }
                    
                    await response.json();
                    this.mostrarAlerta('Cita creada exitosamente', 'success');
                    this.modal.hide();
                    
                    // Limpiar formulario
                    this.resetearFormularioCita();
                } catch (error) {
                    console.error('Error al crear cita:', error);
                    this.mostrarAlerta('Error al crear cita: ' + error.message, 'danger');
                    this.modal.hide();
                }
            };
            
            this.modal.show();
        },
        
        // Función para buscar citas
        buscarCitas: async function() {
            const fechaInicio = document.getElementById('fecha-inicio-consulta').value;
            const fechaFin = document.getElementById('fecha-fin-consulta').value;
            const profesionalId = document.getElementById('profesional-consulta').value;
            const nombreCliente = document.getElementById('cliente-consulta').value.trim();
            const estado = document.getElementById('estado-cita-consulta').value;
            
            // Construir query params
            const params = new URLSearchParams();
            if (fechaInicio) params.append('fecha_inicio', fechaInicio);
            if (fechaFin) params.append('fecha_fin', fechaFin);
            if (profesionalId) params.append('profesional_id', profesionalId);
            if (nombreCliente) params.append('nombre_cliente', nombreCliente);
            if (estado) params.append('estado', estado);
            
            try {
                const response = await fetch(`/api/citas?${params.toString()}`);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const citas = await response.json();
                const tabla = document.getElementById('tabla-citas');
                tabla.innerHTML = '';
                
                if (citas.length === 0) {
                    tabla.innerHTML = '<tr><td colspan="7" class="text-center">No se encontraron citas</td></tr>';
                    return;
                }
                
                citas.forEach(cita => {
                    const fecha = new Date(cita.fecha_inicio);
                    const horaInicio = new Date(cita.fecha_inicio);
                    const horaFin = new Date(cita.fecha_finalizacion);
                    
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${fecha.toLocaleDateString('es-ES')}</td>
                        <td>${horaInicio.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} - ${horaFin.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</td>
                        <td>${cita.cliente.primer_nombre} ${cita.cliente.primer_apellido}</td>
                        <td>${cita.profesional.primer_nombre} ${cita.profesional.primer_apellido}</td>
                        <td>${cita.descripcion}</td>
                        <td>${this.obtenerEstadoCita(cita.cita_estado)}</td>
                        <td>
                            <button class="btn btn-sm btn-info ver-detalle" data-id="${cita.cita_id}">Ver</button>
                        </td>
                    `;
                    tabla.appendChild(fila);
                    
                    // Asignar evento para ver detalle
                    fila.querySelector('.ver-detalle').addEventListener('click', () => {
                        this.verDetalleCita(cita);
                    });
                });
            } catch (error) {
                console.error('Error al buscar citas:', error);
                this.mostrarAlerta('Error al buscar citas', 'danger');
            }
        },
        
        // Función para obtener texto del estado de la cita
        obtenerEstadoCita: function(estado) {
            switch(estado) {
                case 1: return 'Programada';
                case 2: return 'Confirmada';
                case 3: return 'Completada';
                case 4: return 'Cancelada';
                default: return 'Desconocido';
            }
        },
        
        // Función para ver detalle de cita
        verDetalleCita: function(cita) {
            document.getElementById('confirmacionModalTitle').textContent = 'Detalle de Cita';
            
            const fecha = new Date(cita.fecha_inicio);
            const horaInicio = new Date(cita.fecha_inicio);
            const horaFin = new Date(cita.fecha_finalizacion);
            
            document.getElementById('confirmacionModalBody').innerHTML = `
                <ul class="list-group">
                    <li class="list-group-item"><strong>Fecha:</strong> ${fecha.toLocaleDateString('es-ES')}</li>
                    <li class="list-group-item"><strong>Hora:</strong> ${horaInicio.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})} - ${horaFin.toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</li>
                    <li class="list-group-item"><strong>Cliente:</strong> ${cita.cliente.primer_nombre} ${cita.cliente.primer_apellido}</li>
                    <li class="list-group-item"><strong>Profesional:</strong> ${cita.profesional.primer_nombre} ${cita.profesional.primer_apellido}</li>
                    <li class="list-group-item"><strong>Estado:</strong> ${this.obtenerEstadoCita(cita.cita_estado)}</li>
                    <li class="list-group-item"><strong>Descripción:</strong> ${cita.descripcion}</li>
                    <li class="list-group-item"><strong>Observaciones:</strong> ${cita.observaciones || 'Ninguna'}</li>
                </ul>
            `;
            
            // Ocultar botón de confirmar en este caso
            document.getElementById('confirmar-accion').style.display = 'none';
            this.modal.show();
        },
        
        // Función para buscar cita a modificar
        buscarCitaModificar: async function() {
            const citaId = document.getElementById('busqueda-cita-id').value.trim();
            const nombreCliente = document.getElementById('busqueda-cliente-mod').value.trim();
            
            if (!citaId && !nombreCliente) {
                this.mostrarAlerta('Ingrese ID de cita o nombre de cliente', 'warning');
                return;
            }
            
            try {
                let url = '/api/citas?';
                if (citaId) url += `id=${citaId}`;
                if (nombreCliente) url += `${citaId ? '&' : ''}nombre_cliente=${encodeURIComponent(nombreCliente)}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const citas = await response.json();
                
                if (citas.length === 0) {
                    this.mostrarAlerta('No se encontraron citas', 'info');
                    return;
                }
                
                if (citas.length > 1) {
                    // Mostrar lista para seleccionar
                    document.getElementById('confirmacionModalTitle').textContent = 'Seleccione Cita';
                    
                    let html = '<p>Se encontraron múltiples citas. Seleccione una:</p><div class="list-group">';
                    citas.forEach(cita => {
                        const fecha = new Date(cita.fecha_inicio);
                        html += `
                            <a href="#" class="list-group-item list-group-item-action" data-id="${cita.cita_id}">
                                ${fecha.toLocaleDateString('es-ES')} - ${cita.cliente.primer_nombre} ${cita.cliente.primer_apellido} - ${this.obtenerEstadoCita(cita.cita_estado)}
                            </a>
                        `;
                    });
                    html += '</div>';
                    
                    document.getElementById('confirmacionModalBody').innerHTML = html;
                    document.getElementById('confirmar-accion').style.display = 'none';
                    
                    // Asignar eventos a los items
                    this.modal.show();
                    setTimeout(() => {
                        document.querySelectorAll('.list-group-item').forEach(item => {
                            item.addEventListener('click', (e) => {
                                e.preventDefault();
                                const cita = citas.find(c => c.cita_id == item.dataset.id);
                                if (cita) {
                                    this.cargarCitaParaModificar(cita);
                                    this.modal.hide();
                                }
                            });
                        });
                    }, 100);
                } else {
                    // Mostrar directamente la única cita encontrada
                    this.cargarCitaParaModificar(citas[0]);
                }
            } catch (error) {
                console.error('Error al buscar cita:', error);
                this.mostrarAlerta('Error al buscar cita', 'danger');
            }
        },
        
        // Función para cargar cita en formulario de modificación
        cargarCitaParaModificar: function(cita) {
            this.citaSeleccionada = cita;
            
            document.getElementById('mod-cliente-nombre').textContent = 
                `${cita.cliente.primer_nombre} ${cita.cliente.primer_apellido}`;
            document.getElementById('mod-profesional-nombre').textContent = 
                `${cita.profesional.primer_nombre} ${cita.profesional.primer_apellido}`;
            document.getElementById('mod-fecha-cita').value = 
                new Date(cita.fecha_inicio).toISOString().split('T')[0];
            document.getElementById('mod-descripcion').value = cita.descripcion;
            document.getElementById('mod-observaciones').value = cita.observaciones || '';
            
            // Mostrar el horario actual
            const horarioActual = document.createElement('div');
            horarioActual.className = 'time-slot selected';
            const inicio = new Date(cita.fecha_inicio);
            const fin = new Date(cita.fecha_finalizacion);
            horarioActual.textContent = 
                `${inicio.getHours().toString().padStart(2, '0')}:${inicio.getMinutes().toString().padStart(2, '0')} - ${fin.getHours().toString().padStart(2, '0')}:${fin.getMinutes().toString().padStart(2, '0')}`;
            horarioActual.dataset.inicio = cita.fecha_inicio;
            horarioActual.dataset.fin = cita.fecha_finalizacion;
            
            const container = document.getElementById('mod-horarios-disponibles');
            container.innerHTML = '<p>Horario actual:</p>';
            container.appendChild(horarioActual);
            container.innerHTML += '<p class="mt-2">Nuevos horarios disponibles:</p>';
            
            document.getElementById('modificar-cita-container').style.display = 'block';
        },
        
        // Función para cargar horarios disponibles para modificación
        cargarHorariosDisponiblesModificar: async function() {
            if (!this.citaSeleccionada) return;
            
            const fecha = document.getElementById('mod-fecha-cita').value;
            if (!fecha) return;
            
            try {
                const response = await fetch(`/api/horarios/profesional/${this.citaSeleccionada.profesional.profesional_id}?fecha=${fecha}`);
                if (!response.ok) throw new Error('Error en la respuesta del servidor');
                
                const horarios = await response.json();
                const container = document.getElementById('mod-horarios-disponibles');
                // Mantener la parte superior (horario actual y título)
                const existingContent = container.innerHTML.split('<p class="mt-2">Nuevos horarios disponibles:</p>')[0];
                container.innerHTML = existingContent + '<p class="mt-2">Nuevos horarios disponibles:</p>';
                
                if (horarios.length === 0) {
                    container.innerHTML += '<p class="text-danger">No hay horarios disponibles para esta fecha.</p>';
                    return;
                }
                
                horarios.forEach(horario => {
                    const inicio = new Date(horario.hora_inicio);
                    const fin = new Date(horario.hora_finalizacion);
                    
                    // Crear slots de 30 minutos
                    let horaActual = new Date(inicio);
                    while (horaActual < fin) {
                        const horaFinSlot = new Date(horaActual.getTime() + 30 * 60000);
                        if (horaFinSlot > fin) break;
                        
                        // Verificar que no sea el horario actual
                        if (horaActual.toISOString() !== this.citaSeleccionada.fecha_inicio) {
                            const slot = document.createElement('div');
                            slot.className = 'time-slot';
                            slot.textContent = `${horaActual.getHours().toString().padStart(2, '0')}:${horaActual.getMinutes().toString().padStart(2, '0')} - ${horaFinSlot.getHours().toString().padStart(2, '0')}:${horaFinSlot.getMinutes().toString().padStart(2, '0')}`;
                            slot.dataset.inicio = horaActual.toISOString();
                            slot.dataset.fin = horaFinSlot.toISOString();
                            
                            slot.addEventListener('click', () => {
                                document.querySelectorAll('#mod-horarios-disponibles .time-slot').forEach(s => {
                                    if (!s.classList.contains('selected') || s === slot) {
                                        s.classList.remove('selected');
                                    }
                                });
                                slot.classList.add('selected');
                                this.horarioSeleccionado = {
                                    inicio: slot.dataset.inicio,
                                    fin: slot.dataset.fin
                                };
                            });
                            
                            container.appendChild(slot);
                        }
                        
                        horaActual = horaFinSlot;
                    }
                });
            } catch (error) {
                console.error('Error al cargar horarios para modificación:', error);
                this.mostrarAlerta('Error al cargar horarios disponibles', 'danger');
            }
        },
        
        // Función para guardar cambios en cita
        guardarCambiosCita: function() {
            if (!this.citaSeleccionada) return;
            
            const nuevaFecha = document.getElementById('mod-fecha-cita').value;
            const nuevoHorario = this.horarioSeleccionado;
            const descripcion = document.getElementById('mod-descripcion').value.trim();
            const observaciones = document.getElementById('mod-observaciones').value.trim();
            
            if (!descripcion) {
                this.mostrarAlerta('La descripción es requerida', 'warning');
                return;
            }
            
            // Determinar si hay cambios
            const fechaOriginal = new Date(this.citaSeleccionada.fecha_inicio).toISOString().split('T')[0];
            const descripcionOriginal = this.citaSeleccionada.descripcion;
            const observacionesOriginal = this.citaSeleccionada.observaciones || '';
            
            let cambios = [];
            if (nuevaFecha !== fechaOriginal || nuevoHorario) {
                cambios.push('fecha/hora');
            }
            if (descripcion !== descripcionOriginal) {
                cambios.push('descripción');
            }
            if (observaciones !== observacionesOriginal) {
                cambios.push('observaciones');
            }
            
            if (cambios.length === 0) {
                this.mostrarAlerta('No hay cambios para guardar', 'info');
                return;
            }
            
            // Mostrar modal de confirmación
            document.getElementById('confirmacionModalTitle').textContent = 'Confirmar Cambios';
            document.getElementById('confirmacionModalBody').innerHTML = `
                <p>¿Está seguro de guardar los siguientes cambios?</p>
                <ul>
                    ${cambios.map(c => `<li>${c}</li>`).join('')}
                </ul>
            `;
            
            // Configurar acción para confirmar
            document.getElementById('confirmar-accion').style.display = 'block';
            document.getElementById('confirmar-accion').onclick = async () => {
                try {
                    const data = {
                        fecha_inicio: nuevoHorario ? nuevoHorario.inicio : this.citaSeleccionada.fecha_inicio,
                        fecha_finalizacion: nuevoHorario ? nuevoHorario.fin : this.citaSeleccionada.fecha_finalizacion,
                        descripcion: descripcion,
                        observaciones: observaciones
                    };
                    
                    const response = await fetch(`/api/citas/${this.citaSeleccionada.cita_id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    
                    if (!response.ok) {
                        throw new Error('Error al actualizar cita');
                    }
                    
                    await response.json();
                    this.mostrarAlerta('Cita actualizada exitosamente', 'success');
                    this.modal.hide();
                    
                    // Limpiar formulario
                    document.getElementById('modificar-cita-container').style.display = 'none';
                    document.getElementById('busqueda-cita-id').value = '';
                    document.getElementById('busqueda-cliente-mod').value = '';
                    this.citaSeleccionada = null;
                    this.horarioSeleccionado = null;
                } catch (error) {
                    console.error('Error al actualizar cita:', error);
                    this.mostrarAlerta('Error al actualizar cita: ' + error.message, 'danger');
                    this.modal.hide();
                }
            };
            
            this.modal.show();
        },
        
        // Función para cancelar cita
        cancelarCita: function() {
            if (!this.citaSeleccionada) return;
            
            // Mostrar modal de confirmación
            document.getElementById('confirmacionModalTitle').textContent = 'Confirmar Cancelación';
            document.getElementById('confirmacionModalBody').innerHTML = `
                <p>¿Está seguro de cancelar esta cita?</p>
                <ul>
                    <li><strong>Fecha:</strong> ${new Date(this.citaSeleccionada.fecha_inicio).toLocaleDateString('es-ES')}</li>
                    <li><strong>Hora:</strong> ${new Date(this.citaSeleccionada.fecha_inicio).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'})}</li>
                    <li><strong>Cliente:</strong> ${this.citaSeleccionada.cliente.primer_nombre} ${this.citaSeleccionada.cliente.primer_apellido}</li>
                </ul>
            `;
            
            // Configurar acción para confirmar
            document.getElementById('confirmar-accion').style.display = 'block';
            document.getElementById('confirmar-accion').onclick = async () => {
                try {
                    const response = await fetch(`/api/citas/${this.citaSeleccionada.cita_id}/estado`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            cita_estado: 4 // Cancelada
                        })
                    });
                    
                    if (!response.ok) {
                        throw new Error('Error al cancelar cita');
                    }
                    
                    await response.json();
                    this.mostrarAlerta('Cita cancelada exitosamente', 'success');
                    this.modal.hide();
                    
                    // Limpiar formulario
                    document.getElementById('modificar-cita-container').style.display = 'none';
                    document.getElementById('busqueda-cita-id').value = '';
                    document.getElementById('busqueda-cliente-mod').value = '';
                    this.citaSeleccionada = null;
                } catch (error) {
                    console.error('Error al cancelar cita:', error);
                    this.mostrarAlerta('Error al cancelar cita: ' + error.message, 'danger');
                    this.modal.hide();
                }
            };
            
            this.modal.show();
        },
        
        // Función para ejecutar acción confirmada (genérica)
        ejecutarAccionConfirmada: function() {
            // Esta función se asigna dinámicamente según la acción
        },
        
        // Función para resetear formulario de nueva cita
        resetearFormularioCita: function() {
            document.getElementById('cliente-busqueda').value = '';
            document.getElementById('resultados-clientes').style.display = 'none';
            document.getElementById('info-cliente').style.display = 'none';
            document.querySelectorAll('.professional-card').forEach(c => c.classList.remove('selected'));
            document.getElementById('fecha-cita').value = '';
            document.getElementById('horarios-disponibles').innerHTML = 
                '<p class="text-muted">Seleccione un profesional y una fecha para ver horarios disponibles.</p>';
            document.getElementById('descripcion-cita').value = '';
            document.getElementById('observaciones-cita').value = '';
            
            this.clienteSeleccionado = null;
            this.profesionalSeleccionado = null;
            this.horarioSeleccionado = null;
        },
        
        // Función para mostrar alertas
        mostrarAlerta: function(mensaje, tipo) {
            const alerta = document.createElement('div');
            alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
            alerta.role = 'alert';
            alerta.innerHTML = `
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            
            // Insertar al inicio del container
            const container = document.querySelector('.container');
            container.insertBefore(alerta, container.firstChild);
            
            // Auto-eliminar después de 5 segundos
            setTimeout(() => {
                alerta.classList.remove('show');
                setTimeout(() => alerta.remove(), 150);
            }, 5000);
        }
    };
    
    // Inicializar la aplicación
    app.init();
});