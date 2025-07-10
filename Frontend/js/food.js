let previousFoods = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

function validarCamposComida() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const nombre = document.getElementById("nombre").value.trim();
    const precio = parseFloat(document.getElementById("precio").value);
    const url = document.getElementById("urlImagenComida").value.trim();

    if (nombre.length < 1 || nombre.length > 50) {
        document.getElementById("errorNombre").textContent = "El nombre debe tener entre 1 y 50 caracteres.";
        esValido = false;
    }

    if (isNaN(precio) || precio <= 0) {
        document.getElementById("errorPrecio").textContent = "El precio debe ser mayor a 0.";
        esValido = false;
    }

    try {
        new URL(url); // Valida si es URL válida
    } catch (_) {
        document.getElementById("errorUrlComida").textContent = "La URL no es válida.";
        esValido = false;
    }

    return esValido;
}

function validarCamposEditarComida() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarNombre").textContent = "";
    document.getElementById("errorEditarPrecio").textContent = "";
    document.getElementById("errorEditarUrlComida").textContent = "";

    const nombre = document.getElementById("editarNombre").value.trim();
    const precio = parseFloat(document.getElementById("editarPrecio").value);
    const url = document.getElementById("editarUrlImagenComida").value.trim();

    if (nombre.length < 1 || nombre.length > 50) {
        document.getElementById("errorEditarNombre").textContent = "El nombre debe tener entre 1 y 50 caracteres.";
        esValido = false;
    }

    if (isNaN(precio) || precio <= 0) {
        document.getElementById("errorEditarPrecio").textContent = "El precio debe ser mayor a 0.";
        esValido = false;
    }

    try {
        new URL(url); // Verifica si es URL válida
    } catch (_) {
        document.getElementById("errorEditarUrlComida").textContent = "La URL no es válida.";
        esValido = false;
    }

    return esValido;
}

function validarYRegistrarComida() {
    if (validarCamposComida()) {
        registerFood(); // Tu función original de registro de comida
    }
}

function validarYEditarComida() {
    if (validarCamposEditarComida()) {
        updateFood(); // Llamás a tu función para hacer el PUT
    }
}

// Registrar
function registerFood() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "name": document.getElementById("nombre").value,
            "price": document.getElementById("precio").value,
            "imgUrl": document.getElementById("urlImagenComida").value
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/food/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        document.getElementById("modalAgregarComida").style.display = "none";
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("urlImagenComida").value = "";

        getFoods();
        resolve();
    });
}

// Muestra
function getFoods() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-comida");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/food/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/food/filter/${filtro}`;
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
        const container = document.querySelector(".foods-grid");
        container.innerHTML = "";

        const isAdmin = window.location.pathname.includes("admin.html");
        let isIndex = window.location.pathname.includes("index.html");

        if (isIndex) {
            data = data.slice(0, 8); // Límite solo en el index
        }

        if (!Array.isArray(data)) {
            container.innerHTML = `<p style="color:red">Error cargando comidas</p>`;
            return;
        }

        data.forEach(food => {
            const card = document.createElement("article");
            card.className = "movie-card";

            if (isAdmin) {
                const actions = document.createElement("div");
                actions.className = "movie-actions";
                actions.innerHTML = `
                    <button class="btn-delete"><i class="fas fa-trash"></i></button>
                    <button class="btn-edit"
                        data-id="${food.idFood}"
                        data-name="${food.name}"
                        data-price="${food.price}"
                        data-imgUrl="${food.imgUrl}">
                        <i class="fas fa-edit"></i>
                    </button>
                `;

                actions.querySelector(".btn-delete").addEventListener("click", function () {
                    deleteFood(food.idFood);
                });

                actions.querySelector(".btn-edit").addEventListener("click", function () {
                    const btn = this;
                    document.getElementById("editarComidaId").value = btn.getAttribute("data-id");
                    document.getElementById("editarNombre").value = btn.getAttribute("data-name");
                    document.getElementById("editarPrecio").value = btn.getAttribute("data-price");
                    document.getElementById("editarUrlImagenComida").value = btn.getAttribute("data-imgUrl");
                    document.getElementById("modalEditarComida").style.display = "block";
                });

                card.appendChild(actions);
            }

            const img = document.createElement("img");
            img.src = food.imgUrl;
            img.alt = food.name;

            const info = document.createElement("div");
            info.className = "movie-info";
            info.innerHTML = `
                <h2>${food.name}</h2>
                <p class="price">Precio: $${parseFloat(food.price).toLocaleString()}</p>
            `;

            card.appendChild(img);
            card.appendChild(info);
            container.appendChild(card);
        });

        document.getElementById("contadorComidas").textContent = data.filter(p => p.status).length;
        resolve();
    });
}

// Actualiza
async function updateFood() {
    const id = document.getElementById("editarComidaId").value;

    const updatedFood = {
        name: document.getElementById("editarNombre").value,
        price: document.getElementById("editarPrecio").value,
        imgUrl: document.getElementById("editarUrlImagenComida").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/food/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedFood)
        });

        const data = await response.json();
        console.log("Comida actualizada:", data);

        document.getElementById("modalEditarComida").style.display = "none";
        getFoods();
    } catch (error) {
        console.error("Error al actualizar la comida:", error);
        alert("Hubo un error al actualizar la comida.");
    }
}

// Elimina
async function deleteFood(id) {
    if (!confirm("¿Seguro que querés eliminar esta comida?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/food/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la comida");

        const data = await response.json();
        console.log("Comida eliminada:", data);
        getFoods();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la comida.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getFoodsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/food/get");
        const newFoods = await response.json();

        if (!Array.isArray(newFoods)) return;

        if (!areArraysDifferent(newFoods, previousFoods)) return;

        previousFoods = newFoods;

        await getFoods();

    } catch (error) {
        console.error("Error al verificar cambios en comidas:", error);
    }
}
