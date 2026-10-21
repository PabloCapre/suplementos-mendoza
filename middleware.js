/**
 * Vercel Edge Middleware - Protección del Portal de Distribuidores B2B
 * Implementa HTTP Basic Auth sobre /distribuidores.
 * Valida credenciales exclusivamente contra process.env.CUENTAS_DISTRIBUIDORES.
 */

export const config = {
  matcher: ["/distribuidores", "/distribuidores/:path*"]
};

export default function middleware(request) {
  const url = new URL(request.url);

  // Interceptar exclusivamente la ruta /distribuidores y sus sub-rutas
  if (!url.pathname.startsWith("/distribuidores")) {
    return new Response(null, {
      status: 200,
      headers: {
        "x-middleware-next": "1"
      }
    });
  }

  // 1 & 2. Leer cabecera Authorization. Si no existe, devolver 401
  const authHeader = request.headers.get("authorization");
  if (!authHeader) {
    return new Response("Acceso restringido al Portal de Distribuidores B2B.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Acceso Distribuidores"',
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  // 3. Extraer porción en base64 y decodificar usando atob()
  let credentials = "";
  let base64Token = "";
  try {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
      base64Token = parts[1].trim();
      credentials = atob(base64Token).trim();
    } else {
      return new Response("Formato de autorización no válido.", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Acceso Distribuidores"',
          "Content-Type": "text/plain; charset=utf-8",
          "X-Robots-Tag": "noindex, nofollow, noarchive"
        }
      });
    }
  } catch (e) {
    return new Response("Error al decodificar credenciales.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Acceso Distribuidores"',
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  // 4. Obtener process.env.CUENTAS_DISTRIBUIDORES (fallback string vacío si es undefined)
  const cuentasRaw = (process.env.CUENTAS_DISTRIBUIDORES || "").replace(/^["']|["']$/g, "");

  // 5. Convertir con .split(',') en array de cuentas válidas y sanear con .map(c => c.trim())
  const cuentasValidas = cuentasRaw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  // 6. Comprobar si el array de cuentas válidas .includes() el string decodificado
  if (cuentasValidas.length > 0 && cuentasValidas.includes(credentials)) {
    // Si coincide, permitir el paso e inyectar cookie de sesión
    return new Response(null, {
      status: 200,
      headers: {
        "x-middleware-next": "1",
        "Set-Cookie": `b2b_session=${base64Token}; Path=/; SameSite=Lax`,
        "X-Robots-Tag": "noindex, nofollow, noarchive"
      }
    });
  }

  // Si es false, devolver 401
  return new Response("Credenciales incorrectas o cuenta no autorizada.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Acceso Distribuidores"',
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}
