let previousFoodData = "";

async function fetchAndUpdateFoods() {
    try {
        const res = await fetch("http://127.0.0.1:8080/api/v1/food/get");
        const foods = await res.json();

        const activeFoods = foods.filter(f => f.status); // si no usas status, quita esta línea
        const newFoodData = JSON.stringify(activeFoods);

        if (newFoodData !== previousFoodData) {
            previousFoodData = newFoodData;
            renderFoods(activeFoods);
        }
    } catch (err) {
        console.error("Error al obtener comidas:", err);
    }
}

function renderFoods(foods) {
    const containers = document.querySelectorAll(".foods-grid");
    containers.forEach(container => container.innerHTML = "");

    foods.forEach(food => {
        const card = document.createElement("article");
        card.className = "movie-card"; // usa el mismo estilo que películas
        card.innerHTML = `
            <img src="${food.imgUrl}" alt="${food.name}">
            <div class="movie-info">
                <h2>${food.name}</h2>
                <p class="description">Precio: $${food.price}</p>
            </div>
        `;
        containers.forEach(container => container.appendChild(card));
    });
}

// Primera carga
fetchAndUpdateFoods();

// Actualiza cada 5 segundos
setInterval(fetchAndUpdateFoods, 5000);
