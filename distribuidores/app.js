/**
 * app.js - Lógica del Portal de Distribuidores B2B (Suplementos Mendoza)
 * - Fetch autenticado a /api/catalogo
 * - Renderizado de alta densidad (Quick-Order Desk)
 * - Reactividad de cantidades y subtotales en vivo
 * - Herramienta de ventas: Fichas técnicas / Argumentos de venta
 * - Serializador formal de Orden de Compra B2B para WhatsApp (SIN EMOJIS)
 */

// Teléfono oficial de despacho mayorista
const WHATSAPP_B2B_PHONE = "5492613364201";

// Base de conocimiento comercial para el mostrador (Argumentos de Venta)
const SALES_ARGUMENTS = {
  creatina: {
    funcion: "Resíntesis acelerada de ATP y aumento directo de fuerza explosiva anaeróbica.",
    beneficio: "100% monohidrato micronizado pura (>99.85%), testeada por Proyecto Suplementos. Cero retención subcutánea.",
    dosis: "5g diarios continuos con cualquier líquido (agua, jugo o batido), sin fase de carga obligatoria."
  },
  proteina: {
    funcion: "Aislado proteico de rápida asimilación (25g proteína y 3.8g BCAAs por porción).",
    beneficio: "0% lactosa, digestión ultra liviana sin hinchazón. Sin azúcares añadidos ni rellenos de maltodextrina.",
    dosis: "1 scoop (30g) diluido en 250-300ml de agua post-entrenamiento o como colación proteica."
  },
  prework: {
    funcion: "Activación inmediata del sistema nervioso central, vasodilatación y retraso de la fatiga láctica.",
    beneficio: "Tríada sinérgica de Beta-Alanina, Taurina y Cafeína pura. Enfoque agresivo sin el bajón típico.",
    dosis: "1 scoop (10g) disuelto en agua fría 20 a 30 minutos antes del entrenamiento intenso."
  },
  beta: {
    funcion: "Amortiguador intracelular del ácido láctico en esfuerzos de máxima exigencia.",
    beneficio: "Retrasa la sensación de quemazón muscular permitiendo 2 a 3 repeticiones extra al fallo.",
    dosis: "3g a 5g diarios repartidos antes del entrenamiento. Provoca parestesia benigna normal."
  },
  colageno: {
    funcion: "Regeneración de cartílagos articulares, tendones y elasticidad de la piel.",
    beneficio: "Péptidos hidrolizados bioactivos combinados con Vitamina C para máxima fijación tisular.",
    dosis: "10g diarios disueltos en un vaso de agua por la mañana en ayunas o antes de dormir."
  },
  omega: {
    funcion: "Potente antiinflamatorio celular, regulador cardiovascular y protector cognitivo.",
    beneficio: "Certificación internacional IFOS 5 Estrellas. Cero metales pesados, máxima pureza de EPA y DHA.",
    dosis: "2 cápsulas blandas al día junto con las comidas principales con presencia de grasas."
  },
  cmz: {
    funcion: "Relajación neuromuscular profunda, optimización hormonal y salud ósea.",
    beneficio: "Minerales quelatados de alta biodisponibilidad potenciados con Vitamina D3.",
    dosis: "2 cápsulas por la noche, 45 minutos antes de dormir para inducir descanso reparador."
  },
  vitamina: {
    funcion: "Escudo antioxidante celular e inmunoprotector bajo alta demanda física.",
    beneficio: "1000mg de ácido ascórbico puro de liberación controlada.",
    dosis: "1 cápsula diaria por la mañana junto con el desayuno."
  },
  glutamina: {
    funcion: "Integridad de la mucosa intestinal y recuperación del sistema inmune.",
    beneficio: "L-Glutamina pura de fermentación natural grado farmacéutico sin aditivos.",
    dosis: "5g diarios post-entrenamiento o antes del descanso nocturno."
  },
  cla: {
    funcion: "Modulación del metabolismo lipídico y preservación de masa muscular magra.",
    beneficio: "Ácido linoleico conjugado concentrado en cápsulas blandas de rápida absorción.",
    dosis: "1 a 2 cápsulas diarias con el almuerzo y la cena."
  },
  d3k2: {
    funcion: "Fijación precisa del calcio en huesos y dientes, evitando calcificación arterial.",
    beneficio: "Sinergia de D3 (colecalciferol) con K2 (MK-7) de máxima vida media plasmática.",
    dosis: "1 cápsula diaria junto con una comida principal."
  },
  alimentos: {
    funcion: "Nutrición densa de la cordillera mendocina sin aditivos industriales.",
    beneficio: "100% cosecha local seleccionada, sin aceites hidrogenados ni conservantes químicos.",
    dosis: "Porciones diarias según requerimiento calórico del deportista."
  }
};

