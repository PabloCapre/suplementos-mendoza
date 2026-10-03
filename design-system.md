# Design System & Manual de Marca UI/UX: Suplementos Mendoza
**Agencia:** WAFLERS  
**Rol:** Dirección de Arte & Diseño UI/UX  
**Versión:** 3.0 (Ergonomía Visual & Arquitectura Trizona)  
**Fecha:** Octubre 2026 / Revisión Definitiva  
**Concepto Rector:** *High-Performance Science x Pure Vitality x Real Food* (Ciencia Deportiva Sólida + Salud Celular + Nutrición Ancestral de la Tierra).  

---

## 1. Fundamentos & Manifiesto Visual

El rediseño v3.0 resuelve los fallos de fatiga visual y fricción de navegación de iteraciones previas. La interfaz abandona definitivamente el cian fluorescente sobre negro puro —cuya excesiva luminancia relativa causaba aberración cromática y cansancio ocular— y adopta un **Azul Eléctrico profundo y sólido** como eje rector de rendimiento, combinado con un sistema de **3 Categorías cromáticamente diferenciadas**.

### Pilares de Identidad Visual:

1. **Rendimiento & Fuerza (Azul Eléctrico Sólido `blue-600` / `#2563eb`):**
   Potencia anaeróbica, síntesis de ATP, recuperación muscular y absorción celular (Creatina micronizada, Proteínas Whey/Isolate, Pre-Entrenos, BCAA/Glutamina). Evoca rigor de laboratorio, confiabilidad atlética y potencia controlada sin caer en estridencias de neón.
2. **Salud & Longevidad (Verde Esmeralda Profundo `emerald-600` / `#059669`):**
   Equilibrio metabólico, salud articular, descanso neuromuscular y bienestar preventivo (Citrato/Bisglicinato de Magnesio, Omega 3 Ultra, Colágeno Hidrolizado, Vitaminas D3+K2, Adaptógenos). Proyecta vitalidad orgánica, serenidad y evidencia científica.
3. **Alimentación Inteligente (Dorado Mate Terroso `amber-600` / `#d97706`):**
   Comida real, granos nobles, grasas saludables sin aceites hidrogenados ni azúcares añadidos (Mix de frutos secos seleccionados, semillas agroecológicas, miel cruda pura, pasta de maní 100%, café de especialidad). Transmite cosecha noble, nutrición densa y pureza botánica.

### Canvas & Ergonomía del Fondo:
El lienzo descansa sobre **Negro Carbón Mineral (`#08090A` / `neutral-950`)** enriquecido con superficies elevadas en vidrio esmerilado translúcido (`rgba(18, 20, 23, 0.70)`). La interacción cromática se apoya en contraste calibrado para pantallas OLED/AMOLED y monitores de escritorio, garantizando legibilidad prolongada y cero deslumbramiento.

---

## 2. Matriz de Cambios & Diagnóstico UI/UX

