let previousScreenings = [];
let movies = [];
let rooms = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Función para cargar las películas en los selects
async function loadMovies() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/movie/get");
        movies = await response.json();

        if (!Array.isArray(movies)) {
            console.error("Error al cargar películas");
            return;
        }

        // Cargar películas en el select de agregar
        const selectPelicula = document.getElementById("selectPelicula");
        if (selectPelicula) {
            selectPelicula.innerHTML = '<option value="">Seleccionar película...</option>';
        }

        // Cargar películas en el select de editar
        const editarSelectPelicula = document.getElementById("editarSelectPelicula");
        if (editarSelectPelicula) {
            editarSelectPelicula.innerHTML = '<option value="">Seleccionar película...</option>';
        }

        movies.forEach(movie => {
            if (selectPelicula) {
                const option = document.createElement("option");
                option.value = movie.idMovie;
                option.textContent = movie.title;
                selectPelicula.appendChild(option);
            }

            if (editarSelectPelicula) {
                const editOption = document.createElement("option");
                editOption.value = movie.idMovie;
                editOption.textContent = movie.title;
                editarSelectPelicula.appendChild(editOption);
            }
        });
    } catch (error) {
        console.error("Error al cargar películas:", error);
    }
}

// Función para cargar las salas en los selects
async function loadRooms() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/room/get");
        rooms = await response.json();

        if (!Array.isArray(rooms)) {
            console.error("Error al cargar salas");
            return;
        }

        // Cargar salas en el select de agregar
        const selectSala = document.getElementById("selectSala");
        if (selectSala) {
            selectSala.innerHTML = '<option value="">Seleccionar sala...</option>';
        }

        // Cargar salas en el select de editar
        const editarSelectSala = document.getElementById("editarSelectSala");
        if (editarSelectSala) {
            editarSelectSala.innerHTML = '<option value="">Seleccionar sala...</option>';
        }

        rooms.forEach(room => {
            if (selectSala) {
                const option = document.createElement("option");
                option.value = room.idRoom;
                option.textContent = `Sala ${room.roomNumber}`;
                selectSala.appendChild(option);
            }

            if (editarSelectSala) {
                const editOption = document.createElement("option");
                editOption.value = room.idRoom;
                editOption.textContent = `Sala ${room.roomNumber}`;
                editarSelectSala.appendChild(editOption);
            }
        });
    } catch (error) {
        console.error("Error al cargar salas:", error);
    }
}

// Función para validar los campos de la función al agregar
function validarCamposFuncion() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const pelicula = document.getElementById("selectPelicula").value.trim();
    const sala = document.getElementById("selectSala").value.trim();
    const fecha = document.getElementById("fecha").value.trim();

    if (!pelicula) {
        document.getElementById("errorPelicula").textContent = "Debe seleccionar una película.";
        esValido = false;
    }

    if (!sala) {
        document.getElementById("errorSala").textContent = "Debe seleccionar una sala.";
        esValido = false;
    }

    if (!fecha) {
        document.getElementById("errorFecha").textContent = "Debe seleccionar una fecha válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar los campos de la función al editar
function validarCamposEditarFuncion() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarPelicula").textContent = "";
    document.getElementById("errorEditarSala").textContent = "";
    document.getElementById("errorEditarFecha").textContent = "";

    const pelicula = document.getElementById("editarSelectPelicula").value.trim();
    const sala = document.getElementById("editarSelectSala").value.trim();
    const fecha = document.getElementById("editarFecha").value.trim();

    if (!pelicula) {
        document.getElementById("errorEditarPelicula").textContent = "Debe seleccionar una película.";
        esValido = false;
    }

    if (!sala) {
        document.getElementById("errorEditarSala").textContent = "Debe seleccionar una sala.";
        esValido = false;
    }

    if (!fecha) {
        document.getElementById("errorEditarFecha").textContent = "Debe seleccionar una fecha válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar una función
function validarYRegistrarFuncion() {
    if (validarCamposFuncion()) {
        registerScreening();
    }
}

// Función para validar y editar una función
function validarYEditarFuncion() {
    if (validarCamposEditarFuncion()) {
        updateScreening();
    }
}

// Función para registrar una nueva función
function registerScreening() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        // Obtener la fecha y formatearla correctamente
        const fechaSeleccionada = document.getElementById("fecha").value;
        const fechaObj = new Date(fechaSeleccionada);
        const fechaFormateada = fechaObj.toISOString(); // Formato ISO completo con hora

        // Estructura que coincide con lo que espera el backend
        let bodyContent = JSON.stringify({
            "movie": {
                "idMovie": parseInt(document.getElementById("selectPelicula").value)
            },
            "room": {
                "idRoom": parseInt(document.getElementById("selectSala").value)
            },
            "dateTime": fechaFormateada
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/screening/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        document.getElementById("modalAgregarFuncion").style.display = "none";
        document.getElementById("selectPelicula").value = "";
        document.getElementById("selectSala").value = "";
        document.getElementById("fecha").value = "";

        getScreenings();
        resolve();
    });
}


// Función para obtener las funciones
function getScreenings() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-funcion");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/screening/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/screening/filter/${filtro}`;
        }

        const headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: headersList
            });

            let data = await response.json();
            const container = document.querySelector(".screenings-grid");
            container.innerHTML = "";

            const isAdmin = window.location.pathname.includes("admin.html");
            const isFuncion = window.location.pathname.includes("funcion.html");

            if (isFuncion) {
                data = data.slice(0, 8);
            }

            if (!Array.isArray(data)) {
                container.innerHTML = `<p style="color:red">Error cargando funciones</p>`;
                return;
            }

            // Asegurarse de que las películas y salas estén cargadas
            if (movies.length === 0) await loadMovies();
            if (rooms.length === 0) await loadRooms();

            data.forEach(screening => {
                // Modificamos esta parte para asegurarnos de que las comparaciones sean correctas
                const pelicula = movies.find(m => m.idMovie === screening.movie.idMovie) || { title: "Desconocido" };
                const sala = rooms.find(r => r.idRoom === screening.room.idRoom) || { roomNumber: "?" };

                const card = document.createElement("article");
                card.className = "movie-card";

                if (isAdmin) {
                    const actions = document.createElement("div");
                    actions.className = "movie-actions";
                    actions.innerHTML = `
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                        <button class="btn-edit"
                            data-id="${screening.idScreening}"
                            data-movie="${screening.movie.idMovie}"
                            data-room="${screening.room.idRoom}"
                            data-dateTime="${screening.dateTime}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteScreening(screening.idScreening);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarFuncionId").value = btn.getAttribute("data-id");
                        document.getElementById("editarSelectPelicula").value = btn.getAttribute("data-movie");
                        document.getElementById("editarSelectSala").value = btn.getAttribute("data-room");

                        // Formatear la fecha para el input date (YYYY-MM-DD)
                        const rawDate = btn.getAttribute("data-dateTime");
                        const dateObj = new Date(rawDate);
                        const formattedDate = dateObj.toISOString().split('T')[0];
                        document.getElementById("editarFecha").value = formattedDate;

                        document.getElementById("modalEditarFuncion").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                // Formatear la fecha para mostrar
                const dateObj = new Date(screening.dateTime);
                const formattedDateDisplay = dateObj.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                const info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${pelicula.title}</h2>
                    <p class="gender">Sala: ${sala.roomNumber}</p>
                    <p class="gender">Fecha: ${formattedDateDisplay}</p>
                `;

                card.appendChild(info);
                container.appendChild(card);
            });

            if (isAdmin) {
                document.getElementById("contadorFunciones").textContent = data.length;
            }

            resolve();
        } catch (error) {
            console.error("Error al obtener funciones:", error);
            const container = document.querySelector(".screenings-grid");
            container.innerHTML = `<p style="color:red">Error al cargar las funciones</p>`;
            resolve();
        }
    });
}

