# PRD: Suplementos Mendoza
**Documento de Requerimientos de Producto (Product Requirements Document)**  
**Agencia:** WAFLERS  
**Versión:** 1.0 (Fase MVP)  
**Estado:** Aprobado para Construcción  
**Fecha:** Octubre 2024 / Actualizado  
**Dominio:** `suplementosmendoza.com.ar`  
**Canal Principal de Cierre:** WhatsApp (+54 9 261 336-4201 / `+5492613364201`)  

---

## 1. Resumen Ejecutivo y Objetivos

### 1.1 Visión del Producto
Transformar la presencia digital de **Suplementos Mendoza** de una landing estática a una **plataforma ágil de catálogo interactivo con checkout directo a WhatsApp** (funnel WhatsApp-First). 
La plataforma posiciona al cliente como el **distribuidor local de confianza de Natural Nutrition (NN)** y referente en **alimentación consciente/inteligente** en Mendoza, abriendo dos líneas comerciales simultáneas:
1. **B2C (Consumidor Final):** Venta directa a deportistas y personas que buscan salud real, con carrito interactivo y pedido formateado a WhatsApp sin fricción de pasarelas de pago.
2. **B2B (Gimnasios y Centros de Bienestar):** Canal de captación de gimnasios, boxes de crossfit, centros de yoga, estética y nutricionistas para distribución mayorista local en Mendoza.

### 1.2 Objetivos Clave (KPIs)
* **Tasa de Conversión a WhatsApp:** > 8% de visitantes que agreguen productos y envíen el pedido formateado.
* **Tiempo de Carga Móvil:** < 1.5s (Mobile-First, optimizado para tráfico proveniente de Instagram Reels/Stories).
* **Fricción Cero en Checkout:** Máximo 4 campos obligatorios antes de disparar el mensaje de WhatsApp.
* **Captación B2B:** Generar al menos 5-10 contactos calificados de gimnasios/profesionales locales por mes.

---

## 2. Definición del Usuario y Casos de Uso

### 2.1 Personas de Usuario
1. **El Entrenado / Deportista Práctico (B2C):**
   * *Dolor:* Busca creatina o proteínas de calidad sin pagar precios inflados de marcas importadas dudosas o tiendas con sobreprecio.
   * *Acción:* Entra, filtra por "Rendimiento", elige el tamaño de creatina (350g o 600g), agrega al pedido y coordina entrega rápida en el Gran Mendoza.
2. **El Consciente / Bienestar & Longevidad (B2C):**
   * *Dolor:* Cansado de suplementos con relleno ("humo") o alimentos ultraprocesados. Quiere comida real (frutos secos balanceados, miel pura, adaptógenos, CMZ, Omega 3).
   * *Acción:* Revisa la sección de Alimentación Inteligente, valora la curación y la historia del fundador, arma un pedido mixto.
3. **El Dueño de Gimnasio / Entrenador / Box (B2B):**
   * *Dolor:* Los fletes interprovinciales son caros, demoran y exigen compras mínimas gigantescas. Quieren un proveedor en Mendoza con stock inmediato y margen.
   * *Acción:* Entra a la sección "Mayoristas / Gimnasios" y solicita lista de precios mayorista por WhatsApp.

---

## 3. Arquitectura de Información y Mapa de Sitio

```
[ suplementosmendoza.com.ar ]
├── Barra Superior de Confianza (Distribuidor Oficial NN | Envíos Gran Mendoza)
├── Navbar (Branding, Acceso a Categorías, Botón de Carrito con Contador Flotante)
├── Hero Section (Propuesta de valor cruda, badges de pureza/fábrica, CTA dual)
├── Catálogo Interactivo
│   ├── Filtro de Categorías:
│   │   ├── Todos los Productos
│   │   ├── ⚡ Rendimiento & Fuerza (Creatina, Pre-Work, Proteína)
│   │   ├── 🌿 Salud & Vitalidad (Colágeno, Omega 3, CMZ, Vitaminas)
│   │   └── 🥜 Alimentación Inteligente (Mix Frutos Secos, Semillas, Café, Miel, Aceite, Adaptógenos)
│   ├── Grid de Cards con Variantes Dinámicas (Selectores de peso/dosis)
│   └── Drawer / Modal de Carrito ("Tu Pedido WhatsApp")
├── Sección "Comida y Suplementación Real" (Historia del fundador, filosofía sin humo)
├── Sección B2B / Gimnasios y Puntos de Venta (Propuesta mayorista con CTA directo)
├── Sección de Garantías y Preguntas Frecuentes (FAQ)
└── Footer (Datos de contacto, Instagram @suplementacionnaturalmza, Copyright)
```

