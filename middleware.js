/**
 * Vercel Edge Middleware - Protección del Portal de Distribuidores B2B
 * Implementa HTTP Basic Auth sobre la ruta /distribuidores y sus sub-recursos.
 * Soporta múltiples cuentas mediante la variable de entorno CUENTAS_DISTRIBUIDORES
 * en formato "user1:pass1,user2:pass2".
 * Blindaje SEO estricto (X-Robots-Tag: noindex, nofollow, noarchive).
 */

export const config = {
  matcher: ["/distribuidores", "/distribuidores/:path*"]
};

/**
 * Parsea y obtiene la lista de credenciales autorizadas desde CUENTAS_DISTRIBUIDORES.
 * Separa por comas y soporta espacios accidentales. Incluye fallback master para desarrollo.
 */
function getAuthorizedAccounts() {
  const accountsString = process.env.CUENTAS_DISTRIBUIDORES || "";
  const accounts = accountsString
    .split(",")
    .map((pair) => pair.trim())
    .filter(Boolean);

  // Soporte adicional de variables individuales B2B_AUTH_USER / B2B_AUTH_PASS
  if (process.env.B2B_AUTH_USER && process.env.B2B_AUTH_PASS) {
    accounts.push(`${process.env.B2B_AUTH_USER.trim()}:${process.env.B2B_AUTH_PASS.trim()}`);
  }

  // Fallback si no hay variables cargadas en el entorno
  if (accounts.length === 0) {
    accounts.push("master:admin123");
  }

  return accounts;
}

export default function middleware(request) {
  const url = new URL(request.url);

  // Interceptar exclusivamente la ruta /distribuidores
  if (url.pathname.startsWith("/distribuidores")) {
    const basicAuth = request.headers.get("authorization");

    if (basicAuth) {
      const parts = basicAuth.split(" ");
      if (parts.length === 2 && parts[0].toLowerCase() === "basic") {
        try {
          // atob está disponible de forma nativa en Vercel Edge Runtime
          const credentials = atob(parts[1]).trim();
          const [user, pwd] = credentials.split(":");

          const validAccounts = getAuthorizedAccounts();

          const isAuthorized = validAccounts.some((account) => {
            const [accUser, accPwd] = account.split(":");
            return accUser === user && accPwd === pwd;
          });

          if (isAuthorized) {
            // Usuario autenticado con éxito: permitir acceso e inyectar cookie de sesión
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
          // Error al procesar base64, continuar al desafío 401
        }
      }
    }

    // Si no hay cabecera o las credenciales no coinciden con ninguna cuenta, emitir desafío 401
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
