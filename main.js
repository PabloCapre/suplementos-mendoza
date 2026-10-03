/**
 * main.js - Suplementos Mendoza
 * Lógica modular del catálogo, carrito reactivo y serialización WhatsApp
 * Basado estrictamente en design-system.md: High-Performance Science x Pure Vitality x Real Food
 * Sistema Trizona de 3 Categorías:
 * - Rendimiento & Fuerza (Azul Eléctrico: blue-600 / #2563eb)
 * - Salud & Longevidad (Verde Esmeralda: emerald-600 / #059669)
 * - Alimentación Inteligente (Dorado Mate: amber-600 / #d97706)
 * Código JavaScript nativo para navegador (sin bundlers ni sintaxis export)
 */

// 1. Configuración de Temas de Categoría
const CATEGORY_THEMES = {
  rendimiento: {
    name: "Rendimiento & Fuerza",
    badgeClass: "bg-blue-600/15 text-blue-400 border-blue-600/30",
    highlightClass: "text-blue-300 bg-blue-950/40 border-blue-800/40",
    checkIconColor: "text-blue-400",
    haloClass: "from-blue-600/15",
    cardHoverBorder: "hover:border-blue-500/40",
    cardTitleHover: "group-hover:text-blue-400",
    pillActive: "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-600/20 font-bold",
    pillInactive: "bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-blue-500/30 font-medium",
    tabActive: "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25",
    iconColor: "text-blue-400",
    strokeColor: "#3b82f6",
    shadowRgba: "rgba(37,99,235,0.25)"
  },
  salud: {
    name: "Salud & Longevidad",
    badgeClass: "bg-emerald-600/15 text-emerald-400 border-emerald-600/30",
    highlightClass: "text-emerald-300 bg-emerald-950/40 border-emerald-800/40",
    checkIconColor: "text-emerald-400",
    haloClass: "from-emerald-600/15",
    cardHoverBorder: "hover:border-emerald-500/40",
    cardTitleHover: "group-hover:text-emerald-400",
    pillActive: "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20 font-bold",
    pillInactive: "bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-emerald-500/30 font-medium",
    tabActive: "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/25",
    iconColor: "text-emerald-400",
    strokeColor: "#10b981",
    shadowRgba: "rgba(5,150,105,0.25)"
  },
  alimentacion: {
    name: "Alimentación Inteligente",
    badgeClass: "bg-amber-600/15 text-amber-400 border-amber-600/30",
    highlightClass: "text-amber-300 bg-amber-950/40 border-amber-800/40",
    checkIconColor: "text-amber-400",
    haloClass: "from-amber-600/15",
    cardHoverBorder: "hover:border-amber-500/40",
    cardTitleHover: "group-hover:text-amber-400",
    pillActive: "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/20 font-bold",
    pillInactive: "bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-amber-500/30 font-medium",
    tabActive: "bg-amber-600 text-white font-bold shadow-md shadow-amber-600/25",
    iconColor: "text-amber-400",
    strokeColor: "#f59e0b",
    shadowRgba: "rgba(217,119,6,0.25)"
  }
};