---

## 4. Requerimientos Funcionales Detallados

### 4.1 Catálogo Interactivo y Selector de Variantes
* **Renderizado de Cards:**
  * Nombre del producto y marca (Natural Nutrition o Línea Inteligente).
  * Tag de categoría.
  * Descripción breve con beneficio real (sin tecnicismos vacíos).
  * Selector de variantes (ej. Creatina: 150g, 350g, 600g; Adaptógenos: Melena de León, Cordyceps, Reishi, etc.).
  * Precio dinámico que se actualiza al cambiar la variante.
  * Botón interactivo "Agregar al Pedido" con feedback visual (microanimación / badge temporal).

### 4.2 Carrito de Compras en Estado Local (Sin Login)
* Persistencia en `localStorage` para no perder los productos si el usuario recarga la página.
* Contador de items en badge flotante (accesible en desktop y móvil).
* Drawer / Panel lateral deslizable con:
  * Lista de items con controles de cantidad (+ / - / eliminar).
  * Subtotal calculado en vivo en pesos argentinos ($ ARS).
  * Formulario de checkout exprés:
    1. **Nombre y Apellido** (requerido).
    2. **WhatsApp de Contacto** (requerido).
    3. **Forma de Entrega:** Retiro en punto acordado / Envío a domicilio en Gran Mendoza.
    4. **Dirección / Barrio / Zona** (requerido si elige envío).
    5. **Método de Pago Preferido:** Transferencia bancaria / Efectivo contra entrega.
    6. **Notas / Aclaraciones** (opcional, ej: personalización del mix de frutos secos).

### 4.3 Generador y Formateador del Mensaje de WhatsApp
Al presionar el botón **"Confirmar y Enviar Pedido por WhatsApp"**:
1. Valida que haya items en el carrito y campos requeridos completos.
2. Construye el mensaje estructurado con saltos de línea y emojis legibles:
   ```text
   🛒 *NUEVO PEDIDO - SUPLEMENTOS MENDOZA*
   ------------------------------------------
   👤 *Cliente:* [Nombre]
   📱 *Contacto:* [Teléfono]
   📍 *Entrega:* [Envío a Domicilio - Godoy Cruz, San Martín 1234]
   💳 *Pago:* [Transferencia Bancaria]
   
   📦 *Detalle del Pedido:*
   • 1x Creatina Pura (NN) - 600g ($45.000)
   • 1x Mix Frutos Secos Premium - 1200g ($22.000)
   
   💰 *TOTAL A PAGAR: $67.000*
   
   📝 *Notas:* [Sin pasas en el mix si es posible]
   ------------------------------------------
   _Enviado desde suplementosmendoza.com.ar_
   ```
3. Codifica el texto (`encodeURIComponent`) y redirige automáticamente al enlace de WhatsApp: `https://wa.me/5492613364201?text={MENSAJE}`.
4. Opcional: Limpia el carrito tras la confirmación o muestra pantalla de agradecimiento.

### 4.4 Sección B2B / Gimnasios y Aliados Comerciales
* Banner destacado con copy enfocado en margen comercial y aprovisionamiento local.
* Botón CTA directo con mensaje prearmado:
  `"Hola! Soy dueño/entrenador de un gimnasio/espacio en Mendoza y me interesa incorporar la línea de Natural Nutrition y productos saludables. ¿Me envían la lista mayorista?"`

---

## 5. Modelo de Datos Inicial (Product Catalog Schema)

