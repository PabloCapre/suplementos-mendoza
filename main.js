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
    strokeColor: "#d97706",
    shadowRgba: "rgba(217,119,6,0.25)"
  }
};

// 2. Arquitectura de Catálogo Dinámico con Google Sheets DB
const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBrNhGexyD4c1axzU9uvzUWfalYSPNPGz_NMf8NEXOrtIB0HkNuSPrl1jBoO0ps8RgN4md4Xg6zCGd/pub?gid=0&single=true&output=csv";

// Definiciones maestras de productos, metadatos y mapeo de presentaciones al Sheet
const PRODUCT_DEFINITIONS = [
  // RENDIMIENTO & FUERZA
  {
    id: 'creatina',
    nombre: 'Creatina Monohidrato Pura',
    categoria: 'Rendimiento & Fuerza',
    imagen: 'assets/productos/creatina.webp',
    descripcion: '100% monohidrato micronizado. Fuerza extrema y potencia sin retención hídrica. Pureza >99.85%, avalada por el <a href="https://www.instagram.com/p/DDhoT2gx5qB/" target="_blank" class="text-blue-400 underline">Proyecto Suplementos</a>.',
    presentaciones: [
      { nombre: '600g', sheetMatch: ['CREATINA 600'], precio: 49000 },
      { nombre: '350g', sheetMatch: ['CREATINA 350'], precio: 33000 },
      { nombre: '150g', sheetMatch: ['CREATINA 150'], precio: 16500 }
    ]
  },
  {
    id: 'proteina-vegetal',
    nombre: 'Proteína Vegetal Aislada',
    categoria: 'Rendimiento & Fuerza',
    imagen: 'assets/productos/proteina-cookies.webp',
    descripcion: '25g de proteína aislada y 3.8g de BCAAs por porción. Cero azúcares. Digestión ultra liviana para una recuperación muscular impecable.',
    presentaciones: [
      { nombre: '907g (Cookies)', sheetMatch: ['PROTEINA COOKIES AND CREAM', 'PROTEINA COOKIES'], precio: 47800 },
      { nombre: '907g (Milkshake)', sheetMatch: ['PROTEINA MILK SHAKE', 'PROTEINA MILKSHAKE'], precio: 47800, imagen: 'assets/productos/proteina-milk-shake.webp' }
    ]
  },
  {
    id: 'pre-work',
    nombre: 'Pre-Work Explosivo',
    categoria: 'Rendimiento & Fuerza',
    imagen: 'assets/productos/prework.webp',
    descripcion: 'Energía explosiva y enfoque total. Beta-alanina, Taurina y Cafeína para romper tus límites y retrasar la fatiga extrema.',
    presentaciones: [
      { nombre: '300g (Limón)', sheetMatch: ['PREWORK LIMON', 'PRE-WORK LIMON'], precio: 34300 },
      { nombre: '300g (Bosque)', sheetMatch: ['PREWORK FRUTOS DEL BOSQUE', 'PREWORK BOSQUE'], precio: 34300 }
    ]
  },
  {
    id: 'beta-alanina',
    nombre: 'Beta Alanina Pura',
    categoria: 'Rendimiento & Fuerza',
    imagen: 'assets/productos/betaalanina.webp',
    descripcion: 'El aliado estratégico para entrenar al fallo. Retrasa la fatiga láctica y maximiza la resistencia en rutinas de alta intensidad.',
    presentaciones: [
      { nombre: '150g', sheetMatch: ['BETA-ALANINA 150G', 'BETA-ALANINA', 'BETA ALANINA'], precio: 16800 }
    ]
  },
  // SALUD & LONGEVIDAD
  {
    id: 'omega-3',
    nombre: 'Omega 3 (IFOS 5-Star)',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/omega3.webp',
    descripcion: 'Certificación internacional IFOS. Máxima pureza en EPA (360mg) y DHA (240mg) para blindar tu salud cardiovascular y cognitiva.',
    presentaciones: [
      { nombre: '60 Cápsulas', sheetMatch: ['OMEGA 3'], precio: 36900 }
    ]
  },
  {
    id: 'calcio-magnesio-zinc',
    nombre: 'Calcio, Magnesio, Zinc + D3',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/CMZ.webp',
    descripcion: 'El complejo mineral definitivo. Soporte estructural clave para salud ósea, articular y bienestar integral bajo alta demanda física.',
    presentaciones: [
      { nombre: 'Cápsulas', sheetMatch: ['CMZ', 'CALCIO MAGNESIO ZINC'], precio: 24000 }
    ]
  },
  {
    id: 'vitamina-c',
    nombre: 'Vitamina C 1000mg',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/vitaminaC.webp',
    descripcion: '1000mg de defensa antioxidante pura. Refuerza tu sistema inmunológico y combate el estrés oxidativo post-entrenamiento.',
    presentaciones: [
      { nombre: '30 Cápsulas', sheetMatch: ['VITAMINA C'], precio: 18200 }
    ]
  },
  {
    id: 'colageno-hidrolizado',
    nombre: 'Colágeno Hidrolizado + Vit C',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/colageno-hidrolizado.webp',
    descripcion: 'Péptidos hidrolizados optimizados. Protección articular profunda, recuperación de cartílagos y máxima elasticidad de los tejidos.',
    presentaciones: [
      { nombre: '300g (Arándanos)', sheetMatch: ['COLAGENO ARANDANOS'], precio: 36500 },
      { nombre: '300g (Naranja)', sheetMatch: ['COLAGENO NARANJA'], precio: 36500 }
    ]
  },
  {
    id: 'glutamina',
    nombre: 'L-Glutamina Pura',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/glutamina.webp',
    descripcion: '5g de aminoácido clave por porción. Frena el catabolismo muscular y acelera drásticamente la recuperación tras el esfuerzo.',
    presentaciones: [
      { nombre: '150g', sheetMatch: ['GLUTAMINA 150G', 'GLUTAMINA'], precio: 16800 }
    ]
  },
  {
    id: 'cla-1000',
    nombre: 'CLA 1000',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/cla.webp',
    descripcion: 'Ácido Linoleico Conjugado. Tu complemento metabólico estratégico para etapas de definición y recomposición corporal.',
    presentaciones: [
      { nombre: 'Cápsulas blandas', sheetMatch: ['CLA'], precio: 25500 }
    ]
  },
  {
    id: 'vitamina-d3-k2',
    nombre: 'Vitamina D3 + K2 (MK-7)',
    categoria: 'Salud & Longevidad',
    imagen: 'assets/productos/vitaminad3k2.webp',
    descripcion: 'Fórmula sinérgica de 4000 UI D3 + K2 MK-7. Garantiza la absorción del calcio y su correcta fijación directa en el tejido óseo.',
    presentaciones: [
      { nombre: 'Cápsulas blandas', sheetMatch: ['VITAMINA D3K2', 'VITAMINA D3 K2'], precio: 24900 }
    ]
  },
  // ALIMENTACIÓN INTELIGENTE
  {
    id: 'cafe-rdc',
    nombre: 'Café RDC Colombia',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/cafe-rdc.webp',
    descripcion: 'Café de especialidad origen Colombia. Energía limpia, intensa y sin caídas abruptas para dominar el arranque del día.',
    presentaciones: [
      { nombre: '500g', sheetMatch: ['CAFE RDC COLOMBIA 500G', 'CAFE RDC COLOMBIA', 'CAFE RDC'], precio: 29800 }
    ]
  },
  {
    id: 'aceite-oliva',
    nombre: 'Aceite de Oliva Libanti',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/aceite-libanti.webp',
    descripcion: 'Extra virgen prensado en frío. Fuente suprema de grasas saludables esenciales para optimizar tu entorno hormonal y cardiovascular.',
    presentaciones: [
      { nombre: '1L', sheetMatch: ['ACEITE DE OLIVA LIBANTI EXTRA VIRGEN 1L', 'ACEITE DE OLIVA LIBANTI', 'ACEITE DE OLIVA'], precio: 24000 }
    ]
  },
  {
    id: 'mix-frutos-secos',
    nombre: 'Mix de Frutos Secos',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/frutos-secos.webp',
    descripcion: 'Selección premium natural. Densidad nutricional pura, sin agregados, para mantener energía y saciedad a lo largo de la jornada.',
    presentaciones: [
      { nombre: 'Estándar', sheetMatch: ['MIX FRUTOS SECOS'], precio: 22000 }
    ]
  },
  {
    id: 'hongos-adaptogenos',
    nombre: 'Hongos Adaptógenos FungiArt',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/adaptogenos.webp',
    descripcion: 'Extractos funcionales puros. Energía adaptógena y enfoque mental sostenido sin alterar negativamente el sistema nervioso.',
    presentaciones: [
      { nombre: 'Cordyceps 60ml', sheetMatch: ['HONGOS ADAPTOGENOS FUNGIART 60ML CORDYCEPS', 'CORDYCEPS'], precio: 24000 },
      { nombre: 'Melena de León 60ml', sheetMatch: ['HONGOS ADAPTOGENOS FUNGIART 60ML MELENA DE LEON', 'MELENA DE LEON'], precio: 24000 },
      { nombre: 'Reishi 60ml', sheetMatch: ['HONGOS ADAPTOGENOS FUNGIART 60ML REISHI', 'REISHI'], precio: 24000 },
      { nombre: 'Tremella 60ml', sheetMatch: ['HONGOS ADAPTOGENOS FUNGIART 60ML TREMELLA', 'TREMELLA'], precio: 24000 },
      { nombre: 'Ashwagandha 60ml', sheetMatch: ['HONGOS ADAPTOGENOS FUNGIART 60ML ASHWAGANDHA', 'ASHWAGANDHA'], precio: 24000 }
    ]
  },
  {
    id: 'miel-juricich',
    nombre: 'Miel Pura Juricich',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/miel.webp',
    descripcion: 'Miel cruda 100% pura. El carbohidrato de rápida asimilación ideal para tus pre-entrenos y reposición de glucógeno.',
    presentaciones: [
      { nombre: '950g', sheetMatch: ['MIEL PURA JURICICH 950G', 'MIEL PURA JURICICH', 'MIEL PURA'], precio: 9900 }
    ]
  },
  {
    id: 'mix-personalizado',
    nombre: 'Mix Personalizado',
    categoria: 'Alimentación Inteligente',
    imagen: 'assets/productos/frutos-secos.webp',
    descripcion: 'Nutrición a tu medida exacta. Diseñamos el balance de frutos e ingredientes que se ajusta perfectamente a tus macros.',
    presentaciones: [
      { nombre: 'A medida', sheetMatch: ['MIX PERSONALIZADO'], precio: 'Consultar' }
    ]
  }
];

