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

