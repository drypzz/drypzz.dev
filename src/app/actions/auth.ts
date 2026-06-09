"use server";

import { cookies } from "next/headers";

/**
 * Cria a sessão segura no servidor através de cookies HttpOnly
 */
export async function createSession(token: string, role: string) {
    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
    });

    cookieStore.set("admin_role", role, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
    });
}

/**
 * Destrói a sessão removendo os cookies
 */
export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    cookieStore.delete("admin_role");
}