// 2. Catálogo Oficial extraído textualmente de dev-brief.md
const PRODUCTS = [
  // CATEGORÍA: RENDIMIENTO & FUERZA (Azul Eléctrico)
  {
    id: "creatina-nn",
    category: "rendimiento",
    name: "Creatina Pura Micronizada",
    brand: "Natural Nutrition",
    badge: "Más Vendido",
    badgeColor: "blue",
    description: "100% monohidrato micronizado de máxima biodisponibilidad. Aumenta la fuerza muscular, la recuperación y el volumen celular sin retención hídrica subcutánea. Cuenta con el sello aval del \"Proyecto Suplementos\" de Pablo Pizurno. Certificado Sin TACC y aprobado por la FDA.",
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
    badgeColor: "blue",
    description: "Complejo sinérgico de Beta-alanina, Taurina y Cafeína pura. Reduce la acumulación de ácido láctico y optimiza el enfoque mental durante el entrenamiento de alta intensidad. Certificado Sin TACC y aprobado por la FDA.",
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
    badgeColor: "blue",
    description: "Aislado proteico 100% vegano de alta pureza con aminograma completo. 907 gramos (30 porciones) ideales para síntesis proteica muscular con digestión liviana y sin lactosa. Incluye 3,8g de BCAAs y 4,4g de Glutamina por cada scoop de 25g. Aprobado por la FDA.",
    variants: [
      { label: "Cookies & Cream", price: 47800, value: "Cookies" },
      { label: "Milk Shake", price: 47800, value: "Milkshake" }
    ],
    highlight: "Alta pureza, 0% lactosa"
  },

  // CATEGORÍA: SALUD & LONGEVIDAD (Verde Esmeralda)
  {
    id: "colageno-c-nn",
    category: "salud",
    name: "Colágeno Hidrolizado + Vitamina C",
    brand: "Natural Nutrition",
    badge: "Articulaciones & Piel",
    badgeColor: "emerald",
    description: "Péptidos de colágeno hidrolizado potenciados con ácido ascórbico para facilitar la fijación en cartílagos, tendones, ligamentos y elasticidad de la piel. Certificado Sin TACC y aprobado por la FDA.",
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
    description: "Ácidos grasos esenciales EPA y DHA purificados. Potente regulador antiinflamatorio sistémico, protector de la salud cardiovascular y función cognitiva. Cuenta con certificado libre de metales pesados y mercurio. Aprobado por la FDA.",
    variants: [
      { label: "Frasco 60 cápsulas blandas", price: 33900, value: "60 caps" }
    ],
    highlight: "Alto contenido de EPA y DHA"
  },
  {
    id: "cmz-nn",
    category: "salud",
    name: "CMZ + Vitamina D3",
    brand: "Natural Nutrition",
    badge: "Recuperación Nocturna",
    badgeColor: "emerald",
    description: "Fórmula quelatada de Calcio, Magnesio y Zinc combinada con Vitamina D3. Promueve el descanso profundo, el balance hormonal y la relajación neuromuscular. Aprobado por la FDA.",
    variants: [
      { label: "Frasco 60 cápsulas", price: 24000, value: "60 caps" }
    ],
    highlight: "Minerales biodisponibles"
  },
  {
    id: "vitamina-d3-k2-nn",
    category: "salud",
    name: "Vitamina D3 + K2 en Aceite MCT",
    brand: "Natural Nutrition",
    badge: "Sinergia Celular",
    badgeColor: "emerald",
    description: "Dúo sinérgico formulado en base de triglicéridos de cadena media (aceite de coco MCT). La Vitamina K2 asegura que el calcio movilizado por la D3 se fije en los huesos y no en las arterias. Certificado Sin TACC y aprobado por la FDA.",
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
    description: "Ácido ascórbico puro en dosis terapéutica de 1000mg. Combate el estrés oxidativo celular y refuerza las defensas del sistema inmunitario. Certificado Sin TACC y aprobado por la FDA.",
    variants: [
      { label: "Frasco de comprimidos", price: 18200, value: "1000mg" }
    ],
    highlight: "Dosis terapéutica concentrada"
  },

  // CATEGORÍA: ALIMENTACIÓN INTELIGENTE (Dorado Mate)
  {
    id: "mix-frutos-secos",
    category: "alimentacion",
    name: "Mix de Frutos Secos Premium (Receta Inteligente)",
    brand: "Selección Propia",
    badge: "Fórmula Propia",
    badgeColor: "amber",
    description: "1200g. Proporción balanceada con precisión nutricional: Maní, Nuez, Castaña de Cajú, Almendra, Pasas Rubias y Morenas, Chips de Banana y Ananá tricolor. Diseñado para cubrir micronutrientes diarios comiendo un puñado al día. Consultanos si querés sumar o quitar ingredientes a tu gusto. Materias primas de calidad aprobadas por la FDA.",
    variants: [
      { label: "Bolsa Sellada 1200g (1.2 kg)", price: 22000, value: "1.2 kg" }
    ],
    highlight: "100% personalizable a pedido"
  },
  {
    id: "mix-semillas",
    category: "alimentacion",
    name: "Mix de Semillas Funcionales",
    brand: "Selección Propia",
    badge: "Fibra & Minerales",
    badgeColor: "amber",
    description: "500g. Combinación de semillas seleccionadas ricas en fibra soluble, zinc y ácidos grasos esenciales para incorporar en ensaladas, yogures o batidos. Aprobado por la FDA.",
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
    description: "500g. Granos seleccionados de origen colombiano con tueste artesanal medio. Notas equilibradas, aroma intenso y cafeína natural sin quemar ni agregados de azúcar. Aprobado por la FDA.",
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
    description: "950g. Miel de monte cosechada de forma artesanal. Sin pasteurizar, sin jarabe de maíz ni aditivos. Conserva vivas todas sus enzimas bactericidas y antioxidantes. Aprobado por la FDA.",
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
    badgeColor: "amber",
    description: "1 Litro. Primera prensada en frío elaborado en Mendoza. Acidez menor a 0.5%, alto en polifenoles y grasas monoinsaturadas cardiosaludables. Aprobado por la FDA.",
    variants: [
      { label: "Botella 1 Litro", price: 24000, value: "1 Litro" }
    ],
    highlight: "Acidez < 0.5% - Cosecha Mendocina"
  },
  {
    id: "hongos-adaptogenos",
    category: "alimentacion",
    name: "Hongos Adaptógenos en Gotero (FungiArtist)",
    brand: "FungiArtist",
    badge: "Extracto Doble",
    badgeColor: "amber",
    description: "60ml. Tinturas concentradas de doble extracción hidroalcohólica. Regulan el eje del estrés, el descanso o la claridad mental según la especie que elijas. Aprobado por la FDA.",
    variants: [
      { label: "Melena de León (Enfoque)", price: 24000, value: "Melena León" },
      { label: "Cordyceps (Rendimiento)", price: 24000, value: "Cordyceps" },
      { label: "Reishi (Calma / Sueño)", price: 24000, value: "Reishi" },
      { label: "Ashwagandha (Cortisol)", price: 24000, value: "Ashwagandha" },
      { label: "Tremella (Hidratación)", price: 24000, value: "Tremella" }
    ],
    highlight: "Doble extracción concentrada"
  }
];

