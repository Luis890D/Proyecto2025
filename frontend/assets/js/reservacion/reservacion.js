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
            <td>${descripcion}</td>
            <td>${estado}</td>
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

