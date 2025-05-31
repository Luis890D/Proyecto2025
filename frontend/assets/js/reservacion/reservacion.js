// reservacion.js

document.addEventListener('DOMContentLoaded', function () {
  const app = {
    init: function () {
      this.obtenerProfesionalPorId(17);
    },

    // Método para obtener el profesional por ID
    obtenerProfesionalPorId: async function (id) {
      try {
        const response = await fetch(`http://localhost:3000/api/profesionales/${id}`);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const profesional = await response.json();

        // Mostramos los datos del profesional en consola
        console.log("ID:", profesional.profesional_id);
        console.log("Usuario:", profesional.nombre_user);
        console.log("Especialidad:", profesional.especialidad?.description);
        console.log("Consultorio:", profesional.consultorio?.direccion);
        console.log(
          "Nombre completo:",
          `${profesional.user.primer_nombre} ${profesional.user.segundo_nombre} ${profesional.user.primer_apellido} ${profesional.user.segundo_apellido}`
        );
        console.log("Email:", profesional.user.email);
        console.log("Teléfono:", profesional.user.telefono);
        console.log("Celular:", profesional.user.celular);

        // Aquí puedes agregar código para mostrar los datos en la interfaz si lo deseas
      } catch (error) {
        console.error("Error al obtener profesional:", error.message);
      }
    },
  };

  app.init();
});