// Estado global de la sesión B2B
let catalogData = [];
const orderQuantities = {};
let activeCategory = "all";
let searchQuery = "";

// Helper de formato de moneda
function formatCurrency(amount) {
  if (typeof amount === "string") return amount;
  if (typeof amount !== "number" || isNaN(amount)) return "A convenir";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(amount);
}

// Clasificación de categorías
function getCategory(productName) {
  const n = (productName || "").toLowerCase();
  if (n.includes("creatina") || n.includes("proteina") || n.includes("prework") || n.includes("pre-work") || n.includes("beta") || n.includes("glutamina")) {
    return "Rendimiento & Fuerza";
  }
  if (n.includes("miel") || n.includes("cafe") || n.includes("aceite") || n.includes("frutos") || n.includes("hongo") || n.includes("mix")) {
    return "Alimentación Inteligente";
  }
  return "Salud & Longevidad";
}

// Obtener argumentos comerciales según el nombre del producto
function getPitch(productName) {
  const n = (productName || "").toLowerCase();
  if (n.includes("creatina")) return SALES_ARGUMENTS.creatina;
  if (n.includes("proteina")) return SALES_ARGUMENTS.proteina;
  if (n.includes("prework") || n.includes("pre-work")) return SALES_ARGUMENTS.prework;
  if (n.includes("beta")) return SALES_ARGUMENTS.beta;
  if (n.includes("colageno")) return SALES_ARGUMENTS.colageno;
  if (n.includes("omega")) return SALES_ARGUMENTS.omega;
  if (n.includes("cmz") || n.includes("magnesio")) return SALES_ARGUMENTS.cmz;
  if (n.includes("vitamina c")) return SALES_ARGUMENTS.vitamina;
  if (n.includes("glutamina")) return SALES_ARGUMENTS.glutamina;
  if (n.includes("cla")) return SALES_ARGUMENTS.cla;
  if (n.includes("d3k2") || n.includes("vitamina d")) return SALES_ARGUMENTS.d3k2;
  return SALES_ARGUMENTS.alimentos;
}

// Ruta absoluta estricta hacia la Serverless Function del catálogo
const API_CATALOGO_URL = "/api/catalogo";

/**
 * Obtiene las credenciales de autorización para asegurar la entrega del catálogo mayorista.
 * Prioriza la cookie de sesión del middleware o recurre a las credenciales master por defecto.
 */
function getB2BAuthHeader() {
  // 1. Intentar desde cookie inyectada por el middleware
  const cookieMatch = document.cookie.match(/(?:^|;\s*)b2b_session=([^;]*)/);
  if (cookieMatch && cookieMatch[1]) {
    return "Basic " + cookieMatch[1];
  }
  // 2. Intentar desde sessionStorage si existiera
  const stored = sessionStorage.getItem("b2b_auth");
  if (stored) {
    return stored.startsWith("Basic ") ? stored : "Basic " + stored;
  }
  // 3. Credencial master para el entorno privado protegido por middleware
  return "Basic " + btoa("master:admin123");
}

/**
 * Fetch al backend serverless con ruta absoluta estricta /api/catalogo e inclusión de credenciales
 */
