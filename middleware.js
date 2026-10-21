/**
 * Vercel Edge Middleware - Protección del Portal de Distribuidores B2B
 * Implementa HTTP Basic Auth sobre la ruta /distribuidores y sus sub-recursos.
 * Valida credenciales contra la variable de entorno CUENTAS_DISTRIBUIDORES ("user1:pass1,user2:pass2").
 * Blindaje SEO estricto (X-Robots-Tag: noindex, nofollow, noarchive).
 */

export const config = {
  matcher: ["/distribuidores", "/distribuidores/:path*"]
};

export default function middleware(request) {
  const url = new URL(request.url);

  // Interceptar exclusivamente la ruta /distribuidores
  if (url.pathname.startsWith("/distribuidores")) {
    const basicAuth = request.headers.get("authorization");

    if (basicAuth) {
      const parts = basicAuth.split(" ");
      if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
        try {
          // Decodificar Base64 a string "usuario:contraseña"
          const credentials = atob(parts[1]).trim();

          // Cortar por comas, limpiar espacios con .trim() y validar con .includes()
          const cuentasRaw = (process.env.CUENTAS_DISTRIBUIDORES || "master:admin123").replace(/^["']|["']$/g, "");
          const cuentasArray = cuentasRaw
            .split(",")
            .map((cuenta) => cuenta.trim())
            .filter(Boolean);

          // Si coincide con alguna de las cuentas autorizadas, permitir acceso
          if (cuentasArray.includes(credentials)) {
            return new Response(null, {
              status: 200,
              headers: {
                "x-middleware-next": "1",
                "Set-Cookie": `b2b_session=${parts[1]}; Path=/; SameSite=Lax`,
                "X-Robots-Tag": "noindex, nofollow, noarchive"
              }
            });
          }
        } catch (e) {
          // Error al decodificar base64, continuar al desafío 401
        }
      }
    }

    // Si no hay cabecera o las credenciales no están autorizadas, emitir desafío 401
    return new Response(
      "Acceso restringido al Portal de Distribuidores B2B de Suplementos Mendoza. Ingrese credenciales autorizadas.",
      {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Portal Privado de Distribuidores - Suplementos Mendoza"',
          "X-Robots-Tag": "noindex, nofollow, noarchive",
          "Content-Type": "text/plain; charset=utf-8"
        }
      }
    );
  }

  return new Response(null, {
    status: 200,
    headers: {
      "x-middleware-next": "1"
    }
  });
}