// Estado dinámico del catálogo poblado desde Google Sheets DB
let productos = [];
let PRODUCTS = productos;

/**
 * Parsea el CSV devuelto por Google Sheets separando por comas y filas
 */
function parseCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toUpperCase());
  const prodIdx = headers.indexOf("PRODUCTO") !== -1 ? headers.indexOf("PRODUCTO") : 0;
  const priceIdx = headers.indexOf("PRECIO") !== -1 ? headers.indexOf("PRECIO") : 1;
  const stockIdx = headers.indexOf("STOCK") !== -1 ? headers.indexOf("STOCK") : 2;

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = [];
    let current = "";
    let inQuotes = false;
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        cols.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    cols.push(current.trim());

    const rawProd = (cols[prodIdx] || "").trim();
    const rawPrice = (cols[priceIdx] || "").trim();
    const rawStock = (cols[stockIdx] || "").trim().toUpperCase();

    let precio = rawPrice;
    const cleanNum = rawPrice.replace(/[^0-9]/g, "");
    if (cleanNum !== "" && !isNaN(cleanNum)) {
      precio = parseInt(cleanNum, 10);
    } else if (rawPrice.toUpperCase() === "CONSULTAR") {
      precio = "Consultar";
    }

    const inStock = rawStock === "OK";

    rows.push({
      producto: rawProd,
      precio: precio,
      stock: rawStock,
      inStock: inStock
    });
  }

  return rows;
}