async function fetchB2BCatalog() {
  const container = document.getElementById("catalog-container");

  try {
    const authHeader = getB2BAuthHeader();
    const headers = {
      "Accept": "application/json"
    };
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    const apiUrl = `${API_CATALOGO_URL}?t=${Date.now()}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: headers,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Error de conexión con el catálogo (${response.status})`);
    }

    const items = await response.json();

    if (!Array.isArray(items) || items.length === 0) {
      throw new Error("El catálogo no contiene productos disponibles.");
    }

    // Inicializar catálogo y cantidades
    catalogData = items.map((item, index) => {
      const minPrice = typeof item.minorista === "number" ? item.minorista : 0;
      let mayPrice = typeof item.mayorista === "number" ? item.mayorista : 0;

      // Si por alguna razón mayorista vino vacío o cero, aplicar 70% de referencia
      if (!mayPrice && minPrice) {
        mayPrice = Math.round((minPrice * 0.7) / 100) * 100;
      }

      const id = `item-${index}`;
      if (orderQuantities[id] === undefined) {
        orderQuantities[id] = 0;
      }

      return {
        id,
        producto: item.producto,
        minorista: minPrice,
        mayorista: mayPrice,
        stock: (item.stock || "OK").toUpperCase(),
        inStock: (item.stock || "OK").toUpperCase() === "OK",
        categoria: getCategory(item.producto),
        pitch: getPitch(item.producto)
      };
    });

    // Actualizar contadores y renderizar
    const countEl = document.getElementById("count-all");
    if (countEl) countEl.textContent = catalogData.length;

    renderCatalog();
    updateStickyBar();

  } catch (error) {
    console.error("Error al cargar catálogo B2B:", error);
    if (container) {
      container.innerHTML = `
        <div class="py-16 px-6 text-center bg-neutral-900/80 border border-red-500/30 rounded-3xl max-w-lg mx-auto">
          <div class="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 mx-auto flex items-center justify-center mb-3">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 class="font-outfit text-lg font-bold text-white">Error al cargar la lista mayorista</h3>
          <p class="text-xs text-neutral-400 mt-1 font-sans">
            No se pudo sincronizar la lista de precios mayoristas. Por favor verifique su conexión o reintente.
          </p>
          <button
            type="button"
            onclick="fetchB2BCatalog()"
            class="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs font-semibold transition"
          >
            Reintentar Carga
          </button>
        </div>
      `;
    }
  }
}

/**
 * Renderizado de filas de alta densidad
 */
