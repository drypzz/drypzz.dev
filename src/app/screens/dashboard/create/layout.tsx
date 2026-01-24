import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://drypzz.netlify.app"),
    title: "Novo Projeto | DRYPZZ Admin",
    description: "Ferramenta de cadastro de portfólio. Adicione novos projetos, configure tecnologias, links de repositório e faça o upload de assets.",
    applicationName: "DRYPZZ CMS",
    robots: {
        index: false,
        follow: false,
    },
    keywords: ["cms", "create", "deploy", "novo projeto", "upload", "firebase storage", "gestão de conteúdo"],
    openGraph: {
        title: "Criar Novo Projeto",
        description: "Adicione um novo item ao portfólio público.",
        siteName: "DRYPZZ System",
        url: "https://drypzz.netlify.app/screens/dashboard/create",
        images: [{
            url: "/me.jpeg",
            alt: "Create New Project",
        }],
        locale: "pt_BR",
        type: "website",
    },
};

export default function CreateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}