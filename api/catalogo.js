/**
 * Vercel Serverless Function: /api/catalogo
 * Sincroniza dinámicamente con Google Sheets DB, filtra y blinda datos sensibles mayoristas
 * devolviendo exclusivamente los precios minoristas y stock al cliente.
 */

const GOOGLE_SHEETS_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTBrNhGexyD4c1axzU9uvzUWfalYSPNPGz_NMf8NEXOrtIB0HkNuSPrl1jBoO0ps8RgN4md4Xg6zCGd/pub?gid=0&single=true&output=csv";

/**
 * Parsea el CSV recibido desde Google Sheets, descartando de raíz cualquier
 * columna o referencia a costos mayoristas.
 */
function parseCatalogCSV(csvText) {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toUpperCase());
  const prodIdx = headers.indexOf("PRODUCTO") !== -1 ? headers.indexOf("PRODUCTO") : 0;
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
    const cleanNum = rawMinorista.replace(/[^0-9]/g, "");
    if (cleanNum !== "" && !isNaN(cleanNum)) {
      minorista = parseInt(cleanNum, 10);
    } else if (rawMinorista.toUpperCase() === "CONSULTAR") {
      minorista = "Consultar";
    }

    // Objeto seguro para el cliente: solo producto, minorista y stock
    const item = {
      producto: rawProd,
      minorista: minorista,
      stock: rawStock
    };

    // Blindaje estricto: garantizar que no exista la propiedad mayorista bajo ningún concepto
    delete item.mayorista;
    delete item.MAYORISTA;

    catalogItems.push(item);
  }

  return catalogItems;
}

export default async function handler(req, res) {
  // Encabezados de CORS y prevención de caché obsoleta
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido. Solo GET es aceptado." });
  }

  try {
    const urlWithCacheBuster = `${GOOGLE_SHEETS_CSV_URL}&t=${Date.now()}`;
    const response = await fetch(urlWithCacheBuster);

    if (!response.ok) {
      throw new Error(`Google Sheets respondió con status ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const productos = parseCatalogCSV(csvText);

    return res.status(200).json(productos);
  } catch (error) {
    console.error("Error al sincronizar catálogo con Google Sheets DB:", error);
    return res.status(500).json({
      error: "Error interno al sincronizar el catálogo de productos",
      message: error.message
    });
  }
}
