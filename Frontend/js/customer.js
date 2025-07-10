let previousCustomers = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Validar campos al agregar cliente
function validarCamposCliente() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const nombre = document.getElementById("cliente").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    // Validación del nombre
    if (nombre.length < 2 || nombre.length > 50) {
        document.getElementById("errorCliente").textContent = "El nombre debe tener entre 2 y 50 caracteres.";
        esValido = false;
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        document.getElementById("errorCorreo").textContent = "El correo no tiene un formato válido.";
        esValido = false;
    }

    // Validación de contraseña
    if (contrasena.length < 6) {
        document.getElementById("errorContrasena").textContent = "La contraseña debe tener al menos 6 caracteres.";
        esValido = false;
    }

    return esValido;
}

// Validar campos al editar cliente
function validarCamposEditarCliente() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarCliente").textContent = "";
    document.getElementById("errorEditarCorreo").textContent = "";
    document.getElementById("errorEditarContrasena").textContent = "";

    const nombre = document.getElementById("editarCliente").value.trim();
    const correo = document.getElementById("editarCorreo").value.trim();
    const contrasena = document.getElementById("editarContrasena").value;

    // Validación del nombre
    if (nombre.length < 2 || nombre.length > 50) {
        document.getElementById("errorEditarCliente").textContent = "El nombre debe tener entre 2 y 50 caracteres.";
        esValido = false;
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        document.getElementById("errorEditarCorreo").textContent = "El correo no tiene un formato válido.";
        esValido = false;
    }

    // Validación de contraseña
    if (contrasena.length < 6) {
        document.getElementById("errorEditarContrasena").textContent = "La contraseña debe tener al menos 6 caracteres.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar
function validarYRegistrarCliente() {
    if (validarCamposCliente()) {
        registerCustomer();
    }
}

// Función para validar y editar
function validarYEditarCliente() {
    if (validarCamposEditarCliente()) {
        updateCustomer();
    }
}

// Registrar cliente
function registerCustomer() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "name": document.getElementById("cliente").value,
            "email": document.getElementById("correo").value,
            "password": document.getElementById("contrasena").value
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/customer/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        document.querySelector(".modal-agregar-cliente").style.display = "none";
        document.getElementById("cliente").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("contrasena").value = "";

        getCustomers();
        resolve();
    });
}

// Mostrar clientes
function getCustomers() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-cliente");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/customer/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/customer/filter/${filtro}`;
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
        const container = document.querySelector(".customers-grid");
        container.innerHTML = "";

        if (!Array.isArray(data)) {
            container.innerHTML = `<p style="color:red">Error cargando clientes</p>`;
            return;
        }

        data.forEach(customer => {
            const card = document.createElement("article");
            card.className = "movie-card";

            const actions = document.createElement("div");
            actions.className = "movie-actions";
            actions.innerHTML = `
                <button class="btn-delete"><i class="fas fa-trash"></i></button>
                <button class="btn-edit"
                    data-id="${customer.idCustomer}"
                    data-name="${customer.name}"
                    data-email="${customer.email}"
                    data-password="${customer.password}">
                    <i class="fas fa-edit"></i>
                </button>
            `;

            actions.querySelector(".btn-delete").addEventListener("click", function () {
                deleteCustomer(customer.idCustomer);
            });

            actions.querySelector(".btn-edit").addEventListener("click", function () {
                const btn = this;
                document.getElementById("editarClienteId").value = btn.getAttribute("data-id");
                document.getElementById("editarCliente").value = btn.getAttribute("data-name");
                document.getElementById("editarCorreo").value = btn.getAttribute("data-email");
                document.getElementById("editarContrasena").value = btn.getAttribute("data-password");
                document.getElementById("modalEditarCliente").style.display = "block";
            });

            card.appendChild(actions);

            const info = document.createElement("div");
            info.className = "movie-info";
            info.innerHTML = `
                <h2>${customer.name}</h2>
                <p class="email">Correo: ${customer.email}</p>
            `;

            card.appendChild(info);
            container.appendChild(card);
        });

        // Actualizar contador si existe
        const contadorClientes = document.getElementById("contadorClientes");
        if (contadorClientes) {
            contadorClientes.textContent = data.length;
        }

        resolve();
    });
}

// Actualizar cliente
async function updateCustomer() {
    const id = document.getElementById("editarClienteId").value;

    const updatedCustomer = {
        name: document.getElementById("editarCliente").value,
        email: document.getElementById("editarCorreo").value,
        password: document.getElementById("editarContrasena").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/customer/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedCustomer)
        });

        const data = await response.json();
        console.log("Cliente actualizado:", data);

        document.getElementById("modalEditarCliente").style.display = "none";
        getCustomers();
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        alert("Hubo un error al actualizar el cliente.");
    }
}

// Eliminar cliente
async function deleteCustomer(id) {
    if (!confirm("¿Seguro que querés eliminar este cliente?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/customer/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar el cliente");

        const data = await response.json();
        console.log("Cliente eliminado:", data);
        getCustomers();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el cliente.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getCustomersWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        const newCustomers = await response.json();

        if (!Array.isArray(newCustomers)) return;

        if (!areArraysDifferent(newCustomers, previousCustomers)) return;

        previousCustomers = newCustomers;

        await getCustomers();

    } catch (error) {
        console.error("Error al verificar cambios en clientes:", error);
    }
}
