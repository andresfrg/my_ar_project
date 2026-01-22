/* =========================
   In-App Browser Gate (IG/FB/TikTok) - con estilos del theme
   ========================= */

function isInAppBrowser() {
  const ua = navigator.userAgent || "";
  if (ua.includes("Instagram")) return true;
  if (ua.includes("FBAN") || ua.includes("FBAV") || ua.includes("FB_IAB")) return true;
  if (ua.includes("TikTok")) return true;
  return false;
}

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function showOpenInBrowserGate() {
  const url = window.location.href;
  const browserName = isIOS() ? "Safari" : "Chrome";

  document.body.innerHTML = `
    <div class="browser-gate">
      <div class="browser-gate-card">
        <div class="browser-gate-pill">Inno-Menu · AR</div>

        <h2 class="browser-gate-title">
          Para ver Realidad Aumentada, ábrelo en ${browserName}
        </h2>

        <p class="browser-gate-text">
          Instagram/Facebook suelen abrir enlaces dentro de la app y eso puede bloquear el visor 3D/AR.
          Abre este link en <strong>${browserName}</strong> para que funcione correctamente.
        </p>

        <div class="browser-gate-actions">
          <a class="browser-gate-primary" href="${url}" target="_blank" rel="noopener noreferrer">
            Abrir en ${browserName}
          </a>

          <button class="browser-gate-secondary" id="copyGateLink">
            Copiar link
          </button>
        </div>

        <div class="browser-gate-hint">
          <strong>Si no abre:</strong><br/>
          ${
            isIOS()
              ? "Toca el menú ⋯ (arriba) → <em>Abrir en Safari</em>."
              : "Toca el menú ⋯ (arriba) → <em>Abrir en navegador</em> o <em>Abrir en Chrome</em>."
          }
          <br/><br/>
          Tip: En iPhone el AR funciona mejor desde Safari (USDZ / Quick Look).
        </div>
      </div>
    </div>
  `;

  const btn = document.getElementById("copyGateLink");
  if (btn) {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = "¡Listo! Link copiado";
      } catch {
        btn.textContent = "Copia manualmente la URL";
      }
      setTimeout(() => (btn.textContent = "Copiar link"), 1600);
    });
  }
}

/* =========================
   MODELOS AR
   ========================= */

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

/* =========================
   DATA MENÚ
   ========================= */

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
    model: sushiModel,
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
    model: papasBravasModel,
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
    model: defaultModel,
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
    model: hotdogModel,
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
    model: pizzaModel,
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
    model: cupcakeModel,
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
    model: cheesecakeModel,
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
    model: rollModel,
  },
];

/* =========================
   DOM + ESTADO
   ========================= */

const menuContainer = document.getElementById("menu");
const tabsContainer = document.getElementById("menu-tabs");

let activeCategory = "entradas";

/* =========================
   Render Tabs
   ========================= */

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

/* =========================
   Render Menu
   ========================= */

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
          <button class="ar-button" data-dish-id="${dish.id}">
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

/* =========================
   Modal AR
   ========================= */

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

/* =========================
   Eventos globales
   ========================= */

// Cambio de categoría (tabs) + Click botón AR
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

  const button = event.target.closest(".ar-button");
  if (!button) return;

  const dishId = button.dataset.dishId;
  const dish = dishes.find((d) => d.id === dishId);
  if (!dish) return;

  openArOverlay(dish);
});

/* =========================
   Inicializar
   ========================= */

function initApp() {
  renderTabs();
  renderMenu();
}

if (isInAppBrowser()) {
  showOpenInBrowserGate();
} else {
  initApp();
}
