document.addEventListener('DOMContentLoaded', function() {
    const formularioCitas = document.getElementById('formulario-citas');
    
    formularioCitas.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const cliente_id = document.getElementById('cliente_id').value;
        const profesional_id = document.getElementById('profesional_id').value;
        const asistente_id = document.getElementById('asistente_id').value;
        const fecha_inicio = document.getElementById('fecha_inicio').value;
        const fecha_finalizacion = document.getElementById('fecha_finalizacion').value;
        const descripcion = document.getElementById('descripcion').value;
        const observaciones = document.getElementById('observaciones').value;
        
        // Formatear fechas al formato ISO 8601
        const fechaInicioISO = new Date(fecha_inicio).toISOString();
        const fechaFinalizacionISO = new Date(fecha_finalizacion).toISOString();
        
        // Crear el objeto con los datos de la cita
        const datosCita = {
            cliente_id: parseInt(cliente_id),
            profesional_id: parseInt(profesional_id),
            asistente_id: parseInt(asistente_id),
            fecha_inicio: fechaInicioISO,
            fecha_finalizacion: fechaFinalizacionISO,
            descripcion: descripcion,
            observaciones: observaciones
        };
        
        // Configurar la petición fetch
        fetch('http://localhost:3000/api/citas/validar-horario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Si necesitas autenticación, agrega el token aquí:
                // 'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(datosCita)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            return response.json();
        })
        .then(data => {
            console.log('Validación exitosa:', data);
            alert('Horario validado correctamente. Puedes proceder a agendar la cita.');
            
            // Aquí puedes agregar lógica adicional después de la validación exitosa
            // Por ejemplo, habilitar el botón para agendar definitivamente
        })
        .catch(error => {
            console.error('Error en la validación:', error);
            let errorMessage = 'Error al validar el horario.';
            
            if (error.message) {
                errorMessage += ` ${error.message}`;
            }
            
            alert(errorMessage);
        });
    });
});