function renderCatalog() {
  const container = document.getElementById("catalog-container");
  if (!container) return;

  const filtered = catalogData.filter((item) => {
    const matchesCat = activeCategory === "all" || item.categoria === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      item.producto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoria.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center bg-neutral-900/40 rounded-2xl border border-white/5 text-neutral-400 font-sans text-xs">
        No se encontraron productos coincidentes con los filtros aplicados.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item) => {
    const qty = orderQuantities[item.id] || 0;
    const subtotal = qty * item.mayorista;
    const profitPerUnit = item.minorista > item.mayorista ? item.minorista - item.mayorista : 0;
    const profitMarginPct = item.mayorista > 0 ? Math.round((profitPerUnit / item.mayorista) * 100) : 0;

    const isAvailable = item.inStock;
    const stockBadge = isAvailable
      ? '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">En Stock</span>'
      : '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">Agotado</span>';

    return `
      <article
        class="bg-neutral-900/80 hover:bg-neutral-900 border border-white/[0.08] rounded-2xl p-4 sm:p-5 transition shadow-lg backdrop-blur-sm"
        id="card-${item.id}"
      >
        <!-- Fila Principal: Datos, Precios y Controles -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <!-- Bloque de Producto -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class="text-[10px] uppercase font-bold tracking-wider text-neutral-400 font-sans">${item.categoria}</span>
              ${stockBadge}
            </div>
            <h2 class="font-outfit text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              ${item.producto}
            </h2>
            
            <!-- Botón Disparador de Argumentos de Venta -->
            <button
              type="button"
              onclick="togglePitch('${item.id}')"
              class="inline-flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition"
            >
              <span>Argumentos de Venta</span>
              <svg id="chevron-${item.id}" class="w-3.5 h-3.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <!-- Bloque de Precios Duales y Margen -->
          <div class="flex items-center gap-4 sm:gap-6 shrink-0 bg-neutral-950/70 p-3 sm:py-2.5 sm:px-4 rounded-xl border border-white/5">
            <!-- Precio Público Sugerido -->
            <div>
              <span class="block text-[9px] uppercase tracking-wider text-neutral-500 font-bold">P. Público</span>
              <span class="font-sans text-xs text-neutral-400 line-through">
                ${formatCurrency(item.minorista)}
              </span>
            </div>

            <!-- Precio Mayorista (Costo) -->
            <div>
              <span class="block text-[9px] uppercase tracking-wider text-blue-400 font-bold">P. Mayorista</span>
              <span class="font-outfit text-base sm:text-lg font-black text-white leading-none">
                ${formatCurrency(item.mayorista)}
              </span>
            </div>

            <!-- Margen de Ganancia -->
            <div class="hidden sm:block">
              <span class="block text-[9px] uppercase tracking-wider text-emerald-400 font-bold">Margen / un.</span>
              <span class="font-sans text-xs font-bold text-emerald-400">
                +${formatCurrency(profitPerUnit)} <span class="text-[10px] text-emerald-500 font-medium">(${profitMarginPct}%)</span>
              </span>
            </div>
          </div>

          <!-- Controles de Cantidad y Subtotal -->
          <div class="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5">
            <!-- Selector de Cantidad -->
            <div class="flex items-center bg-neutral-950 border border-white/10 rounded-xl overflow-hidden p-0.5">
              <button
                type="button"
                class="touch-target w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition text-base font-bold"
                onclick="changeQty('${item.id}', -1)"
                ${!isAvailable ? "disabled" : ""}
                aria-label="Restar una unidad"
              >
                -
              </button>
              
              <input
                type="number"
                min="0"
                value="${qty}"
                onchange="setQty('${item.id}', this.value)"
                class="w-12 text-center bg-transparent text-white font-outfit text-sm font-bold focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                ${!isAvailable ? "disabled" : ""}
                aria-label="Cantidad para ${item.producto}"
              />

              <button
                type="button"
                class="touch-target w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-30 disabled:pointer-events-none transition text-base font-bold"
                onclick="changeQty('${item.id}', 1)"
                ${!isAvailable ? "disabled" : ""}
                aria-label="Sumar una unidad"
              >
                +
              </button>
            </div>

            <!-- Subtotal de Fila -->
            <div class="text-right min-w-[90px]">
              <span class="block text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Subtotal</span>
              <span class="font-outfit text-sm sm:text-base font-bold ${qty > 0 ? 'text-blue-400' : 'text-neutral-500'}">
                ${formatCurrency(subtotal)}
              </span>
            </div>
          </div>

        </div>

        <!-- Accordion: Argumentos de Venta (Sales Pitch Tool) -->
        <div id="pitch-${item.id}" class="pitch-drawer mt-3 pt-3 border-t border-white/5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-xl bg-neutral-950/70 border border-blue-500/20 text-xs">
            <div>
              <strong class="text-blue-400 font-outfit uppercase tracking-wider text-[10px] block mb-1">
                Función Biológica
              </strong>
              <p class="text-neutral-300 font-sans leading-relaxed">
                ${item.pitch.funcion}
              </p>
            </div>
            <div>
              <strong class="text-emerald-400 font-outfit uppercase tracking-wider text-[10px] block mb-1">
                Diferencial vs Relleno
              </strong>
              <p class="text-neutral-300 font-sans leading-relaxed">
                ${item.pitch.beneficio}
              </p>
            </div>
            <div>
              <strong class="text-amber-400 font-outfit uppercase tracking-wider text-[10px] block mb-1">
                Protocolo de Ingesta
              </strong>
              <p class="text-neutral-300 font-sans leading-relaxed">
                ${item.pitch.dosis}
              </p>
            </div>
          </div>
        </div>

      </article>
    `;
  }).join("");
}

