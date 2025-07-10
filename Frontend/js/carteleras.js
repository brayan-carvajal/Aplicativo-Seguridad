let previousMovieData = "";

async function fetchAndUpdateMovies() {
    try {
        const res = await fetch("http://127.0.0.1:8080/api/v1/movie/get");
        const movies = await res.json();

        const activeMovies = movies.filter(m => m.status);
        const newMovieData = JSON.stringify(activeMovies);

        if (newMovieData !== previousMovieData) {
            previousMovieData = newMovieData;
            renderMovies(activeMovies);
        }
    } catch (err) {
        console.error("Error al obtener películas:", err);
    }
}

function renderMovies(movies) {
    const containers = document.querySelectorAll(".movies-grid");
    containers.forEach(container => container.innerHTML = "");

    movies.forEach(movie => {
        const card = document.createElement("article");
        card.className = "movie-card";
        card.innerHTML = `
                <img src="${movie.imgUrl}" alt="${movie.title}">
                <div class="movie-info">
                    <h2>${movie.title}</h2>
                    <p class="description">${movie.description}</p>
                    <p class="gender">Género: ${movie.gender}</p>
                    <p class="duration">Duración: ${movie.duration} min</p>
                </div>
            `;
        containers.forEach(container => container.appendChild(card));
    });
}

// Primera carga
fetchAndUpdateMovies();

// Actualiza cada 5 segundos
setInterval(fetchAndUpdateMovies, 5000);