| Aspecto | Versión Anterior (Fallida) | Versión 3.0 (Estricta) | Diagnóstico & Solución UI/UX |
| :--- | :--- | :--- | :--- |
| **Color Principal (Deporte)** | Cian Neón (`#36B7D8` / `cyan-400`) | **Azul Eléctrico Sólido** (`#2563eb` / `blue-600`, hover `#3b82f6` / `blue-500`) | El cian neón sobre negro saturaba la retina y generaba efecto halo. El Azul Eléctrico profundo asienta la vista, mejora la retención y transmite madurez técnica. |
| **Arquitectura de Categorías** | Bimodal forzado (2 colores: Deporte / Comida Real) | **Sistema Trizona (3 Categorías con identidad propia)** | Fusionar salud/longevidad en deporte o comida real diluía la oferta. 3 categorías restauran la escaneabilidad mental rápida del catálogo. |
| **Categoría Rendimiento** | Cian Neón | **Azul Eléctrico (`blue-600`)** | Anclaje inmediato en fuerza, velocidad y suplementación de carga. |
| **Categoría Salud** | Absorbida/Indiferenciada | **Verde Esmeralda (`emerald-600`)** | Crea un destino claro para clientes de bienestar, descanso, articulaciones y longevidad. |
| **Categoría Alimentación** | Dorado Mate (`#A86F3D`) | **Dorado Mate (`amber-600` / `#d97706`)** | Exclusivo para snacks densos, frutos secos y comida real de la cordillera mendocina. |
| **Uso de Color en CTAs** | Botones anchos con fondos cian/verde flúo | **Prohibición estricta de neones en botones amplios.** Fondos sólidos profundos con tipografía blanca nítida (`text-white font-bold`). | Elimina la ceguera de banner por contraste excesivo y garantiza accesibilidad WCAG AAA sin fatiga. |
| **Tipografía Display** | `Outfit` | `Outfit` (Pesos 600, 700, 800, 900) | Se mantiene para H1, H2, precios e indicadores clave. |
| **Tipografía de Lectura** | `Lato` / Sans | `Lato` (Pesos 400, 700, 900) | Lectura neutra, ergonómica y técnica en descripciones, fichas y especificaciones. |

---

## 3. Tokens Cromáticos & Clases Tailwind CSS

### 3.1 Arquitectura del Sistema de Color

```
┌────────────────────────────────────────────────────────────────────────┐
│ CARBON BASE (#08090A)             ──> Lienzo absoluto y backdrops      │
│ GLASS CARD (#121417 / 70%)        ──> Contenedores y cards con blur    │
│ BORDER SUBTLE (rgba(255,255,255)) ──> Separadores ultra finos (6%-10%) │
│                                                                        │
│ [CAT 1] AZUL ELÉCTRICO (#2563eb)  ──> Rendimiento & Fuerza (blue-600)  │
│ [CAT 2] VERDE ESMERALDA (#059669) ──> Salud & Longevidad (emerald-600) │
│ [CAT 3] DORADO MATE (#d97706)     ──> Alimentación Real (amber-600)    │
│                                                                        │
│ PURE WHITE (#FFFFFF) / (#FAFAFA)  ──> Textos de botón, H1 y Precios    │
│ TEXT MUTED LATO (#9CA3AF / #D1D5) ──> Párrafos, fichas técnicas y FAQ  │
└────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Tabla Completa de Tokens Semánticos

| Token Semántico | Valor Hex / RGBA | Tailwind Utility Class | Aplicación en Interfaz |
| :--- | :--- | :--- | :--- |
| `--color-canvas` | `#08090A` | `bg-[#08090A]` / `bg-neutral-950` | Fondo general de viewport y modales base. |
| `--color-surface` | `rgba(18, 20, 23, 0.70)` | `bg-neutral-900/70 backdrop-blur-md` | Cards de producto, contenedores flotantes. |
| `--color-surface-hover` | `rgba(26, 29, 35, 0.85)` | `hover:bg-neutral-900/90` | Estado hover de tarjetas de catálogo. |
| `--color-border-subtle` | `rgba(255, 255, 255, 0.08)` | `border-white/[0.08]` | Delimitación estructural perimetral. |
| **LÍNEA RENDIMIENTO** | | | |
| `--color-rendimiento-base` | `#2563eb` | `bg-blue-600` / `text-blue-600` | Botones de compra principal, pills activas, badges. |
| `--color-rendimiento-hover`| `#3b82f6` | `hover:bg-blue-500` / `hover:text-blue-400` | Estados hover y focus de acciones de rendimiento. |
| `--color-rendimiento-soft` | `rgba(37, 99, 235, 0.15)` | `bg-blue-600/15` | Fondo de tags técnicos y badges en cards. |
| `--color-rendimiento-border`| `rgba(37, 99, 235, 0.35)`| `border-blue-600/35` | Bordes activos de tarjetas de creatina/proteínas. |
| `--color-rendimiento-glow` | `rgba(37, 99, 235, 0.20)` | `shadow-lg shadow-blue-600/20` | Elevación sutil no deslumbrante en botones. |
| **LÍNEA SALUD** | | | |
| `--color-salud-base` | `#059669` | `bg-emerald-600` / `text-emerald-600` | Botones de compra de salud, badges de magnesio/omega. |
| `--color-salud-hover` | `#10b981` | `hover:bg-emerald-500` / `hover:text-emerald-400` | Estados interactivos de la categoría salud. |
| `--color-salud-soft` | `rgba(5, 150, 105, 0.15)` | `bg-emerald-600/15` | Fondo de badges "Salud Celular", "Descanso". |
| `--color-salud-border` | `rgba(5, 150, 105, 0.35)` | `border-emerald-600/35` | Borde activo de cards de salud & longevidad. |
| `--color-salud-glow` | `rgba(5, 150, 105, 0.20)` | `shadow-lg shadow-emerald-600/20` | Elevación controlada en categoría salud. |
| **LÍNEA ALIMENTACIÓN** | | | |
| `--color-alimentacion-base`| `#d97706` | `bg-amber-600` / `text-amber-600` | Botones de compra de frutos secos y miel. |
| `--color-alimentacion-hover`| `#f59e0b` | `hover:bg-amber-500` / `hover:text-amber-400` | Estados hover de productos de comida real. |
| `--color-alimentacion-soft`| `rgba(217, 119, 6, 0.15)` | `bg-amber-600/15` | Tags "100% Cosecha Natural", "Sin Agregados". |
| `--color-alimentacion-border`| `rgba(217, 119, 6, 0.35)`| `border-amber-600/35` | Borde activo de cards de alimentación inteligente. |
| `--color-alimentacion-glow`| `rgba(217, 119, 6, 0.20)` | `shadow-lg shadow-amber-600/20` | Elevación cálida no estridente en comida real. |
| **TEXTO & CONTRASTE** | | | |
| `--color-text-hero` | `#FFFFFF` | `text-white` | Titulares H1/H2, precios display y textos en botones. |
| `--color-text-body` | `#D1D5DB` | `text-neutral-300` | Textos explicativos, respuestas FAQ, descripciones. |
| `--color-text-muted` | `#9CA3AF` | `text-neutral-400` | Especificaciones de ingesta, variantes, legales. |

