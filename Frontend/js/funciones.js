let previousScreeningData = "";

async function fetchAndUpdateScreenings() {
    try {
        const res = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        const screenings = await res.json();

        const activeScreenings = screenings.filter(f => f.status);
        const newScreeningData = JSON.stringify(activeScreenings);

        if (newScreeningData !== previousScreeningData) {
            previousScreeningData = newScreeningData;
            await renderScreenings(activeScreenings);
        }
    } catch (err) {
        console.error("Error al obtener funciones:", err);
    }
}

async function renderScreenings(screenings) {
    const containers = document.querySelectorAll(".screenings-grid");

    // Si no hay containers, no hagas nada
    if (containers.length === 0) {
        console.warn("No hay contenedores .screenings-grid en esta página.");
        return;
    }

    containers.forEach(container => container.innerHTML = "");

    // Asegurarse de que las películas y salas estén cargadas
    if (movies.length === 0) await loadMovies();
    if (rooms.length === 0) await loadRooms();

    screenings.forEach(screening => {
        const pelicula = movies.find(m => m.idMovie === screening.movie.idMovie) || { title: "Desconocido" };
        const sala = rooms.find(r => r.idRoom === screening.room.idRoom) || { roomNumber: "?" };

        const dateObj = new Date(screening.dateTime);
        const formattedDateDisplay = dateObj.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const card = document.createElement("article");
        card.className = "movie-card";

        card.innerHTML = `
            <div class="movie-info">
                <h2>${pelicula.title}</h2>
                <p class="gender">Sala: ${sala.roomNumber}</p>
                <p class="gender">Fecha: ${formattedDateDisplay}</p>
            </div>
        `;

        containers.forEach(container => container.appendChild(card));
    });

    // Sólo actualiza contador si existe
    const contadorFunciones = document.getElementById("contadorFunciones");
    if (contadorFunciones) {
        contadorFunciones.textContent = screenings.length;
    }
}

// Primera carga
fetchAndUpdateScreenings();

// Actualiza cada 5 segundos
setInterval(fetchAndUpdateScreenings, 5000);