// 3. Estado Global de la Aplicación y Carrito
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

// 4. Generador de Pictogramas e Identidad Gráfica (Mapeo Trizona: Azul / Esmeralda / Ámbar)
function getProductVisual(product) {
  const theme = CATEGORY_THEMES[product.category] || CATEGORY_THEMES.rendimiento;
  const iconColor = theme.iconColor;
  const strokeColor = theme.strokeColor;
  const shadowRgba = theme.shadowRgba;

  switch (product.id) {
    case "creatina-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 16h28v6H18z" fill="${strokeColor}" fill-opacity="0.15" />
          <rect x="14" y="22" width="36" height="34" rx="6" />
          <path d="M22 34h20M22 42h14" stroke-width="2" opacity="0.6" />
          <path d="M32 26v4M30 28h4" stroke-width="2" />
        </svg>
      `;
    case "pre-work-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="34 8 16 34 32 34 28 56 48 26 32 26 34 8" fill="${strokeColor}" fill-opacity="0.2" />
        </svg>
      `;
    case "proteina-soja-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 14h20l3 42H19l3-42z" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M18 10h28v4H18z" />
          <path d="M29 6h6v4h-6z" />
          <path d="M24 28h16M25 36h14M26 44h12" stroke-width="1.8" opacity="0.5" />
        </svg>
      `;
    case "colageno-c-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="32" r="18" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M24 26l8 12 8-12M32 38v10" />
        </svg>
      `;
    case "omega-3-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="20" y="16" width="24" height="32" rx="12" transform="rotate(-30 32 32)" fill="${strokeColor}" fill-opacity="0.18" />
          <path d="M24 36c4-6 12-6 16 0" opacity="0.6" />
        </svg>
      `;
    case "cmz-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M38 14a18 18 0 1 0 12 28 20 20 0 0 1-12-28z" fill="${strokeColor}" fill-opacity="0.18" />
          <circle cx="44" cy="20" r="2" fill="currentColor" />
          <circle cx="48" cy="30" r="1.5" fill="currentColor" />
        </svg>
      `;
    case "vitamina-d3-k2-nn":
    case "hongos-adaptogenos":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M28 8h8v6h-8z" />
          <path d="M30 14v6h4v-6" />
          <path d="M22 24h20v26a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V24z" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M32 32v12M32 44a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      `;
    case "vitamina-c-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="32" r="18" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M32 20v24M20 32h24" stroke-width="2.5" />
        </svg>
      `;
    case "mix-frutos-secos":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="26" cy="34" rx="12" ry="16" transform="rotate(-15 26 34)" fill="${strokeColor}" fill-opacity="0.18" />
          <ellipse cx="38" cy="32" rx="10" ry="14" transform="rotate(20 38 32)" fill="${strokeColor}" fill-opacity="0.12" />
          <path d="M24 22c2 6 4 14 0 22M38 20c-1 5-2 12 1 18" stroke-width="1.8" opacity="0.6" />
        </svg>
      `;
    case "mix-semillas":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M32 12c-8 10-8 20 0 30 8-10 8-20 0-30z" fill="${strokeColor}" fill-opacity="0.2" />
          <path d="M18 26c-6 7-6 15 0 22 6-7 6-15 0-22z" fill="${strokeColor}" fill-opacity="0.12" />
          <path d="M46 26c-6 7-6 15 0 22 6-7 6-15 0-22z" fill="${strokeColor}" fill-opacity="0.12" />
        </svg>
      `;
    case "cafe-rdc":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <ellipse cx="32" cy="32" rx="16" ry="20" transform="rotate(25 32 32)" fill="${strokeColor}" fill-opacity="0.18" />
          <path d="M26 18c8 4 6 18 14 26" stroke-width="2" />
        </svg>
      `;
    case "miel-juricich":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 18h20v6H22z" />
          <rect x="18" y="24" width="28" height="28" rx="6" fill="${strokeColor}" fill-opacity="0.18" />
          <polygon points="32 32 37 35 37 41 32 44 27 41 27 35" fill="none" stroke="currentColor" stroke-width="1.8" />
        </svg>
      `;
    case "aceite-oliva-libanti":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M28 8h8v6h-8z" />
          <path d="M30 14v6h4v-6" />
          <path d="M24 26l4-6h8l4 6v24a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V26z" fill="${strokeColor}" fill-opacity="0.18" />
          <circle cx="32" cy="38" r="4" fill="${strokeColor}" fill-opacity="0.4" />
        </svg>
      `;
    default:
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="18" y="16" width="28" height="34" rx="6" fill="${strokeColor}" fill-opacity="0.18" />
          <path d="M24 10h16v6H24z" />
          <path d="M32 26v14M25 33h14" />
        </svg>
      `;
  }
}

