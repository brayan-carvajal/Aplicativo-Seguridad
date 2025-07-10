let previousRooms = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

function validarCamposSala() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const numeroSala = parseInt(document.getElementById("sala").value);
    const capacidad = parseInt(document.getElementById("capacidad").value);

    if (isNaN(numeroSala) || numeroSala <= 0) {
        document.getElementById("errorSala").textContent = "El número de sala debe ser mayor a 0.";
        esValido = false;
    }

    if (isNaN(capacidad) || capacidad <= 0) {
        document.getElementById("errorCapacidad").textContent = "La capacidad debe ser mayor a 0.";
        esValido = false;
    }

    return esValido;
}

function validarCamposEditarSala() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarSala").textContent = "";
    document.getElementById("errorEditarCapacidad").textContent = "";

    const numeroSala = parseInt(document.getElementById("editarSala").value);
    const capacidad = parseInt(document.getElementById("editarCapacidad").value);

    if (isNaN(numeroSala) || numeroSala <= 0) {
        document.getElementById("errorEditarSala").textContent = "El número de sala debe ser mayor a 0.";
        esValido = false;
    }

    if (isNaN(capacidad) || capacidad <= 0) {
        document.getElementById("errorEditarCapacidad").textContent = "La capacidad debe ser mayor a 0.";
        esValido = false;
    }

    return esValido;
}

function validarYRegistrarSala() {
    if (validarCamposSala()) {
        registerRoom();
    }
}

function validarYEditarSala() {
    if (validarCamposEditarSala()) {
        updateRoom();
    }
}

// Registrar
function registerRoom() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "roomNumber": document.getElementById("sala").value,
            "capacity": document.getElementById("capacidad").value
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/room/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        document.getElementById("modalAgregarSala").style.display = "none";
        document.getElementById("sala").value = "";
        document.getElementById("capacidad").value = "";

        getRooms();
        resolve();
    });
}

// Muestra
function getRooms() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-sala");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/room/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/room/filter/${filtro}`;
        }

        const headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });

        let data = await response.json();
        const container = document.querySelector(".rooms-grid");
        container.innerHTML = "";

        const isAdmin = window.location.pathname.includes("admin.html");

        if (!Array.isArray(data)) {
            container.innerHTML = `<p style="color:red">Error cargando salas</p>`;
            return;
        }

        data.forEach(room => {
            const card = document.createElement("article");
            card.className = "movie-card";

            if (isAdmin) {
                const actions = document.createElement("div");
                actions.className = "movie-actions";
                actions.innerHTML = `
                    <button class="btn-delete"><i class="fas fa-trash"></i></button>
                    <button class="btn-edit"
                        data-id="${room.idRoom}"
                        data-roomnumber="${room.roomNumber}"
                        data-capacity="${room.capacity}">
                        <i class="fas fa-edit"></i>
                    </button>
                `;

                actions.querySelector(".btn-delete").addEventListener("click", function () {
                    deleteRoom(room.idRoom);
                });

                actions.querySelector(".btn-edit").addEventListener("click", function () {
                    const btn = this;
                    document.getElementById("editarSalaId").value = btn.getAttribute("data-id");
                    document.getElementById("editarSala").value = btn.getAttribute("data-roomnumber");
                    document.getElementById("editarCapacidad").value = btn.getAttribute("data-capacity");
                    document.getElementById("modalEditarSala").style.display = "block";
                });

                card.appendChild(actions);
            }

            const info = document.createElement("div");
            info.className = "movie-info";
            info.innerHTML = `
                <h2>Sala ${room.roomNumber}</h2>
                <p class="price">Capacidad: ${room.capacity} personas</p>
            `;

            card.appendChild(info);
            container.appendChild(card);
        });

        document.getElementById("contadorSalas").textContent = data.filter(r => r.status).length;
        resolve();
    });
}

// Actualiza
async function updateRoom() {
    const id = document.getElementById("editarSalaId").value;

    const updatedRoom = {
        roomNumber: document.getElementById("editarSala").value,
        capacity: document.getElementById("editarCapacidad").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/room/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedRoom)
        });

        const data = await response.json();
        console.log("Sala actualizada:", data);

        document.getElementById("modalEditarSala").style.display = "none";
        getRooms();
    } catch (error) {
        console.error("Error al actualizar la sala:", error);
        alert("Hubo un error al actualizar la sala.");
    }
}

// Elimina
async function deleteRoom(id) {
    if (!confirm("¿Seguro que querés eliminar esta sala?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/room/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la sala");

        const data = await response.json();
        console.log("Sala eliminada:", data);
        getRooms();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la sala.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getRoomsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/room/get");
        const newRooms = await response.json();

        if (!Array.isArray(newRooms)) return;

        if (!areArraysDifferent(newRooms, previousRooms)) return;

        previousRooms = newRooms;

        await getRooms();

    } catch (error) {
        console.error("Error al verificar cambios en salas:", error);
    }
}