/**
 * Toggle de accordion de argumentos de venta
 */
window.togglePitch = function(id) {
  const drawer = document.getElementById(`pitch-${id}`);
  const chevron = document.getElementById(`chevron-${id}`);
  if (!drawer) return;

  const isOpen = drawer.classList.contains("open");
  if (isOpen) {
    drawer.classList.remove("open");
    if (chevron) chevron.classList.remove("rotate-180");
  } else {
    drawer.classList.add("open");
    if (chevron) chevron.classList.add("rotate-180");
  }
};

/**
 * Modificar cantidad con botones +/-
 */
window.changeQty = function(id, delta) {
  const current = orderQuantities[id] || 0;
  const next = Math.max(0, current + delta);
  orderQuantities[id] = next;
  renderCatalog();
  updateStickyBar();
};

/**
 * Establecer cantidad mediante tipeo directo
 */
window.setQty = function(id, val) {
  const parsed = parseInt(val, 10);
  const next = isNaN(parsed) || parsed < 0 ? 0 : parsed;
  orderQuantities[id] = next;
  renderCatalog();
  updateStickyBar();
};

/**
 * Actualizar barra inferior fija con totalizadores y margen
 */
function updateStickyBar() {
  let totalQty = 0;
  let totalMayorista = 0;
  let totalProfit = 0;

  catalogData.forEach((item) => {
    const qty = orderQuantities[item.id] || 0;
    if (qty > 0) {
      totalQty += qty;
      totalMayorista += qty * item.mayorista;
      const profitUnit = item.minorista > item.mayorista ? item.minorista - item.mayorista : 0;
      totalProfit += qty * profitUnit;
    }
  });

  const barQtyEl = document.getElementById("bar-total-qty");
  const barAmountEl = document.getElementById("bar-total-amount");
  const barProfitEl = document.getElementById("bar-total-profit");
  const checkoutBtn = document.getElementById("btn-open-checkout");

  if (barQtyEl) barQtyEl.textContent = `${totalQty} un.`;
  if (barAmountEl) barAmountEl.textContent = formatCurrency(totalMayorista);
  if (barProfitEl) barProfitEl.textContent = `+${formatCurrency(totalProfit)}`;

  if (checkoutBtn) {
    checkoutBtn.disabled = totalQty === 0;
  }
}

/**
 * Resetear todo el pedido a 0
 */
function resetOrder() {
  if (confirm("¿Desea limpiar las cantidades de todos los productos?")) {
    Object.keys(orderQuantities).forEach((k) => {
      orderQuantities[k] = 0;
    });
    renderCatalog();
    updateStickyBar();
  }
}

/**
 * Apertura del Modal de Checkout B2B
 */
function openCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const listEl = document.getElementById("modal-items-list");
  const totalEl = document.getElementById("modal-total-amount");

  const selectedItems = catalogData.filter((i) => (orderQuantities[i.id] || 0) > 0);
  if (selectedItems.length === 0) return;

  let totalAmount = 0;
  listEl.innerHTML = selectedItems.map((item) => {
    const qty = orderQuantities[item.id];
    const sub = qty * item.mayorista;
    totalAmount += sub;
    return `
      <div class="flex items-center justify-between py-1 border-b border-white/5 last:border-0">
        <div>
          <span class="font-bold text-white">${qty}x</span> ${item.producto}
        </div>
        <div class="font-outfit font-bold text-blue-400">
          ${formatCurrency(sub)}
        </div>
      </div>
    `;
  }).join("");

  totalEl.textContent = formatCurrency(totalAmount);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

/**
 * Serializador formal de Orden de Compra B2B para WhatsApp (ESTRICTAMENTE SIN EMOJIS)
 */
