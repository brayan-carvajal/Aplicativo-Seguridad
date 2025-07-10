let previousMovies = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

function validarCamposPelicula() {
    let esValido = true;

    // Limpia errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const duracion = parseInt(document.getElementById("duracion").value);
    const urlImagen = document.getElementById("urlImagen").value.trim();

    if (titulo.length < 1 || titulo.length > 100) {
        document.getElementById("errorTitulo").textContent = "El título debe tener entre 1 y 100 caracteres.";
        esValido = false;
    }

    if (descripcion.length < 1 || descripcion.length > 500) {
        document.getElementById("errorDescripcion").textContent = "La descripción debe tener entre 1 y 500 caracteres.";
        esValido = false;
    }

    if (genero.length < 1 || genero.length > 50) {
        document.getElementById("errorGenero").textContent = "El género debe tener entre 1 y 50 caracteres.";
        esValido = false;
    }

    if (isNaN(duracion) || duracion <= 0) {
        document.getElementById("errorDuracion").textContent = "La duración debe ser mayor a 0.";
        esValido = false;
    }

    try {
        new URL(urlImagen); // Valida formato URL
    } catch (_) {
        document.getElementById("errorUrl").textContent = "La URL no es válida.";
        esValido = false;
    }

    return esValido;
}

function validarCamposPeliculaEditar() {
    let esValido = true;

    // Limpia errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const titulo = document.getElementById("editarTitulo").value.trim();
    const descripcion = document.getElementById("editarDescripcion").value.trim();
    const genero = document.getElementById("editarGenero").value.trim();
    const duracion = parseInt(document.getElementById("editarDuracion").value);
    const urlImagen = document.getElementById("editarUrlImagen").value.trim();

    if (titulo.length < 1 || titulo.length > 100) {
        document.getElementById("errorEditarTitulo").textContent = "El título debe tener entre 1 y 100 caracteres.";
        esValido = false;
    }

    if (descripcion.length < 1 || descripcion.length > 500) {
        document.getElementById("errorEditarDescripcion").textContent = "La descripción debe tener entre 1 y 500 caracteres.";
        esValido = false;
    }

    if (genero.length < 1 || genero.length > 50) {
        document.getElementById("errorEditarGenero").textContent = "El género debe tener entre 1 y 50 caracteres.";
        esValido = false;
    }

    if (isNaN(duracion) || duracion <= 0) {
        document.getElementById("errorEditarDuracion").textContent = "La duración debe ser mayor a 0.";
        esValido = false;
    }

    try {
        new URL(urlImagen); // Valida formato URL
    } catch (_) {
        document.getElementById("errorEditarUrl").textContent = "La URL no es válida.";
        esValido = false;
    }

    return esValido;
}

function validarYRegistrar() {
    if (validarCamposPelicula()) {
        registerMovie();
    }
}

function validarYEditar() {
    if (validarCamposPeliculaEditar()) {
        updateMovie(); // Tu función original para actualizar la película
    }
}

// Registrar
function registerMovie() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            "title": document.getElementById("titulo").value,
            "description": document.getElementById("descripcion").value,
            "gender": document.getElementById("genero").value,
            "duration": document.getElementById("duracion").value,
            "imgUrl": document.getElementById("urlImagen").value
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/movie/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
        // alert("Película registrada con éxito");
        document.getElementById("modalAgregarPelicula").style.display = "none";
        document.getElementById("titulo").value = "";
        document.getElementById("descripcion").value = "";
        document.getElementById("genero").value = "";
        document.getElementById("duracion").value = "";
        document.getElementById("urlImagen").value = "";

        getMovies();
        resolve();
    });
}

// Muestra
function getMovies() {
    return new Promise(async (resolve) => {
        let searchBar = document.querySelector(".search-bar");
        let filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/movie/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/movie/filter/${filtro}`;
        }

        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        let response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();

        let containers = document.querySelectorAll(".movies-grid");
        containers.forEach(container => container.innerHTML = "");

        if (!Array.isArray(data)) {
            containers.forEach(container => {
                container.innerHTML = `<p style="color:red">Error cargando películas</p>`;
            });
            return;
        }

        const isAdmin = window.location.pathname.includes("admin.html");

        const isIndex = window.location.pathname.includes("index.html");

        if (isIndex) {
            data = data.slice(0, 8); 
        }

        containers.forEach(container => {
            data.forEach(movie => {
                if (!movie.status) return;

                let card = document.createElement("article");
                card.className = "movie-card";

                if (isAdmin) {
                    let actions = document.createElement("div");
                    actions.className = "movie-actions";
                    actions.innerHTML = `
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                        <button class="btn-edit"
                            data-id="${movie.idMovie}"
                            data-title="${movie.title}"
                            data-description="${movie.description}"
                            data-gender="${movie.gender}"
                            data-duration="${movie.duration}"
                            data-imgUrl="${movie.imgUrl}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteMovie(movie.idMovie);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarPeliculaId").value = btn.getAttribute("data-id");
                        document.getElementById("editarTitulo").value = btn.getAttribute("data-title");
                        document.getElementById("editarDescripcion").value = btn.getAttribute("data-description");
                        document.getElementById("editarGenero").value = btn.getAttribute("data-gender");
                        document.getElementById("editarDuracion").value = btn.getAttribute("data-duration");
                        document.getElementById("editarUrlImagen").value = btn.getAttribute("data-imgUrl");
                        document.getElementById("modalEditarPelicula").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                let img = document.createElement("img");
                img.src = movie.imgUrl;
                img.alt = movie.title;

                let info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${movie.title}</h2>
                    <p class="description">${movie.description}</p>
                    <p class="gender">Género: ${movie.gender}</p>
                    <p class="duration">Duración: ${movie.duration} min</p>
                `;

                card.appendChild(img);
                card.appendChild(info);
                container.appendChild(card);
            });
        });

        document.getElementById("contadorPeliculas").textContent = data.filter(p => p.status).length;
        resolve();
    });
}

// Actualiza
async function updateMovie() {
    const id = document.getElementById("editarPeliculaId").value;

    const updatedMovie = {
        title: document.getElementById("editarTitulo").value,
        description: document.getElementById("editarDescripcion").value,
        gender: document.getElementById("editarGenero").value,
        duration: document.getElementById("editarDuracion").value,
        imgUrl: document.getElementById("editarUrlImagen").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/movie/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedMovie)
        });

        const data = await response.json();
        console.log("Película actualizada:", data);

        document.getElementById("modalEditarPelicula").style.display = "none";
        getMovies();
    } catch (error) {
        console.error("Error al actualizar la película:", error);
        alert("Hubo un error al actualizar la película.");
    }
}

// Eliminar
async function deleteMovie(id) {
    if (!confirm("¿Seguro que querés eliminar esta película?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/movie/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la película");

        const data = await response.json();
        console.log("Película eliminada:", data);
        getMovies();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la película.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getMoviesWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/movie/get");
        const newMovies = await response.json();

        if (!Array.isArray(newMovies)) return;

        if (!areArraysDifferent(newMovies, previousMovies)) return;

        previousMovies = newMovies;

        await getMovies();

    } catch (error) {
        console.error("Error al verificar cambios en películas:", error);
    }
}