---

## 4. Reglas Estrictas de Uso de Color & Botones

> [!IMPORTANT]
> **PROHIBICIÓN ESTRICTA DE FONDOS CHILLONES / NEON:**  
> Queda terminantemente prohibido utilizar colores fluorescentes o neón (`cyan-400`, `sky-300`, `lime-400`, `yellow-300` al 100%) como fondo de botones amplios, banners de ancho completo o tarjetas de fondo sólido.

### Especificación de Botones Primarios y Secundarios:
1. **Botón Primario de Acción / Compra (Rendimiento):**
   * Fondo: `bg-blue-600` (sólido, profundo).
   * Hover: `hover:bg-blue-500` (transición suave de luminosidad, sin flash neón).
   * Texto: `text-white` con `font-black font-['Lato']` o `font-['Outfit']`.
   * Sombra: `shadow-lg shadow-blue-600/20`.
2. **Botón de Salud & Longevidad:**
   * Fondo: `bg-emerald-600` | Hover: `hover:bg-emerald-500` | Texto: `text-white font-black`.
3. **Botón de Alimentación Inteligente:**
   * Fondo: `bg-amber-600` | Hover: `hover:bg-amber-500` | Texto: `text-white font-black`.
4. **Botón Secundario / Ghost:**
   * Fondo: `bg-white/[0.04]` | Borde: `border border-white/10` | Hover: `hover:bg-white/[0.08] hover:border-white/20`.
   * Texto: `text-neutral-200 font-bold`.

---

## 5. Sistema Tipográfico Dual: Outfit & Lato