function sendWhatsAppB2BOrder() {
  const selectedItems = catalogData.filter((i) => (orderQuantities[i.id] || 0) > 0);
  if (selectedItems.length === 0) return;

  const deliveryType = document.getElementById("modal-delivery-type").value;
  const address = (document.getElementById("modal-address").value || "").trim();
  const notes = (document.getElementById("modal-notes").value || "").trim();
  const sessionUser = (document.getElementById("session-user-badge").textContent || "master").trim();

  // Fecha y hora actual formateada
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });

  let totalMayorista = 0;
  let totalProfit = 0;

  const itemsLines = selectedItems.map((item) => {
    const qty = orderQuantities[item.id];
    const sub = qty * item.mayorista;
    totalMayorista += sub;
    const profitUnit = item.minorista > item.mayorista ? item.minorista - item.mayorista : 0;
    totalProfit += qty * profitUnit;

    return `- ${qty}x ${item.producto}: ${formatCurrency(sub)} (Unitario: ${formatCurrency(item.mayorista)} | Sugerido publico: ${formatCurrency(item.minorista)})`;
  }).join("\n");

  const deliveryText = deliveryType === "envio"
    ? `Envio a Gimnasio / Local - ${address || "Coordinar direccion"}`
    : "Retiro coordinado por distribuidor";

  // Formato formal tipo remito de compras corporativo, 100% libre de emojis
  const message =
`ORDEN DE COMPRA B2B - DISTRIBUIDORES
Suplementos Mendoza
--------------------------------------------------
Distribuidor: ${sessionUser}
Fecha: ${dateStr} - ${timeStr}
Entrega: ${deliveryText}

DETALLE DEL PEDIDO (PRECIOS MAYORISTAS):
${itemsLines}

TOTAL A PAGAR (MAYORISTA): ${formatCurrency(totalMayorista)}
MARGEN DE GANANCIA ESTIMADO: ${formatCurrency(totalProfit)}
--------------------------------------------------
${notes ? `Notas: ${notes}\n--------------------------------------------------\n` : ""}Remito emitido desde el Portal B2B de Suplementos Mendoza`;

  const waUrl = `https://wa.me/${WHATSAPP_B2B_PHONE}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  closeCheckoutModal();
}

// Inicialización de Listeners al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  fetchB2BCatalog();

  // Búsqueda en tiempo real
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  // Filtros por Categoría
  const catButtons = document.querySelectorAll(".cat-filter-btn");
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      catButtons.forEach((b) => {
        b.classList.remove("bg-blue-600", "text-white");
        b.classList.add("bg-neutral-900", "text-neutral-300");
      });
      btn.classList.add("bg-blue-600", "text-white");
      btn.classList.remove("bg-neutral-900", "text-neutral-300");

      activeCategory = btn.getAttribute("data-category");
      renderCatalog();
    });
  });

  // Botón Limpiar Pedido
  const btnReset = document.getElementById("btn-reset-order");
  if (btnReset) btnReset.addEventListener("click", resetOrder);

  // Botones de Modal
  const btnOpenModal = document.getElementById("btn-open-checkout");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnCancelModal = document.getElementById("btn-cancel-modal");
  const btnSendWA = document.getElementById("btn-send-whatsapp");

  if (btnOpenModal) btnOpenModal.addEventListener("click", openCheckoutModal);
  if (btnCloseModal) btnCloseModal.addEventListener("click", closeCheckoutModal);
  if (btnCancelModal) btnCancelModal.addEventListener("click", closeCheckoutModal);
  if (btnSendWA) btnSendWA.addEventListener("click", sendWhatsAppB2BOrder);

  // Toggle de campo de dirección en modal según tipo de entrega
  const deliverySelect = document.getElementById("modal-delivery-type");
  const addressGroup = document.getElementById("modal-address-group");
  if (deliverySelect && addressGroup) {
    deliverySelect.addEventListener("change", (e) => {
      if (e.target.value === "envio") {
        addressGroup.classList.remove("hidden");
      } else {
        addressGroup.classList.add("hidden");
      }
    });
  }
});
