// --- 1. Carga diferida de model-viewer ---
let modelViewerReady = false;
async function ensureModelViewerLoaded() {
  if (modelViewerReady) return;
  await import('https://cdn.jsdelivr.net/npm/@google/model-viewer@4.1.0/dist/model-viewer.min.js');
  modelViewerReady = true;
}

// --- 2. Prefetch del modelo cuando el usuario muestra intención ---
function prefetchModel(url) {
  if (!url) return;
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'fetch';
  link.href = url;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

// --- 3. Datos del menú ---
const categories = [
  { id: 'entradas', label: 'Entradas' },
  { id: 'platos-fuertes', label: 'Platos fuertes' },
  { id: 'postres', label: 'Postres' },
];

const defaultModel = { glb: 'assets/models/hamburguesa.glb', usdz: 'assets/models/hamburguesa.usdz', poster: 'assets/posters/hamburguesa.jpg' };
const hotdogModel  = { glb: 'assets/models/perro-caliente.glb', usdz: 'assets/models/perro-caliente.usdz', poster: 'assets/posters/perro.jpg' };
const rollModel    = { glb: 'assets/models/roll-fresa.glb', usdz: 'assets/models/roll-fresa.usdz', poster: 'assets/posters/roll.jpg' };
const cheesecakeModel = { glb: 'assets/models/cheesecake.glb', usdz: 'assets/models/cheesecake.usdz', poster: 'assets/posters/cheesecake.jpg' };
const pizzaModel   = { glb: 'assets/models/pizza.glb', usdz: 'assets/models/pizza.usdz', poster: 'assets/posters/pizza.jpg' };
const papasModel   = { glb: 'assets/models/papas-bravas.glb', usdz: 'assets/models/papas-bravas.usdz', poster: 'assets/posters/papas.jpg' };
const tacosModel   = { glb: 'assets/models/tacos.glb', usdz: 'assets/models/tacos.usdz', poster: 'assets/posters/tacos.jpg' };
const cupcakeModel = { glb: 'assets/models/cupcake.glb', usdz: 'assets/models/cupcake.usdz', poster: 'assets/posters/cupcake.jpg' };
const sushiModel   = { glb: 'assets/models/sushi.glb', usdz: 'assets/models/sushi.usdz', poster: 'assets/posters/sushi.jpg' };

const dishes = [
  { id: 'tacos', category: 'entradas', name: 'Tacos de la Casona', price: '$18.900', image: 'assets/images/tacos.jpg', model: tacosModel },
  { id: 'hamburguesa', category: 'platos-fuertes', name: 'Hamburguesa de la Casa', price: '$32.900', image: 'assets/images/hamburguesa.jpg', model: defaultModel },
  { id: 'pizza', category: 'platos-fuertes', name: 'Pizza Artesanal', price: '$29.900', image: 'assets/images/pizza.jpg', model: pizzaModel },
  { id: 'cupcake', category: 'postres', name: 'Cupcake de Chocolate', price: '$16.900', image: 'assets/images/cupcake.jpg', model: cupcakeModel },
];

// --- Renderizado de tabs y platos ---
const menu = document.getElementById('menu');
const tabs = document.getElementById('menu-tabs');
let activeCategory = 'entradas';

function renderTabs() {
  tabs.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'menu-tab' + (cat.id === activeCategory ? ' active' : '');
    btn.dataset.categoryId = cat.id;
    btn.textContent = cat.label;
    tabs.appendChild(btn);
  });
}

function renderMenu() {
  menu.innerHTML = '';
  const items = dishes.filter(d => d.category === activeCategory);
  items.forEach(dish => {
    const card = document.createElement('article');
    card.className = 'dish-card';
    card.innerHTML = `
      <div class="dish-image-wrapper">
        <img src="${dish.image}" alt="${dish.name}" class="dish-image" loading="lazy" decoding="async" />
      </div>
      <div class="dish-content">
        <h2 class="dish-name">${dish.name}</h2>
        <span class="dish-price">${dish.price}</span>
        <div class="dish-actions">
          <button class="ar-button" data-id="${dish.id}">📱 Ver en AR</button>
        </div>
      </div>`;
    const btn = card.querySelector('.ar-button');
    ['mouseenter', 'focus'].forEach(ev => btn.addEventListener(ev, () => prefetchModel(dish.model.glb), { once: true }));
    menu.appendChild(card);
  });
}

// --- Overlay AR ---
let overlay, viewer;
async function openAR(dish) {
  await ensureModelViewerLoaded();
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'ar-overlay';
    overlay.innerHTML = `
      <div class="ar-modal">
        <button class="ar-modal-close" aria-label="Cerrar">&times;</button>
        <model-viewer id="viewer" ar ar-modes="webxr scene-viewer quick-look"
          camera-controls reveal="interaction" environment-image="neutral"
          exposure="1" shadow-intensity="0.5" loading="lazy"></model-viewer>
      </div>`;
    document.body.appendChild(overlay);
    viewer = document.getElementById('viewer');
    overlay.querySelector('.ar-modal-close').onclick = () => overlay.classList.remove('open');
    overlay.onclick = e => { if (e.target === overlay) overlay.classList.remove('open'); };
  }
  viewer.setAttribute('poster', dish.model.poster);
  viewer.setAttribute('src', dish.model.glb);
  viewer.setAttribute('ios-src', dish.model.usdz);
  overlay.classList.add('open');
}

// --- Eventos ---
document.addEventListener('click', e => {
  const tab = e.target.closest('.menu-tab');
  if (tab) {
    activeCategory = tab.dataset.categoryId;
    renderTabs();
    renderMenu();
    return;
  }
  const btn = e.target.closest('.ar-button');
  if (!btn) return;
  const dish = dishes.find(d => d.id === btn.dataset.id);
  if (dish) openAR(dish);
});

// --- Inicializar ---
renderTabs();
renderMenu();
