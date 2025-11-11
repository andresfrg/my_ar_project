// Modelo AR por defecto (hamburguesa)
const defaultModel = {
  glb: "assets/models/hamburguesa.glb",
  usdz: "assets/models/hamburguesa.usdz",
};

// Modelo AR para Perro Caliente Gourmet
const hotdogModel = {
  glb: "assets/models/perro-caliente.glb",
  usdz: "assets/models/perro-caliente.usdz",
};

// Modelo AR para Roll de Fresa y Crema
const rollModel = {
  glb: "assets/models/roll-fresa.glb",
  usdz: "assets/models/roll-fresa.usdz",
};

// Modelo AR para Cheesecake Clásico Horneado
const cheesecakeModel = {
  glb: "assets/models/cheesecake.glb",
  usdz: "assets/models/cheesecake.usdz",
};

// Modelo AR para Pizza Artesanal
const pizzaModel = {
  glb: "assets/models/pizza.glb",
  usdz: "assets/models/pizza.usdz",
};

// Modelo AR para Papas Bravas La Casona
const papasBravasModel = {
  glb: "assets/models/papas-bravas.glb",
  usdz: "assets/models/papas-bravas.usdz",
};

// Modelo AR para Tacos de la Casa
const tacosModel = {
  glb: "assets/models/tacos.glb",
  usdz: "assets/models/tacos.usdz",
};

// Modelo AR para Cupcake de Chocolate
const cupcakeModel = {
  glb: "assets/models/cupcake.glb",
  usdz: "assets/models/cupcake.usdz",
};

// Modelo AR para Sushi de la Casona
const sushiModel = {
  glb: "assets/models/sushi.glb",
  usdz: "assets/models/sushi.usdz",
};

// Definición de categorías del menú
const categories = [
  { id: "entradas", label: "Entradas" },
  { id: "platos-fuertes", label: "Platos fuertes" },
  { id: "postres", label: "Postres" },
];

// Platos (precios en pesos colombianos COP)
const dishes = [
  // ENTRADAS
  {
    id: "tacos-casona",
    category: "entradas",
    name: "Tacos de la Casona",
    price: "$18.900 COP",
    description:
      "Dos tacos sobre tabla de madera, servidos con guiso de carne, fríjoles, vegetales frescos y limón para ajustar al gusto.",
    tags: ["Para compartir", "Street style", "AR disponible"],
    image: "assets/images/tacos.jpg",
    model: tacosModel,
  },
  {
    id: "sushi-casona",
    category: "entradas",
    name: "Tabla de Sushi de la Casa",
    price: "$22.900 COP",
    description:
      "Selección de nigiris sobre tabla de madera, con cortes frescos de pescado y mariscos para disfrutar en cada bocado.",
    tags: ["Fresco", "Mar", "AR disponible"],
    image: "assets/images/sushi.jpg",
    model: sushiModel, // modelo AR del sushi
  },
  {
    id: "papas-bravas",
    category: "entradas",
    name: "Papas Bravas La Casona",
    price: "$19.500 COP",
    description:
      "Papas rústicas al horno con salsa brava ahumada y alioli de ajo asado.",
    tags: ["Vegetariano", "Picante suave", "AR disponible"],
    image: "assets/images/papas-bravas.jpg",
    model: papasBravasModel, // modelo AR de papas bravas
  },

  // PLATOS FUERTES
  {
    id: "hamburguesa-obsidiana",
    category: "platos-fuertes",
    name: "Hamburguesa de la Casa",
    price: "$32.900 COP",
    description:
      "Carne 150 g a la parrilla, queso cheddar, vegetales frescos y salsa verde de la casa en pan brioche.",
    tags: ["Carne", "Signature", "AR disponible"],
    image: "assets/images/hamburguesa.jpg",
    model: defaultModel, // modelo AR de la hamburguesa
  },
  {
    id: "perro-gourmet",
    category: "platos-fuertes",
    name: "Perro Caliente Gourmet",
    price: "$26.900 COP",
    description:
      "Salchicha artesanal, cebolla caramelizada, salsa de la casa y crumble de tocineta en pan tostado.",
    tags: ["Street style", "Recomendado", "AR disponible"],
    image: "assets/images/perro-caliente.jpg",
    model: hotdogModel, // modelo del perro-caliente
  },
  {
    id: "pizza-artesanal",
    category: "platos-fuertes",
    name: "Pizza Artesanal de la Casa",
    price: "$29.900 COP",
    description:
      "Pizza de masa esponjosa horneada en casa, con mezcla de quesos, embutidos y toques de jalapeño para un picante suave.",
    tags: ["Para compartir", "Confort", "AR disponible"],
    image: "assets/images/pizza.jpg",
    model: pizzaModel, // modelo de la pizza
  },

  // POSTRES
  {
    id: "cupcake-chocolate",
    category: "postres",
    name: "Cupcake de Chocolate",
    price: "$16.900 COP",
    description:
      "Cupcake de chocolate húmedo con frosting cremoso de cacao y topping de malvaviscos y salsa de chocolate.",
    tags: ["Chocolate", "Dulce", "AR disponible"],
    image: "assets/images/cupcake.jpg",
    model: cupcakeModel, // modelo AR del cupcake
  },
  {
    id: "cheesecake-clasico",
    category: "postres",
    name: "Cheesecake Clásico Horneado",
    price: "$18.500 COP",
    description:
      "Rebanada de cheesecake horneado con base de galleta mantequillosa y textura cremosa, con acabado dorado en la superficie.",
    tags: ["Suave", "Cremoso", "AR disponible"],
    image: "assets/images/cheesecake.jpg",
    model: cheesecakeModel, // modelo del cheesecake clásico
  },
  {
    id: "roll-fresa-crema",
    category: "postres",
    name: "Roll de Fresa y Crema",
    price: "$17.900 COP",
    description:
      "Bizcocho esponjoso enrollado, relleno de crema suave y trozos de fresa, perfecto para compartir o acompañar el café.",
    tags: ["Frutal", "Suave", "AR disponible"],
    image: "assets/images/roll-fresa.jpg",
    model: rollModel, // modelo del roll de fresa y crema
  },
];

