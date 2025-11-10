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

// Modelo AR para Brownie Caliente La Casona
const brownieModel = {
  glb: "assets/models/brownie.glb",
  usdz: "assets/models/brownie.usdz",
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
    id: "chicharrones-crispy",
    category: "entradas",
    name: "Chicharrones Crispy",
    price: "$18.900 COP",
    description:
      "Trozos de chicharrón crujiente, servidos con limón, guacamole suave y ají de la casa.",
    tags: ["Para compartir", "Crocante"],
    image: "assets/images/chicharrones.jpg",
    model: defaultModel,
  },
  {
    id: "ceviche-citrico",
    category: "entradas",
    name: "Ceviche Cítrico de Camarón",
    price: "$22.900 COP",
    description:
      "Camarones marinados en cítricos, leche de tigre suave y cebolla morada, acompañados de chips de plátano.",
    tags: ["Fresco", "Mar"],
    image: "assets/images/ceviche.jpg",
    model: defaultModel,
  },
  {
    id: "papas-bravas",
    category: "entradas",
    name: "Papas Bravas La Casona",
    price: "$19.500 COP",
    description:
      "Papas rústicas al horno con salsa brava ahumada y alioli de ajo asado.",
    tags: ["Vegetariano", "Picante suave"],
    image: "assets/images/papas-bravas.jpg",
    model: defaultModel,
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
    model: defaultModel, // cuando tengas modelo de hamburguesa, lo cambiamos aquí
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
    model: hotdogModel, // usa modelo del perro-caliente
  },
  {
    id: "pasta-pesto",
    category: "platos-fuertes",
    name: "Pasta Cremosa al Pesto",
    price: "$29.900 COP",
    description:
      "Pasta al dente en salsa cremosa de pesto de albahaca, parmesano y toque de nuez.",
    tags: ["Vegetariano opcional", "Confort"],
    image: "assets/images/pasta.jpg",
    model: defaultModel,
  },

  // POSTRES
  {
    id: "copa-helado",
    category: "postres",
    name: "Copa de Helado Artesanal",
    price: "$16.900 COP",
    description:
      "Tres bolas de helado artesanal con salsa de chocolate amargo y crocante de almendras.",
    tags: ["Clásico", "Dulce"],
    image: "assets/images/copa-helado.jpg",
    model: defaultModel,
  },
  {
    id: "cheesecake-frutos",
    category: "postres",
    name: "Cheesecake de Frutos Rojos",
    price: "$18.500 COP",
    description:
      "Base de galleta crocante, cremoso de queso y coulis de frutos rojos.",
    tags: ["Suave", "Frutal"],
    image: "assets/images/cheesecake.jpg",
    model: defaultModel,
  },
  {
    id: "brownie-caliente",
    category: "postres",
    name: "Brownie Caliente La Casona",
    price: "$17.900 COP",
    description:
      "Brownie tibio de chocolate oscuro con helado de vainilla y lluvia de nueces caramelizadas.",
    tags: ["Chocolate", "Imperdible", "AR disponible"],
    image: "assets/images/brownie.jpg",
    model: brownieModel, // usa modelo del brownie
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
