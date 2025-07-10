let previousReservations = [];
let customersReserva = [];
let screeningsReserva = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Función para cargar los clientes en los selects
async function loadCustomersReserva() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        customersReserva = await response.json();

        if (!Array.isArray(customersReserva)) {
            console.error("Error al cargar clientes");
            return;
        }

        // Cargar clientes en el select de agregar
        const selectReserva = document.getElementById("selectReserva");
        selectReserva.innerHTML = '<option value="">Seleccionar cliente...</option>';

        // Cargar clientes en el select de editar
        const editarSelectReserva = document.getElementById("editarSelectReserva");
        editarSelectReserva.innerHTML = '<option value="">Seleccionar cliente...</option>';

        customersReserva.forEach(customer => {
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = customer.idCustomer;
            option.textContent = customer.name;
            selectReserva.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = customer.idCustomer;
            editOption.textContent = customer.name;
            editarSelectReserva.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// Función para cargar las funciones en los selects
async function loadScreeningsReserva() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        screeningsReserva = await response.json();

        if (!Array.isArray(screeningsReserva)) {
            console.error("Error al cargar funciones");
            return;
        }

        // Cargar funciones en el select de agregar
        const selectFuncionReserva = document.getElementById("selectFuncionReserva");
        selectFuncionReserva.innerHTML = '<option value="">Seleccionar función...</option>';

        // Cargar funciones en el select de editar
        const editarSelectFuncionReserva = document.getElementById("editarSelectFuncionReserva");
        editarSelectFuncionReserva.innerHTML = '<option value="">Seleccionar función...</option>';

        screeningsReserva.forEach(screening => {
            // Formatear la fecha para mostrar
            const dateObj = new Date(screening.dateTime);
            const formattedDate = dateObj.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            const screeningText = `${screening.movie.title} - Sala ${screening.room.roomNumber} - ${formattedDate}`;
            
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = screening.idScreening;
            option.textContent = screeningText;
            selectFuncionReserva.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = screening.idScreening;
            editOption.textContent = screeningText;
            editarSelectFuncionReserva.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar funciones:", error);
    }
}

// Función para validar los campos de la reserva al agregar
function validarCamposReserva() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const cliente = document.getElementById("selectReserva").value.trim();
    const funcion = document.getElementById("selectFuncionReserva").value.trim();
    const cantidad = document.getElementById("cantidadBoletos").value.trim();

    if (!cliente) {
        document.getElementById("errorReserva").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!funcion) {
        document.getElementById("errorFuncionReserva").textContent = "Debe seleccionar una función.";
        esValido = false;
    }

    if (!cantidad || cantidad <= 0) {
        document.getElementById("errorCantidadBoletos").textContent = "Debe ingresar una cantidad válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar los campos de la reserva al editar
function validarCamposEditarReserva() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarReserva").textContent = "";
    document.getElementById("errorEditarFuncionReserva").textContent = "";
    document.getElementById("errorEditarCantidadBoletos").textContent = "";

    const cliente = document.getElementById("editarSelectReserva").value.trim();
    const funcion = document.getElementById("editarSelectFuncionReserva").value.trim();
    const cantidad = document.getElementById("editarCantidadBoletos").value.trim();

    if (!cliente) {
        document.getElementById("errorEditarReserva").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!funcion) {
        document.getElementById("errorEditarFuncionReserva").textContent = "Debe seleccionar una función.";
        esValido = false;
    }

    if (!cantidad || cantidad <= 0) {
        document.getElementById("errorEditarCantidadBoletos").textContent = "Debe ingresar una cantidad válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar una reserva
function validarYRegistrarReserva() {
    if (validarCamposReserva()) {
        registerReservation();
    }
}

// Función para validar y editar una reserva
function validarYEditarReserva() {
    if (validarCamposEditarReserva()) {
        updateReservation();
    }
}

// Función para registrar una nueva reserva
function registerReservation() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        // Estructura que coincide con lo que espera el backend
        let bodyContent = JSON.stringify({
            "customer": {
                "idCustomer": parseInt(document.getElementById("selectReserva").value)
            },
            "screening": {
                "idScreening": parseInt(document.getElementById("selectFuncionReserva").value)
            },
            "ticketQuantity": parseInt(document.getElementById("cantidadBoletos").value)
        });

        try {
            let response = await fetch("http://127.0.0.1:8080/api/v1/reservation/post", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            console.log(data);

            document.getElementById("modalAgregarReserva").style.display = "none";
            document.getElementById("selectReserva").value = "";
            document.getElementById("selectFuncionReserva").value = "";
            document.getElementById("cantidadBoletos").value = "";

            getReservations();
            resolve();
        } catch (error) {
            console.error("Error al registrar reserva:", error);
            alert("Hubo un error al registrar la reserva.");
            resolve();
        }
    });
}

// Función para obtener las reservas
function getReservations() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-reserva");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/reservation/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/reservation/filter/${filtro}`;
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
            const container = document.querySelector(".reservations-grid");
            container.innerHTML = "";

            const isAdmin = window.location.pathname.includes("admin.html");

            if (!Array.isArray(data)) {
                container.innerHTML = `<p style="color:red">Error cargando reservas</p>`;
                return;
            }

            // Asegurarse de que los clientes y funciones estén cargados
            if (customersReserva.length === 0) await loadCustomersReserva();
            if (screeningsReserva.length === 0) await loadScreeningsReserva();

            data.forEach(reservation => {
                // Buscar el cliente correspondiente
                const cliente = customersReserva.find(c => c.idCustomer === reservation.customer.idCustomer) || { name: "Desconocido" };
                
                // Buscar la función correspondiente
                const funcion = screeningsReserva.find(s => s.idScreening === reservation.screening.idScreening);
                
                let funcionInfo = "Función desconocida";
                if (funcion) {
                    // Formatear la fecha para mostrar
                    const dateObj = new Date(funcion.dateTime);
                    const formattedDate = dateObj.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    
                    funcionInfo = `${funcion.movie.title} - Sala ${funcion.room.roomNumber} - ${formattedDate}`;
                }

                const card = document.createElement("article");
                card.className = "movie-card";

                if (isAdmin) {
                    const actions = document.createElement("div");
                    actions.className = "movie-actions";
                    actions.innerHTML = `
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                        <button class="btn-edit"
                            data-id="${reservation.idReservation}"
                            data-customer="${reservation.customer.idCustomer}"
                            data-screening="${reservation.screening.idScreening}"
                            data-quantity="${reservation.ticketQuantity}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteReservation(reservation.idReservation);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarReservaId").value = btn.getAttribute("data-id");
                        document.getElementById("editarSelectReserva").value = btn.getAttribute("data-customer");
                        document.getElementById("editarSelectFuncionReserva").value = btn.getAttribute("data-screening");
                        document.getElementById("editarCantidadBoletos").value = btn.getAttribute("data-quantity");

                        document.getElementById("modalEditarReserva").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                const info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${cliente.name}</h2>
                    <p class="gender">${funcionInfo}</p>
                    <p class="price">Cantidad de boletos: ${reservation.ticketQuantity}</p>
                `;

                card.appendChild(info);
                container.appendChild(card);
            });

            document.getElementById("contadorReservas").textContent = data.length;
            resolve();
        } catch (error) {
            console.error("Error al obtener reservas:", error);
            const container = document.querySelector(".reservations-grid");
            container.innerHTML = `<p style="color:red">Error al cargar las reservas</p>`;
            resolve();
        }
    });
}

