document.addEventListener('DOMContentLoaded', function() {
    const formularioHorarios = document.getElementById('formulario-horarios');
    
    formularioHorarios.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener los valores del formulario
        const profesional_id = document.getElementById('profesional_id').value;
        const fecha = document.getElementById('fecha').value;
        const hora_inicio = document.getElementById('hora_inicio').value;
        const hora_finalizacion = document.getElementById('hora_finalizacion').value;
        const tipo = document.getElementById('tipo').value;
        
        // Crear el objeto con los datos del horario
        const datosHorario = {
            profesional_id: parseInt(profesional_id),
            fecha: fecha,
            hora_inicio: `${fecha} ${hora_inicio}`,
            hora_finalizacion: `${fecha} ${hora_finalizacion}`,
            tipo: tipo
        };
        
        // Configurar la petición fetch
        fetch('http://localhost:3000/api/horarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosHorario)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            console.log('Horario creado exitosamente:', data);
            alert(`Horario creado exitosamente con ID: ${data.horario_id}`);
            
            // Opcional: limpiar el formulario después del éxito
            formularioHorarios.reset();
        })
        .catch(error => {
            console.error('Error al crear el horario:', error);
            alert('Error al crear el horario. Por favor, inténtelo nuevamente.');
        });
    });
});