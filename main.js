/**
 * main.js - Suplementos Mendoza
 * Lógica modular del catálogo, carrito reactivo y serialización WhatsApp
 * Basado estrictamente en las especificaciones de dev-brief.md
 */

// 1. Catálogo Oficial extraído textualmente de dev-brief.md
export const PRODUCTS = [
  // CATEGORÍA: RENDIMIENTO & FUERZA
  {
    id: "creatina-nn",
    category: "rendimiento",
    name: "Creatina Pura Micronizada",
    brand: "Natural Nutrition",
    badge: "Más Vendido",
    badgeColor: "emerald",
    description: "100% monohidrato micronizado de máxima biodisponibilidad. Aumenta la fuerza muscular, la recuperación y el volumen celular sin retención hídrica subcutánea.",
    variants: [
      { label: "600g (120 porciones)", price: 45000, value: "600g" },
      { label: "350g (75 porciones)", price: 33000, value: "350g" },
      { label: "150g (30 porciones)", price: 16500, value: "150g" }
    ],
    highlight: "100% Pura sin agregados"
  },
  {
    id: "pre-work-nn",
    category: "rendimiento",
    name: "Pre-Work Explosivo",
    brand: "Natural Nutrition",
    badge: "Energía Limpia",
    badgeColor: "amber",
    description: "Complejo sinérgico de Beta-alanina, Taurina y Cafeína pura. Reduce la acumulación de ácido láctico y optimiza el enfoque mental durante el entrenamiento de alta intensidad.",
    variants: [
      { label: "Pote 300g (Polvo)", price: 34300, value: "300g" }
    ],
    highlight: "Beta-Alanina + Taurina + Cafeína"
  },
  {
    id: "proteina-soja-nn",
    category: "rendimiento",
    name: "Proteína de Soja Aislada",
    brand: "Natural Nutrition",
    badge: "Origen Vegetal",
    badgeColor: "lime",
    description: "Aislado proteico de alta pureza con aminograma completo. 907 gramos (30 porciones) ideales para síntesis proteica muscular con digestión liviana y sin lactosa. Incluye 3,8g de BCAAs y 4,4g de Glutamina por cada scoop de 25g.",
    variants: [
      { label: "Cookies & Cream", price: 47800, value: "cookies-cream" },
      { label: "Milk Shake", price: 47800, value: "milk-shake" }
    ],
    highlight: "Alta pureza, 0% lactosa"
  },

  // CATEGORÍA: SALUD & LONGEVIDAD
  {
    id: "colageno-c-nn",
    category: "salud",
    name: "Colágeno Hidrolizado + Vitamina C",
    brand: "Natural Nutrition",
    badge: "Articulaciones & Piel",
    badgeColor: "emerald",
    description: "Péptidos de colágeno hidrolizado potenciados con ácido ascórbico para facilitar la fijación en cartílagos, tendones, ligamentos y elasticidad de la piel.",
    variants: [
      { label: "Pote 300g", price: 31000, value: "300g" }
    ],
    highlight: "Máxima asimilación articular"
  },
  {
    id: "omega-3-nn",
    category: "salud",
    name: "Omega 3 Puro Concentrado",
    brand: "Natural Nutrition",
    badge: "Cardio & Cerebro",
    badgeColor: "emerald",
    description: "Ácidos grasos esenciales EPA y DHA purificados. Potente regulador antiinflamatorio sistémico, protector de la salud cardiovascular y función cognitiva.",
    variants: [
      { label: "Frasco 60 cápsulas blandas", price: 33900, value: "60caps" }
    ],
    highlight: "Alto contenido de EPA y DHA"
  },
  {
    id: "cmz-nn",
    category: "salud",
    name: "CMZ + Vitamina D3",
    brand: "Natural Nutrition",
    badge: "Recuperación Nocturna",
    badgeColor: "amber",
    description: "Fórmula quelatada de Calcio, Magnesio y Zinc combinada con Vitamina D3. Promueve el descanso profundo, el balance hormonal y la relajación neuromuscular.",
    variants: [
      { label: "Frasco 60 cápsulas", price: 24000, value: "60caps" }
    ],
    highlight: "Minerales biodisponibles"
  },
  {
    id: "vitamina-d3-k2-nn",
    category: "salud",
    name: "Vitamina D3 + K2 en Aceite MCT",
    brand: "Natural Nutrition",
    badge: "Sinergia Celular",
    badgeColor: "amber",
    description: "Dúo sinérgico formulado en base de triglicéridos de cadena media (aceite de coco MCT). La Vitamina K2 asegura que el calcio movilizado por la D3 se fije en los huesos y no en las arterias.",
    variants: [
      { label: "Gotero sublingual 30ml", price: 19700, value: "30ml" }
    ],
    highlight: "Base de aceite de coco MCT"
  },
  {
    id: "vitamina-c-nn",
    category: "salud",
    name: "Vitamina C 1000mg",
    brand: "Natural Nutrition",
    badge: "Inmunidad & Antioxidante",
    badgeColor: "emerald",
    description: "Ácido ascórbico puro en dosis terapéutica de 1000mg. Combate el estrés oxidativo celular y refuerza las defensas del sistema inmunitario.",
    variants: [
      { label: "Frasco de comprimidos", price: 18200, value: "1000mg" }
    ],
    highlight: "Dosis terapéutica concentrada"
  },

  // CATEGORÍA: ALIMENTACIÓN INTELIGENTE
  {
    id: "mix-frutos-secos",
    category: "alimentacion",
    name: "Mix de Frutos Secos Premium (Receta Inteligente)",
    brand: "Selección Propia",
    badge: "Fórmula Propia",
    badgeColor: "lime",
    description: "1200g. Proporción balanceada con precisión nutricional: Maní, Nuez, Castaña de Cajú, Almendra, Pasas Rubias y Morenas, Chips de Banana y Ananá tricolor. Diseñado para cubrir micronutrientes diarios comiendo un puñado al día. Consultanos si querés sumar o quitar ingredientes a tu gusto.",
    variants: [
      { label: "Bolsa Sellada 1200g (1.2 kg)", price: 22000, value: "1200g" }
    ],
    highlight: "100% personalizable a pedido"
  },
  {
    id: "mix-semillas",
    category: "alimentacion",
    name: "Mix de Semillas Funcionales",
    brand: "Selección Propia",
    badge: "Fibra & Minerales",
    badgeColor: "lime",
    description: "500g. Combinación de semillas seleccionadas ricas en fibra soluble, zinc y ácidos grasos esenciales para incorporar en ensaladas, yogures o batidos.",
    variants: [
      { label: "Paquete 500g", price: 4500, value: "500g" }
    ],
    highlight: "Semillas crudas seleccionadas"
  },
  {
    id: "cafe-rdc",
    category: "alimentacion",
    name: "Café Tostado Molido Colombia RDC",
    brand: "RDC Café de Especialidad",
    badge: "Energía Limpia",
    badgeColor: "amber",
    description: "500g. Granos seleccionados de origen colombiano con tueste artesanal medio. Notas equilibradas, aroma intenso y cafeína natural sin quemar ni agregados de azúcar.",
    variants: [
      { label: "Paquete 500g molido", price: 29800, value: "500g" }
    ],
    highlight: "Sin azúcar agregada ni torrado"
  },
  {
    id: "miel-juricich",
    category: "alimentacion",
    name: "Miel Pura de Monte Juricich",
    brand: "Juricich",
    badge: "100% Cruda",
    badgeColor: "amber",
    description: "950g. Miel de monte cosechada de forma artesanal. Sin pasteurizar, sin jarabe de maíz ni aditivos. Conserva vivas todas sus enzimas bactericidas y antioxidantes.",
    variants: [
      { label: "Frasco vidrio 950g", price: 9900, value: "950g" }
    ],
    highlight: "Pura de floración natural"
  },
  {
    id: "aceite-oliva-libanti",
    category: "alimentacion",
    name: "Aceite de Oliva Extra Virgen Libanti",
    brand: "Libanti Mendoza",
    badge: "Prensada en Frío",
    badgeColor: "lime",
    description: "1 Litro. Primera prensada en frío elaborado en Mendoza. Acidez menor a 0.5%, alto en polifenoles y grasas monoinsaturadas cardiosaludables.",
    variants: [
      { label: "Botella 1 Litro", price: 24000, value: "1L" }
    ],
    highlight: "Acidez < 0.5% - Cosecha Mendocina"
  },
  {
    id: "hongos-adaptogenos",
    category: "alimentacion",
    name: "Hongos Adaptógenos en Gotero (FungiArtist)",
    brand: "FungiArtist",
    badge: "Extracto Doble",
    badgeColor: "emerald",
    description: "60ml. Tinturas concentradas de doble extracción hidroalcohólica. Regulan el eje del estrés, el descanso o la claridad mental según la especie que elijas.",
    variants: [
      { label: "Melena de León (Enfoque y Memoria) - 60ml", price: 24000, value: "melena" },
      { label: "Cordyceps (Rendimiento Físico y VO2 Max) - 60ml", price: 24000, value: "cordyceps" },
      { label: "Reishi (Calma y Calidad del Sueño) - 60ml", price: 24000, value: "reishi" },
      { label: "Ashwagandha (Modulación de Cortisol) - 60ml", price: 24000, value: "ashwagandha" },
      { label: "Tremella (Hidratación Celular y Piel) - 60ml", price: 24000, value: "tremella" }
    ],
    highlight: "Doble extracción concentrada"
  }
];

