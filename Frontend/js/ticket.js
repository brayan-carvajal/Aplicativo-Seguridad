let previousTickets = [];
let customers = [];
let screenings = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Función para cargar los clientes en los selects
async function loadCustomers() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        customers = await response.json();

        if (!Array.isArray(customers)) {
            console.error("Error al cargar clientes");
            return;
        }

        // Cargar clientes en el select de agregar
        const selectBoleto = document.getElementById("selectBoleto");
        selectBoleto.innerHTML = '<option value="">Seleccionar cliente...</option>';

        // Cargar clientes en el select de editar
        const editarSelectBoleto = document.getElementById("editarSelectBoleto");
        editarSelectBoleto.innerHTML = '<option value="">Seleccionar cliente...</option>';

        customers.forEach(customer => {
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = customer.idCustomer;
            option.textContent = customer.name;
            selectBoleto.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = customer.idCustomer;
            editOption.textContent = customer.name;
            editarSelectBoleto.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// Función para cargar las funciones en los selects
async function loadScreenings() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        screenings = await response.json();

        if (!Array.isArray(screenings)) {
            console.error("Error al cargar funciones");
            return;
        }

        // Cargar funciones en el select de agregar
        const selectFuncion = document.getElementById("selectFuncion");
        selectFuncion.innerHTML = '<option value="">Seleccionar función...</option>';

        // Cargar funciones en el select de editar
        const editarSelectFuncion = document.getElementById("editarSelectFuncion");
        editarSelectFuncion.innerHTML = '<option value="">Seleccionar función...</option>';

        screenings.forEach(screening => {
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
            selectFuncion.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = screening.idScreening;
            editOption.textContent = screeningText;
            editarSelectFuncion.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar funciones:", error);
    }
}

// Función para validar los campos del boleto al agregar
function validarCamposBoleto() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const cliente = document.getElementById("selectBoleto").value.trim();
    const funcion = document.getElementById("selectFuncion").value.trim();
    const precio = document.getElementById("precioBoleto").value.trim();

    if (!cliente) {
        document.getElementById("errorBoleto").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!funcion) {
        document.getElementById("errorFuncion").textContent = "Debe seleccionar una función.";
        esValido = false;
    }

    if (!precio || precio <= 0) {
        document.getElementById("errorPrecioBoleto").textContent = "Debe ingresar un precio válido.";
        esValido = false;
    }

    return esValido;
}

// Función para validar los campos del boleto al editar
function validarCamposEditarBoleto() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarBoleto").textContent = "";
    document.getElementById("errorEditarFuncion").textContent = "";
    document.getElementById("errorEditarPrecioBoleto").textContent = "";

    const cliente = document.getElementById("editarSelectBoleto").value.trim();
    const funcion = document.getElementById("editarSelectFuncion").value.trim();
    const precio = document.getElementById("editarPrecioBoleto").value.trim();

    if (!cliente) {
        document.getElementById("errorEditarBoleto").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!funcion) {
        document.getElementById("errorEditarFuncion").textContent = "Debe seleccionar una función.";
        esValido = false;
    }

    if (!precio || precio <= 0) {
        document.getElementById("errorEditarPrecioBoleto").textContent = "Debe ingresar un precio válido.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar un boleto
function validarYRegistrarBoleto() {
    if (validarCamposBoleto()) {
        registerTicket();
    }
}

// Función para validar y editar un boleto
function validarYEditarBoleto() {
    if (validarCamposEditarBoleto()) {
        updateTicket();
    }
}

// Función para registrar un nuevo boleto
function registerTicket() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        // Estructura que coincide con lo que espera el backend
        let bodyContent = JSON.stringify({
            "customer": {
                "idCustomer": parseInt(document.getElementById("selectBoleto").value)
            },
            "screening": {
                "idScreening": parseInt(document.getElementById("selectFuncion").value)
            },
            "price": parseFloat(document.getElementById("precioBoleto").value)
        });

        try {
            let response = await fetch("http://127.0.0.1:8080/api/v1/ticket/post", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            console.log(data);

            document.getElementById("modalAgregarBoleto").style.display = "none";
            document.getElementById("selectBoleto").value = "";
            document.getElementById("selectFuncion").value = "";
            document.getElementById("precioBoleto").value = "";

            getTickets();
            resolve();
        } catch (error) {
            console.error("Error al registrar boleto:", error);
            alert("Hubo un error al registrar el boleto.");
            resolve();
        }
    });
}

