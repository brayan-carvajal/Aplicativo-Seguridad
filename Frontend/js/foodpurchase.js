let previousFoodPurchases = [];
let customersCompra = [];
let foods = [];

// Compara los cambios actuales con los nuevos
function areArraysDifferent(arr1, arr2) {
    return JSON.stringify(arr1) !== JSON.stringify(arr2);
}

// Función para cargar los clientes en los selects
async function loadCustomersCompra() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        customersCompra = await response.json();

        if (!Array.isArray(customersCompra)) {
            console.error("Error al cargar clientes");
            return;
        }

        // Cargar clientes en el select de agregar
        const selectCompra = document.getElementById("selectCompra");
        selectCompra.innerHTML = '<option value="">Seleccionar cliente...</option>';

        // Cargar clientes en el select de editar
        const editarSelectCompra = document.getElementById("editarSelectCompra");
        editarSelectCompra.innerHTML = '<option value="">Seleccionar cliente...</option>';

        customersCompra.forEach(customer => {
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = customer.idCustomer;
            option.textContent = customer.name;
            selectCompra.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = customer.idCustomer;
            editOption.textContent = customer.name;
            editarSelectCompra.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar clientes:", error);
    }
}

// Función para cargar las comidas en los selects
async function loadFoods() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/food/get");
        foods = await response.json();

        if (!Array.isArray(foods)) {
            console.error("Error al cargar comidas");
            return;
        }

        // Cargar comidas en el select de agregar
        const selectComida = document.getElementById("selectComida");
        selectComida.innerHTML = '<option value="">Seleccionar comida...</option>';

        // Cargar comidas en el select de editar
        const editarSelectComida = document.getElementById("editarSelectComida");
        editarSelectComida.innerHTML = '<option value="">Seleccionar comida...</option>';

        foods.forEach(food => {
            const foodText = `${food.name} - $${food.price.toFixed(2)}`;
            
            // Para el select de agregar
            const option = document.createElement("option");
            option.value = food.idFood;
            option.textContent = foodText;
            selectComida.appendChild(option);

            // Para el select de editar
            const editOption = document.createElement("option");
            editOption.value = food.idFood;
            editOption.textContent = foodText;
            editarSelectComida.appendChild(editOption);
        });
    } catch (error) {
        console.error("Error al cargar comidas:", error);
    }
}