// Función para actualizar una reserva
async function updateReservation() {
    const id = document.getElementById("editarReservaId").value;
    
    const updatedReservation = {
        customer: {
            idCustomer: parseInt(document.getElementById("editarSelectReserva").value)
        },
        screening: {
            idScreening: parseInt(document.getElementById("editarSelectFuncionReserva").value)
        },
        ticketQuantity: parseInt(document.getElementById("editarCantidadBoletos").value)
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/reservation/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedReservation)
        });

        const data = await response.json();
        console.log("Reserva actualizada:", data);

        document.getElementById("modalEditarReserva").style.display = "none";
        getReservations();
    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        alert("Hubo un error al actualizar la reserva.");
    }
}

// Función para eliminar una reserva
async function deleteReservation(id) {
    if (!confirm("¿Seguro que querés eliminar esta reserva?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/reservation/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar la reserva");

        const data = await response.json();
        console.log("Reserva eliminada:", data);
        getReservations();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la reserva.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getReservationsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/reservation/get");
        const newReservations = await response.json();

        if (!Array.isArray(newReservations)) return;

        // Verificar si hay cambios en las reservas
        if (!areArraysDifferent(newReservations, previousReservations)) return;

        previousReservations = newReservations;
        await getReservations();

    } catch (error) {
        console.error("Error al verificar cambios en reservas:", error);
    }
}

// También necesitamos verificar si hay cambios en los clientes o funciones
async function checkForCustomerChangesReserva() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        const newCustomers = await response.json();

        if (!Array.isArray(newCustomers)) return;

        // Si hay cambios en los clientes, recargar los selects y las reservas
        if (areArraysDifferent(customersReserva, newCustomers)) {
            customersReserva = newCustomers;
            await loadCustomersReserva();
            await getReservations();
        }
    } catch (error) {
        console.error("Error al verificar cambios en clientes:", error);
    }
}

async function checkForScreeningChangesReserva() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        const newScreenings = await response.json();

        if (!Array.isArray(newScreenings)) return;

        // Si hay cambios en las funciones, recargar los selects y las reservas
        if (areArraysDifferent(screeningsReserva, newScreenings)) {
            screeningsReserva = newScreenings;
            await loadScreeningsReserva();
            await getReservations();
        }
    } catch (error) {
        console.error("Error al verificar cambios en funciones:", error);
    }
}
