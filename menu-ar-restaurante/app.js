// Solo un plato: Hamburguesa demo con AR
const dishes = [
  {
    id: "hamburguesa-clasica",
    name: "Hamburguesa Clásica",
    price: "$32.000",
    description:
      "Carne 150 g, queso cheddar, vegetales frescos y salsa de la casa en pan brioche.",
    tags: ["Carne", "Popular", "Recomendado"],
    image: "assets/images/hamburguesa.jpg", // la foto que pusiste
    model: {
      glb: "assets/models/hamburguesa.glb",   // tu modelo GLB
      usdz: "assets/models/hamburguesa.usdz", // tu modelo USDZ
    },
  },
];

const menuContainer = document.getElementById("menu");

// Pintar el menú en la página
function renderMenu() {
  menuContainer.innerHTML = "";

  dishes.forEach((dish) => {
    const card = document.createElement("article");
    card.className = "dish-card";
    card.dataset.dishId = dish.id;

    card.innerHTML = `
      <div class="dish-badge-ar">
        <span>AR</span> · Vista 3D
      </div>

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
              <span class="ar-button-sub">Usa tu cámara para colocarlo en la mesa</span>
            </span>
          </button>
        </div>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

// Elementos del modal AR
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

// Click en el botón "Ver en AR"
document.addEventListener("click", (event) => {
  const button = event.target.closest(".ar-button");
  if (!button) return;

  const dishId = button.dataset.dishId;
  const dish = dishes.find((d) => d.id === dishId);
  if (!dish) return;

  openArOverlay(dish);
});

// Primera vez: dibujar el menú
renderMenu();