/**
 * Deduce categoría aproximada para filas dinámicas no mapeadas de Google Sheets
 */
function guessCategory(name) {
  const n = (name || "").toLowerCase();
  if (n.includes("creatina") || n.includes("proteina") || n.includes("prework") || n.includes("beta") || n.includes("fuerza")) {
    return "Rendimiento & Fuerza";
  }
  if (n.includes("miel") || n.includes("cafe") || n.includes("aceite") || n.includes("frutos") || n.includes("hongo") || n.includes("mix")) {
    return "Alimentación Inteligente";
  }
  return "Salud & Longevidad";
}

/**
 * Construye el catálogo final asociando filas de Google Sheets con las definiciones maestras
 */
function buildCatalogFromCSV(rows) {
  const matchedRowIndices = new Set();
  const catalog = [];

  PRODUCT_DEFINITIONS.forEach((def) => {
    const productCopy = {
      id: def.id,
      nombre: def.nombre,
      categoria: def.categoria,
      imagen: def.imagen,
      descripcion: def.descripcion,
      presentaciones: []
    };

    let anyInStock = false;

    def.presentaciones.forEach((pres) => {
      // Buscar en las filas del CSV por sheetMatch
      const matchedRowIndex = rows.findIndex((r, idx) => {
        if (matchedRowIndices.has(idx)) return false;
        const normName = r.producto.toUpperCase().trim();
        return pres.sheetMatch.some((sm) => {
          const normSm = sm.toUpperCase().trim();
          return normName === normSm || normName.includes(normSm);
        });
      });

      if (matchedRowIndex !== -1) {
        matchedRowIndices.add(matchedRowIndex);
        const row = rows[matchedRowIndex];
        const presCopy = {
          nombre: pres.nombre,
          precio: row.precio,
          inStock: row.inStock
        };
        if (pres.imagen) presCopy.imagen = pres.imagen;
        productCopy.presentaciones.push(presCopy);
        if (row.inStock) anyInStock = true;
      } else {
        productCopy.presentaciones.push({
          nombre: pres.nombre,
          precio: pres.precio,
          inStock: true
        });
        anyInStock = true;
      }
    });

    productCopy.inStock = anyInStock;
    catalog.push(productCopy);
  });

  // Procesar filas adicionales creadas directamente en Google Sheets
  rows.forEach((row, idx) => {
    if (!matchedRowIndices.has(idx)) {
      const slug = row.producto.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      catalog.push({
        id: `sheet-${slug}-${idx}`,
        nombre: row.producto,
        categoria: guessCategory(row.producto),
        imagen: null,
        descripcion: "Producto incorporado desde Google Sheets DB.",
        presentaciones: [
          {
            nombre: "Presentación única",
            precio: row.precio,
            inStock: row.inStock
          }
        ],
        inStock: row.inStock
      });
    }
  });

  return catalog;
}

/**
 * Conexión Fetch a Google Sheets DB con parseo CSV, inyección dinámica y manejo de errores de red
 */
