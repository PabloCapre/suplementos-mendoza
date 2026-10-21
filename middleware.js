/**
 * Vercel Edge Middleware - Protección del Portal de Distribuidores B2B
 * Implementa HTTP Basic Auth sobre la ruta /distribuidores y sus sub-recursos.
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
    const expectedUser = process.env.B2B_AUTH_USER || "master";
    const expectedPass = process.env.B2B_AUTH_PASS || "admin123";

    if (basicAuth) {
      const parts = basicAuth.split(" ");
      if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
        try {
          // atob está disponible globalmente en Vercel Edge Runtime
          const credentials = atob(parts[1]);
          const [user, pwd] = credentials.split(":");

          if (user === expectedUser && pwd === expectedPass) {
            // Usuario autenticado con éxito: se permite el paso y se inyecta cookie de sesión segura
            return new Response(null, {
              status: 200,
              headers: {
                "x-middleware-next": "1",
                "Set-Cookie": `b2b_session=${parts[1]}; Path=/; SameSite=Lax; HttpOnly`,
                "X-Robots-Tag": "noindex, nofollow, noarchive"
              }
            });
          }
        } catch (e) {
          // Error al decodificar base64, continuar a 401
        }
      }
    }

    // Si no hay cabecera o las credenciales son inválidas, emitir el desafío 401
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
