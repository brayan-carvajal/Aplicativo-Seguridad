let previousEmployees = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

function validarCamposEmpleado() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const nombreEmpleado = document.getElementById("empleado").value.trim();
    const posicion = document.getElementById("posicion").value.trim();

    if (nombreEmpleado.length < 2 || nombreEmpleado.length > 50) {
        document.getElementById("errorEmpleado").textContent = "El nombre debe tener entre 2 y 50 caracteres.";
        esValido = false;
    }

    if (posicion.length < 2 || posicion.length > 30) {
        document.getElementById("errorPosicion").textContent = "La posición debe tener entre 2 y 30 caracteres.";
        esValido = false;
    }

    return esValido;
}

function validarCamposEditarEmpleado() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarEmpleado").textContent = "";
    document.getElementById("errorEditarPosicion").textContent = "";

    const nombreEmpleado = document.getElementById("editarEmpleado").value.trim();
    const posicion = document.getElementById("editarPosicion").value.trim();

    if (nombreEmpleado.length < 2 || nombreEmpleado.length > 50) {
        document.getElementById("errorEditarEmpleado").textContent = "El nombre debe tener entre 2 y 50 caracteres.";
        esValido = false;
    }

    if (posicion.length < 2 || posicion.length > 30) {
        document.getElementById("errorEditarPosicion").textContent = "La posición debe tener entre 2 y 30 caracteres.";
        esValido = false;
    }

    return esValido;
}

function validarYRegistrarEmpleado() {
    if (validarCamposEmpleado()) {
        registerEmployee();
    }
}

function validarYEditarEmpleado() {
    if (validarCamposEditarEmpleado()) {
        updateEmployee();
    }
}

// Registrar
function registerEmployee() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        let bodyContent = JSON.stringify({
            "name": document.getElementById("empleado").value,
            "position": document.getElementById("posicion").value
        });

        let response = await fetch("http://127.0.0.1:8080/api/v1/employee/post", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.text();
        console.log(data);

        document.getElementById("modalAgregarEmpleado").style.display = "none";
        document.getElementById("empleado").value = "";
        document.getElementById("posicion").value = "";

        getEmployees();
        resolve();
    });
}

// Muestra
function getEmployees() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-empleado");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/employee/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/employee/filter/${filtro}`;
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
        const container = document.querySelector(".employees-grid");
        container.innerHTML = "";

        const isAdmin = window.location.pathname.includes("admin.html");

        if (!Array.isArray(data)) {
            container.innerHTML = `<p style="color:red">Error cargando empleados</p>`;
            return;
        }

        data.forEach(employee => {
            const card = document.createElement("article");
            card.className = "movie-card";

            if (isAdmin) {
                const actions = document.createElement("div");
                actions.className = "movie-actions";
                actions.innerHTML = `
                    <button class="btn-delete"><i class="fas fa-trash"></i></button>
                    <button class="btn-edit"
                        data-id="${employee.idEmployee}"
                        data-name="${employee.name}"
                        data-position="${employee.position}">
                        <i class="fas fa-edit"></i>
                    </button>
                `;

                actions.querySelector(".btn-delete").addEventListener("click", function () {
                    deleteEmployee(employee.idEmployee);
                });

                actions.querySelector(".btn-edit").addEventListener("click", function () {
                    const btn = this;
                    document.getElementById("editarEmpleadoId").value = btn.getAttribute("data-id");
                    document.getElementById("editarEmpleado").value = btn.getAttribute("data-name");
                    document.getElementById("editarPosicion").value = btn.getAttribute("data-position");
                    document.getElementById("modalEditarEmpleado").style.display = "block";
                });

                card.appendChild(actions);
            }

            const info = document.createElement("div");
            info.className = "movie-info";
            info.innerHTML = `
                <h2>${employee.name}</h2>
                <p class="gender">Posición: ${employee.position}</p>
            `;

            card.appendChild(info);
            container.appendChild(card);
        });

        document.getElementById("contadorEmpleados").textContent = data.filter(e => e.status).length;
        resolve();
    });
}

// Actualiza
async function updateEmployee() {
    const id = document.getElementById("editarEmpleadoId").value;

    const updatedEmployee = {
        name: document.getElementById("editarEmpleado").value,
        position: document.getElementById("editarPosicion").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/employee/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedEmployee)
        });

        const data = await response.json();
        console.log("Empleado actualizado:", data);

        document.getElementById("modalEditarEmpleado").style.display = "none";
        getEmployees();
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        alert("Hubo un error al actualizar el empleado.");
    }
}

// Elimina
async function deleteEmployee(id) {
    if (!confirm("¿Seguro que querés eliminar este empleado?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/employee/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar el empleado");

        const data = await response.json();
        console.log("Empleado eliminado:", data);
        getEmployees();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el empleado.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getEmployeesWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/employee/get");
        const newEmployees = await response.json();

        if (!Array.isArray(newEmployees)) return;

        if (!areArraysDifferent(newEmployees, previousEmployees)) return;

        previousEmployees = newEmployees;

        await getEmployees();

    } catch (error) {
        console.error("Error al verificar cambios en empleados:", error);
    }
}
