import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("admin_token")?.value;
    const role = request.cookies.get("admin_role")?.value;
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/dashboard")) {
        if (!token || !role) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (pathname.startsWith("/login")) {
        if (token && role) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
    }

    return NextResponse.next();
}

/**
 * Configuração dos alvos do Middleware.
 * Ele será acionado apenas nas rotas especificadas abaixo, poupando performance em assets estáticos.
 */
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login"
    ],
};