const menuContainer = document.getElementById("menu");
const tabsContainer = document.getElementById("menu-tabs");

let activeCategory = "entradas";

/* Render de tabs */

function renderTabs() {
  tabsContainer.innerHTML = "";

  categories.forEach((cat) => {
    const button = document.createElement("button");
    button.className =
      "menu-tab" + (cat.id === activeCategory ? " active" : "");
    button.dataset.categoryId = cat.id;
    button.innerHTML = `<span>${cat.label}</span>`;
    tabsContainer.appendChild(button);
  });
}

/* Render de platos */

function renderMenu() {
  menuContainer.innerHTML = "";

  const filteredDishes = dishes.filter(
    (dish) => dish.category === activeCategory
  );

  filteredDishes.forEach((dish, index) => {
    const card = document.createElement("article");
    card.className = "dish-card";
    card.dataset.dishId = dish.id;

    // delay escalonado para la animación
    card.style.animationDelay = `${index * 70}ms`;

    card.innerHTML = `
      <div class="dish-image-wrapper">
        <img src="${dish.image}" alt="${dish.name}" class="dish-image" />
      </div>

      <div class="dish-content">
        <div class="dish-header-line">
          <h2 class="dish-name">${dish.name}</h2>
          <span class="dish-price">${dish.price}</span>
        </div>

        <p class="dish-description">${dish.description}</p>

        <div class="dish-meta">
          ${dish.tags
            .map((tag) => `<span class="dish-tag">${tag}</span>`)
            .join("")}
        </div>

        <div class="dish-actions">
          <button
            class="ar-button"
            data-dish-id="${dish.id}"
          >
            <span class="ar-button-icon">📱</span>
            <span>
              Ver en realidad aumentada
              <span class="ar-button-sub">Visualízalo sobre tu mesa</span>
            </span>
          </button>
        </div>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

/* Modal AR */

let arOverlayEl;
let arModelViewer;
let arTitleEl;
let arSubtitleEl;

function createArOverlayIfNeeded() {
  if (arOverlayEl) return;

  arOverlayEl = document.createElement("div");
  arOverlayEl.className = "ar-overlay";
  arOverlayEl.innerHTML = `
    <div class="ar-modal">
      <div class="ar-modal-header">
        <div>
          <div class="ar-modal-title">Vista AR del plato</div>
          <div class="ar-modal-subtitle">
            Usa el botón de AR del visor para colocarlo en tu entorno.
          </div>
        </div>
        <button class="ar-modal-close" aria-label="Cerrar">&times;</button>
      </div>

      <model-viewer
        id="ar-model-viewer"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        environment-image="neutral"
        exposure="1.0"
      >
      </model-viewer>
    </div>
  `;

  document.body.appendChild(arOverlayEl);

  arModelViewer = document.getElementById("ar-model-viewer");
  arTitleEl = arOverlayEl.querySelector(".ar-modal-title");
  arSubtitleEl = arOverlayEl.querySelector(".ar-modal-subtitle");

  const closeBtn = arOverlayEl.querySelector(".ar-modal-close");
  closeBtn.addEventListener("click", closeArOverlay);

  arOverlayEl.addEventListener("click", (evt) => {
    if (evt.target === arOverlayEl) {
      closeArOverlay();
    }
  });
}

function openArOverlay(dish) {
  if (!dish.model) return;

  createArOverlayIfNeeded();

  arModelViewer.setAttribute("src", dish.model.glb);
  arModelViewer.setAttribute("ios-src", dish.model.usdz);

  arTitleEl.textContent = dish.name;
  arSubtitleEl.textContent =
    "Pulsa en el botón de AR del visor para colocar el plato sobre tu mesa.";

  arOverlayEl.classList.add("open");
}

function closeArOverlay() {
  if (!arOverlayEl) return;
  arOverlayEl.classList.remove("open");
  arModelViewer.removeAttribute("src");
  arModelViewer.removeAttribute("ios-src");
}

/* Eventos globales */

// Cambio de categoría (tabs)
document.addEventListener("click", (event) => {
  const tab = event.target.closest(".menu-tab");
  if (tab) {
    const newCategory = tab.dataset.categoryId;
    if (newCategory && newCategory !== activeCategory) {
      activeCategory = newCategory;
      renderTabs();
      renderMenu();
    }
    return;
  }

  // Click en botón AR
  const button = event.target.closest(".ar-button");
  if (!button) return;

  const dishId = button.dataset.dishId;
  const dish = dishes.find((d) => d.id === dishId);
  if (!dish) return;

  openArOverlay(dish);
});

// Inicializar
renderTabs();
renderMenu();