// Función para validar los campos de la compra al agregar
function validarCamposCompra() {
    let esValido = true;

    // Limpiar errores anteriores
    document.querySelectorAll(".error-text").forEach(e => e.textContent = "");

    const cliente = document.getElementById("selectCompra").value.trim();
    const comida = document.getElementById("selectComida").value.trim();
    const cantidad = document.getElementById("cantidadComida").value.trim();

    if (!cliente) {
        document.getElementById("errorCompra").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!comida) {
        document.getElementById("errorComida").textContent = "Debe seleccionar una comida.";
        esValido = false;
    }

    if (!cantidad || cantidad <= 0) {
        document.getElementById("errorCantidadComida").textContent = "Debe ingresar una cantidad válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar los campos de la compra al editar
function validarCamposEditarCompra() {
    let esValido = true;

    // Limpiar errores anteriores
    document.getElementById("errorEditarCompra").textContent = "";
    document.getElementById("errorEditarComida").textContent = "";
    document.getElementById("errorEditarCantidadComida").textContent = "";

    const cliente = document.getElementById("editarSelectCompra").value.trim();
    const comida = document.getElementById("editarSelectComida").value.trim();
    const cantidad = document.getElementById("editarCantidadComida").value.trim();

    if (!cliente) {
        document.getElementById("errorEditarCompra").textContent = "Debe seleccionar un cliente.";
        esValido = false;
    }

    if (!comida) {
        document.getElementById("errorEditarComida").textContent = "Debe seleccionar una comida.";
        esValido = false;
    }

    if (!cantidad || cantidad <= 0) {
        document.getElementById("errorEditarCantidadComida").textContent = "Debe ingresar una cantidad válida.";
        esValido = false;
    }

    return esValido;
}

// Función para validar y registrar una compra
function validarYRegistrarCompra() {
    if (validarCamposCompra()) {
        registerFoodPurchase();
    }
}

// Función para validar y editar una compra
function validarYEditarCompra() {
    if (validarCamposEditarCompra()) {
        updateFoodPurchase();
    }
}

// Función para registrar una nueva compra de comida
function registerFoodPurchase() {
    return new Promise(async (resolve) => {
        let headersList = {
            "Accept": "*/*",
            "User-Agent": "web",
            "Content-Type": "application/json"
        };

        // Estructura que coincide con lo que espera el backend
        let bodyContent = JSON.stringify({
            "customer": {
                "idCustomer": parseInt(document.getElementById("selectCompra").value)
            },
            "food": {
                "idFood": parseInt(document.getElementById("selectComida").value)
            },
            "quantity": parseInt(document.getElementById("cantidadComida").value)
        });

        try {
            let response = await fetch("http://127.0.0.1:8080/api/v1/foodpurchase/post", {
                method: "POST",
                body: bodyContent,
                headers: headersList
            });

            let data = await response.text();
            console.log(data);

            document.getElementById("modalAgregarCompra").style.display = "none";
            document.getElementById("selectCompra").value = "";
            document.getElementById("selectComida").value = "";
            document.getElementById("cantidadComida").value = "";

            getFoodPurchases();
            resolve();
        } catch (error) {
            console.error("Error al registrar compra de comida:", error);
            alert("Hubo un error al registrar la compra de comida.");
            resolve();
        }
    });
}

// Función para obtener las compras de comida
function getFoodPurchases() {
    return new Promise(async (resolve) => {
        const searchBar = document.querySelector(".search-bar-compra");
        const filtro = searchBar ? searchBar.value.trim() : "";

        let url = "http://127.0.0.1:8080/api/v1/foodpurchase/get";

        if (filtro !== "") {
            url = `http://127.0.0.1:8080/api/v1/foodpurchase/filter/${filtro}`;
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
            const container = document.querySelector(".foodpurchases-grid");
            container.innerHTML = "";

            const isAdmin = window.location.pathname.includes("admin.html");

            if (!Array.isArray(data)) {
                container.innerHTML = `<p style="color:red">Error cargando compras de comida</p>`;
                return;
            }

            // Asegurarse de que los clientes y comidas estén cargados
            if (customersCompra.length === 0) await loadCustomersCompra();
            if (foods.length === 0) await loadFoods();

            data.forEach(foodpurchase => {
                // Buscar el cliente correspondiente
                const cliente = customersCompra.find(c => c.idCustomer === foodpurchase.customer.idCustomer) || { name: "Desconocido" };
                
                // Buscar la comida correspondiente
                const comida = foods.find(f => f.idFood === foodpurchase.food.idFood) || { name: "Desconocido", price: 0 };
                
                // Calcular el precio total
                const precioTotal = foodpurchase.quantity * comida.price;

                const card = document.createElement("article");
                card.className = "movie-card";

                if (isAdmin) {
                    const actions = document.createElement("div");
                    actions.className = "movie-actions";
                    actions.innerHTML = `
                        <button class="btn-delete"><i class="fas fa-trash"></i></button>
                        <button class="btn-edit"
                            data-id="${foodpurchase.idPurchase}"
                            data-customer="${foodpurchase.customer.idCustomer}"
                            data-food="${foodpurchase.food.idFood}"
                            data-quantity="${foodpurchase.quantity}">
                            <i class="fas fa-edit"></i>
                        </button>
                    `;

                    actions.querySelector(".btn-delete").addEventListener("click", function () {
                        deleteFoodPurchase(foodpurchase.idPurchase);
                    });

                    actions.querySelector(".btn-edit").addEventListener("click", function () {
                        const btn = this;
                        document.getElementById("editarCompraId").value = btn.getAttribute("data-id");
                        document.getElementById("editarSelectCompra").value = btn.getAttribute("data-customer");
                        document.getElementById("editarSelectComida").value = btn.getAttribute("data-food");
                        document.getElementById("editarCantidadComida").value = btn.getAttribute("data-quantity");

                        document.getElementById("modalEditarCompra").style.display = "block";
                    });

                    card.appendChild(actions);
                }

                const info = document.createElement("div");
                info.className = "movie-info";
                info.innerHTML = `
                    <h2>${cliente.name}</h2>
                    <p class="gender">Comida: ${comida.name}</p>
                    <p class="price">Cantidad: ${foodpurchase.quantity}</p>
                `;

                card.appendChild(info);
                container.appendChild(card);
            });

            document.getElementById("contadorCompras").textContent = data.length;
            resolve();
        } catch (error) {
            console.error("Error al obtener compras de comida:", error);
            const container = document.querySelector(".foodpurchases-grid");
            container.innerHTML = `<p style="color:red">Error al cargar las compras de comida</p>`;
            resolve();
        }
    });
}

// Función para actualizar una compra de comida
async function updateFoodPurchase() {
    const id = document.getElementById("editarCompraId").value;

    const updatedPurchase = {
        customer: {
            idCustomer: parseInt(document.getElementById("editarSelectCompra").value)
        },
        food: {
            idFood: parseInt(document.getElementById("editarSelectComida").value)
        },
        quantity: parseInt(document.getElementById("editarCantidadComida").value)
    };

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/foodpurchase/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify(updatedPurchase)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error del servidor (${response.status}):`, errorText);
            throw new Error(`Error al actualizar (Código: ${response.status})`);
        }

        const data = await response.json();
        console.log("Compra de comida actualizada:", data);

        document.getElementById("modalEditarCompra").style.display = "none";
        getFoodPurchases();
    } catch (error) {
        console.error("Error al actualizar la compra de comida:", error);
        alert("Hubo un error al actualizar la compra de comida: " + error.message);
    }
}

// Función para eliminar una compra de comida
async function deleteFoodPurchase(id) {
    if (!confirm("¿Seguro que querés eliminar esta compra de comida?")) return;

    try {
        const response = await fetch(`http://127.0.0.1:8080/api/v1/foodpurchase/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error del servidor (${response.status}):`, errorText);
            throw new Error(`Error al eliminar (Código: ${response.status})`);
        }

        const data = await response.json();
        console.log("Compra de comida eliminada:", data);
        getFoodPurchases();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar la compra de comida: " + error.message);
    }
}

