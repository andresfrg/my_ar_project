/* =========================
   Detección navegador interno
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

/* =========================
   Intentar abrir navegador externo
   ========================= */

function tryOpenExternalBrowser(url) {
  const ua = navigator.userAgent || "";

  // iOS: intentar Chrome si está instalado
  if (isIOS()) {
    const chromeUrl = url.replace(/^https?:\/\//, "googlechrome://");
    window.location.href = chromeUrl;
    return;
  }

  // Android: intentar intent a Chrome
  if (/Android/i.test(ua)) {
    try {
      const u = new URL(url);
      const intentUrl = `intent://${u.host}${u.pathname}${u.search}#Intent;scheme=${u.protocol.replace(
        ":",
        ""
      )};package=com.android.chrome;end`;
      window.location.href = intentUrl;
      return;
    } catch {}
  }

  // Desktop u otros
  window.open(url, "_blank", "noopener,noreferrer");
}

/* =========================
   Gate visual
   ========================= */

function showOpenInBrowserGate() {
  const url = window.location.href;

  document.body.innerHTML = `
    <div class="browser-gate">
      <div class="browser-gate-card">
        <div class="browser-gate-pill">Inno-Menu · AR</div>

        <h2 class="browser-gate-title">
          Para ver Realidad Aumentada, ábrelo en tu navegador externo
        </h2>

        <p class="browser-gate-text">
          Instagram/Facebook abren enlaces dentro de la app y eso puede bloquear el visor 3D/AR.
          Abre este link en tu navegador (Safari o Chrome).
        </p>

        <div class="browser-gate-actions">
          <button class="browser-gate-primary" id="openExternalBtn" type="button">
            Abrir en navegador
          </button>

          <button class="browser-gate-secondary" id="copyGateLink" type="button">
            Copiar link
          </button>
        </div>

        <div class="browser-gate-hint">
          <strong>Si no abre:</strong><br/>
          Toca el menú <strong>⋯</strong> (arriba) y elige
          <em>Abrir en navegador</em> o <em>Abrir en Safari</em>.
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("openExternalBtn")
    .addEventListener("click", () => tryOpenExternalBrowser(url));

  const copyBtn = document.getElementById("copyGateLink");
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      copyBtn.textContent = "¡Listo! Link copiado";
    } catch {
      copyBtn.textContent = "Copia manualmente la URL";
    }
    setTimeout(() => (copyBtn.textContent = "Copiar link"), 1600);
  });
}

/* =========================
   MODELOS AR
   ========================= */

const defaultModel = {
  glb: "assets/models/hamburguesa.glb",
  usdz: "assets/models/hamburguesa.usdz",
};

const hotdogModel = {
  glb: "assets/models/perro-caliente.glb",
  usdz: "assets/models/perro-caliente.usdz",
};

const rollModel = {
  glb: "assets/models/roll-fresa.glb",
  usdz: "assets/models/roll-fresa.usdz",
};

const cheesecakeModel = {
  glb: "assets/models/cheesecake.glb",
  usdz: "assets/models/cheesecake.usdz",
};

const pizzaModel = {
  glb: "assets/models/pizza.glb",
  usdz: "assets/models/pizza.usdz",
};

const papasBravasModel = {
  glb: "assets/models/papas-bravas.glb",
  usdz: "assets/models/papas-bravas.usdz",
};

const tacosModel = {
  glb: "assets/models/tacos.glb",
  usdz: "assets/models/tacos.usdz",
};

const cupcakeModel = {
  glb: "assets/models/cupcake.glb",
  usdz: "assets/models/cupcake.usdz",
};

const sushiModel = {
  glb: "assets/models/sushi.glb",
  usdz: "assets/models/sushi.usdz",
};

/* =========================
   DATA MENÚ
   ========================= */

const categories = [
  { id: "entradas", label: "Entradas" },
  { id: "platos-fuertes", label: "Platos fuertes" },
  { id: "postres", label: "Postres" },
];

const dishes = [
  {
    id: "tacos-casona",
    category: "entradas",
    name: "Tacos de la Casona",
    price: "$18.900 COP",
    description:
      "Dos tacos sobre tabla de madera, servidos con guiso de carne, fríjoles, vegetales frescos y limón.",
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
      "Selección de nigiris con cortes frescos de pescado y mariscos.",
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
      "Papas rústicas al horno con salsa brava ahumada y alioli.",
    tags: ["Vegetariano", "Picante suave", "AR disponible"],
    image: "assets/images/papas-bravas.jpg",
    model: papasBravasModel,
  },

  {
    id: "hamburguesa-obsidiana",
    category: "platos-fuertes",
    name: "Hamburguesa de la Casa",
    price: "$32.900 COP",
    description:
      "Carne 150 g, queso cheddar, vegetales frescos y salsa verde.",
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
      "Salchicha artesanal, cebolla caramelizada y crumble de tocineta.",
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
      "Masa esponjosa, mezcla de quesos y embutidos.",
    tags: ["Para compartir", "Confort", "AR disponible"],
    image: "assets/images/pizza.jpg",
    model: pizzaModel,
  },

  {
    id: "cupcake-chocolate",
    category: "postres",
    name: "Cupcake de Chocolate",
    price: "$16.900 COP",
    description:
      "Cupcake húmedo con frosting de cacao.",
    tags: ["Chocolate", "Dulce", "AR disponible"],
    image: "assets/images/cupcake.jpg",
    model: cupcakeModel,
  },
  {
    id: "cheesecake-clasico",
    category: "postres",
    name: "Cheesecake Clásico",
    price: "$18.500 COP",
    description:
      "Cheesecake horneado con base de galleta.",
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
      "Bizcocho relleno de crema y fresa.",
    tags: ["Frutal", "Suave", "AR disponible"],
    image: "assets/images/roll-fresa.jpg",
    model: rollModel,
  },
];

/* =========================
   DOM
   ========================= */

const menuContainer = document.getElementById("menu");
const tabsContainer = document.getElementById("menu-tabs");

let activeCategory = "entradas";

/* =========================
   Render tabs
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
   Render menu
   ========================= */

function renderMenu() {
  menuContainer.innerHTML = "";

  dishes
    .filter((dish) => dish.category === activeCategory)
    .forEach((dish, index) => {
      const card = document.createElement("article");
      card.className = "dish-card";
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
            ${dish.tags.map((t) => `<span class="dish-tag">${t}</span>`).join("")}
          </div>

          <div class="dish-actions">
            <button class="ar-button" data-dish-id="${dish.id}">
              <span class="ar-button-icon">📱</span>
              <span>Ver en realidad aumentada</span>
            </button>
          </div>
        </div>
      `;

      menuContainer.appendChild(card);
    });
}