// Función para actualizar una función
async function updateScreening() {
    const id = document.getElementById("editarFuncionId").value;

    // Obtener la fecha y formatearla correctamente
    const fechaSeleccionada = document.getElementById("editarFecha").value;
    const fechaObj = new Date(fechaSeleccionada);
    const fechaFormateada = fechaObj.toISOString(); // Formato ISO completo con hora

    const updatedScreening = {
        movie: {
            idMovie: parseInt(document.getElementById("editarSelectPelicula").value)
        },
        room: {
            idRoom: parseInt(document.getElementById("editarSelectSala").value)
        },
        dateTime: fechaFormateada
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/screening/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedScreening)
        });

        const data = await response.json();
        console.log("Función actualizada:", data);

        document.getElementById("modalEditarFuncion").style.display = "none";
        getScreenings();
    } catch (error) {
        console.error("Error al actualizar la función:", error);
        alert("Hubo un error al actualizar la función.");
    }
}

// Elimina
async function deleteScreening(id) {
    if (!confirm("¿Seguro que querés eliminar esta función?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/screening/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la función");

        const data = await response.json();
        console.log("Función eliminada:", data);
        getScreenings();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la función.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getScreeningsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        const newScreenings = await response.json();

        if (!Array.isArray(newScreenings)) return;

        // Verificar si hay cambios en las funciones
        if (!areArraysDifferent(newScreenings, previousScreenings)) return;

        previousScreenings = newScreenings;
        await getScreenings();

    } catch (error) {
        console.error("Error al verificar cambios en funciones:", error);
    }
}

// También necesitamos verificar si hay cambios en las películas o salas
async function checkForMovieChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/movie/get");
        const newMovies = await response.json();

        if (!Array.isArray(newMovies)) return;

        // Si hay cambios en las películas, recargar los selects y las funciones
        if (areArraysDifferent(movies, newMovies)) {
            movies = newMovies;
            await loadMovies();
            await getScreenings();
        }
    } catch (error) {
        console.error("Error al verificar cambios en películas:", error);
    }
}

async function checkForRoomChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/room/get");
        const newRooms = await response.json();

        if (!Array.isArray(newRooms)) return;

        // Si hay cambios en las salas, recargar los selects y las funciones
        if (areArraysDifferent(rooms, newRooms)) {
            rooms = newRooms;
            await loadRooms();
            await getScreenings();
        }
    } catch (error) {
        console.error("Error al verificar cambios en salas:", error);
    }
}