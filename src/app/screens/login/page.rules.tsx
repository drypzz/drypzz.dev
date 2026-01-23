import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { signInWithEmailAndPassword, signInWithPopup, OAuthProvider, signOut, getAdditionalUserInfo } from "firebase/auth";

import { auth } from "@/app/database/config";

import { showNotify } from '@/app/utils/notify';

const ALLOWED_EMAILS = [
    "gugapalmeiraa@gmail.com",
    "zgustavofnt@gmail.com",
];

const useLogin = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            showNotify("error", "Email e senha são obrigatórios!");
            return;
        }

        try {
            setLoadingLogin(true);
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
            showNotify("error", "Falha ao realizar login.");
            setLoadingLogin(false);
        }
    };

    const handleDiscordLogin = async () => {
        setLoadingLogin(true);
        const provider = new OAuthProvider('oidc.discord');
        provider.addScope('email');
        provider.addScope('identify');

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userEmail = user.email || "";
            if (!ALLOWED_EMAILS.includes(userEmail)) {
                await signOut(auth);
                showNotify("error", "Você não tem permissão.");
                setLoadingLogin(false);
                return;
            }

            let finalAvatar = user.photoURL || "/me.jpeg";

            if (finalAvatar.includes("/a_")) {
                finalAvatar = finalAvatar.replace(".png", ".gif").replace(".jpg", ".gif");
            }

            localStorage.setItem("admin_avatar", finalAvatar);
            localStorage.setItem("admin_name", user.displayName || "Admin");
            localStorage.setItem("admin_email", userEmail);

            router.push('/screens/dashboard');
        } catch (error: any) {
            console.error(error);
            setLoadingLogin(false);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userEmail = user.email || "";

                if (ALLOWED_EMAILS.includes(userEmail)) {
                    const avatar = user.photoURL || "/me.jpeg";

                    localStorage.setItem("admin_avatar", avatar);
                    localStorage.setItem("admin_name", user.displayName || "Admin");
                    localStorage.setItem("admin_email", userEmail);

                    showNotify("success", `Bem-vindo de volta!`);
                    router.push('/screens/dashboard');
                } else {
                    console.warn(`Tentativa de acesso negada: ${userEmail}`);
                    showNotify("error", "ACESSO NEGADO: Você não tem permissão para acessar este painel.");
                    await signOut(auth);
                    setLoadingLogin(false);
                }
            }
        });
        return () => unsubscribe();
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