/* =========================
   Modal AR (con botón 📱 AR propio)
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
            Pulsa el botón 📱 AR para colocarlo en tu entorno.
          </div>
        </div>
        <button class="ar-modal-close" aria-label="Cerrar">&times;</button>
      </div>

      <div class="ar-viewer-wrap">
        <model-viewer
          id="ar-model-viewer"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          environment-image="neutral"
          exposure="1.0">
        </model-viewer>

        <button class="ar-float-btn" id="arFloatBtn" type="button">
          📱 AR
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(arOverlayEl);

  arModelViewer = document.getElementById("ar-model-viewer");
  arTitleEl = arOverlayEl.querySelector(".ar-modal-title");
  arSubtitleEl = arOverlayEl.querySelector(".ar-modal-subtitle");

  const closeBtn = arOverlayEl.querySelector(".ar-modal-close");
  closeBtn.addEventListener("click", closeArOverlay);

  arOverlayEl.addEventListener("click", (evt) => {
    if (evt.target === arOverlayEl) closeArOverlay();
  });

  const arFloatBtn = document.getElementById("arFloatBtn");
  arFloatBtn.addEventListener("click", async () => {
    // Método oficial de model-viewer
    if (arModelViewer && typeof arModelViewer.activateAR === "function") {
      try {
        await arModelViewer.activateAR();
      } catch {
        // fallback: si el navegador bloquea, no hacemos nada (usuario puede usar el botón nativo si aparece)
      }
    }
  });
}

function openArOverlay(dish) {
  if (!dish.model) return;

  createArOverlayIfNeeded();

  arModelViewer.setAttribute("src", dish.model.glb);
  arModelViewer.setAttribute("ios-src", dish.model.usdz);

  arTitleEl.textContent = dish.name;
  arSubtitleEl.textContent = "Pulsa el botón 📱 AR para colocarlo en tu entorno.";

  arOverlayEl.classList.add("open");
}

function closeArOverlay() {
  if (!arOverlayEl) return;
  arOverlayEl.classList.remove("open");
  arModelViewer.removeAttribute("src");
  arModelViewer.removeAttribute("ios-src");
}

/* =========================
   Eventos
   ========================= */

document.addEventListener("click", (e) => {
  const tab = e.target.closest(".menu-tab");
  if (tab) {
    activeCategory = tab.dataset.categoryId;
    renderTabs();
    renderMenu();
    return;
  }

  const btn = e.target.closest(".ar-button");
  if (!btn) return;

  const dish = dishes.find((d) => d.id === btn.dataset.dishId);
  if (!dish) return;

  openArOverlay(dish);
});

/* =========================
   Init
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