// Verificar si hay cambios para mostrarlos
async function getFoodPurchasesWithCheck() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/foodpurchase/get");
        const newFoodPurchases = await response.json();

        if (!Array.isArray(newFoodPurchases)) return;

        // Verificar si hay cambios en las compras de comida
        if (!areArraysDifferent(newFoodPurchases, previousFoodPurchases)) return;

        previousFoodPurchases = newFoodPurchases;
        await getFoodPurchases();

    } catch (error) {
        console.error("Error al verificar cambios en compras de comida:", error);
    }
}

// También necesitamos verificar si hay cambios en los clientes o comidas
async function checkForCustomerChangesCompra() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/customer/get");
        const newCustomers = await response.json();

        if (!Array.isArray(newCustomers)) return;

        // Si hay cambios en los clientes, recargar los selects y las compras
        if (areArraysDifferent(customersCompra, newCustomers)) {
            customersCompra = newCustomers;
            await loadCustomersCompra();
            await getFoodPurchases();
        }
    } catch (error) {
        console.error("Error al verificar cambios en clientes:", error);
    }
}

async function checkForFoodChanges() {
    try {
        const response = await fetch("http://127.0.0.1:8080/api/v1/food/get");
        const newFoods = await response.json();

        if (!Array.isArray(newFoods)) return;

        // Si hay cambios en las comidas, recargar los selects y las compras
        if (areArraysDifferent(foods, newFoods)) {
            foods = newFoods;
            await loadFoods();
            await getFoodPurchases();
        }
    } catch (error) {
        console.error("Error al verificar cambios en comidas:", error);
    }
}