// 5. Renderizado del Catálogo de Productos con Mapeo de 3 Colores
function renderCatalog() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filteredProducts = state.activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === state.activeCategory);

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-neutral-500 font-sans">
        No se encontraron productos en esta categoría.
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map((product) => {
    const selectedVarIndex = state.selectedVariants[product.id] || 0;
    const currentVariant = product.variants[selectedVarIndex];
    const theme = CATEGORY_THEMES[product.category] || CATEGORY_THEMES.rendimiento;

    // Botón principal de llamada a la acción ("Agregar"): Azul Eléctrico sólido y ergonómico
    const btnClass = "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20";
    const hasMultipleVariants = product.variants.length > 1;

    return `
      <article
        class="product-card group relative bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/[0.08] ${theme.cardHoverBorder} rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 overflow-hidden backdrop-blur-sm cursor-pointer select-none"
        data-product-id="${product.id}"
      >
        <div>
          <!-- Header de Card: Brand & Badge de Categoría con Color Semántico -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-outfit text-[11px] uppercase tracking-wider font-bold text-neutral-400">${product.brand}</span>
            <span class="font-outfit px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${theme.badgeClass}">
              ${product.badge}
            </span>
          </div>

          <!-- Contenedor Visual con Halo Lumínico y Pictograma -->
          <div class="relative w-full h-40 rounded-2xl bg-neutral-950/80 border border-white/[0.05] flex items-center justify-center overflow-hidden mb-4 group-hover:border-white/[0.12] transition-colors">
            <div class="absolute inset-0 bg-radial ${theme.haloClass} via-transparent to-transparent opacity-80 pointer-events-none"></div>
            <div class="transform transition-transform duration-500 group-hover:scale-110">
              ${getProductVisual(product)}
            </div>
          </div>

          <!-- Título del Producto (Outfit) -->
          <h3 class="font-outfit text-xl font-bold text-neutral-50 mb-1.5 leading-snug ${theme.cardTitleHover} transition-colors">
            ${product.name}
          </h3>

          <!-- Descripción (Lato) -->
          <p class="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
            ${product.description}
          </p>

          <!-- Highlight / Beneficio Técnico -->
          <div class="inline-flex items-center gap-1.5 text-[11px] font-semibold ${theme.highlightClass} border px-2.5 py-1 rounded-lg mb-4 w-fit">
            <svg class="w-3.5 h-3.5 ${theme.checkIconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>${product.highlight}</span>
          </div>
        </div>

        <div>
          <!-- Selector Táctil de Variantes (Pill Switchers con estilo de Categoría) -->
          ${hasMultipleVariants ? `
            <div class="space-y-1.5 mb-4 pt-3 border-t border-white/[0.06]">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-outfit">Elegir presentación:</span>
              <div class="grid grid-cols-${product.variants.length > 2 ? '3' : '2'} gap-1.5 variant-pill-group" data-product-id="${product.id}">
                ${product.variants.map((v, idx) => {
                  const isSelected = idx === selectedVarIndex;
                  return `
                    <button
                      type="button"
                      class="variant-pill py-1.5 px-2 rounded-lg text-[11px] sm:text-xs text-center border transition-all font-outfit truncate ${isSelected ? theme.pillActive : theme.pillInactive}"
                      data-product-id="${product.id}"
                      data-variant-idx="${idx}"
                      title="${v.label}"
                    >
                      ${v.value || v.label}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          ` : `
            <div class="text-xs text-neutral-400 mb-4 pt-3 border-t border-white/[0.06] font-medium font-sans">
              Presentación: <span class="text-neutral-200 font-semibold">${currentVariant.label}</span>
            </div>
          `}

          <!-- Footer de Card: Precio y Botón Agregar en Azul Eléctrico -->
          <div class="flex items-end justify-between gap-3 pt-2">
            <div>
              <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-500 font-sans">Precio Lista</span>
              <span class="font-sans font-bold text-2xl text-neutral-50 tracking-tight leading-none" id="price-${product.id}">
                ${formatPrice(currentVariant.price)}
              </span>
            </div>

            <button
              type="button"
              class="btn-add-cart inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl ${btnClass} font-sans font-semibold text-xs whitespace-nowrap transition-all shadow-lg active:scale-95"
              data-product-id="${product.id}"
              aria-label="Agregar ${product.name} al pedido"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

// 6. Manejo de Eventos del Catálogo (Pill Switchers, Agregar, Modal)
function attachProductEvents() {
  // Selector táctil de variantes (Pill Switchers)
  document.querySelectorAll(".variant-pill").forEach((pill) => {
    pill.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita abrir el modal al clickear una variante
      const productId = pill.getAttribute("data-product-id");
      const variantIdx = parseInt(pill.getAttribute("data-variant-idx"), 10);
      state.selectedVariants[productId] = variantIdx;

      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      const theme = CATEGORY_THEMES[product.category] || CATEGORY_THEMES.rendimiento;

      // Actualizar estilos activos de todos los pills del producto
      const group = pill.closest(".variant-pill-group");
      if (group) {
        group.querySelectorAll(".variant-pill").forEach((btn) => {
          const btnIdx = parseInt(btn.getAttribute("data-variant-idx"), 10);
          if (btnIdx === variantIdx) {
            btn.className = `variant-pill py-1.5 px-2 rounded-lg text-[11px] sm:text-xs text-center border transition-all font-outfit truncate ${theme.pillActive}`;
          } else {
            btn.className = `variant-pill py-1.5 px-2 rounded-lg text-[11px] sm:text-xs text-center border transition-all font-outfit truncate ${theme.pillInactive}`;
          }
        });
      }

      // Actualizar precio en la card
      const priceEl = document.getElementById(`price-${productId}`);
      if (priceEl) {
        priceEl.textContent = formatPrice(product.variants[variantIdx].price);
      }
    });
  });

  // Botón "Agregar" con microinteracción visual
  document.querySelectorAll(".btn-add-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita abrir el modal
      const targetBtn = e.currentTarget;
      const productId = targetBtn.getAttribute("data-product-id");

      addToCart(productId);

      // Microinteracción en el botón
      const originalHTML = targetBtn.innerHTML;
      targetBtn.innerHTML = `
        <svg class="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        <span class="whitespace-nowrap">¡Agregado!</span>
      `;
      targetBtn.classList.remove("bg-blue-600");
      targetBtn.classList.add("bg-blue-500");
      setTimeout(() => {
        targetBtn.innerHTML = originalHTML;
        targetBtn.classList.remove("bg-blue-500");
        targetBtn.classList.add("bg-blue-600");
      }, 900);
    });
  });

  // Click en la tarjeta del producto para abrir Modal Aislado
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-add-cart") || e.target.closest(".variant-pill")) {
        return;
      }
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    });
  });
}

