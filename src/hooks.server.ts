import { SvelteKitAuth } from "@auth/sveltekit";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "@auth/core/providers/github";
import EmailProvider from "@auth/core/providers/email";
import { AUTH_GITHUB_ID, AUTH_GITHUB_SECRET, AUTH_SECRET, EMAIL_SERVER, EMAIL_FROM } from "$env/static/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import db from "$lib/server/database";
import { tableFn } from "$lib/server/database/schema";
import type { Session } from "@auth/core/types";
import type { AdapterUser } from "@auth/core/adapters";

const PROTECTED_ROUTES = ["/protected"];

const authorization: Handle = async ({ event, resolve }) => {
    const pathname = event.url.pathname;

    if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
        const session = await event.locals.getSession();
        if (!session) {
            throw redirect(303, `/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }
    return resolve(event);
}

export const handle: Handle = sequence(SvelteKitAuth({
    // @ts-ignore
    providers: [GitHub({ clientId: AUTH_GITHUB_ID, clientSecret: AUTH_GITHUB_SECRET }), EmailProvider({ server: EMAIL_SERVER, from: EMAIL_FROM })],
    // @ts-ignore
    adapter: DrizzleAdapter(db, tableFn),
    secret: AUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) token.roles = (user as AdapterUser).roles;
            return token;
        },
        session({ session, token }) {
            session.user!.roles = token.roles;
            return session
        }
    }
}), authorization);