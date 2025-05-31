document.addEventListener("DOMContentLoaded", async () => {
    const calendarioDias = document.getElementById("calendario-dias");

    async function cargarHorarios() {
        try {
            const response = await fetch("http://localhost:3000/api/horarios");
            if (!response.ok) throw new Error("Error al obtener los horarios");
            
            const horarios = await response.json();

            // Limpiar calendario antes de cargar
            calendarioDias.innerHTML = "";

            // Agrupar horarios por día
            const diasMap = {};

            horarios.forEach(horario => {
                const fecha = horario.fecha; // yyyy-mm-dd
                if (!diasMap[fecha]) diasMap[fecha] = [];
                diasMap[fecha].push(horario);
            });

            // Crear celdas de día para el mes (ejemplo: 30 días ficticios para ilustrar)
            const diasDelMes = 30; // Esto deberías calcularlo según el mes seleccionado
            const hoy = new Date();
            const anio = hoy.getFullYear();
            const mes = hoy.getMonth(); // 0-indexado

            for (let dia = 1; dia <= diasDelMes; dia++) {
                const fecha = new Date(anio, mes, dia);
                const fechaStr = fecha.toISOString().split("T")[0]; // yyyy-mm-dd

                const celda = document.createElement("div");
                celda.classList.add("calendar-day");
                celda.dataset.fecha = fechaStr;

                // Título del día
                const titulo = document.createElement("div");
                titulo.classList.add("calendar-day-title");
                titulo.textContent = dia;
                celda.appendChild(titulo);

                // Si hay horarios en ese día
                if (diasMap[fechaStr]) {
                    diasMap[fechaStr].forEach(h => {
                        const bloque = document.createElement("div");
                        bloque.classList.add("horario-bloque");
                        bloque.innerHTML = `
                            <small><strong>${h.tipo === "laboral" ? "🟢" : "🔴"} ${formatearHora(h.hora_inicio)} - ${formatearHora(h.hora_finalizacion)}</strong></small>
                        `;
                        celda.appendChild(bloque);
                    });
                }

                calendarioDias.appendChild(celda);
            }

        } catch (err) {
            console.error("Error al cargar horarios:", err);
        }
    }

    // Helper para formatear la hora desde la ISO
    function formatearHora(isoStr) {
        const date = new Date(isoStr);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // Inicializar carga
    cargarHorarios();
});

document.addEventListener('DOMContentLoaded', function () {
    obtenerHorarios();
});

function obtenerHorarios() {
    fetch('http://localhost:3000/api/horarios')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            mostrarHorarios(data);
        })
        .catch(error => {
            console.error('Error al obtener horarios:', error);
        });
}

function mostrarHorarios(horarios) {
    const tabla = document.getElementById('tabla-citas-programadas');
    tabla.innerHTML = ''; // Limpiar contenido previo

    if (horarios.length === 0) {
        tabla.innerHTML = `<tr><td colspan="6" class="text-center">No hay citas programadas.</td></tr>`;
        return;
    }

    horarios.forEach(horario => {
        const fila = document.createElement('tr');

        // Convertir las fechas al formato local
        const fecha = new Date(horario.fecha).toLocaleDateString();
        const hora = new Date(horario.hora_inicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const paciente = 'N/D'; // Puedes actualizar esto si tienes el nombre del paciente
        const descripcion = 'Consulta general'; // Puedes ajustar según tus datos
        const estado = 'Programada'; // Suposición por tipo, puedes mapear si hay más estados

        fila.innerHTML = `
            <td>${fecha}</td>
            <td>${hora}</td>
            <td>${paciente}</td>
            <td>${descripcion}</td>
            <td>${estado}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="verDetalleCita(${horario.horario_id})">Ver</button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}

function verDetalleCita(horarioId) {
    // Aquí puedes implementar la lógica para obtener más información y mostrar en el modal
    const modalBody = document.getElementById('detalle-cita-body');
    modalBody.innerHTML = `<p>Cargando detalle de cita para el ID: ${horarioId}</p>`;

    // Mostrar el modal (usando Bootstrap 5)
    const modal = new bootstrap.Modal(document.getElementById('detalleCitaModal'));
    modal.show();
}
