import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://drypzz.netlify.app"),
    title: "Acesso Administrativo | DRYPZZ",
    description: "Portal de autenticação segura para gerenciamento do portfólio e sistema DRYPZZ.",
    applicationName: "DRYPZZ Admin",
    creator: "Gustavo (DRYPZZ)",
    authors: [{ name: "Gustavo", url: "https://github.com/drypzz" }],
    generator: "Next.js 14",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    keywords: ["login", "admin", "autenticação", "segurança", "acesso restrito", "DRYPZZ"],
    openGraph: {
        title: "Acesso Administrativo | DRYPZZ",
        description: "Faça login para gerenciar projetos e visualizar métricas.",
        siteName: "DRYPZZ System",
        type: "website",
        url: "https://drypzz.netlify.app/screens/login",
        images: [{
            url: "/me.jpeg",
            width: 800,
            height: 600,
            alt: "Tela de Login DRYPZZ",
        }],
        locale: "pt_BR",
    },
    twitter: {
        card: "summary",
        title: "Admin Login",
        description: "Área restrita.",
        images: ["/me.jpeg"],
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}