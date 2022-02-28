import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";

const options: NextAuthOptions = {
  theme: "light",
  debug: true,
  session: {
    maxAge: 60 * 15, //15 min
  },
  jwt: {
    secret: process.env.AUTH_JWT_SECRET,
    signingKey: process.env.AUTH_JWT_SIGNIN_KEY,
    encryption: true,
    encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
  },
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Platzi",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: {
          type: "password",
          label: "Nunca pares de...",
        },
      },
      async authorize(credentials) {
        // console.log(credentials);
        // Proveer la lógica que tome las credenciales enviadas y regrese
        // un objeto representando al usuario o
        // un valor false/null si las credenciales son invalidas.
        // ej. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // También puedes usar el objeto `req` para obtener parámetros adicionales.

        // 1. Conectar API:
        // Solo puedes usar rutas absolutas en el back for front.
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        // 2. Transformar en JSON la respuesta de la API
        const user = await res.json();

        // 2. Retornar user ?? Null:
        // Si no hay error y tenemos user data devuélvelo.
        if (res.ok && user) {
          return user;
        }
        // Devuelve null si user data no puede ser recuperado.
        return null;
      },
    }),
    Providers.GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(options);