// 7. Gestión del Carrito (Acciones)
function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const variantIdx = state.selectedVariants[productId] || 0;
  const variant = product.variants[variantIdx];

  // Identificador único por producto y variante seleccionada
  const cartItemId = `${product.id}-${variant.value}`;
  const existingItemIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId);

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += 1;
  } else {
    state.cart.push({
      cartItemId,
      id: product.id,
      category: product.category,
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

function clearCart() {
  state.cart = [];
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Error al vaciar carrito:", e);
  }
  updateCartBadge();
  renderCartDrawer();
}

// Microanimación en el badge de navegación
function triggerCartAnimation() {
  const badge = document.getElementById("cart-badge");
  const btn = document.getElementById("open-cart-btn");
  if (badge) {
    badge.classList.remove("cart-bump");
    void badge.offsetWidth; // Forzar reflujo
    badge.classList.add("cart-bump");
  }
  if (btn) {
    btn.classList.add("border-blue-500/60");
    setTimeout(() => btn.classList.remove("border-blue-500/60"), 400);
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

// 8. Drawer y Modal del Carrito
function openDrawer() {
  state.isDrawerOpen = true;
  const drawer = document.getElementById("cart-drawer");
  const backdrop = document.getElementById("cart-backdrop");
  const panel = document.getElementById("cart-panel");

  if (!drawer || !backdrop || !panel) return;

  drawer.classList.remove("pointer-events-none");
  backdrop.classList.remove("opacity-0", "pointer-events-none");
  backdrop.classList.add("opacity-100", "pointer-events-auto");
  panel.classList.remove("translate-x-full", "pointer-events-none");
  panel.classList.add("translate-x-0", "pointer-events-auto");
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
  panel.classList.remove("translate-x-0", "pointer-events-auto");
  panel.classList.add("translate-x-full", "pointer-events-none");
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

  itemsContainer.innerHTML = state.cart.map((item) => {
    const catBorder = item.category === "salud"
      ? "border-l-2 border-emerald-500"
      : (item.category === "alimentacion" ? "border-l-2 border-amber-500" : "border-l-2 border-blue-500");

    return `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-neutral-950/80 rounded-2xl border border-white/[0.08] ${catBorder}">
        <div class="flex-1 min-w-0">
          <h4 class="font-outfit text-sm font-bold text-neutral-100 truncate">${item.name}</h4>
          <span class="text-xs text-neutral-400 block font-sans">${item.selectedVariant.label}</span>
          <span class="font-outfit text-xs font-black text-blue-400 mt-1 block">
            ${formatPrice(item.selectedVariant.price)} c/u
          </span>
        </div>

        <!-- Controles de Cantidad -->
        <div class="flex items-center gap-1.5 bg-neutral-900 border border-white/[0.08] rounded-xl p-1">
          <button type="button" class="btn-qty-minus w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.08] transition" data-cart-id="${item.cartItemId}" aria-label="Disminuir cantidad">
            -
          </button>
          <span class="font-outfit text-xs font-bold text-neutral-100 px-1.5 min-w-[1.25rem] text-center">${item.quantity}</span>
          <button type="button" class="btn-qty-plus w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded-lg hover:bg-white/[0.08] transition" data-cart-id="${item.cartItemId}" aria-label="Aumentar cantidad">
            +
          </button>
        </div>

        <!-- Botón Eliminar -->
        <button type="button" class="btn-remove-item text-neutral-500 hover:text-red-400 p-1.5 rounded-lg transition hover:bg-white/[0.05]" data-cart-id="${item.cartItemId}" aria-label="Eliminar producto">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    `;
  }).join("");

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
}

// 9. Modal de Producto Aislado
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
  card.classList.remove("scale-95", "pointer-events-none");
  card.classList.add("scale-100", "pointer-events-auto");
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
  card.classList.remove("scale-100", "pointer-events-auto");
  card.classList.add("scale-95", "pointer-events-none");

  if (!state.isDrawerOpen) {
    document.body.classList.remove("overflow-hidden");
  }
}

function renderProductModal(product) {
  const body = document.getElementById("product-modal-body");
  if (!body) return;

  const selectedVarIndex = state.selectedVariants[product.id] || 0;
  const currentVariant = product.variants[selectedVarIndex];
  const theme = CATEGORY_THEMES[product.category] || CATEGORY_THEMES.rendimiento;

  const btnClass = "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25";
  const hasMultipleVariants = product.variants.length > 1;

  body.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
      <!-- Contenedor Visual con Halo de Categoría -->
      <div class="aspect-square w-full bg-neutral-950/80 rounded-3xl flex flex-col items-center justify-center border border-white/[0.08] shadow-inner select-none p-6 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-radial ${theme.haloClass} via-transparent to-transparent opacity-80 pointer-events-none"></div>
        <div class="transform scale-125">
          ${getProductVisual(product)}
        </div>
        <span class="font-outfit uppercase tracking-widest text-[11px] font-bold text-neutral-400 mt-6 block">
          ${product.brand}
        </span>
      </div>

      <!-- Información Completa -->
      <div class="flex flex-col justify-between h-full space-y-4">
        <div>
          <!-- Marca y Badge -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="font-outfit text-xs uppercase tracking-wider font-bold text-neutral-400">${product.brand}</span>
            <span class="font-outfit inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badgeClass}">
              ${product.badge}
            </span>
          </div>

          <!-- Nombre del producto -->
          <h2 id="modal-product-name" class="font-outfit text-xl sm:text-2xl font-bold text-neutral-100 leading-snug mb-3">
            ${product.name}
          </h2>

          <!-- Highlight -->
          <div class="inline-flex items-center gap-1.5 text-xs font-semibold ${theme.highlightClass} px-2.5 py-1 rounded-lg mb-4 border">
            <span class="${theme.checkIconColor}">✓</span>
            <span>${product.highlight}</span>
          </div>

          <!-- Descripción completa -->
          <div class="text-sm text-neutral-300 leading-relaxed space-y-2 mb-4 font-sans font-normal">
            <p>${product.description}</p>
          </div>
        </div>

        <div class="pt-4 border-t border-white/[0.08]">
          <!-- Selector Táctil de Variantes en Modal -->
          ${hasMultipleVariants ? `
            <div class="mb-4">
              <label class="block font-outfit text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Elegir presentación:</label>
              <div class="grid grid-cols-${product.variants.length > 2 ? '3' : '2'} gap-2 modal-pill-group" data-product-id="${product.id}">
                ${product.variants.map((v, idx) => {
                  const isSelected = idx === selectedVarIndex;
                  return `
                    <button
                      type="button"
                      class="modal-variant-pill py-2 px-2.5 rounded-xl text-xs text-center border transition-all font-outfit truncate ${isSelected ? theme.pillActive : theme.pillInactive}"
                      data-product-id="${product.id}"
                      data-variant-idx="${idx}"
                    >
                      ${v.value || v.label}
                    </button>
                  `;
                }).join("")}
              </div>
            </div>
          ` : `
            <div class="text-xs text-neutral-400 mb-4 font-medium font-sans">
              Presentación: <span class="text-neutral-200 font-semibold">${currentVariant.label}</span>
            </div>
          `}

          <!-- Precio y Botón Agregar "Agregar al Pedido" en Azul Eléctrico -->
          <div class="flex items-center justify-between gap-3 pt-2">
            <div class="shrink-0">
              <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-500 font-sans">Precio Lista</span>
              <span class="font-sans font-bold text-2xl text-neutral-50" id="modal-price-${product.id}">
                ${formatPrice(currentVariant.price)}
              </span>
            </div>

            <button
              type="button"
              id="modal-add-cart-btn"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl ${btnClass} font-sans font-semibold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all shadow-lg active:scale-95"
              data-product-id="${product.id}"
            >
              <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              <span>Agregar al Pedido</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Listener para los pills dentro del modal
  const modalPillGroup = body.querySelector(".modal-pill-group");
  if (modalPillGroup) {
    modalPillGroup.querySelectorAll(".modal-variant-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const variantIdx = parseInt(pill.getAttribute("data-variant-idx"), 10);
        state.selectedVariants[product.id] = variantIdx;

        // Actualizar visual de pills en modal
        modalPillGroup.querySelectorAll(".modal-variant-pill").forEach((btn) => {
          const btnIdx = parseInt(btn.getAttribute("data-variant-idx"), 10);
          if (btnIdx === variantIdx) {
            btn.className = `modal-variant-pill py-2 px-2.5 rounded-xl text-xs text-center border transition-all font-outfit truncate ${theme.pillActive}`;
          } else {
            btn.className = `modal-variant-pill py-2 px-2.5 rounded-xl text-xs text-center border transition-all font-outfit truncate ${theme.pillInactive}`;
          }
        });

        // Actualizar precio en modal
        const modalPrice = document.getElementById(`modal-price-${product.id}`);
        if (modalPrice) {
          modalPrice.textContent = formatPrice(product.variants[variantIdx].price);
        }

        // Sincronizar en la tarjeta del catálogo
        const cardGroup = document.querySelector(`.variant-pill-group[data-product-id="${product.id}"]`);
        if (cardGroup) {
          cardGroup.querySelectorAll(".variant-pill").forEach((btn) => {
            const btnIdx = parseInt(btn.getAttribute("data-variant-idx"), 10);
            if (btnIdx === variantIdx) {
              btn.className = `variant-pill py-1.5 px-2 rounded-lg text-[11px] sm:text-xs text-center border transition-all font-outfit truncate ${theme.pillActive}`;
            } else {
              btn.className = `variant-pill py-1.5 px-2 rounded-lg text-[11px] sm:text-xs text-center border transition-all font-outfit truncate ${theme.pillInactive}`;
            }
          });
        }
        const cardPrice = document.getElementById(`price-${product.id}`);
        if (cardPrice) {
          cardPrice.textContent = formatPrice(product.variants[variantIdx].price);
        }
      });
    });
  }

  // Listener para botón agregar en modal
  const modalAddBtn = document.getElementById("modal-add-cart-btn");
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", () => {
      addToCart(product.id);
      const originalHTML = modalAddBtn.innerHTML;
      modalAddBtn.innerHTML = `
        <svg class="w-4 h-4 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
        <span class="whitespace-nowrap">¡Agregado al Pedido!</span>
      `;
      modalAddBtn.classList.remove("bg-blue-600");
      modalAddBtn.classList.add("bg-blue-500");
      setTimeout(() => {
        modalAddBtn.innerHTML = originalHTML;
        modalAddBtn.classList.remove("bg-blue-500");
        modalAddBtn.classList.add("bg-blue-600");
      }, 900);
    });
  }
}