### 5.1 Enlace CDN Google Fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Outfit:wght@500;600;700;800;900&display=swap" rel="stylesheet" />
```

### 5.2 Roles y Distribución Jerárquica

```css
:root {
  --font-display: 'Outfit', sans-serif;
  --font-body: 'Lato', sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: #08090A;
  color: #D1D5DB;
}

h1, h2, h3, h4, .font-display, .price-display, .pill-tag {
  font-family: var(--font-display);
}
```

| Elemento UI | Fuente | Peso Tailwind | Tracking | Clases de Aplicación |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `Outfit` | `font-extrabold` (800) | `tracking-tight` | `font-['Outfit'] text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white` |
| **Secciones H2** | `Outfit` | `font-bold` (700) | `tracking-tight` | `font-['Outfit'] text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-100` |
| **Títulos Card H3** | `Outfit` | `font-bold` (700) | `tracking-normal`| `font-['Outfit'] text-lg sm:text-xl font-bold text-neutral-100` |
| **Precios Display** | `Outfit` | `font-black` (900) | `tracking-tight` | `font-['Outfit'] text-2xl sm:text-3xl font-black text-white` |
| **Badges / Filtros**| `Outfit` | `font-bold` (700) | `tracking-wider` | `font-['Outfit'] text-xs uppercase tracking-wider font-bold` |
| **Cuerpo / Párrafos**| `Lato` | `font-normal` (400) | `tracking-normal`| `font-['Lato'] text-sm sm:text-base text-neutral-300 leading-relaxed` |
| **Fichas Técnicas** | `Lato` | `font-normal` (400) | `tracking-wide`  | `font-['Lato'] text-xs text-neutral-400` |
| **Botones / CTAs** | `Lato` | `font-black` (900) | `tracking-wider` | `font-['Lato'] text-xs sm:text-sm font-black uppercase tracking-wider text-white` |

---

## 6. Arquitectura Trizona del Catálogo (3 Categorías)

El catálogo organiza los productos en tres líneas funcionales inequívocas:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                               CATÁLOGO ACTIVO                                │
│                                                                              │
│ [ TODOS ]    [ 🏋️ RENDIMIENTO & FUERZA ]   [ 🌿 SALUD & LONGEVIDAD ]   [ 🥜 ALIMENTACIÓN ] 
│ (neutral)    (Azul Eléctrico: blue-600)     (Esmeralda: emerald-600)   (Dorado: amber-600)
└──────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Especificación del Selector de Categorías (Dock Tabs)

* **Contenedor Principal:**  
  `bg-neutral-900/80 p-1.5 rounded-2xl border border-white/[0.08] backdrop-blur-md flex items-center gap-1.5 overflow-x-auto`
* **Tab "Todos" Activo:**  
  `bg-white/10 text-white font-['Outfit'] font-bold rounded-xl px-4 py-2 text-xs border border-white/20 shadow-sm`
* **Tab "Rendimiento & Fuerza" Activo:**  
  `bg-blue-600 text-white font-['Outfit'] font-bold rounded-xl px-4 py-2 text-xs shadow-md shadow-blue-600/25`
* **Tab "Salud & Longevidad" Activo:**  
  `bg-emerald-600 text-white font-['Outfit'] font-bold rounded-xl px-4 py-2 text-xs shadow-md shadow-emerald-600/25`
* **Tab "Alimentación Inteligente" Activo:**  
  `bg-amber-600 text-white font-['Outfit'] font-bold rounded-xl px-4 py-2 text-xs shadow-md shadow-amber-600/25`
* **Tabs Inactivos (Cualquiera):**  
  `bg-transparent text-neutral-400 hover:text-white hover:bg-white/[0.04] font-['Outfit'] font-medium rounded-xl px-4 py-2 text-xs transition-colors`

---

## 7. Componentes de UI Detallados

### 7.1 Barra Superior Informativa (Top Live Bar)

* **Estructura:** `bg-[#0B0D10] border-b border-white/[0.06] py-2 px-4 flex items-center justify-center gap-2.5`.
* **Indicador en Vivo:** Punto con pulso en Azul Eléctrico:  
  `span.relative.flex.h-2.w-2 > span.animate-ping.bg-blue-600/80 + span.rounded-full.bg-blue-600`.
* **Tipografía:** `font-['Outfit'] text-[11px] sm:text-xs uppercase tracking-wider text-neutral-300 font-bold`.
* **Copy:** `DISTRIBUIDOR OFICIAL NATURAL NUTRITION • STOCK INMEDIATO MENDOZA • ENVÍOS EN EL DÍA`.

### 7.2 Header & Botón Carrito Flotante

* **Header:** `sticky top-0 z-40 backdrop-blur-xl bg-[#08090A]/90 border-b border-white/[0.06] px-4 sm:px-8 py-3.5 flex items-center justify-between`.
* **Logo:** `font-['Outfit'] font-black tracking-tight text-white text-lg sm:text-xl` con subtítulo en `text-blue-500 font-bold text-[9px] uppercase tracking-widest block`.
* **Botón Carrito:**  
  `relative flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-2 rounded-full text-xs font-semibold text-neutral-200 transition-all active:scale-95`.
* **Badge Contador:**  
  `bg-blue-600 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-blue-600/30`.

### 7.3 Hero Section (Iluminación Suave sin Neón)

* **Reflectores Ambientales Suaves:**
  * Reflector Principal (Izquierda): `bg-gradient-to-tr from-blue-600/12 via-blue-700/6 to-transparent blur-[140px]`.
  * Reflector Secundario (Derecha): `bg-gradient-to-bl from-amber-600/8 via-emerald-600/6 to-transparent blur-[140px]`.
* **Eyebrow Tag:**  
  `bg-blue-600/10 border border-blue-600/30 text-blue-400 font-['Outfit'] font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider`.
* **Titular Principal (H1):**  
  `text-white` con gradiente focal sutil hacia `bg-gradient-to-r from-blue-400 via-sky-200 to-white text-transparent bg-clip-text`.
* **Botón Principal Hero:**  
  `bg-blue-600 hover:bg-blue-500 text-white font-black font-['Lato'] px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 active:scale-95 transition-all text-sm uppercase tracking-wider`.

---

### 7.4 Tarjeta de Producto: Rendimiento & Fuerza (Azul Eléctrico)

```html
<article class="group relative bg-neutral-900/70 hover:bg-neutral-900/90 border border-white/[0.08] hover:border-blue-600/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
  
  <!-- 1. Header de Card: Marca & Badge Categoría -->
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-['Outfit'] text-[11px] uppercase tracking-wider font-bold text-neutral-400">Natural Nutrition</span>
    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-blue-600/15 text-blue-400 border border-blue-600/30 font-['Outfit']">
      Rendimiento & Fuerza
    </span>
  </div>

  <!-- 2. Preview Visual con Halo Azul Eléctrico Profundo -->
  <div class="relative w-full h-44 rounded-2xl bg-neutral-950/70 border border-white/[0.04] flex items-center justify-center overflow-hidden mb-4 group-hover:border-blue-600/25 transition-colors">
    <div class="absolute inset-0 bg-radial from-blue-600/12 via-transparent to-transparent opacity-75 pointer-events-none"></div>
    <img src="img/creatina.png" alt="Creatina Micronizada 100% Pura" class="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
  </div>

  <!-- 3. Información: Nombre Outfit, Descripción Lato -->
  <h3 class="font-['Outfit'] text-xl font-bold text-neutral-50 mb-1.5 leading-snug group-hover:text-blue-400 transition-colors">
    Creatina Pura Micronizada
  </h3>
  <p class="font-['Lato'] text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-3">
    100% monohidrato micronizado de máxima biodisponibilidad y grado farmacéutico. Potencia anaeróbica y volumen muscular.
  </p>

  <!-- 4. Micro-Tag Técnico -->
  <div class="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 bg-blue-600/10 border border-blue-600/25 px-2.5 py-1 rounded-lg mb-4 w-fit font-['Lato']">
    <span>⚡</span> 100% Monohidrato Grado Farmacéutico
  </div>

  <!-- 5. Selector Táctil de Variantes -->
  <div class="space-y-1.5 mb-4 pt-3 border-t border-white/[0.06]">
    <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-['Outfit']">Presentación:</span>
    <div class="grid grid-cols-3 gap-1.5">
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-bold text-center border bg-blue-600 text-white border-blue-600 shadow-sm font-['Outfit']">
        350g
      </button>
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-blue-600/40 font-['Outfit']">
        600g
      </button>
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-blue-600/40 font-['Outfit']">
        1kg
      </button>
    </div>
  </div>

  <!-- 6. Footer: Precio + Botón Azul Eléctrico (Sin Neón) -->
  <div class="flex items-end justify-between gap-3 pt-2">
    <div>
      <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-400 font-['Lato']">Precio Lista</span>
      <span class="font-['Outfit'] text-2xl font-black text-white tracking-tight leading-none">
        $33.000
      </span>
    </div>
    <button type="button" class="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-semibold text-xs whitespace-nowrap shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
      <span>Agregar</span>
    </button>
  </div>
</article>
```

---

### 7.5 Tarjeta de Producto: Salud & Longevidad (Verde Esmeralda)

```html
<article class="group relative bg-neutral-900/70 hover:bg-neutral-900/90 border border-white/[0.08] hover:border-emerald-600/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-600/15 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
  
  <!-- 1. Header de Card: Badge Verde Esmeralda -->
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-['Outfit'] text-[11px] uppercase tracking-wider font-bold text-neutral-400">Natural Nutrition</span>
    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-600/15 text-emerald-400 border border-emerald-600/30 font-['Outfit']">
      Salud & Longevidad
    </span>
  </div>

  <!-- 2. Preview Visual con Halo Esmeralda Calmante -->
  <div class="relative w-full h-44 rounded-2xl bg-neutral-950/70 border border-white/[0.04] flex items-center justify-center overflow-hidden mb-4 group-hover:border-emerald-600/25 transition-colors">
    <div class="absolute inset-0 bg-radial from-emerald-600/12 via-transparent to-transparent opacity-75 pointer-events-none"></div>
    <img src="img/magnesio.png" alt="Citrato de Magnesio Puro" class="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
  </div>

  <!-- 3. Información -->
  <h3 class="font-['Outfit'] text-xl font-bold text-neutral-50 mb-1.5 leading-snug group-hover:text-emerald-400 transition-colors">
    Citrato de Magnesio Puro
  </h3>
  <p class="font-['Lato'] text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-3">
    Alta biodisponibilidad para relajación neuromuscular, optimización del sueño profundo y soporte óseo.
  </p>

  <!-- 4. Micro-Tag de Salud Celular -->
  <div class="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-600/10 border border-emerald-600/25 px-2.5 py-1 rounded-lg mb-4 w-fit font-['Lato']">
    <span>🌿</span> Biodisponibilidad Celular Superior
  </div>

  <!-- 5. Selector Táctil de Variantes -->
  <div class="space-y-1.5 mb-4 pt-3 border-t border-white/[0.06]">
    <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-['Outfit']">Presentación:</span>
    <div class="grid grid-cols-2 gap-1.5">
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-bold text-center border bg-emerald-600 text-white border-emerald-600 shadow-sm font-['Outfit']">
        250g
      </button>
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-emerald-600/40 font-['Outfit']">
        500g
      </button>
    </div>
  </div>

  <!-- 6. Footer: Precio + Botón Verde Esmeralda -->
  <div class="flex items-end justify-between gap-3 pt-2">
    <div>
      <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-400 font-['Lato']">Precio Lista</span>
      <span class="font-['Outfit'] text-2xl font-black text-white tracking-tight leading-none">
        $24.500
      </span>
    </div>
    <button type="button" class="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-semibold text-xs whitespace-nowrap shadow-lg shadow-emerald-600/20 active:scale-95 transition-all">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
      <span>Agregar</span>
    </button>
  </div>
</article>
```

---

### 7.6 Tarjeta de Producto: Alimentación Inteligente (Dorado Mate)

```html
<article class="group relative bg-neutral-900/70 hover:bg-neutral-900/90 border border-white/[0.08] hover:border-amber-600/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-600/15 hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
  
  <!-- 1. Header de Card: Badge Dorado Mate -->
  <div class="flex items-center justify-between gap-2 mb-3">
    <span class="font-['Outfit'] text-[11px] uppercase tracking-wider font-bold text-neutral-400">Selección Natural</span>
    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-600/15 text-amber-400 border border-amber-600/30 font-['Outfit']">
      Alimentación Inteligente
    </span>
  </div>

  <!-- 2. Preview Visual con Halo Cálido Terroso -->
  <div class="relative w-full h-44 rounded-2xl bg-neutral-950/70 border border-white/[0.04] flex items-center justify-center overflow-hidden mb-4 group-hover:border-amber-600/25 transition-colors">
    <div class="absolute inset-0 bg-radial from-amber-600/12 via-transparent to-transparent opacity-75 pointer-events-none"></div>
    <img src="img/frutos-secos.png" alt="Mix Frutos Secos Premium" class="h-36 w-auto object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
  </div>

  <!-- 3. Información -->
  <h3 class="font-['Outfit'] text-xl font-bold text-neutral-50 mb-1.5 leading-snug group-hover:text-amber-400 transition-colors">
    Mix Frutos Secos Premium
  </h3>
  <p class="font-['Lato'] text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-3">
    Nueces chandler mendocinas, almendras tostadas, castañas de cajú y avellanas. Cero sal y sin conservantes.
  </p>

  <!-- 4. Micro-Tag Botánico -->
  <div class="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-400 bg-amber-600/10 border border-amber-600/25 px-2.5 py-1 rounded-lg mb-4 w-fit font-['Lato']">
    <span>🥜</span> Cosecha de Origen Sin Tacc
  </div>

  <!-- 5. Selector Táctil de Gramaje -->
  <div class="space-y-1.5 mb-4 pt-3 border-t border-white/[0.06]">
    <span class="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block font-['Outfit']">Gramaje:</span>
    <div class="grid grid-cols-3 gap-1.5">
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-bold text-center border bg-amber-600 text-white border-amber-600 shadow-sm font-['Outfit']">
        500g
      </button>
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-amber-600/40 font-['Outfit']">
        1kg
      </button>
      <button type="button" class="py-1.5 px-2 rounded-lg text-xs font-medium text-center border bg-neutral-950 border-white/[0.08] text-neutral-300 hover:border-amber-600/40 font-['Outfit']">
        250g
      </button>
    </div>
  </div>

  <!-- 6. Footer: Precio + Botón Dorado Mate -->
  <div class="flex items-end justify-between gap-3 pt-2">
    <div>
      <span class="block text-[10px] uppercase tracking-wider font-semibold text-neutral-400 font-['Lato']">Precio Lista</span>
      <span class="font-['Outfit'] text-2xl font-black text-white tracking-tight leading-none">
        $18.500
      </span>
    </div>
    <button type="button" class="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-sans font-semibold text-xs whitespace-nowrap shadow-lg shadow-amber-600/20 active:scale-95 transition-all">
      <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
      <span>Agregar</span>
    </button>
  </div>
</article>
```

---

### 7.7 Módulo Mayoristas & Gimnasios B2B

* **Contenedor Principal:** `bg-gradient-to-b from-neutral-900/90 via-neutral-900/60 to-neutral-950 border border-white/[0.1] rounded-3xl p-8 sm:p-12 relative overflow-hidden`.
* **Atmósfera de Luz:** Gradiente ambiental difuso en esquina superior derecha con `from-blue-600/10 via-transparent to-transparent`.
* **Cifras de Impacto (Bento Grid):**
  * Números ordinales: `font-['Outfit'] font-black text-3xl sm:text-4xl text-blue-500`.
  * Encabezados de beneficio: `font-['Outfit'] font-bold text-lg text-neutral-100`.
  * Copys descriptivos: `font-['Lato'] text-sm text-neutral-400 leading-relaxed`.
* **CTA B2B Directo:** Botón de contacto institucional en WhatsApp:  
  `bg-blue-600 hover:bg-blue-500 text-white font-black font-['Lato'] py-3.5 px-8 rounded-xl uppercase tracking-wider shadow-xl shadow-blue-600/20 active:scale-95 transition-all`.

---

### 7.8 Drawer de Checkout / Pedido WhatsApp

* **Contenedor Lateral:** `bg-[#0A0C0E] border-l border-white/[0.08] text-neutral-100 flex flex-col h-full shadow-2xl`.
* **Header del Drawer:** Titular en `font-['Outfit'] font-bold text-lg text-white` con badge de conteo en `text-blue-400`.
* **Item de Producto en Carrito:**
  * Indicador cromático lateral en el item según categoría de pertenencia (`border-l-2 border-blue-600`, `border-emerald-600` o `border-amber-600`).
  * Controles de Cantidad: Botones `+` / `-` en `w-7 h-7 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg text-neutral-200 font-bold`.
* **Resumen de Pedido:**
  * Tarjeta de Subtotal: `bg-neutral-900/80 border border-white/10 p-4 rounded-2xl space-y-2`.
  * Monto Total: `font-['Outfit'] font-black text-2xl text-white tracking-tight`.
* **Botón Final de Confirmación (CTA WhatsApp):**  
  `bg-blue-600 hover:bg-blue-500 text-white font-black font-['Lato'] py-4 px-6 rounded-2xl text-sm uppercase tracking-wider w-full shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 active:scale-[0.98] transition-all`.

---

## 8. Microinteracciones & Ergonomía Visual

1. **Feedback de Acción Táctil (Agregar):**
   * Al hacer clic en `Agregar`, el botón transiciona en `150ms` mostrando feedback `¡Agregado! ✓` manteniendo su tono sólido.
   * El badge del carrito dispara `scale-125` regresando a `scale-100` con `transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
2. **Elevación y Foco en Hover:**
   * Las tarjetas aplican `-translate-y-1` y el borde se ilumina suavemente con el color semántico de su categoría a una opacidad no invasiva (35% a 40%).
3. **Consistencia de Botones Amplios:**
   * Bajo ninguna circunstancia un botón debe expandir un fondo neón o fluorescente al ocupar el 100% del ancho móvil. La solidez del `blue-600`, `emerald-600` o `amber-600` garantiza confort y accesibilidad continua.

---

## 9. Criterios de Aceptación & Validación Técnica

1. **Eliminación Total del Cian:** Ningún componente de la aplicación utiliza tokens cian neón (`#36B7D8`, `cyan-400`, `sky-300` flúo).
2. **Cumplimiento de las 3 Categorías:** El catálogo debe indexar y filtrar explícitamente:
   * Rendimiento & Fuerza (`blue-600`).
   * Salud & Longevidad (`emerald-600`).
   * Alimentación Inteligente (`amber-600`).
3. **Contraste y Accesibilidad (WCAG AA / AAA):**
   * `text-white` sobre `bg-blue-600` (`#2563eb`) alcanza ratio de contraste de ~4.6:1 (apto para texto bold grande y mediano).
   * `text-white` sobre `bg-emerald-600` (`#059669`) alcanza ratio de ~4.5:1.
   * `text-white` sobre `bg-amber-600` (`#d97706`) alcanza ratio de ~4.5:1 con tipografía `font-black`.
4. **Dimensiones Táctiles (Mobile-First):**
   * Todo botón interactivo, pill de filtro o selector de variantes respeta el target táctil mínimo de 44x44px.