```json
[
  {
    "id": "creatina-nn",
    "name": "Creatina Pura Micronizada",
    "brand": "Natural Nutrition",
    "category": "rendimiento",
    "badge": "Más Vendido",
    "description": "100% pura, máxima absorción para fuerza, potencia y recuperación muscular.",
    "variants": [
      { "label": "600g (120 porciones)", "price": 45000 },
      { "label": "350g (75 porciones)", "price": 33000 },
      { "label": "150g (30 porciones)", "price": 16500 }
    ],
    "image": "/images/products/creatina.jpg"
  },
  {
    "id": "pre-work-nn",
    "name": "Pre-Work Explosivo",
    "brand": "Natural Nutrition",
    "category": "rendimiento",
    "description": "Fórmula sinérgica con Beta-alanina, Taurina y Cafeína (300g).",
    "variants": [
      { "label": "Pote 300g", "price": 34300 }
    ],
    "image": "/images/products/pre-work.jpg"
  },
  {
    "id": "proteina-soja-nn",
    "name": "Proteína de Soja Aislada",
    "brand": "Natural Nutrition",
    "category": "rendimiento",
    "description": "907g (30 porciones). Alta concentración proteica de origen vegetal.",
    "variants": [
      { "label": "907g", "price": 47800 }
    ],
    "image": "/images/products/proteina-soja.jpg"
  },
  {
    "id": "colageno-c-nn",
    "name": "Colágeno Hidrolizado + Vitamina C",
    "brand": "Natural Nutrition",
    "category": "salud",
    "description": "300g. Salud articular, tendones, piel y elasticidad celular.",
    "variants": [
      { "label": "Pote 300g", "price": 31000 }
    ],
    "image": "/images/products/colageno.jpg"
  },
  {
    "id": "omega-3-nn",
    "name": "Omega 3 Puro Concentrado",
    "brand": "Natural Nutrition",
    "category": "salud",
    "description": "60 cápsulas blandas. Salud cardiovascular, cerebral y antinflamatorio.",
    "variants": [
      { "label": "60 cápsulas", "price": 33900 }
    ],
    "image": "/images/products/omega3.jpg"
  },
  {
    "id": "cmz-nn",
    "name": "CMZ + Vitamina D3",
    "brand": "Natural Nutrition",
    "category": "salud",
    "description": "Calcio, Magnesio, Zinc + Vitamina D3 (60 cápsulas). Descanso y función neuromuscular.",
    "variants": [
      { "label": "60 cápsulas", "price": 24000 }
    ],
    "image": "/images/products/cmz.jpg"
  },
  {
    "id": "vitamina-d3-k2-nn",
    "name": "Vitamina D3 + K2 en Aceite MCT",
    "brand": "Natural Nutrition",
    "category": "salud",
    "description": "Base de aceite de coco MCT para óptima biodisponibilidad y fijación de calcio.",
    "variants": [
      { "label": "Gotero 30ml", "price": 19700 }
    ],
    "image": "/images/products/vit-d3k2.jpg"
  },
  {
    "id": "vitamina-c-nn",
    "name": "Vitamina C 1000mg",
    "brand": "Natural Nutrition",
    "category": "salud",
    "description": "Potente antioxidante y soporte inmunitario celular.",
    "variants": [
      { "label": "Frasco", "price": 18200 }
    ],
    "image": "/images/products/vit-c.jpg"
  },
  {
    "id": "mix-frutos-secos",
    "name": "Mix de Frutos Secos Premium (Receta Inteligente)",
    "brand": "Selección Propia",
    "category": "alimentacion",
    "badge": "Fórmula Propia",
    "description": "1200g. Maní, Nuez, Castañas de Cajú, Almendras, Pasas Rubias/Morenas, Banana y Ananá chips. Diseñado para cubrir micro y macronutrientes diarios. 100% personalizable.",
    "variants": [
      { "label": "Bolsa 1200g (1.2 kg)", "price": 22000 }
    ],
    "image": "/images/products/mix-frutos.jpg"
  },
  {
    "id": "mix-semillas",
    "name": "Mix de Semillas Seleccionadas",
    "brand": "Selección Propia",
    "category": "alimentacion",
    "description": "500g. Aporte denso de fibra, minerales y ácidos grasos esenciales.",
    "variants": [
      { "label": "Bolsa 500g", "price": 4500 }
    ],
    "image": "/images/products/mix-semillas.jpg"
  },
  {
    "id": "cafe-rdc",
    "name": "Café Tostado Molido Colombia RDC",
    "brand": "RDC Especialidad",
    "category": "alimentacion",
    "description": "500g. Café de origen puro, tostado medio, energía limpia y antioxidantes.",
    "variants": [
      { "label": "Paquete 500g", "price": 29800 }
    ],
    "image": "/images/products/cafe.jpg"
  },
  {
    "id": "miel-juricich",
    "name": "Miel Pura de Monte Juricich",
    "brand": "Juricich",
    "category": "alimentacion",
    "description": "950g. Miel cruda sin pasteurizar ni agregados de glucosa.",
    "variants": [
      { "label": "Frasco 950g", "price": 9900 }
    ],
    "image": "/images/products/miel.jpg"
  },
  {
    "id": "aceite-oliva-libanti",
    "name": "Aceite de Oliva Extra Virgen Libanti",
    "brand": "Libanti",
    "category": "alimentacion",
    "description": "1 Litro. Primera prensada en frío de origen mendocino.",
    "variants": [
      { "label": "Botella 1 Litro", "price": 24000 }
    ],
    "image": "/images/products/aceite.jpg"
  },
  {
    "id": "hongos-adaptogenos",
    "name": "Hongos Adaptógenos en Gotero (FungiArtist)",
    "brand": "FungiArtist",
    "category": "alimentacion",
    "badge": "Biohacking Natural",
    "description": "60ml. Extracto concentrado de doble extracción para foco, inmunidad y descanso.",
    "variants": [
      { "label": "Melena de León (Foco y Memoria) - 60ml", "price": 24000 },
      { "label": "Cordyceps (Energía y Oxigenación) - 60ml", "price": 24000 },
      { "label": "Reishi (Calma y Sueño Profundo) - 60ml", "price": 24000 },
      { "label": "Ashwagandha (Estrés y Cortisol) - 60ml", "price": 24000 },
      { "label": "Tremella (Hidratación Celular) - 60ml", "price": 24000 }
    ],
    "image": "/images/products/hongos.jpg"
  }
]
```

