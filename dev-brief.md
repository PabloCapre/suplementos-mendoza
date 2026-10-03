# Developer Master Brief (dev-brief.md)
**Documento Maestro de Desarrollo Frontend**  
**Proyecto:** Suplementos Mendoza  
**Agencia:** WAFLERS  
**Destinatario:** Ingeniero Frontend  
**Enfoque de Redacción:** Premium Quirúrgico (Orgánico, sin adjetivos inflados, directo a la conversión)  
**Canal Oficial de WhatsApp:** `+5492613364201`  
**Dominio:** `suplementosmendoza.com.ar`  

---

## 1. Lineamientos de Diseño y Tokens de Tailwind CSS

### 1.1 Paleta de Color y Atmósfera Visual
El diseño debe transmitir pureza, rendimiento deportivo y alimentación limpia. Evitamos el estilo "tienda de esteroides" o "neón estridente"; priorizamos un look nórdico/moderno con fondos oscuros profundos, blancos puros y acentos orgánicos de alta visibilidad.

* **Fondo Principal (Background):** `bg-zinc-950` (#09090b)
* **Superficies y Cards:** `bg-zinc-900/90 border border-zinc-800/80`
* **Superficies Elevadas (Modales/Drawer):** `bg-zinc-900 border-l border-zinc-800`
* **Texto Primario:** `text-zinc-100` (Títulos y valores)
* **Texto Secundario/Muted:** `text-zinc-400` (Subtítulos, especificaciones)
* **Acento Deportivo / Conversión (Primario):** `bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold` (Asociado a WhatsApp y vitalidad biológica)
* **Acento Secundario (Badges / Destacados):** `bg-amber-500/10 text-amber-400 border border-amber-500/20`
* **Acento Nutrición Consciente:** `bg-lime-500/10 text-lime-400 border border-lime-500/20`

### 1.2 Tipografía
* **Font Sans:** `'Plus Jakarta Sans', 'Inter', system-ui, sans-serif`
* **Pesos recomendados:** `font-normal` (400) para lectura, `font-medium` (500) para specs y `font-bold` (700) para titulares y llamados a la acción.

---

## 2. Inyección de Metadata y Schema JSON-LD (Head HTML)

Inyectar de forma directa en el `<head>` del archivo raíz (`index.html`):

```html
<!-- Meta Tags Primarios -->
<title>Suplementos Mendoza | Distribuidor Natural Nutrition Oficial</title>
<meta name="title" content="Suplementos Mendoza | Distribuidor Natural Nutrition Oficial" />
<meta name="description" content="Distribuidor oficial de Natural Nutrition en Mendoza. Creatina pura, proteínas y alimentos inteligentes. Envíos en Gran Mendoza. Pedí directo por WhatsApp." />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#09090b" />
<link rel="canonical" href="https://suplementosmendoza.com.ar/" />

<!-- Open Graph / Redes / WhatsApp Previews -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://suplementosmendoza.com.ar/" />
<meta property="og:title" content="Suplementos Mendoza | Distribuidor Natural Nutrition Oficial" />
<meta property="og:description" content="Distribuidor oficial de Natural Nutrition en Mendoza. Creatina pura, proteínas y alimentos inteligentes. Envíos en Gran Mendoza. Pedí directo por WhatsApp." />
<meta property="og:image" content="https://suplementosmendoza.com.ar/og-suplementos-mendoza.jpg" />
<meta property="og:locale" content="es_AR" />
<meta property="og:site_name" content="Suplementos Mendoza" />

<!-- Schema Markup LocalBusiness (JSON-LD) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Store", "HealthAndBeautyBusiness"],
      "@id": "https://suplementosmendoza.com.ar/#localbusiness",
      "name": "Suplementos Mendoza",
      "alternateName": "Distribuidor Oficial Natural Nutrition Mendoza",
      "description": "Distribuidor oficial de suplementos deportivos Natural Nutrition y alimentos inteligentes en Mendoza. Venta minorista y mayorista para gimnasios y particulares.",
      "url": "https://suplementosmendoza.com.ar",
      "telephone": "+5492613364201",
      "email": "suplenaturalmendoza@gmail.com",
      "priceRange": "$$",
      "image": "https://suplementosmendoza.com.ar/logo.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mendoza",
        "addressRegion": "Mendoza",
        "addressCountry": "AR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -32.8895,
        "longitude": -68.8458
      },
      "areaServed": [
        { "@type": "City", "name": "Ciudad de Mendoza" },
        { "@type": "City", "name": "Godoy Cruz" },
        { "@type": "City", "name": "Guaymallén" },
        { "@type": "City", "name": "Las Heras" },
        { "@type": "City", "name": "Luján de Cuyo" },
        { "@type": "City", "name": "Maipú" }
      ],
      "sameAs": [
        "https://www.instagram.com/suplementacionnaturalmza/"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+5492613364201",
        "contactType": "customer service",
        "contactOption": "WhatsApp",
        "areaServed": "AR",
        "availableLanguage": "Spanish"
      },
      "brand": {
        "@type": "Brand",
        "name": "Natural Nutrition",
        "sameAs": "https://www.naturalnutrition.com.ar/"
      }
    }
  ]
}
</script>
```

---

## 3. Texto Final Sección por Sección (Listo para Copiar y Pegar)

### 3.1 Barra Superior Informativa (Top Announcement Bar)
* **Contenedor:** `bg-zinc-900 border-b border-zinc-800 text-xs py-2 px-4 text-center text-zinc-400 font-medium`
* **Texto:**
  `📍 Distribuidor Oficial Natural Nutrition en Mendoza | Envíos a domicilio en Gran Mendoza y puntos de retiro`

---

### 3.2 Header / Navegación
* **Contenedor:** `sticky top-0 z-40 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800/80 px-4 md:px-8 py-3.5`
* **Logo Brand:** `SUPLEMENTOS MENDOZA` (Subtítulo en micro-letra: `DISTRIBUIDOR OFICIAL NN`)
* **Enlaces de Navegación:**
  * `Catálogo` (`href="#catalogo"`)
  * `Alimentación Real` (`href="#alimentacion"`)
  * `Gimnasios & Mayoristas` (`href="#mayoristas"`)
  * `Filosofía` (`href="#origen"`)
* **Botón Carrito Flotante / Trigger:**
  * **Clases:** `relative flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 px-4 py-2 rounded-full text-sm font-medium text-zinc-200 transition-all`
  * **Icono:** Carrito de compras (`ShoppingBag` o `ShoppingCart`)
  * **Texto:** `Tu Pedido`
  * **Badge de Cantidad:** `bg-emerald-500 text-zinc-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center`

---

### 3.3 Hero Section (Encabezado Principal)
* **Tag / Eyebrow:** `⚡ SUPLEMENTACIÓN LIMPIA & ALIMENTACIÓN CONSCIENTE`
  * *Clases:* `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6`
* **H1 Principal:**
  `Rendimiento y nutrición real en Mendoza. Sin fórmulas de relleno ni sobreprecios.`
  * *Clases:* `text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 max-w-4xl leading-tight`
* **Subtítulo:**
  `Somos distribuidores oficiales de Natural Nutrition en Mendoza y curadores de alimentos inteligentes seleccionados. Productos puros, trazables y probados para tu salud y entrenamiento físico.`
  * *Clases:* `text-base sm:text-lg text-zinc-400 max-w-2xl mt-4 leading-relaxed`
* **Botones de Acción (CTAs):**
  * **CTA Primario:** `Explorar Catálogo y Armar Pedido` (`href="#catalogo"`)
    * *Clases:* `inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all shadow-lg shadow-emerald-500/10`
  * **CTA Secundario:** `Venta Mayorista para Gimnasios` (`href="#mayoristas"`)
    * *Clases:* `inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 font-medium transition-all`
* **Micro-Trust Badges (Debajo del Hero):**
  * `✓ Distribución oficial directa de fábrica`
  * `✓ Calidad y pureza comprobada en laboratorio`
  * `✓ Envíos coordinados en Gran Mendoza`

---

### 3.4 Catálogo de Productos y Selector de Categorías

#### Filtros de Pestañas (Tabs)
* `Todos los Productos` (`filter: 'all'`)
* `🏋️ Rendimiento & Fuerza` (`filter: 'rendimiento'`)
* `🌿 Salud & Longevidad` (`filter: 'salud'`)
* `🥜 Alimentación Inteligente` (`filter: 'alimentacion'`)

#### Fichas de Productos (14 Items con Copys y Variantes Exactas)

```javascript
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
    description: "Aislado proteico de alta pureza con aminograma completo. 907 gramos (30 porciones) ideales para síntesis proteica muscular con digestión liviana y sin lactosa.",
    variants: [
      { label: "Doypack 907g (30 porciones)", price: 47800, value: "907g" }
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
```

---

### 3.5 Drawer / Modal de Carrito de Compras (Tu Pedido WhatsApp)

* **Encabezado del Drawer:**
  * **Título:** `Tu Pedido`
  * **Subtítulo:** `Revisá tus productos y coordinamos la entrega por WhatsApp`
* **Si el carrito está vacío:**
  * `Tu pedido todavía está vacío.`
  * `Seleccioná los suplementos o alimentos que necesitás del catálogo para comenzar.`
  * *Botón:* `Ver Catálogo`
* **Controles de Item en Carrito:**
  * Nombre del producto + Variante seleccionada
  * Precio unitario
  * Botones `[-]` y `[+]` de cantidad
  * Botón `Eliminar` (icono de cesto)
* **Resumen de Valores:**
  * `Subtotal estimado: $[TOTAL]`
  * `Envío: A coordinar según zona en Gran Mendoza`
* **Formulario Express (Campos):**
  1. `Tu Nombre y Apellido *` (Placeholder: `Ej: Martín Rossi`)
  2. `Tu WhatsApp de Contacto *` (Placeholder: `Ej: 261 555-0123`)
  3. `Modalidad de Entrega *`:
     * `( ) Envío a domicilio en Gran Mendoza`
     * `( ) Retiro en punto coordinado`
  4. `Dirección / Barrio / Localidad` (Visible/Requerido solo si elige envío. Placeholder: `Ej: Godoy Cruz, calle Belgrano 450`)
  5. `Forma de Pago Preferida *`:
     * `( ) Transferencia bancaria (Alias/CBU)`
     * `( ) Efectivo al recibir`
  6. `Notas o modificaciones especiales (Opcional)`:
     * (Placeholder: `Ej: Quiero el mix de frutos secos sin pasas de uva / Entregar por la tarde`)
* **Botón Principal de Cierre:**
  * **Texto:** `Confirmar Pedido por WhatsApp 📲`
  * **Clases:** `w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all`
  * **Disclaimer de Privacidad/Fricción:** `Al presionar se abrirá tu WhatsApp con el detalle listo para enviar. No requerimos registro ni tarjeta de crédito.`

#### Función Generadora del Mensaje de WhatsApp
```javascript
export function buildWhatsAppLink(cartItems, formData) {
  const WHATSAPP_PHONE = "5492613364201";
  
  const itemsText = cartItems.map(item => 
    `• ${item.quantity}x ${item.name} (${item.selectedVariant.label}) - $${(item.selectedVariant.price * item.quantity).toLocaleString('es-AR')}`
  ).join("\n");

  const total = cartItems.reduce((acc, item) => acc + (item.selectedVariant.price * item.quantity), 0);

  const message = 
`🛒 *NUEVO PEDIDO - SUPLEMENTOS MENDOZA*
------------------------------------------
👤 *Cliente:* ${formData.name.trim()}
📱 *Contacto:* ${formData.phone.trim()}
📍 *Entrega:* ${formData.deliveryType === 'envio' ? `Envío a domicilio - ${formData.address.trim()}` : 'Retiro coordinado'}
💳 *Pago:* ${formData.paymentMethod === 'transferencia' ? 'Transferencia Bancaria' : 'Efectivo contra entrega'}

📦 *Detalle del Pedido:*
${itemsText}

💰 *TOTAL: $${total.toLocaleString('es-AR')}*
${formData.notes.trim() ? `\n📝 *Notas:* ${formData.notes.trim()}` : ''}
------------------------------------------
_Enviado desde suplementosmendoza.com.ar_`;

  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
```

---

### 3.6 Sección: Filosofía & Criterio de Selección (El Origen)
* **Contenedor:** `py-20 px-4 md:px-8 border-t border-zinc-800 bg-zinc-950`
* **Eyebrow:** `TRANSPARENCIA & COMIDA REAL`
* **H2:** `No vendemos lo que está de moda. Vendemos lo que nosotros mismos tomamos.`
* **Párrafo 1 (La búsqueda personal):**
  `Suplementos Mendoza nació de un proceso propio. Pasé años probando marcas, analizando etiquetas y buscando una nutrición que realmente optimizara mi salud, mi energía física y mi claridad mental sin pagar sobreprecios ridículos por marketing vacío. Cuando encontré lo que funcionaba, empecé a recomendárselo a las personas que más cuido: mi familia, mis amigos y mis compañeros de entrenamiento.`
* **Párrafo 2 (Por qué Natural Nutrition):**
  `Elegí convertirme en distribuidor oficial de Natural Nutrition porque fabrican en el país con materias primas de pureza demostrada, sin agregados innecesarios y con una relación calidad/precio que respeta el bolsillo del que entrena de verdad.`
* **Párrafo 3 (El valor de la Alimentación Inteligente):**
  `La línea de alimentación inteligente no es un relleno de catálogo: es un servicio de comida real. El mix de frutos secos lo formulé con proporciones precisas para abastecer de micronutrientes diarios al cuerpo con solo un puñado al día. Sumamos miel cruda sin glucosa comercial, café de especialidad de origen puro y adaptógenos naturales porque creemos que la suplementación sin comida real no tiene sentido.`

---

### 3.7 Sección B2B: Gimnasios, Boxes & Centros de Bienestar
* **Contenedor:** `py-16 px-4 md:px-8 bg-zinc-900/50 border-y border-zinc-800 rounded-3xl mx-4 md:mx-8 my-12`
* **Badge B2B:** `CANAL MAYORISTA & PUNTOS DE VENTA`
* **H2:** `¿Tenés un Gimnasio, Box de CrossFit, Estudio de Yoga o Centro de Estética en Mendoza?`
* **Subtítulo:**
  `Incorporá la línea oficial de Natural Nutrition y alimentos inteligentes en tu espacio con stock inmediato en Mendoza, sin pagar fletes desde Buenos Aires ni lidiar con compras mínimas inalcanzables.`
* **Puntos Clave para Aliados:**
  * **Margen Comercial Competitivo:** Precios directos de fábrica para que tu establecimiento genere ingresos reales por venta cruzada.
  * **Stock Local Permanente:** Olvidate de esperar 10 días a que llegue una encomienda nacional. Abastecimiento ágil en el Gran Mendoza.
  * **Criterio según tu Disciplina:** Te asesoramos sobre qué productos tienen mayor rotación en tu comunidad (Creatina y Pre-Work para gimnasios; Colágeno, Adaptógenos y Snacks inteligentes para centros de bienestar y yoga).
* **Botón CTA B2B:**
  * **Texto:** `Solicitar Catálogo Mayorista para Gimnasios 💬`
  * **Enlace WhatsApp directo:** `https://wa.me/5492613364201?text=Hola!%20Tengo%20un%20gimnasio/espacio%20en%20Mendoza%20y%20me%20gustar%C3%ADa%20recibir%20la%20lista%20de%20precios%20mayorista%20y%20condiciones%20de%20Natural%20Nutrition.`

---

### 3.8 Sección: Preguntas Frecuentes (FAQ)
* **H2:** `Preguntas Frecuentes sobre Compras y Envíos en Mendoza`

1. **¿Cómo coordino el pago y la entrega de mi pedido?**  
   *Al armar tu pedido en la web hacés clic en "Confirmar Pedido por WhatsApp". Se enviará el detalle exacto a nuestro número. Ahí te pasamos los datos de transferencia bancaria (o coordinamos pago en efectivo) y te confirmamos el día y horario exacto de entrega.*

2. **¿A qué zonas de Mendoza llegan con los envíos?**  
   *Hacemos entregas a domicilio en todo el Gran Mendoza: Ciudad, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo y Maipú. También podemos acordar puntos de entrega según tu comodidad.*

3. **¿La creatina y los suplementos de Natural Nutrition son 100% puros?**  
   *Sí. Natural Nutrition es una fábrica nacional habilitada que formula con materias primas de grado farmacéutico. La creatina monohidrato es 100% pura y micronizada, sin saborizantes, azúcares ni agentes de carga.*

4. **¿Puedo personalizar los ingredientes del mix de frutos secos?**  
   *Absolutamente. La receta base está pensada para cubrir micronutrientes diarios con nueces, almendras, castañas de cajú, maní, pasas y frutas desecadas. Si preferís sacar las pasas, sumar más nueces o cambiar algún fruto, solo tenés que aclararlo en las notas de tu pedido al enviarlo.*

5. **¿Qué medios de pago aceptan?**  
   *Aceptamos transferencias bancarias directas (Mercado Pago, bancos con CBU/CVU) y efectivo contra entrega al momento de recibir tus productos.*

---

### 3.9 Footer (Pie de Página)
* **Marca:** `Suplementos Mendoza`
* **Bajada:** `Distribuidor Oficial Natural Nutrition. Suplementación deportiva limpia y alimentación consciente en la provincia de Mendoza.`
* **Canales de Contacto Directo:**
  * `WhatsApp: +54 9 261 336-4201` (`https://wa.me/5492613364201`)
  * `Instagram: @suplementacionnaturalmza` (`https://www.instagram.com/suplementacionnaturalmza/`)
  * `Email: suplenaturalmendoza@gmail.com`
  * `Web Oficial: suplementosmendoza.com.ar`
* **Legales:**
  `© 2024 Suplementos Mendoza. Todos los derechos reservados. Diseñado y desarrollado por WAFLERS.`