// 2. Estado Global de la Aplicación y Carrito
const STORAGE_KEY = "suplementos_mendoza_cart_v1";

let state = {
  cart: [],
  activeCategory: "all",
  isDrawerOpen: false,
  isModalOpen: false,
  selectedVariants: {} // Map de productId -> variantIndex
};

// Formato de Moneda Argentina ($ ARS)
const formatPrice = (amount) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
};

// Inicialización de variantes por defecto
PRODUCTS.forEach((product) => {
  state.selectedVariants[product.id] = 0;
});

// Cargar carrito de localStorage
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error al cargar carrito:", e);
    state.cart = [];
  }
  updateCartBadge();
}

// Guardar carrito en localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.cart));
  } catch (e) {
    console.error("Error al guardar carrito:", e);
  }
  updateCartBadge();
}

// 3. Renderizado del Catálogo de Productos
function renderCatalog() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filteredProducts = state.activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === state.activeCategory);

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-zinc-500">
        No se encontraron productos en esta categoría.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map((product) => {
    const selectedVarIndex = state.selectedVariants[product.id] || 0;
    const currentVariant = product.variants[selectedVarIndex];

    // Estilos de badge según dev-brief.md
    let badgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    if (product.badgeColor === "amber") {
      badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
    } else if (product.badgeColor === "lime") {
      badgeClass = "bg-lime-500/10 text-lime-400 border-lime-500/20";
    }

    const hasMultipleVariants = product.variants.length > 1;

    return `
      <article class="product-card bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden cursor-pointer" data-product-id="${product.id}">
        <div>
          <!-- Badge y Marca -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs uppercase tracking-wider font-semibold text-zinc-400">${product.brand}</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}">
              ${product.badge}
            </span>
          </div>

          <!-- Título -->
          <h3 class="text-lg font-bold text-zinc-100 mb-2 leading-snug">
            ${product.name}
          </h3>

          <!-- Descripción -->
          <p class="text-sm text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
            ${product.description}
          </p>

          <!-- Highlight / Atributo Clave -->
          <div class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-800/60 px-2.5 py-1 rounded-md mb-4">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            ${product.highlight}
          </div>
        </div>

        <div class="pt-4 border-t border-zinc-800/80">
          <!-- Selector de Variantes (si tiene más de 1) -->
          ${hasMultipleVariants ? `
            <div class="mb-3">
              <label class="block text-xs font-medium text-zinc-400 mb-1.5">Elegir presentación:</label>
              <select class="variant-select w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors" data-product-id="${product.id}">
                ${product.variants.map((v, idx) => `
                  <option value="${idx}" ${idx === selectedVarIndex ? "selected" : ""}>
                    ${v.label} - ${formatPrice(v.price)}
                  </option>
                `).join("")}
              </select>
            </div>
          ` : `
            <div class="text-xs text-zinc-400 mb-3 font-medium">
              Presentación: <span class="text-zinc-200">${currentVariant.label}</span>
            </div>
          `}

          <!-- Precio y Botón Agregar -->
          <div class="flex items-center justify-between gap-3 mt-1">
            <div>
              <span class="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Precio</span>
              <span class="text-xl font-bold text-zinc-100" id="price-${product.id}">
                ${formatPrice(currentVariant.price)}
              </span>
            </div>

            <button type="button" class="btn-add-cart inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/10 active:scale-95" data-product-id="${product.id}">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  attachProductEvents();
}

// 4. Manejo de Eventos del Catálogo
function attachProductEvents() {
  // Selector de variantes
  document.querySelectorAll(".variant-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const productId = e.target.getAttribute("data-product-id");
      const variantIdx = parseInt(e.target.value, 10);
      state.selectedVariants[productId] = variantIdx;

      const product = PRODUCTS.find((p) => p.id === productId);
      if (product) {
        const priceEl = document.getElementById(`price-${productId}`);
        if (priceEl) {
          priceEl.textContent = formatPrice(product.variants[variantIdx].price);
        }
      }
    });
  });

  // Botón "Agregar al Pedido"
  document.querySelectorAll(".btn-add-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetBtn = e.currentTarget;
      const productId = targetBtn.getAttribute("data-product-id");
      addToCart(productId);

      // Microinteracción en el botón
      const originalHTML = targetBtn.innerHTML;
      targetBtn.innerHTML = `
        <svg class="w-4 h-4 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        <span>¡Sumado!</span>
      `;
      targetBtn.classList.add("bg-emerald-400");
      setTimeout(() => {
        targetBtn.innerHTML = originalHTML;
        targetBtn.classList.remove("bg-emerald-400");
      }, 900);
    });
  });

  // Click en la tarjeta del producto para abrir Modal
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-add-cart") || e.target.closest(".variant-select")) {
        return;
      }
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    });
  });
}

// 5. Gestión del Carrito (Acciones)
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const variantIdx = state.selectedVariants[productId] || 0;
  const variant = product.variants[variantIdx];

  // Identificador único por producto y variante
  const cartItemId = `${product.id}-${variant.value}`;
  const existingItemIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId);

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += 1;
  } else {
    state.cart.push({
      cartItemId,
      id: product.id,
      name: product.name,
      brand: product.brand,
      selectedVariant: variant,
      quantity: 1
    });
  }

  saveCartToStorage();
  triggerCartAnimation();
}

function updateCartItemQuantity(cartItemId, delta) {
  const itemIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId);
  if (itemIndex === -1) return;

  const newQty = state.cart[itemIndex].quantity + delta;
  if (newQty <= 0) {
    state.cart.splice(itemIndex, 1);
  } else {
    state.cart[itemIndex].quantity = newQty;
  }

  saveCartToStorage();
  renderCartDrawer();
}

function removeCartItem(cartItemId) {
  state.cart = state.cart.filter((item) => item.cartItemId !== cartItemId);
  saveCartToStorage();
  renderCartDrawer();
}

// Microanimación en el badge de navegación
function triggerCartAnimation() {
  const badge = document.getElementById("cart-badge");
  const btn = document.getElementById("open-cart-btn");
  if (badge) {
    badge.classList.remove("cart-bump");
    void badge.offsetWidth; // Force reflow
    badge.classList.add("cart-bump");
  }
  if (btn) {
    btn.classList.add("border-emerald-500/50");
    setTimeout(() => btn.classList.remove("border-emerald-500/50"), 400);
  }
}

function updateCartBadge() {
  const totalCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
}

// 6. Drawer y Modal del Carrito
function openDrawer() {
  state.isDrawerOpen = true;
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const panel = document.getElementById("cart-panel");

  if (!drawer || !backdrop || !panel) return;

  drawer.classList.remove("pointer-events-none");
  backdrop.classList.remove("opacity-0", "pointer-events-none");
  backdrop.classList.add("opacity-100", "pointer-events-auto");
  panel.classList.remove("translate-x-full");
  panel.classList.add("translate-x-0");
  document.body.classList.add("overflow-hidden");

  renderCartDrawer();
}

function closeDrawer() {
  state.isDrawerOpen = false;
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const panel = document.getElementById("cart-panel");

  if (!drawer || !backdrop || !panel) return;

  backdrop.classList.remove("opacity-100", "pointer-events-auto");
  backdrop.classList.add("opacity-0", "pointer-events-none");
  panel.classList.remove("translate-x-0");
  panel.classList.add("translate-x-full");
  drawer.classList.add("pointer-events-none");
  if (!state.isModalOpen) {
    document.body.classList.remove("overflow-hidden");
  }
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById("drawer-items-list");
  const emptyState = document.getElementById("drawer-empty-state");
  const footerContainer = document.getElementById("drawer-footer-checkout");
  const subtotalEl = document.getElementById("drawer-subtotal");

  if (!itemsContainer || !emptyState || !footerContainer) return;

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = "";
    emptyState.classList.remove("hidden");
    footerContainer.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  footerContainer.classList.remove("hidden");

  const total = state.cart.reduce((acc, item) => acc + (item.selectedVariant.price * item.quantity), 0);
  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(total);
  }

  itemsContainer.innerHTML = state.cart.map((item) => `
    <div class="flex items-center justify-between gap-3 p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80">
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold text-zinc-100 truncate">${item.name}</h4>
        <span class="text-xs text-zinc-400 block">${item.selectedVariant.label}</span>
        <span class="text-xs font-bold text-emerald-400 mt-1 block">
          ${formatPrice(item.selectedVariant.price)} c/u
        </span>
      </div>

      <!-- Controles de Cantidad -->
      <div class="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/80 rounded-lg p-1">
        <button type="button" class="btn-qty-minus w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white rounded hover:bg-zinc-800 transition" data-cart-id="${item.cartItemId}" aria-label="Disminuir cantidad">
          -
        </button>
        <span class="text-xs font-bold text-zinc-100 px-1.5 min-w-[1.25rem] text-center">${item.quantity}</span>
        <button type="button" class="btn-qty-plus w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white rounded hover:bg-zinc-800 transition" data-cart-id="${item.cartItemId}" aria-label="Aumentar cantidad">
          +
        </button>
      </div>

      <!-- Botón Eliminar -->
      <button type="button" class="btn-remove-item text-zinc-500 hover:text-red-400 p-1.5 rounded-lg transition" data-cart-id="${item.cartItemId}" aria-label="Eliminar producto">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  `).join("");

  // Eventos de botones dentro del drawer
  itemsContainer.querySelectorAll(".btn-qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateCartItemQuantity(btn.getAttribute("data-cart-id"), -1);
    });
  });

  itemsContainer.querySelectorAll(".btn-qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      updateCartItemQuantity(btn.getAttribute("data-cart-id"), 1);
    });
  });

  itemsContainer.querySelectorAll(".btn-remove-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCartItem(btn.getAttribute("data-cart-id"));
    });
  });
// 6.5 Modal de Detalle de Producto Aislado
function openProductModal(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  renderProductModal(product);

  const modal = document.getElementById("product-modal");
  const backdrop = document.getElementById("product-modal-backdrop");
  const card = document.getElementById("product-modal-card");

  if (!modal || !backdrop || !card) return;

  state.isModalOpen = true;
  modal.classList.remove("pointer-events-none", "opacity-0");
  backdrop.classList.remove("pointer-events-none");
  backdrop.classList.add("pointer-events-auto");
  card.classList.remove("scale-95");
  card.classList.add("scale-100");
  document.body.classList.add("overflow-hidden");
}

function closeProductModal() {
  state.isModalOpen = false;
  const modal = document.getElementById("product-modal");
  const backdrop = document.getElementById("product-modal-backdrop");
  const card = document.getElementById("product-modal-card");

  if (!modal || !backdrop || !card) return;

  modal.classList.add("opacity-0", "pointer-events-none");
  backdrop.classList.remove("pointer-events-auto");
  backdrop.classList.add("pointer-events-none");
  card.classList.remove("scale-100");
  card.classList.add("scale-95");

  if (!state.isDrawerOpen) {
    document.body.classList.remove("overflow-hidden");
  }
}

function renderProductModal(product) {
  const body = document.getElementById("product-modal-body");
  if (!body) return;

  const selectedVarIndex = state.selectedVariants[product.id] || 0;
  const currentVariant = product.variants[selectedVarIndex];

  let badgeClass = "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
  if (product.badgeColor === "amber") {
    badgeClass = "bg-amber-500/10 text-amber-400 border-amber-500/20";
  } else if (product.badgeColor === "lime") {
    badgeClass = "bg-lime-500/10 text-lime-400 border-lime-500/20";
  }

  const hasMultipleVariants = product.variants.length > 1;

  body.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
      <!-- Contenedor de imagen cuadrado (proporción 1:1, fondo gris oscuro bg-zinc-800 con texto centrado "Product Image") -->
      <div class="aspect-square w-full bg-zinc-800 rounded-2xl flex flex-col items-center justify-center border border-zinc-700/60 shadow-inner select-none p-4 text-center">
        <svg class="w-12 h-12 text-zinc-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="text-zinc-400 font-semibold text-sm sm:text-base tracking-wide">Product Image</span>
      </div>

      <!-- Información completa sin truncar -->
      <div class="flex flex-col justify-between h-full space-y-4">
        <div>
          <!-- Marca y Badge -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="text-xs uppercase tracking-wider font-semibold text-zinc-400">${product.brand}</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}">
              ${product.badge}
            </span>
          </div>

          <!-- Nombre del producto -->
          <h2 id="modal-product-name" class="text-xl sm:text-2xl font-bold text-zinc-100 leading-snug mb-3">
            ${product.name}
          </h2>

          <!-- Highlight -->
          <div class="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-300 bg-zinc-800/80 px-2.5 py-1 rounded-md mb-4 border border-zinc-700/50">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>${product.highlight}</span>
          </div>

          <!-- Descripción completa sin truncar -->
          <div class="text-sm text-zinc-300 leading-relaxed space-y-2 mb-4 font-normal">
            <p>${product.description}</p>
          </div>
        </div>

        <div class="pt-4 border-t border-zinc-800">
          <!-- Selector de variantes / presentación -->
          ${hasMultipleVariants ? `
            <div class="mb-4">
              <label for="modal-variant-select" class="block text-xs font-medium text-zinc-400 mb-1.5">Elegir presentación / sabor:</label>
              <select id="modal-variant-select" class="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 transition-colors" data-product-id="${product.id}">
                ${product.variants.map((v, idx) => `
                  <option value="${idx}" ${idx === selectedVarIndex ? "selected" : ""}>
                    ${v.label} - ${formatPrice(v.price)}
                  </option>
                `).join("")}
              </select>
            </div>
          ` : `
            <div class="text-xs text-zinc-400 mb-4 font-medium">
              Presentación: <span class="text-zinc-200 font-semibold">${currentVariant.label}</span>
            </div>
          `}

          <!-- Precio y Botón Agregar -->
          <div class="flex items-center justify-between gap-3 pt-2">
            <div>
              <span class="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Precio</span>
              <span class="text-2xl font-bold text-zinc-100" id="modal-price-${product.id}">
                ${formatPrice(currentVariant.price)}
              </span>
            </div>

            <button
              type="button"
              id="modal-add-cart-btn"
              class="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/10 active:scale-95"
              data-product-id="${product.id}"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar al Pedido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Listener para selector de variante en modal
  const modalSelect = document.getElementById("modal-variant-select");
  if (modalSelect) {
    modalSelect.addEventListener("change", (e) => {
      const variantIdx = parseInt(e.target.value, 10);
      state.selectedVariants[product.id] = variantIdx;

      // Actualizar precio en modal
      const modalPrice = document.getElementById(`modal-price-${product.id}`);
      if (modalPrice) {
        modalPrice.textContent = formatPrice(product.variants[variantIdx].price);
      }

      // Sincronizar en la tarjeta del catálogo
      const cardSelect = document.querySelector(`.variant-select[data-product-id="${product.id}"]`);
      if (cardSelect) {
        cardSelect.value = variantIdx;
      }
      const cardPrice = document.getElementById(`price-${product.id}`);
      if (cardPrice) {
        cardPrice.textContent = formatPrice(product.variants[variantIdx].price);
      }
    });
  }

  // Listener para botón agregar en modal
  const modalAddBtn = document.getElementById("modal-add-cart-btn");
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", () => {
      addToCart(product.id);
      const originalHTML = modalAddBtn.innerHTML;
      modalAddBtn.innerHTML = `
        <svg class="w-4 h-4 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        <span>¡Agregado al Pedido!</span>
      `;
      modalAddBtn.classList.add("bg-emerald-400");
      setTimeout(() => {
        modalAddBtn.innerHTML = originalHTML;
        modalAddBtn.classList.remove("bg-emerald-400");
      }, 900);
    });
  }
}

// 7. Serializador Oficial a WhatsApp según dev-brief.md
export function buildWhatsAppLink(cartItems, formData) {
  const WHATSAPP_PHONE = "5492613364201";

  const itemsText = cartItems.map((item) =>
    `• ${item.quantity}x ${item.name} (${item.selectedVariant.label}) - $${(item.selectedVariant.price * item.quantity).toLocaleString("es-AR")}`
  ).join("\n");

  const total = cartItems.reduce((acc, item) => acc + (item.selectedVariant.price * item.quantity), 0);

  const message =
`🛒 *NUEVO PEDIDO - SUPLEMENTOS MENDOZA*
------------------------------------------
👤 *Cliente:* ${formData.name.trim()}
📱 *Contacto:* ${formData.phone.trim()}
📍 *Entrega:* ${formData.deliveryType === "envio" ? `Envío a domicilio - ${formData.address.trim()}` : "Retiro coordinado"}
💳 *Pago:* ${formData.paymentMethod === "transferencia" ? "Transferencia Bancaria" : "Efectivo contra entrega"}

📦 *Detalle del Pedido:*
${itemsText}

💰 *TOTAL: $${total.toLocaleString("es-AR")}*
${formData.notes && formData.notes.trim() ? `\n📝 *Notas:* ${formData.notes.trim()}` : ""}
------------------------------------------
_Enviado desde suplementosmendoza.com.ar_`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// 8. Inicialización General y Listeners Globales
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderCatalog();

  // Filtros de Categorías
  const filterButtons = document.querySelectorAll(".category-tab");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.getAttribute("data-category");
      state.activeCategory = category;

      // Actualizar estilos activos de pestañas
      filterButtons.forEach((b) => {
        b.classList.remove("bg-emerald-500", "text-zinc-950", "font-bold");
        b.classList.add("bg-zinc-900", "text-zinc-400", "font-medium");
      });
      e.currentTarget.classList.add("bg-emerald-500", "text-zinc-950", "font-bold");
      e.currentTarget.classList.remove("bg-zinc-900", "text-zinc-400", "font-medium");

      renderCatalog();
    });
  });

  // Abrir / Cerrar Drawer
  const openCartBtn = document.getElementById("open-cart-btn");
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const emptyCtaBtn = document.getElementById("btn-empty-catalog");

  if (openCartBtn) openCartBtn.addEventListener("click", openDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeDrawer);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeDrawer);
  if (emptyCtaBtn) {
    emptyCtaBtn.addEventListener("click", () => {
      closeDrawer();
      const catEl = document.getElementById("catalogo");
      if (catEl) catEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Cerrar Modal de Producto
  const closeProductModalBtn = document.getElementById("close-product-modal-btn");
  const productModalBackdrop = document.getElementById("product-modal-backdrop");
  if (closeProductModalBtn) closeProductModalBtn.addEventListener("click", closeProductModal);
  if (productModalBackdrop) productModalBackdrop.addEventListener("click", closeProductModal);

  // Cerrar Drawer o Modal con tecla Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (state.isModalOpen) {
        closeProductModal();
      } else if (state.isDrawerOpen) {
        closeDrawer();
      }
    }
  });

  // Alternar campo de dirección según método de entrega
  const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
  const addressContainer = document.getElementById("address-field-container");
  const addressInput = document.getElementById("checkout-address");

  deliveryRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "envio") {
        addressContainer.classList.remove("hidden");
        addressInput.setAttribute("required", "required");
      } else {
        addressContainer.classList.add("hidden");
        addressInput.removeAttribute("required");
      }
    });
  });

  // Envío del Checkout a WhatsApp
  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (state.cart.length === 0) {
        alert("Tu pedido está vacío. Agregá al menos un producto.");
        return;
      }

      const name = document.getElementById("checkout-name").value;
      const phone = document.getElementById("checkout-phone").value;
      const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
      const address = document.getElementById("checkout-address").value;
      const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      const notes = document.getElementById("checkout-notes").value;

      if (!name || !phone) {
        alert("Por favor completá tu nombre y teléfono.");
        return;
      }

      if (deliveryType === "envio" && !address.trim()) {
        alert("Por favor ingresá tu dirección en Gran Mendoza para el envío.");
        return;
      }

      const formData = {
        name,
        phone,
        deliveryType,
        address,
        paymentMethod,
        notes
      };

      const waUrl = buildWhatsAppLink(state.cart, formData);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }

  // Acordeón FAQ
  const faqButtons = document.querySelectorAll(".faq-toggle");
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");
      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // Cerrar otros
      document.querySelectorAll(".faq-toggle").forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute("aria-expanded", "false");
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.classList.add("hidden");
          }
          const otherIcon = otherBtn.querySelector(".faq-icon");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Alternar actual
      if (isExpanded) {
        btn.setAttribute("aria-expanded", "false");
        content.classList.add("hidden");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        btn.setAttribute("aria-expanded", "true");
        content.classList.remove("hidden");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
