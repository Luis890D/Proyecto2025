document.querySelector('.user').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que el formulario se recargue

    // Obtener valores del formulario
    const nombre_user = document.getElementById('User').value;
    const password = document.getElementById('Password').value;

    try {
        // Enviar solicitud POST a la API
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_user, password })
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();

        // Guardar en localStorage
        localStorage.setItem('tipo_usuario', data.tipo_usuario);
        localStorage.setItem('nombre_completo', data.nombre_completo);
        localStorage.setItem('dpi', data.dpi);

        // Redirigir o mostrar mensaje
        alert('¡Inicio de sesión exitoso!');
        window.location.href = "/dashboard.html"; // Redirigir si es necesario

    } catch (error) {
        console.error('Error:', error);
        alert('Error en el inicio de sesión. Verifica tus credenciales.');
    }
});
