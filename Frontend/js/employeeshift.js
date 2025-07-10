let previousShifts = [];
let employees = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Función para cargar los empleados en los selects
async function loadEmployees() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/employee/get");
        employees = await response.json();

        if (!Array.isArray(employees)) {
            console.error("Error al cargar empleados");
            return;
        }

        // Cargar empleados en el select de agregar
        const selectTurno = document.getElementById("selectTurno");
        selectTurno.innerHTML = '<option value="">Seleccionar empleado...</option>';

        // Cargar empleados en el select de editar
        const editarSelectTurno = document.getElementById("editarSelectTurno");
        editarSelectTurno.innerHTML = '<option value="">Seleccionar empleado...</option>';

        employees.forEach(employee => {
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = employee.idEmployee;
            option.textContent = employee.name;
            selectTurno.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = employee.idEmployee;
            editOption.textContent = employee.name;
            editarSelectTurno.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar empleados:", error);
    }
}

// Función para validar los campos del turno al agregar
function validarCamposTurno() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const empleado = document.getElementById("selectTurno").value.trim();
    const fecha = document.getElementById("selectFecha").value.trim();

    if (!empleado) {
        document.getElementById("errorTurno").textContent = "Debe seleccionar un empleado.";
        esValido = false;
    }

    if (!fecha) {
        document.getElementById("errorSelectFecha").textContent = "Debe seleccionar una fecha.";
        esValido = false;
    }

    return esValido;
}

// Función para validar los campos del turno al editar
function validarCamposEditarTurno() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarSelectTurno").textContent = "";
    document.getElementById("errorEditarSelectFecha").textContent = "";

    const empleado = document.getElementById("editarSelectTurno").value.trim();
    const fecha = document.getElementById("editarSelectFecha").value.trim();

    if (!empleado) {
        document.getElementById("errorEditarSelectTurno").textContent = "Debe seleccionar un empleado.";
        esValido = false;
    }

    if (!fecha) {
        document.getElementById("errorEditarSelectFecha").textContent = "Debe seleccionar una fecha.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar un turno
function validarYRegistrarTurno() {
    if (validarCamposTurno()) {
        registerShift();
    }
}

// Función para validar y editar un turno
function validarYEditarTurno() {
    if (validarCamposEditarTurno()) {
        updateShift();
    }
}

// Función para registrar un nuevo turno
function registerShift() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        // Estructura que coincide con lo que espera el backend
        let bodyContent = JSON.stringify({
            "employee": {
                "idEmployee": parseInt(document.getElementById("selectTurno").value)
            },
            "dateTime": document.getElementById("selectFecha").value
        });

        try {
            let response = await fetch("http://127.0.0.1:8080/api/v1/employeeshift/post", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            console.log(data);

            document.getElementById("modalAgregarTurno").style.display = "none";
            document.getElementById("selectTurno").value = "";
            document.getElementById("selectFecha").value = "";

            getShifts();
            resolve();
        } catch (error) {
            console.error("Error al registrar turno:", error);
            alert("Hubo un error al registrar el turno.");
            resolve();
        }
    });
}

// Función para obtener los turnos
function getShifts() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-turno");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/employeeshift/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/employeeshift/filter/${filtro}`;
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
            const container = document.querySelector(".shifts-grid");
            container.innerHTML = "";

            const isAdmin = window.location.pathname.includes("admin.html");

            if (!Array.isArray(data)) {
                container.innerHTML = `<p style="color:red">Error cargando turnos</p>`;
                return;
            }

            // Asegurarse de que los empleados estén cargados
            if (employees.length === 0) await loadEmployees();

            data.forEach(employeeshift => {
                // Buscar el empleado correspondiente
                const empleado = employees.find(e => e.idEmployee === employeeshift.employee.idEmployee) || { name: "Desconocido" };
                
                // Formatear la fecha para mostrar
                const dateObj = new Date(employeeshift.dateTime);
                const formattedDate = dateObj.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });

                const card = document.createElement("article");
                card.className = "movie-card";

                if (isAdmin) {
                    const actions = document.createElement("div");
                    actions.className = "movie-actions";
                    actions.innerHTML = `
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                        <button class="btn-edit"
                            data-id="${employeeshift.idShift}"
                            data-employee="${employeeshift.employee.idEmployee}"
                            data-date="${employeeshift.dateTime}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteShift(employeeshift.idShift);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarTurnoId").value = btn.getAttribute("data-id");
                        document.getElementById("editarSelectTurno").value = btn.getAttribute("data-employee");
                        
                        // Formatear la fecha para el input date (YYYY-MM-DD)
                        const dateTime = new Date(btn.getAttribute("data-date"));
                        const formattedInputDate = dateTime.toISOString().split('T')[0];
                        document.getElementById("editarSelectFecha").value = formattedInputDate;

                        document.getElementById("modalEditarTurno").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                const info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${empleado.name}</h2>
                    <p class="gender">Fecha: ${formattedDate}</p>
                `;

                card.appendChild(info);
                container.appendChild(card);
            });

            document.getElementById("contadorTurnos").textContent = data.length;
            resolve();
        } catch (error) {
            console.error("Error al obtener turnos:", error);
            const container = document.querySelector(".shifts-grid");
            container.innerHTML = `<p style="color:red">Error al cargar los turnos</p>`;
            resolve();
        }
    });
}

// Función para actualizar un turno
async function updateShift() {
    const id = document.getElementById("editarTurnoId").value;
    
    const updatedShift = {
        employee: {
            idEmployee: parseInt(document.getElementById("editarSelectTurno").value)
        },
        dateTime: document.getElementById("editarSelectFecha").value
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/employeeshift/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedShift)
        });

        const data = await response.json();
        console.log("Turno actualizado:", data);

        document.getElementById("modalEditarTurno").style.display = "none";
        getShifts();
    } catch (error) {
        console.error("Error al actualizar el turno:", error);
        alert("Hubo un error al actualizar el turno.");
    }
}

// Función para eliminar un turno
async function deleteShift(id) {
    if (!confirm("¿Seguro que querés eliminar este turno?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/employeeshift/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar el turno");

        const data = await response.json();
        console.log("Turno eliminado:", data);
        getShifts();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el turno.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getShiftsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/employeeshift/get");
        const newShifts = await response.json();

        if (!Array.isArray(newShifts)) return;

        // Verificar si hay cambios en los turnos
        if (!areArraysDifferent(newShifts, previousShifts)) return;

        previousShifts = newShifts;
        await getShifts();

    } catch (error) {
        console.error("Error al verificar cambios en turnos:", error);
    }
}

// También necesitamos verificar si hay cambios en los empleados
async function checkForEmployeeChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/employee/get");
        const newEmployees = await response.json();

        if (!Array.isArray(newEmployees)) return;

        // Si hay cambios en los empleados, recargar los selects y los turnos
        if (areArraysDifferent(employees, newEmployees)) {
            employees = newEmployees;
            await loadEmployees();
            await getShifts();
        }
    } catch (error) {
        console.error("Error al verificar cambios en empleados:", error);
    }
}