// 10. Serializador Oficial a WhatsApp según dev-brief.md
function buildWhatsAppLink(cartItems, formData) {
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

// 11. Inicialización General y Listeners Globales
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderCatalog();

  // Filtros de Categorías (Dock Switcher de 3 Categorías)
  const filterButtons = document.querySelectorAll(".category-tab");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const category = e.currentTarget.getAttribute("data-category");
      state.activeCategory = category;

      // Resetear estilos de todos los botones de filtro
      filterButtons.forEach((b) => {
        b.className = "category-tab px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all bg-transparent text-neutral-400 font-medium hover:text-white hover:bg-white/[0.04] font-outfit";
      });

      // Aplicar color activo correspondiente
      if (category === "salud") {
        e.currentTarget.className = "category-tab px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/25 font-outfit";
      } else if (category === "alimentacion") {
        e.currentTarget.className = "category-tab px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all bg-amber-600 text-white font-bold shadow-md shadow-amber-600/25 font-outfit";
      } else {
        // "rendimiento" o "all"
        e.currentTarget.className = "category-tab px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all bg-blue-600 text-white font-bold shadow-md shadow-blue-600/25 font-outfit";
      }

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

  // Vaciar Carrito
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);

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
            otherBtn.nextElementSibling.classList.add("hidden", "pointer-events-none");
            otherBtn.nextElementSibling.classList.remove("pointer-events-auto");
          }
          const otherIcon = otherBtn.querySelector(".faq-icon");
          if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
        }
      });

      // Alternar actual
      if (isExpanded) {
        btn.setAttribute("aria-expanded", "false");
        content.classList.add("hidden", "pointer-events-none");
        content.classList.remove("pointer-events-auto");
        if (icon) icon.style.transform = "rotate(0deg)";
      } else {
        btn.setAttribute("aria-expanded", "true");
        content.classList.remove("hidden", "pointer-events-none");
        content.classList.add("pointer-events-auto");
        if (icon) icon.style.transform = "rotate(180deg)";
      }
    });
  });
});