async function fetchCatalogFromGoogleSheets() {
  const container = document.getElementById("products-grid");
  if (container) {
    container.innerHTML = `
      <div class="col-span-full py-20 flex flex-col items-center justify-center text-center">
        <div class="relative flex items-center justify-center w-12 h-12 mb-4">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40"></span>
          <span class="relative inline-flex rounded-full h-9 w-9 bg-blue-600/20 border border-blue-500/40 items-center justify-center text-blue-400">
            <svg class="animate-spin w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        </div>
        <p class="font-outfit text-sm font-bold text-neutral-200">Sincronizando Catálogo Oficial</p>
        <p class="font-sans text-xs text-neutral-400 mt-1">Conectando en vivo con Google Sheets DB...</p>
      </div>
    `;
  }

  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error(`Error de respuesta HTTP: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (!rows || rows.length === 0) {
      throw new Error("El archivo CSV devuelto no contiene filas válidas de productos.");
    }

    // Actualizar catálogo global reactivo
    productos = buildCatalogFromCSV(rows);
    PRODUCTS = productos;
    window.productos = productos;
    window.PRODUCTS = productos;

    // Inicializar variantes seleccionadas en posición 0
    productos.forEach((p) => {
      if (state.selectedVariants[p.id] === undefined) {
        state.selectedVariants[p.id] = 0;
      }
    });

    // Renderizar tarjetas en el DOM con las clases exactas
    renderCatalog();
  } catch (error) {
    console.error("Error al cargar el catálogo desde Google Sheets DB:", error);
    if (container) {
      container.innerHTML = `
        <div class="col-span-full py-14 px-6 rounded-3xl bg-neutral-900/80 border border-red-500/30 text-center backdrop-blur-md max-w-lg mx-auto my-6 shadow-2xl">
          <div class="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-4 border border-red-500/20">
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="font-outfit text-xl font-bold text-neutral-100">No se pudo cargar el catálogo</h3>
          <p class="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed font-sans">
            Ocurrió un error al sincronizar con la base de datos de productos (Google Sheets DB). Por favor reintentá la conexión o escribinos por WhatsApp para solicitar la lista de precios y stock actualizada.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onclick="fetchCatalogFromGoogleSheets()"
              class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-semibold transition shadow-lg shadow-blue-600/25 active:scale-95"
            >
              Reintentar Conexión
            </button>
            <a
              href="https://wa.me/5492613364201?text=Hola!%20No%20se%20pudo%20cargar%20el%20cat%C3%A1logo%20en%20la%20web,%20%C2%BFme%20pasan%20la%20lista%20de%20precios%20y%20stock?"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 font-sans text-xs font-semibold transition"
            >
              Consultar por WhatsApp 💬
            </a>
          </div>
        </div>
      `;
    }
  }
}
window.fetchCatalogFromGoogleSheets = fetchCatalogFromGoogleSheets;

// Mapeo semántico de categorías al slug de la UI
function getCategoryKey(categoria) {
  if (!categoria) return "rendimiento";
  const cat = categoria.toLowerCase();
  if (cat.includes("aliment") || cat.includes("inteligente")) return "alimentacion";
  if (cat.includes("salud") || cat.includes("longevidad")) return "salud";
  return "rendimiento";
}

// Metadata complementaria para diseño visual y badges
const PRODUCT_METADATA = {
  creatina: { brand: "Natural Nutrition", badge: "Más Vendido", highlight: "Pureza > 99.85%" },
  'proteina-vegetal': { brand: "Natural Nutrition", badge: "Proteína Limpia", highlight: "25g Proteína - 0% Azúcar" },
  'pre-work': { brand: "Natural Nutrition", badge: "Energía Limpia", highlight: "Beta-Alanina + Taurina + Cafeína" },
  'beta-alanina': { brand: "Natural Nutrition", badge: "Resistencia", highlight: "Retrasa fatiga muscular" },
  'colageno-hidrolizado': { brand: "Natural Nutrition", badge: "Articulaciones & Piel", highlight: "Colágeno + Vitamina C" },
  glutamina: { brand: "Natural Nutrition", badge: "Recuperación", highlight: "5g L-Glutamina pura" },
  'omega-3': { brand: "Natural Nutrition", badge: "IFOS 5-Star", highlight: "360mg EPA / 240mg DHA" },
  'calcio-magnesio-zinc': { brand: "Natural Nutrition", badge: "Minerales", highlight: "Calcio + Magnesio + Zinc + D3" },
  'vitamina-c': { brand: "Natural Nutrition", badge: "Inmunidad & Salud", highlight: "1000mg Acción Antioxidante" },
  'cla-1000': { brand: "Natural Nutrition", badge: "Definición", highlight: "Ácido Linoleico Conjugado" },
  'vitamina-d3-k2': { brand: "Natural Nutrition", badge: "Sinergia Ósea", highlight: "4000 UI D3 + 180mcg K2" },
  'cafe-rdc': { brand: "RDC Colombia", badge: "Especialidad", highlight: "Tueste Medio • 100% Arábica" },
  'miel-juricich': { brand: "Juricich", badge: "100% Pura", highlight: "Cosecha Artesanal de Monte" },
  'aceite-oliva': { brand: "Libanti Mendoza", badge: "Extra Virgen", highlight: "Prensado en frío • Acidez < 0.5%" },
  'hongos-adaptogenos': { brand: "FungiArt", badge: "Adaptógenos", highlight: "Extractos Doble Concentración" },
  'mix-frutos-secos': { brand: "Selección Propia", badge: "Nutrición Densa", highlight: "Receta Balanceada en Micronutrientes" },
  'mix-personalizado': { brand: "A Medida", badge: "Personalizado", highlight: "Ajustado a tus requerimientos" }
};

// Helper para procesar dinámicamente el array de objetos presentaciones
function getProductVariants(product) {
  if (product.presentaciones && Array.isArray(product.presentaciones) && product.presentaciones.length > 0) {
    return product.presentaciones.map((p) => {
      if (typeof p === "object" && p !== null) {
        let variantImg = p.imagen || product.imagen || product.image;
        if (!p.imagen && product.id === 'proteina-vegetal' && p.nombre && p.nombre.toLowerCase().includes('milkshake')) {
          variantImg = 'assets/productos/proteina-milk-shake.webp';
        }
        return {
          label: p.nombre,
          value: p.nombre,
          price: p.precio,
          image: variantImg
        };
      }
      return {
        label: String(p),
        value: String(p),
        price: 25000,
        image: product.imagen || product.image
      };
    });
  }
  if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants;
  }
  return [{
    label: 'Única presentación',
    value: 'Única presentación',
    price: 25000,
    image: product.imagen || product.image
  }];
}

// 3. Estado Global de la Aplicación y Carrito
const STORAGE_KEY = "suplementos_mendoza_cart_v1";

let state = {
  cart: [],
  activeCategory: "all",
  isDrawerOpen: false,
  isModalOpen: false,
  selectedVariants: {} // Map de productId -> variantIndex
};

// Formato de Moneda Argentina ($ ARS) / Manejo de precios variables
const formatPrice = (amount) => {
  if (typeof amount === "string") {
    return amount;
  }
  if (typeof amount !== "number" || isNaN(amount)) return "A convenir";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
};

// Inicialización de variantes por defecto en posición [0] (se inicializa dinámicamente con Google Sheets)
(productos || []).forEach((product) => {
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
  const catKey = getCategoryKey(product.categoria || product.category);
  const theme = CATEGORY_THEMES[catKey] || CATEGORY_THEMES.rendimiento;
  const iconColor = theme.iconColor;
  const strokeColor = theme.strokeColor;
  const shadowRgba = theme.shadowRgba;

  switch (product.id) {
    case "creatina":
    case "creatina-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 16h28v6H18z" fill="${strokeColor}" fill-opacity="0.15" />
          <rect x="14" y="22" width="36" height="34" rx="6" />
          <path d="M22 34h20M22 42h14" stroke-width="2" opacity="0.6" />
          <path d="M32 26v4M30 28h4" stroke-width="2" />
        </svg>
      `;
    case "pre-work":
    case "pre-work-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="34 8 16 34 32 34 28 56 48 26 32 26 34 8" fill="${strokeColor}" fill-opacity="0.2" />
        </svg>
      `;
    case "proteina-vegetal":
    case "proteina-soja-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 14h20l3 42H19l3-42z" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M18 10h28v4H18z" />
          <path d="M29 6h6v4h-6z" />
          <path d="M24 28h16M25 36h14M26 44h12" stroke-width="1.8" opacity="0.5" />
        </svg>
      `;
    case "colageno-hidrolizado":
    case "colageno-c-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="32" r="18" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M24 26l8 12 8-12M32 38v10" />
        </svg>
      `;
    case "omega-3":
    case "omega-3-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="20" y="16" width="24" height="32" rx="12" transform="rotate(-30 32 32)" fill="${strokeColor}" fill-opacity="0.18" />
          <path d="M24 36c4-6 12-6 16 0" opacity="0.6" />
        </svg>
      `;
    case "calcio-magnesio-zinc":
    case "cmz-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M38 14a18 18 0 1 0 12 28 20 20 0 0 1-12-28z" fill="${strokeColor}" fill-opacity="0.18" />
          <circle cx="44" cy="20" r="2" fill="currentColor" />
          <circle cx="48" cy="30" r="1.5" fill="currentColor" />
        </svg>
      `;
    case "vitamina-d3-k2":
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
    case "vitamina-c":
    case "vitamina-c-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="32" r="18" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M32 20v24M20 32h24" stroke-width="2.5" />
        </svg>
      `;
    case "beta-alanina":
    case "beta-alanina-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="34 8 16 34 32 34 28 56 48 26 32 26 34 8" fill="${strokeColor}" fill-opacity="0.2" />
        </svg>
      `;
    case "cla-1000":
    case "cla-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="32" cy="32" r="18" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M22 32h20M32 22v20" stroke-width="2" />
        </svg>
      `;
    case "glutamina":
    case "glutamina-nn":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="18" y="18" width="28" height="28" rx="6" fill="${strokeColor}" fill-opacity="0.15" />
          <path d="M26 32h12M32 26v12" stroke-width="2" />
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
    case "aceite-oliva":
    case "aceite-oliva-libanti":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M28 8h8v6h-8z" />
          <path d="M30 14v6h4v-6" />
          <path d="M24 26l4-6h8l4 6v24a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V26z" fill="${strokeColor}" fill-opacity="0.18" />
          <circle cx="32" cy="38" r="4" fill="${strokeColor}" fill-opacity="0.4" />
        </svg>
      `;
    case "hongos-adaptogenos":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M32 14c-12 0-20 8-20 18h40c0-10-8-18-20-18z" fill="${strokeColor}" fill-opacity="0.18" />
          <path d="M28 32v18a4 4 0 0 0 8 0V32" fill="${strokeColor}" fill-opacity="0.25" />
          <circle cx="26" cy="22" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="38" cy="24" r="2" fill="currentColor" opacity="0.6" />
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
    case "mix-personalizado":
      return `
        <svg class="w-16 h-16 ${iconColor} drop-shadow-[0_0_12px_${shadowRgba}]" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M32 12c-8 10-8 20 0 30 8-10 8-20 0-30z" fill="${strokeColor}" fill-opacity="0.2" />
          <path d="M18 26c-6 7-6 15 0 22 6-7 6-15 0-22z" fill="${strokeColor}" fill-opacity="0.12" />
          <path d="M46 26c-6 7-6 15 0 22 6-7 6-15 0-22z" fill="${strokeColor}" fill-opacity="0.12" />
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

// Helper para renderizar imagen real WebP o fallback a pictograma SVG (Obligatorio loading="lazy")
function getProductDisplayVisual(product, selectedVarIndex = 0, isModal = false) {
  const variants = getProductVariants(product);
  const currentVariant = variants && variants[selectedVarIndex];
  const imgSrc = (currentVariant && currentVariant.image) || product.imagen || product.image;
  const productName = product.nombre || product.name;

  if (imgSrc) {
    const sizeClasses = isModal
      ? "max-h-56 sm:max-h-64 w-auto object-contain mx-auto relative z-10 drop-shadow-xl"
      : "max-h-36 w-auto object-contain mx-auto relative z-10 transition-transform duration-500 group-hover:scale-105 drop-shadow-md";
    const imgId = isModal ? `modal-img-${product.id}` : `card-img-${product.id}`;

    return `
      <img
        src="${imgSrc}"
        alt="${productName}"
        class="${sizeClasses}"
        loading="lazy"
        id="${imgId}"
      />
    `;
  }

  return `
    <div class="${isModal ? 'transform scale-125' : 'transform transition-transform duration-500 group-hover:scale-110'}">
      ${getProductVisual(product)}
    </div>
  `;
}

// 5. Renderizado del Catálogo de Productos con Mapeo de 3 Colores
function renderCatalog() {
  const container = document.getElementById("products-grid");
  if (!container) return;

  const filteredProducts = state.activeCategory === "all"
    ? productos
    : productos.filter((p) => getCategoryKey(p.categoria || p.category) === state.activeCategory);

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-neutral-500 font-sans">
        No se encontraron productos en esta categoría.
      </div>
    `;
    return;
  }

  let cardsHtml = "";
  for (let i = 0; i < filteredProducts.length; i++) {
    const product = filteredProducts[i];
    const catKey = getCategoryKey(product.categoria || product.category);
    const theme = CATEGORY_THEMES[catKey] || CATEGORY_THEMES.rendimiento;
    const meta = PRODUCT_METADATA[product.id] || {
      brand: "Natural Nutrition",
      badge: product.categoria,
      highlight: "Distribuidor Oficial NN"
    };

    const variants = getProductVariants(product);
    const selectedVarIndex = state.selectedVariants[product.id] || 0;
    const currentVariant = variants[selectedVarIndex] || variants[0];

    const productName = product.nombre || product.name;
    const productDesc = product.descripcion || product.description;
    const productBrand = product.brand || meta.brand;
    const productBadge = product.badge || meta.badge;
    const productHighlight = product.highlight || meta.highlight;

    // Botón principal de llamada a la acción ("Agregar"): Azul Eléctrico sólido y ergonómico
    const btnClass = "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20";
    const hasMultipleVariants = variants.length > 1;
    const isOutOfStock = product.inStock === false;

    // Bloque de Precio o "Sin Stock"
    const priceBlockHtml = isOutOfStock
      ? `
        <div>
          <span class="text-red-500 font-bold text-lg sm:text-xl font-outfit tracking-tight block">Sin Stock</span>
        </div>
      `
      : `
        <div>
          <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-500 font-sans">Precio Lista</span>
          <span class="font-sans font-bold text-2xl text-neutral-50 tracking-tight leading-none" id="price-${product.id}">
            ${formatPrice(currentVariant.price)}
          </span>
        </div>
      `;

    // Botón Agregar: oculto cuando inStock es false
    const addBtnHtml = isOutOfStock
      ? `
        <button
          type="button"
          disabled
          class="hidden btn-add-cart opacity-50 pointer-events-none cursor-not-allowed"
          data-product-id="${product.id}"
          aria-label="${productName} - Sin Stock"
        >
          <span>Sin Stock</span>
        </button>
      `
      : `
        <button
          type="button"
          class="btn-add-cart inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl ${btnClass} font-sans font-semibold text-xs whitespace-nowrap transition-all shadow-lg active:scale-95"
          data-product-id="${product.id}"
          aria-label="Agregar ${productName} al pedido"
        >
          <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Agregar</span>
        </button>
      `;

    cardsHtml += `
      <article
        class="product-card group relative bg-neutral-900/60 hover:bg-neutral-900/90 border border-white/[0.08] ${theme.cardHoverBorder} rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 overflow-hidden backdrop-blur-sm cursor-pointer select-none"
        data-product-id="${product.id}"
      >
        <div>
          <!-- Header de Card: Brand & Badge de Categoría con Color Semántico -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="font-outfit text-[11px] uppercase tracking-wider font-bold text-neutral-400">${productBrand}</span>
            <span class="font-outfit px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase border ${theme.badgeClass}">
              ${productBadge}
            </span>
          </div>

          <!-- Contenedor Visual con Halo Lumínico y Foto de Producto / Pictograma -->
          <div class="relative w-full h-44 rounded-2xl bg-neutral-950/80 border border-white/[0.05] flex items-center justify-center overflow-hidden mb-4 group-hover:border-white/[0.12] transition-colors p-3">
            <div class="absolute inset-0 bg-radial ${theme.haloClass} via-transparent to-transparent opacity-80 pointer-events-none"></div>
            ${getProductDisplayVisual(product, selectedVarIndex, false)}
          </div>

          <!-- Título del Producto (Outfit) -->
          <h3 class="font-outfit text-xl font-bold text-neutral-50 mb-1.5 leading-snug ${theme.cardTitleHover} transition-colors">
            ${productName}
          </h3>

          <!-- Descripción (Lato) -->
          <p class="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
            ${productDesc}
          </p>

          <!-- Highlight / Beneficio Técnico -->
          <div class="inline-flex items-center gap-1.5 text-[11px] font-semibold ${theme.highlightClass} border px-2.5 py-1 rounded-lg mb-4 w-fit">
            <svg class="w-3.5 h-3.5 ${theme.checkIconColor}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>${productHighlight}</span>
          </div>
        </div>

        <div>
          <!-- Selector Táctil de Variantes (Pill Switchers con estilo de Categoría) -->
          ${hasMultipleVariants ? `
            <div class="space-y-1.5 mb-4 pt-3 border-t border-white/[0.06]">
              <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-outfit">Elegir presentación:</span>
              <div class="grid ${variants.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 variant-pill-group" data-product-id="${product.id}">
                ${variants.map((v, idx) => {
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

          <!-- Footer de Card: Precio o Sin Stock y Botón Agregar en Azul Eléctrico -->
          <div class="flex items-end justify-between gap-3 pt-2">
            ${priceBlockHtml}
            ${addBtnHtml}
          </div>
        </div>
      </article>
    `;
  }

  container.innerHTML = cardsHtml;

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

      const product = productos.find((p) => p.id === productId);
      if (!product) return;
      const catKey = getCategoryKey(product.categoria || product.category);
      const theme = CATEGORY_THEMES[catKey] || CATEGORY_THEMES.rendimiento;
      const variants = getProductVariants(product);

      // Actualizar imagen si la variante tiene imagen asociada
      const variant = variants[variantIdx];
      if (variant && variant.image) {
        const cardImg = document.getElementById(`card-img-${productId}`);
        if (cardImg) cardImg.src = variant.image;
        const modalImg = document.getElementById(`modal-img-${productId}`);
        if (modalImg) modalImg.src = variant.image;
      }

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

      // Actualizar precio en la card solo si está en stock
      if (product.inStock !== false && variants[variantIdx]) {
        const priceEl = document.getElementById(`price-${productId}`);
        if (priceEl) {
          priceEl.textContent = formatPrice(variants[variantIdx].price);
        }
      }
    });
  });

  // Botón "Agregar" con microinteracción visual
  document.querySelectorAll(".btn-add-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita abrir el modal
      if (button.disabled || button.classList.contains("pointer-events-none") || button.classList.contains("hidden")) {
        return;
      }
      const targetBtn = e.currentTarget;
      const productId = targetBtn.getAttribute("data-product-id");
      const product = productos.find((p) => p.id === productId);
      if (product && product.inStock === false) {
        return;
      }

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
      if (e.target.closest(".btn-add-cart") || e.target.closest(".variant-pill") || e.target.closest("a")) {
        return;
      }
      const productId = card.getAttribute("data-product-id");
      openProductModal(productId);
    });
  });
}

