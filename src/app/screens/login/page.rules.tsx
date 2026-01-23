import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    signInWithEmailAndPassword,
    signInWithRedirect,
    signInWithPopup,
    getRedirectResult,
    OAuthProvider,
    signOut
} from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { auth, db } from "@/app/database/config";
import { showNotify } from '@/app/utils/notify';

const useLogin = () => {
    const router = useRouter();
    const isExplicitLogin = useRef(false);
    const successProcessed = useRef(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(true);

    const fetchDiscordData = async (accessToken: string) => {
        const result = { banner: "", guildTag: "", guildBadge: "" };
        try {
            const response = await fetch("https://discord.com/api/users/@me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (response.ok) {
                const data = await response.json();
                if (data.banner) {
                    const format = data.banner.startsWith("a_") ? "gif" : "png";
                    result.banner = `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.${format}?size=2048`;
                } else if (data.accent_color) {
                    result.banner = "#" + data.accent_color.toString(16).padStart(6, '0');
                }
                if (data.clan) {
                    if (data.clan.tag) result.guildTag = data.clan.tag;
                    if (data.clan.badge && data.clan.identity_guild_id) {
                        result.guildBadge = `https://cdn.discordapp.com/clan-badges/${data.clan.identity_guild_id}/${data.clan.badge}.png`;
                    }
                }
            }
        } catch (error) { console.error(error); }
        return result;
    };

    const getUserRole = async (emailToCheck: string): Promise<string | null> => {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, "admins"));

            if (snapshot.exists()) {
                const adminsData = snapshot.val();
                const foundAdmin: any = Object.values(adminsData).find(
                    (admin: any) => admin.email.toLowerCase() === emailToCheck.toLowerCase()
                );

                if (foundAdmin) {
                    return foundAdmin.role;
                }
            }
        } catch (error) {
            console.error("Erro ao verificar admins:", error);
        }
        return null;
    };

    const processUserAndRedirect = async (user: any, credential?: any) => {
        if (successProcessed.current) return;

        const userEmail = user.email || "";

        const role = await getUserRole(userEmail);

        if (!role) {
            console.error("⛔ [LOGIN] Acesso negado (Email não cadastrado):", userEmail);
            showNotify("error", "Você não tem permissão de acesso.");
            await signOut(auth);
            setLoadingLogin(false);
            return;
        }

        successProcessed.current = true;

        let finalAvatar = user.photoURL || "/me.jpeg";
        if (finalAvatar.includes("/a_")) {
            finalAvatar = finalAvatar.replace(".png", ".gif").replace(".jpg", ".gif");
        }

        let discordData = { banner: "", guildTag: "", guildBadge: "" };
        if (credential && credential.accessToken) {
            discordData = await fetchDiscordData(credential.accessToken);
        }

        console.log(`🚀 [LOGIN] Sucesso. Nível: ${role}`);

        localStorage.setItem("admin_avatar", finalAvatar);
        localStorage.setItem("admin_name", user.displayName || "Admin");
        localStorage.setItem("admin_email", userEmail);
        localStorage.setItem("admin_role", role);

        if (discordData.banner) localStorage.setItem("admin_banner", discordData.banner);
        else if (credential) localStorage.removeItem("admin_banner");

        if (discordData.guildTag) localStorage.setItem("admin_guild_tag", discordData.guildTag);
        else if (credential) localStorage.removeItem("admin_guild_tag");

        if (discordData.guildBadge) localStorage.setItem("admin_guild_badge", discordData.guildBadge);
        else if (credential) localStorage.removeItem("admin_guild_badge");

        showNotify("success", `Bem-vindo, ${role === 'super' ? 'Super Admin' : 'Moderador'}!`);
        router.push('/screens/dashboard');
    };

    const handleLogin = async () => {
        if (email === "" || password === "") {
            showNotify("error", "Preencha os campos.");
            return;
        }
        try {
            setLoadingLogin(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            showNotify("error", "Erro ao entrar.");
            setLoadingLogin(false);
        }
    };

    const handleDiscordLogin = async () => {
        isExplicitLogin.current = true;
        setLoadingLogin(true);
        const provider = new OAuthProvider('oidc.discord');
        provider.addScope('email');
        provider.addScope('identify');

        try {
            if (window.location.hostname === 'localhost') {
                const result = await signInWithPopup(auth, provider);
                const credential = OAuthProvider.credentialFromResult(result);
                await processUserAndRedirect(result.user, credential);
            } else {
                await signInWithRedirect(auth, provider);
            }
        } catch (error: any) {
            console.error(error);
            setLoadingLogin(false);
            isExplicitLogin.current = false;
        }
    };

    useEffect(() => {
        const safetyTimeout = setTimeout(() => {
            if (loadingLogin) setLoadingLogin(false);
        }, 8000);

        const checkAuth = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result && result.user) {
                    const credential = OAuthProvider.credentialFromResult(result);
                    await processUserAndRedirect(result.user, credential);
                    clearTimeout(safetyTimeout);
                    return;
                }
            } catch (error) { console.error(error); }

            const unsubscribe = auth.onAuthStateChanged((user) => {
                if (isExplicitLogin.current) return;
                if (user) {
                    processUserAndRedirect(user, null);
                } else {
                    setLoadingLogin(false);
                }
                clearTimeout(safetyTimeout);
            });
            return unsubscribe;
        };
        checkAuth();
    }, [router]);

    return {
        email, setEmail,
        password, setPassword,
        handleLogin,
        handleDiscordLogin,
        loading: loadingLogin
    };
}

export default useLogin;