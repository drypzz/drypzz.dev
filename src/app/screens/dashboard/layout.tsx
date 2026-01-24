import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://drypzz.netlify.app"),
    title: "Dashboard & Analytics | DRYPZZ",
    description: "Painel de controle central. Visualize métricas de acesso, gerencie permissões de usuários e monitore o status dos projetos.",
    applicationName: "DRYPZZ Dashboard",
    robots: {
        index: false,
        follow: false,
    },
    keywords: ["dashboard", "kpis", "analytics", "gerenciamento", "firebase", "react", "admin panel"],
    openGraph: {
        title: "Dashboard - Visão Geral",
        description: "Painel de controle para administração do portfólio.",
        siteName: "DRYPZZ System",
        url: "https://drypzz.netlify.app/screens/dashboard",
        images: [{
            url: "/me.jpeg",
            width: 1200,
            height: 630,
            alt: "Dashboard Overview",
        }],
        locale: "pt_BR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "DRYPZZ Dashboard",
        description: "Gerenciamento de projetos e usuários.",
        images: ["/me.jpeg"],
    },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}