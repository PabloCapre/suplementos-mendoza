/**
 * Vercel Serverless Function: /api/catalogo
 * Sincroniza dinámicamente con Google Sheets DB con control de acceso por roles:
 * - Petición Pública (B2C): Elimina estrictamente la propiedad mayorista antes de responder.
 * - Petición Autenticada (B2B): Valida credenciales Basic Auth o sesión de middleware y entrega
 *   el catálogo completo con precios minoristas, mayoristas y stock.
 */

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBrNhGexyD4c1axzU9uvzUWfalYSPNPGz_NMf8NEXOrtIB0HkNuSPrl1jBoO0ps8RgN4md4Xg6zCGd/pub?gid=0&single=true&output=csv";

/**
 * Valida si la petición proviene de un distribuidor B2B autenticado mediante
 * cabecera Authorization Basic o cookie de sesión b2b_session inyectada por el middleware.
 */
function checkB2BAuthorization(req) {
  const cuentasRaw = (process.env.CUENTAS_DISTRIBUIDORES || "").replace(/^["']|["']$/g, "");
  const cuentasArray = cuentasRaw
    .split(",")
    .map((cuenta) => cuenta.trim())
    .filter(Boolean);

  // 1. Revisar cabecera Authorization (HTTP Basic Auth)
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (authHeader) {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
      try {
        const credentials = Buffer.from(parts[1], "base64").toString("utf-8").trim();
        if (cuentasArray.includes(credentials)) {
          return true;
        }
      } catch (e) {
        // Formato base64 inválido
      }
    }
  }

  // 2. Revisar cookie de sesión b2b_session propagada por Vercel Edge Middleware
  const cookieHeader = req.headers["cookie"] || "";
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
      const [key, val] = cookie.trim().split("=");
      if (key && val) acc[key] = val;
      return acc;
    }, {});

    if (cookies.b2b_session) {
      try {
        const credentials = Buffer.from(cookies.b2b_session, "base64").toString("utf-8").trim();
        if (cuentasArray.includes(credentials)) {
          return true;
        }
      } catch (e) {
        // Cookie malformada
      }
    }
  }

  return false;
}

/**
 * Parsea el CSV recibido desde Google Sheets.
 * @param {string} csvText - Texto crudo del CSV.
 * @param {boolean} isB2BAuthorized - Si es true, conserva y procesa 'mayorista'. Si es false, lo blinda por completo.
 */
function parseCatalogCSV(csvText, isB2BAuthorized) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toUpperCase());
  const prodIdx = headers.indexOf("PRODUCTO") !== -1 ? headers.indexOf("PRODUCTO") : 0;
  const mayoristaIdx = headers.indexOf("MAYORISTA");
  const minoristaIdx = headers.indexOf("MINORISTA") !== -1
    ? headers.indexOf("MINORISTA")
    : (headers.indexOf("PRECIO") !== -1 ? headers.indexOf("PRECIO") : -1);
  const stockIdx = headers.indexOf("STOCK") !== -1 ? headers.indexOf("STOCK") : -1;

  const catalogItems = [];

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
    if (!rawProd) continue;

    const rawMinorista = minoristaIdx !== -1 ? (cols[minoristaIdx] || "").trim() : "";
    const rawStock = stockIdx !== -1 ? (cols[stockIdx] || "").trim().toUpperCase() : "OK";

    let minorista = rawMinorista;
    const cleanNumMin = rawMinorista.replace(/[^0-9]/g, "");
    if (cleanNumMin !== "" && !isNaN(cleanNumMin)) {
      minorista = parseInt(cleanNumMin, 10);
    } else if (rawMinorista.toUpperCase() === "CONSULTAR") {
      minorista = "Consultar";
    }

    if (isB2BAuthorized) {
      // Flujo B2B: Extraer y procesar costo mayorista
      const rawMayorista = mayoristaIdx !== -1 ? (cols[mayoristaIdx] || "").trim() : "";
      let mayorista = rawMayorista;
      const cleanNumMay = rawMayorista.replace(/[^0-9]/g, "");

      if (cleanNumMay !== "" && !isNaN(cleanNumMay)) {
        mayorista = parseInt(cleanNumMay, 10);
      } else if (rawMayorista.toUpperCase() === "CONSULTAR") {
        mayorista = "Consultar";
      } else if (rawMayorista === "" && typeof minorista === "number") {
        // Fallback dinámico si la celda aún está vacía en Sheets (descuento distribuidor ~30%)
        mayorista = Math.round((minorista * 0.70) / 100) * 100;
      }

      catalogItems.push({
        producto: rawProd,
        minorista: minorista,
        mayorista: mayorista,
        stock: rawStock
      });
    } else {
      // Flujo B2C: Blindaje estricto sin costo mayorista
      const publicItem = {
        producto: rawProd,
        minorista: minorista,
        stock: rawStock
      };
      delete publicItem.mayorista;
      delete publicItem.MAYORISTA;
      catalogItems.push(publicItem);
    }
  }

  return catalogItems;
}

export default async function handler(req, res) {
  // Encabezados de CORS y prevención de caché obsoleta
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido. Solo GET es aceptado." });
  }

  try {
    const isB2BAuthorized = checkB2BAuthorization(req);
    const urlWithCacheBuster = `${GOOGLE_SHEETS_CSV_URL}&t=${Date.now()}`;
    const response = await fetch(urlWithCacheBuster);

    if (!response.ok) {
      throw new Error(`Google Sheets respondió con status ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const productos = parseCatalogCSV(csvText, isB2BAuthorized);

    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error al sincronizar catálogo con Google Sheets DB:", error);
    return res.status(500).json({
      error: "Error interno al sincronizar el catálogo de productos",
      message: error.message
    });
  }
}