---

## 6. Stack Tecnológico & Arquitectura Técnica

* **Frontend Framework:** React 18 + Vite (o Astro + React components) para un rendimiento brutal (cero latencia, TTFB inmediato).
* **Estilizado & Diseño:** Tailwind CSS (diseño limpio, dark/light contrastado con acentos energéticos naranja/verde bio, tipografías legibles y modernas como Inter o Plus Jakarta Sans).
* **Iconografía:** Lucide React (iconos minimalistas y limpios).
* **Estado del Carrito:** React Context API o Zustand con sincronización automática en `localStorage`.
* **Hosting & Despliegue:** Firebase Hosting o Vercel/Netlify con SSL automático para el dominio `suplementosmendoza.com.ar`.
* **Mobile Optimization:** Touch targets de al menos 48px, drawer deslizable con soporte de gestos táctiles.

---

## 7. Fases de Implementación y Roadmap

| Fase | Entregable | Alcance Técnico |
|---|---|---|
| **Fase 1: Setup & Arquitectura Base** | Estructura del proyecto Vite/React, Tailwind CSS, configuración de paleta de colores y componentes base. | Repositorio, dependencias, layout general responsivo. |
| **Fase 2: Catálogo & Carrito Local** | Componente de Catálogo, Filtros por categoría, Cards con variantes y Drawer de Carrito. | Contexto de carrito, lógica de cálculo, modal checkout. |
| **Fase 3: Integración WhatsApp & Secciones de Contenido** | Serializador de pedidos para WhatsApp, sección de historia del fundador, bloque B2B y FAQ. | Lógica de URL encoding, validación de formularios, microcopys. |
| **Fase 4: Testing, Assets & Despliegue** | Carga de logos oficiales, optimización de imágenes WebP, pruebas de flujo en mobile y deploy en producción. | Build de producción, DNS y puesta en vivo. |