// 7. Gestión del Carrito (Acciones)
function addToCart(productId) {
  const product = productos.find((p) => p.id === productId);
  if (!product || product.inStock === false) return;

  const variants = getProductVariants(product);
  const variantIdx = state.selectedVariants[productId] || 0;
  const variant = variants[variantIdx] || variants[0];
  const catKey = getCategoryKey(product.categoria || product.category);
  const meta = PRODUCT_METADATA[product.id] || { brand: "Natural Nutrition" };

  // Identificador único por producto y variante seleccionada
  const cartItemId = `${product.id}-${variant.value}`;
  const existingItemIndex = state.cart.findIndex((item) => item.cartItemId === cartItemId);

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += 1;
  } else {
    state.cart.push({
      cartItemId,
      id: product.id,
      category: catKey,
      name: product.nombre || product.name,
      brand: product.brand || meta.brand,
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

  const total = state.cart.reduce((acc, item) => {
    const p = typeof item.selectedVariant.price === 'number' ? item.selectedVariant.price : 0;
    return acc + (p * item.quantity);
  }, 0);
  if (subtotalEl) {
    const hasVariable = state.cart.some(item => typeof item.selectedVariant.price !== 'number');
    subtotalEl.textContent = formatPrice(total) + (hasVariable ? ' + Variable' : '');
  }

  itemsContainer.innerHTML = state.cart.map((item) => {
    const catBorder = item.category === "salud"
      ? "border-l-2 border-emerald-500"
      : (item.category === "alimentacion" ? "border-l-2 border-amber-500" : "border-l-2 border-blue-500");

    const priceLabel = typeof item.selectedVariant.price === 'number'
      ? `${formatPrice(item.selectedVariant.price)} c/u`
      : formatPrice(item.selectedVariant.price);

    return `
      <div class="flex items-center justify-between gap-3 p-3.5 bg-neutral-950/80 rounded-2xl border border-white/[0.08] ${catBorder}">
        <div class="flex-1 min-w-0">
          <h4 class="font-outfit text-sm font-bold text-neutral-100 truncate">${item.name}</h4>
          <span class="text-xs text-neutral-400 block font-sans">${item.selectedVariant.label}</span>
          <span class="font-outfit text-xs font-black text-blue-400 mt-1 block">
            ${priceLabel}
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
  const product = productos.find((p) => p.id === productId);
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

  const catKey = getCategoryKey(product.categoria || product.category);
  const theme = CATEGORY_THEMES[catKey] || CATEGORY_THEMES.rendimiento;
  const meta = PRODUCT_METADATA[product.id] || {
    brand: "Natural Nutrition",
    badge: product.categoria,
    highlight: "Distribuidor Oficial NN"
  };

  const variants = getProductVariants(product);
  const selectedVarIndex = state.selectedVariants[product.id] || 0;
  const currentVariant = variants[selectedVarIndex] || variants[0];

  const productName = product.nombre || product.name;
  const productDesc = product.descripcion || product.description;
  const productBrand = product.brand || meta.brand;
  const productBadge = product.badge || meta.badge;
  const productHighlight = product.highlight || meta.highlight;

  const btnClass = "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25";
  const hasMultipleVariants = variants.length > 1;
  const isOutOfStock = product.inStock === false;

  const modalPriceBlockHtml = isOutOfStock
    ? `
      <div class="shrink-0">
        <span class="text-red-500 font-bold text-xl sm:text-2xl font-outfit tracking-tight block">Sin Stock</span>
      </div>
    `
    : `
      <div class="shrink-0">
        <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-500 font-sans">Precio Lista</span>
        <span class="font-sans font-bold text-2xl text-neutral-50" id="modal-price-${product.id}">
          ${formatPrice(currentVariant.price)}
        </span>
      </div>
    `;

  const modalAddBtnHtml = isOutOfStock
    ? `
      <button
        type="button"
        disabled
        id="modal-add-cart-btn"
        class="hidden opacity-50 pointer-events-none cursor-not-allowed"
        data-product-id="${product.id}"
      >
        <span>Sin Stock</span>
      </button>
    `
    : `
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
    `;

  body.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
      <!-- Contenedor Visual con Halo de Categoría y Foto de Producto / Pictograma -->
      <div class="aspect-square w-full bg-neutral-950/80 rounded-3xl flex flex-col items-center justify-center border border-white/[0.08] shadow-inner select-none p-6 text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-radial ${theme.haloClass} via-transparent to-transparent opacity-80 pointer-events-none"></div>
        ${getProductDisplayVisual(product, selectedVarIndex, true)}
        <span class="font-outfit uppercase tracking-widest text-[11px] font-bold text-neutral-400 mt-4 block relative z-10">
          ${productBrand}
        </span>
      </div>

      <!-- Información Completa -->
      <div class="flex flex-col justify-between h-full space-y-4">
        <div>
          <!-- Marca y Badge -->
          <div class="flex items-center justify-between gap-2 mb-2.5">
            <span class="font-outfit text-xs uppercase tracking-wider font-bold text-neutral-400">${productBrand}</span>
            <span class="font-outfit inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${theme.badgeClass}">
              ${productBadge}
            </span>
          </div>

          <!-- Nombre del producto -->
          <h2 id="modal-product-name" class="font-outfit text-xl sm:text-2xl font-bold text-neutral-100 leading-snug mb-3">
            ${productName}
          </h2>

          <!-- Highlight -->
          <div class="inline-flex items-center gap-1.5 text-xs font-semibold ${theme.highlightClass} px-2.5 py-1 rounded-lg mb-4 border">
            <span class="${theme.checkIconColor}">✓</span>
            <span>${productHighlight}</span>
          </div>

          <!-- Descripción completa -->
          <div class="text-sm text-neutral-300 leading-relaxed space-y-2 mb-4 font-sans font-normal">
            <p>${productDesc}</p>
          </div>
        </div>

        <div class="pt-4 border-t border-white/[0.08]">
          <!-- Selector Táctil de Variantes en Modal -->
          ${hasMultipleVariants ? `
            <div class="mb-4">
              <label class="block font-outfit text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Elegir presentación:</label>
              <div class="grid ${variants.length === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2 modal-pill-group" data-product-id="${product.id}">
                ${variants.map((v, idx) => {
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

          <!-- Precio o Sin Stock y Botón Agregar "Agregar al Pedido" en Azul Eléctrico -->
          <div class="flex items-center justify-between gap-3 pt-2">
            ${modalPriceBlockHtml}
            ${modalAddBtnHtml}
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

        // Actualizar imagen si la variante tiene imagen específica
        const variant = variants[variantIdx];
        if (variant && variant.image) {
          const cardImg = document.getElementById(`card-img-${product.id}`);
          if (cardImg) cardImg.src = variant.image;
          const modalImg = document.getElementById(`modal-img-${product.id}`);
          if (modalImg) modalImg.src = variant.image;
        }

        // Actualizar visual de pills en modal
        modalPillGroup.querySelectorAll(".modal-variant-pill").forEach((btn) => {
          const btnIdx = parseInt(btn.getAttribute("data-variant-idx"), 10);
          if (btnIdx === variantIdx) {
            btn.className = `modal-variant-pill py-2 px-2.5 rounded-xl text-xs text-center border transition-all font-outfit truncate ${theme.pillActive}`;
          } else {
            btn.className = `modal-variant-pill py-2 px-2.5 rounded-xl text-xs text-center border transition-all font-outfit truncate ${theme.pillInactive}`;
          }
        });

        // Actualizar precio solo si está en stock
        if (product.inStock !== false && variants[variantIdx]) {
          const modalPrice = document.getElementById(`modal-price-${product.id}`);
          if (modalPrice) {
            modalPrice.textContent = formatPrice(variants[variantIdx].price);
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
            cardPrice.textContent = formatPrice(variants[variantIdx].price);
          }
        }
      });
    });
  }

  // Listener para botón agregar en modal
  const modalAddBtn = document.getElementById("modal-add-cart-btn");
  if (modalAddBtn && product.inStock !== false) {
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

  const itemsText = cartItems.map((item) => {
    const isNum = typeof item.selectedVariant.price === 'number';
    const priceStr = isNum ? `$${(item.selectedVariant.price * item.quantity).toLocaleString("es-AR")}` : `${item.selectedVariant.price} (A convenir)`;
    return `• ${item.quantity}x ${item.name} (${item.selectedVariant.label}) - ${priceStr}`;
  }).join("\n");

  const total = cartItems.reduce((acc, item) => {
    return acc + (typeof item.selectedVariant.price === 'number' ? (item.selectedVariant.price * item.quantity) : 0);
  }, 0);
  const hasVariable = cartItems.some(item => typeof item.selectedVariant.price !== 'number');
  const totalDisplay = hasVariable ? `$${total.toLocaleString("es-AR")} + item(s) a convenir` : `$${total.toLocaleString("es-AR")}`;

  const message =
`🛒 *NUEVO PEDIDO - SUPLEMENTOS MENDOZA*
------------------------------------------
👤 *Cliente:* ${formData.name.trim()}
📱 *Contacto:* ${formData.phone.trim()}
📍 *Entrega:* ${formData.deliveryType === "envio" ? `Envío a domicilio - ${formData.address.trim()}` : "Retiro coordinado"}
💳 *Pago:* ${formData.paymentMethod === "transferencia" ? "Transferencia Bancaria" : "Efectivo contra entrega"}

📦 *Detalle del Pedido:*
${itemsText}

💰 *TOTAL: ${totalDisplay}*
${formData.notes && formData.notes.trim() ? `\n📝 *Notas:* ${formData.notes.trim()}` : ""}
------------------------------------------
_Enviado desde suplementosmendoza.com.ar_`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

// 11. Inicialización General y Listeners Globales
document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  fetchCatalogFromGoogleSheets();

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