// Función para obtener los boletos
function getTickets() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-boleto");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/ticket/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/ticket/filter/${filtro}`;
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
            const container = document.querySelector(".tickets-grid");
            container.innerHTML = "";

            const isAdmin = window.location.pathname.includes("admin.html");

            if (!Array.isArray(data)) {
                container.innerHTML = `<p style="color:red">Error cargando boletos</p>`;
                return;
            }

            // Asegurarse de que los clientes y funciones estén cargados
            if (customers.length === 0) await loadCustomers();
            if (screenings.length === 0) await loadScreenings();

            data.forEach(ticket => {
                // Buscar el cliente correspondiente
                const cliente = customers.find(c => c.idCustomer === ticket.customer.idCustomer) || { name: "Desconocido" };
                
                // Buscar la función correspondiente
                const funcion = screenings.find(s => s.idScreening === ticket.screening.idScreening);
                
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
                            data-id="${ticket.idTicket}"
                            data-customer="${ticket.customer.idCustomer}"
                            data-screening="${ticket.screening.idScreening}"
                            data-price="${ticket.price}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteTicket(ticket.idTicket);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarBoletoId").value = btn.getAttribute("data-id");
                        document.getElementById("editarSelectBoleto").value = btn.getAttribute("data-customer");
                        document.getElementById("editarSelectFuncion").value = btn.getAttribute("data-screening");
                        document.getElementById("editarPrecioBoleto").value = btn.getAttribute("data-price");

                        document.getElementById("modalEditarBoleto").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                const info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${cliente.name}</h2>
                    <p class="gender">${funcionInfo}</p>
                    <p class="price">Precio: $${ticket.price.toFixed(2)}</p>
                `;

                card.appendChild(info);
                container.appendChild(card);
            });

            document.getElementById("contadorBoletos").textContent = data.length;
            resolve();
        } catch (error) {
            console.error("Error al obtener boletos:", error);
            const container = document.querySelector(".tickets-grid");
            container.innerHTML = `<p style="color:red">Error al cargar los boletos</p>`;
            resolve();
        }
    });
}

// Función para actualizar un boleto
async function updateTicket() {
    const id = document.getElementById("editarBoletoId").value;
    
    const updatedTicket = {
        customer: {
            idCustomer: parseInt(document.getElementById("editarSelectBoleto").value)
        },
        screening: {
            idScreening: parseInt(document.getElementById("editarSelectFuncion").value)
        },
        price: parseFloat(document.getElementById("editarPrecioBoleto").value)
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/ticket/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedTicket)
        });

        const data = await response.json();
        console.log("Boleto actualizado:", data);

        document.getElementById("modalEditarBoleto").style.display = "none";
        getTickets();
    } catch (error) {
        console.error("Error al actualizar el boleto:", error);
        alert("Hubo un error al actualizar el boleto.");
    }
}

// Función para eliminar un boleto
async function deleteTicket(id) {
    if (!confirm("¿Seguro que querés eliminar este boleto?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/ticket/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) throw new Error("Error al eliminar el boleto");

        const data = await response.json();
        console.log("Boleto eliminado:", data);
        getTickets();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el boleto.");
    }
}

// Verificar si hay cambios para mostrarlos
async function getTicketsWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/ticket/get");
        const newTickets = await response.json();

        if (!Array.isArray(newTickets)) return;

        // Verificar si hay cambios en los boletos
        if (!areArraysDifferent(newTickets, previousTickets)) return;

        previousTickets = newTickets;
        await getTickets();

    } catch (error) {
        console.error("Error al verificar cambios en boletos:", error);
    }
}

// También necesitamos verificar si hay cambios en los clientes o funciones
async function checkForCustomerChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        const newCustomers = await response.json();

        if (!Array.isArray(newCustomers)) return;

        // Si hay cambios en los clientes, recargar los selects y los boletos
        if (areArraysDifferent(customers, newCustomers)) {
            customers = newCustomers;
            await loadCustomers();
            await getTickets();
        }
    } catch (error) {
        console.error("Error al verificar cambios en clientes:", error);
    }
}

async function checkForScreeningChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/screening/get");
        const newScreenings = await response.json();

        if (!Array.isArray(newScreenings)) return;

        // Si hay cambios en las funciones, recargar los selects y los boletos
        if (areArraysDifferent(screenings, newScreenings)) {
            screenings = newScreenings;
            await loadScreenings();
            await getTickets();
        }
    } catch (error) {
        console.error("Error al verificar cambios en funciones:", error);
    }
}
