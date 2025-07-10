// Control del slide
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll(".slide");
    let isAnimating = false;

    function moveSlider() {
        const track = document.getElementById("sliderTrack"); // mover aquí
        if (!track || isAnimating) return; // validación extra
        isAnimating = true;

        track.style.transition = "transform 0.8s ease-in-out";
        track.style.transform = "translateX(-20%)";

        setTimeout(() => {
            track.style.transition = "none";
            let firstSlide = slides[0];
            track.appendChild(firstSlide);
            track.style.transform = "translateX(0)";
            slides = document.querySelectorAll(".slide");
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === 2);
            });

            isAnimating = false;
        }, 800);
    }

    setInterval(moveSlider, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
    // MODALES PELÍCULAS 
    const modalAgregarPelicula = document.getElementById("modalAgregarPelicula");
    const btnAbrirAgregarPelicula = document.getElementById("agregarPeliculaBtn");
    let btnCerrarAgregarPelicula = null;
    
    if (modalAgregarPelicula) {
        btnCerrarAgregarPelicula = modalAgregarPelicula.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarPelicula = document.getElementById("modalEditarPelicula");
    let btnCerrarEditarPelicula = null;
    
    if (modalEditarPelicula) {
        btnCerrarEditarPelicula = modalEditarPelicula.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarPelicula && modalAgregarPelicula && btnCerrarAgregarPelicula) {
        btnAbrirAgregarPelicula.addEventListener("click", () => modalAgregarPelicula.style.display = "block");
        btnCerrarAgregarPelicula.addEventListener("click", () => modalAgregarPelicula.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarPelicula) modalAgregarPelicula.style.display = "none";
        });
    }

    if (btnCerrarEditarPelicula && modalEditarPelicula) {
        btnCerrarEditarPelicula.addEventListener("click", () => modalEditarPelicula.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarPelicula) modalEditarPelicula.style.display = "none";
        });
    }

    // MODALES COMIDAS 
    const modalAgregarComida = document.getElementById("modalAgregarComida");
    const btnAbrirAgregarComida = document.getElementById("agregarComidaBtn");
    let btnCerrarAgregarComida = null;
    
    if (modalAgregarComida) {
        btnCerrarAgregarComida = modalAgregarComida.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarComida = document.getElementById("modalEditarComida");
    let btnCerrarEditarComida = null;
    
    if (modalEditarComida) {
        btnCerrarEditarComida = modalEditarComida.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarComida && modalAgregarComida && btnCerrarAgregarComida) {
        btnAbrirAgregarComida.addEventListener("click", () => modalAgregarComida.style.display = "block");
        btnCerrarAgregarComida.addEventListener("click", () => modalAgregarComida.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarComida) modalAgregarComida.style.display = "none";
        });
    }

    if (btnCerrarEditarComida && modalEditarComida) {
        btnCerrarEditarComida.addEventListener("click", () => modalEditarComida.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarComida) modalEditarComida.style.display = "none";
        });
    }

    // MODALES CLIENTES
    const modalAgregarCliente = document.getElementById("modalAgregarCliente");
    const btnAbrirAgregarCliente = document.getElementById("agregarClienteBtn");
    let btnCerrarAgregarCliente = null;
    
    if (modalAgregarCliente) {
        btnCerrarAgregarCliente = modalAgregarCliente.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarCliente = document.getElementById("modalEditarCliente");
    let btnCerrarEditarCliente = null;
    
    if (modalEditarCliente) {
        btnCerrarEditarCliente = modalEditarCliente.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarCliente && modalAgregarCliente && btnCerrarAgregarCliente) {
        btnAbrirAgregarCliente.addEventListener("click", () => modalAgregarCliente.style.display = "block");
        btnCerrarAgregarCliente.addEventListener("click", () => modalAgregarCliente.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarCliente) modalAgregarCliente.style.display = "none";
        });
    }

    if (btnCerrarEditarCliente && modalEditarCliente) {
        btnCerrarEditarCliente.addEventListener("click", () => modalEditarCliente.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarCliente) modalEditarCliente.style.display = "none";
        });
    }

    // MODALES SALAS
    const modalAgregarSala = document.getElementById("modalAgregarSala");
    const btnAbrirAgregarSala = document.getElementById("agregarSalaBtn");
    let btnCerrarAgregarSala = null;
    
    if (modalAgregarSala) {
        btnCerrarAgregarSala = modalAgregarSala.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarSala = document.getElementById("modalEditarSala");
    let btnCerrarEditarSala = null;
    
    if (modalEditarSala) {
        btnCerrarEditarSala = modalEditarSala.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarSala && modalAgregarSala && btnCerrarAgregarSala) {
        btnAbrirAgregarSala.addEventListener("click", () => modalAgregarSala.style.display = "block");
        btnCerrarAgregarSala.addEventListener("click", () => modalAgregarSala.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarSala) modalAgregarSala.style.display = "none";
        });
    }

    if (btnCerrarEditarSala && modalEditarSala) {
        btnCerrarEditarSala.addEventListener("click", () => modalEditarSala.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarSala) modalEditarSala.style.display = "none";
        });
    }

    // MODALES EMPLEADOS
    const modalAgregarEmpleado = document.getElementById("modalAgregarEmpleado");
    const btnAbrirAgregarEmpleado = document.getElementById("agregarEmpleadoBtn");
    let btnCerrarAgregarEmpleado = null;
    
    if (modalAgregarEmpleado) {
        btnCerrarAgregarEmpleado = modalAgregarEmpleado.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarEmpleado = document.getElementById("modalEditarEmpleado");
    let btnCerrarEditarEmpleado = null;
    
    if (modalEditarEmpleado) {
        btnCerrarEditarEmpleado = modalEditarEmpleado.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarEmpleado && modalAgregarEmpleado && btnCerrarAgregarEmpleado) {
        btnAbrirAgregarEmpleado.addEventListener("click", () => modalAgregarEmpleado.style.display = "block");
        btnCerrarAgregarEmpleado.addEventListener("click", () => modalAgregarEmpleado.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarEmpleado) modalAgregarEmpleado.style.display = "none";
        });
    }

    if (btnCerrarEditarEmpleado && modalEditarEmpleado) {
        btnCerrarEditarEmpleado.addEventListener("click", () => modalEditarEmpleado.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarEmpleado) modalEditarEmpleado.style.display = "none";
        });
    }

    // MODALES FUNCIONES
    const modalAgregarFuncion = document.getElementById("modalAgregarFuncion");
    const btnAbrirAgregarFuncion = document.getElementById("agregarFuncionBtn");
    let btnCerrarAgregarFuncion = null;
    
    if (modalAgregarFuncion) {
        btnCerrarAgregarFuncion = modalAgregarFuncion.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarFuncion = document.getElementById("modalEditarFuncion");
    let btnCerrarEditarFuncion = null;
    
    if (modalEditarFuncion) {
        btnCerrarEditarFuncion = modalEditarFuncion.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarFuncion && modalAgregarFuncion && btnCerrarAgregarFuncion) {
        btnAbrirAgregarFuncion.addEventListener("click", () => modalAgregarFuncion.style.display = "block");
        btnCerrarAgregarFuncion.addEventListener("click", () => modalAgregarFuncion.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarFuncion) modalAgregarFuncion.style.display = "none";
        });
    }

    if (btnCerrarEditarFuncion && modalEditarFuncion) {
        btnCerrarEditarFuncion.addEventListener("click", () => modalEditarFuncion.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarFuncion) modalEditarFuncion.style.display = "none";
        });
    }

    // MODALES BOLETOS
    const modalAgregarBoleto = document.getElementById("modalAgregarBoleto");
    const btnAbrirAgregarBoleto = document.getElementById("agregarBoletoBtn");
    let btnCerrarAgregarBoleto = null;
    
    if (modalAgregarBoleto) {
        btnCerrarAgregarBoleto = modalAgregarBoleto.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarBoleto = document.getElementById("modalEditarBoleto");
    let btnCerrarEditarBoleto = null;
    
    if (modalEditarBoleto) {
        btnCerrarEditarBoleto = modalEditarBoleto.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarBoleto && modalAgregarBoleto && btnCerrarAgregarBoleto) {
        btnAbrirAgregarBoleto.addEventListener("click", () => modalAgregarBoleto.style.display = "block");
        btnCerrarAgregarBoleto.addEventListener("click", () => modalAgregarBoleto.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarBoleto) modalAgregarBoleto.style.display = "none";
        });
    }

    if (btnCerrarEditarBoleto && modalEditarBoleto) {
        btnCerrarEditarBoleto.addEventListener("click", () => modalEditarBoleto.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarBoleto) modalEditarBoleto.style.display = "none";
        });
    }

    // MODALES RESERVA
    const modalAgregarReserva = document.getElementById("modalAgregarReserva");
    const btnAbrirAgregarReserva = document.getElementById("agregarReservaBtn");
    let btnCerrarAgregarReserva = null;
    
    if (modalAgregarReserva) {
        btnCerrarAgregarReserva = modalAgregarReserva.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarReserva = document.getElementById("modalEditarReserva");
    let btnCerrarEditarReserva = null;
    
    if (modalEditarReserva) {
        btnCerrarEditarReserva = modalEditarReserva.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarReserva && modalAgregarReserva && btnCerrarAgregarReserva) {
        btnAbrirAgregarReserva.addEventListener("click", () => modalAgregarReserva.style.display = "block");
        btnCerrarAgregarReserva.addEventListener("click", () => modalAgregarReserva.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarReserva) modalAgregarReserva.style.display = "none";
        });
    }

    if (btnCerrarEditarReserva && modalEditarReserva) {
        btnCerrarEditarReserva.addEventListener("click", () => modalEditarReserva.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarReserva) modalEditarReserva.style.display = "none";
        });
    }

    // MODALES COMPRAS DE COMIDA
    const modalAgregarCompra = document.getElementById("modalAgregarCompra");
    const btnAbrirAgregarCompra = document.getElementById("agregarCompraBtn");
    let btnCerrarAgregarCompra = null;
    
    if (modalAgregarCompra) {
        btnCerrarAgregarCompra = modalAgregarCompra.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarCompra = document.getElementById("modalEditarCompra");
    let btnCerrarEditarCompra = null;
    
    if (modalEditarCompra) {
        btnCerrarEditarCompra = modalEditarCompra.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarCompra && modalAgregarCompra && btnCerrarAgregarCompra) {
        btnAbrirAgregarCompra.addEventListener("click", () => modalAgregarCompra.style.display = "block");
        btnCerrarAgregarCompra.addEventListener("click", () => modalAgregarCompra.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarCompra) modalAgregarCompra.style.display = "none";
        });
    }

    if (btnCerrarEditarCompra && modalEditarCompra) {
        btnCerrarEditarCompra.addEventListener("click", () => modalEditarCompra.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarCompra) modalEditarCompra.style.display = "none";
        });
    }

    // MODALES TURNOS DE EMPLEADOS
    const modalAgregarTurno = document.getElementById("modalAgregarTurno");
    const btnAbrirAgregarTurno = document.getElementById("agregarTurnoBtn");
    let btnCerrarAgregarTurno = null;
    
    if (modalAgregarTurno) {
        btnCerrarAgregarTurno = modalAgregarTurno.querySelector(".cerrar-modal-agregar");
    }

    const modalEditarTurno = document.getElementById("modalEditarTurno");
    let btnCerrarEditarTurno = null;
    
    if (modalEditarTurno) {
        btnCerrarEditarTurno = modalEditarTurno.querySelector(".cerrar-modal-editar");
    }

    if (btnAbrirAgregarTurno && modalAgregarTurno && btnCerrarAgregarTurno) {
        btnAbrirAgregarTurno.addEventListener("click", () => modalAgregarTurno.style.display = "block");
        btnCerrarAgregarTurno.addEventListener("click", () => modalAgregarTurno.style.display = "none");

        window.addEventListener("click", (event) => {
            if (event.target === modalAgregarTurno) modalAgregarTurno.style.display = "none";
        });
    }

    if (btnCerrarEditarTurno && modalEditarTurno) {
        btnCerrarEditarTurno.addEventListener("click", () => modalEditarTurno.style.display = "none");
        window.addEventListener("click", (event) => {
            if (event.target === modalEditarTurno) modalEditarTurno.style.display = "none";
        });
    }


    // ---------------------- FILTROS ----------------------

    // FILTRO BÚSQUEDA PELÍCULAS
    const searchInput = document.querySelector(".search-bar");
    const searchIcon = document.querySelector(".search-icon");

    if (searchInput && searchIcon) {
        searchInput.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInput.value.trim() === "") {
                getMovies();
            }
        });

        searchIcon.addEventListener("click", function () {
            getMovies();
        });
    }

    // FILTRO BÚSQUEDA COMIDAS
    const searchInputComida = document.querySelector(".search-bar-comida");
    const searchIconComida = searchInputComida?.previousElementSibling;

    if (searchInputComida && searchIconComida) {
        searchInputComida.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputComida.value.trim() === "") {
                getFoods();
            }
        });

        searchIconComida.addEventListener("click", function () {
            getFoods();
        });
    }

    // FILTRO BÚSQUEDA CLIENTES
    const searchInputCliente = document.querySelector(".search-bar-cliente");
    const searchIconCliente = searchInputCliente?.previousElementSibling;

    if (searchInputCliente && searchIconCliente) {
        searchInputCliente.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputCliente.value.trim() === "") {
                getCustomers();
            }
        });

        searchIconCliente.addEventListener("click", function () {
            getCustomers();
        });
    }

    // FILTRO BÚSQUEDA SALAS
    const searchInputSala = document.querySelector(".search-bar-sala");
    const searchIconSala = searchInputSala?.previousElementSibling;

    if (searchInputSala && searchIconSala) {
        searchInputSala.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputSala.value.trim() === "") {
                getRooms();
            }
        });

        searchIconSala.addEventListener("click", function () {
            getRooms();
        });
    }

    // FILTRO BÚSQUEDA EMPLEADOS
    const searchInputEmpleado = document.querySelector(".search-bar-empleado");
    const searchIconEmpleado = searchInputEmpleado?.previousElementSibling;

    if (searchInputEmpleado && searchIconEmpleado) {
        searchInputEmpleado.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputEmpleado.value.trim() === "") {
                getEmployees();
            }
        });

        searchIconEmpleado.addEventListener("click", function () {
            getEmployees();
        });
    }

    // FILTRO BÚSQUEDA FUNCIONES
    const searchInputFuncion = document.querySelector(".search-bar-funcion");
    const searchIconFuncion = searchInputFuncion?.previousElementSibling;

    if (searchInputFuncion && searchIconFuncion) {
        searchInputFuncion.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputFuncion.value.trim() === "") {
                getScreenings();
            }
        });

        searchIconFuncion.addEventListener("click", function () {
            getScreenings();
        });
    }

    // FILTRO BÚSQUEDA BOLETOS
    const searchInputBoleto = document.querySelector(".search-bar-boleto");
    const searchIconBoleto = searchInputBoleto?.previousElementSibling;

    if (searchInputBoleto && searchIconBoleto) {
        searchInputBoleto.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputBoleto.value.trim() === "") {
                getTickets();
            }
        });

        searchIconBoleto.addEventListener("click", function () {
            getTickets();
        });
    }

    // FILTRO BÚSQUEDA RESERVA
    const searchInputReserva = document.querySelector(".search-bar-reserva");
    const searchIconReserva = searchInputReserva?.previousElementSibling;

    if (searchInputReserva && searchIconReserva) {
        searchInputReserva.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputReserva.value.trim() === "") {
                getReservations();
            }
        });

        searchIconReserva.addEventListener("click", function () {
            getReservations();
        });
    }

    // FILTRO BÚSQUEDA COMPRAS
    const searchInputCompra = document.querySelector(".search-bar-compra");
    const searchIconCompra = searchInputCompra?.previousElementSibling;

    if (searchInputCompra && searchIconCompra) {
        searchInputCompra.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputCompra.value.trim() === "") {
                getFoodPurchases();
            }
        });

        searchIconCompra.addEventListener("click", function () {
            getFoodPurchases();
        });
    }

    // FILTRO BÚSQUEDA TURNOS
    const searchInputTurno = document.querySelector(".search-bar-turno");
    const searchIconTurno = searchInputTurno?.previousElementSibling;

    if (searchInputTurno && searchIconTurno) {
        searchInputTurno.addEventListener("keyup", function (event) {
            if (event.key === "Enter" || searchInputTurno.value.trim() === "") {
                getShifts();
            }
        });

        searchIconTurno.addEventListener("click", function () {
            getShifts();
        });
    }


    // CARGA INICIAL
    loadMovies();
    loadRooms();

    loadCustomers();
    loadScreenings();

    loadCustomersReserva();
    loadScreeningsReserva();

    loadCustomersCompra();
    loadFoods();

    loadEmployees();

    getMovies();
    getFoods();
    getCustomers();
    getRooms();
    getEmployees();
    getScreenings();
    getTickets();
    getReservations();
    getFoodPurchases();
    getShifts();

    setInterval(() => {
        getMoviesWithCheck();
    }, 6000);

    setInterval(() => {
        getFoodsWithCheck();
    }, 6000);

    setInterval(() => {
        getCustomersWithCheck();
    }, 6000);

    setInterval(() => {
        getRoomsWithCheck();
    }, 6000);

    setInterval(() => {
        getEmployeesWithCheck();
    }, 6000);

    setInterval(() => {
        getScreeningsWithCheck();
    }, 6000);

    setInterval(() => {
        getTicketsWithCheck();
    }, 6000);

    setInterval(() => {
        getReservationsWithCheck();
    }, 6000);

    setInterval(() => {
        getFoodPurchasesWithCheck();
    }, 6000);

    setInterval(() => {
        getShiftsWithCheck();
    }, 6000);

    setInterval(checkForMovieChanges, 5000);
    setInterval(checkForRoomChanges, 5000);

    setInterval(checkForCustomerChanges, 5000);
    setInterval(checkForScreeningChanges, 5000);

    setInterval(checkForCustomerChangesReserva, 5000);
    setInterval(checkForScreeningChangesReserva, 5000);

    setInterval(checkForCustomerChangesCompra, 5000);
    setInterval(checkForFoodChanges, 5000);

    setInterval(checkForEmployeeChanges, 5000);
    
});

// Función para mostrar el panel seleccionado
function showPanel(panelId) {
    // Desactivar todos los paneles
    document.querySelectorAll('.content-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Desactivar todos los elementos del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });

    // Activar el panel solicitado
    document.getElementById(panelId).classList.add('active');

    // Activar el elemento del menú correspondiente
    document.querySelector(`.menu-item[onclick="showPanel('${panelId}')"]`).classList.add('active');

    // Recargar datos si es necesario
    if (panelId === 'movies') {
        getMovies();
    } else if (panelId === 'foods') {
        getFoods();
    } else if (panelId === 'customers') {
        getCustomers();
    } else if (panelId === 'rooms') {
        getRooms();
    } else if (panelId === 'employees') {
        getEmployees();
    } else if (panelId === 'screenings') {
        getScreenings();
    } else if (panelId === 'tickets') {
        getTickets();
    } else if (panelId === 'reservations') {
        getReservations();
    } else if (panelId === 'foodpurchases') {
        getFoodPurchases();
    } else if (panelId === 'employeeshifts') {
        getShifts();
    }
}