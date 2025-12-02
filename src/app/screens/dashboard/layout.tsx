import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://drypzz.netlify.app/dashboard"),
    title: "DRYPZZ - DEV | Dashboard",
    applicationName: "DRYPZZ - DEV | Dashboard",
    description: "Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.",
    creator: "DRYPZZ",
    authors: [{ name: "Next.js Team", url: "https://nextjs.org" }],
    generator: "NextJS",
    keywords: ["DRYPZZ", "DEV", "portfolio", "projetos", "tecnologias", "desenvolvimento", "web", "mobile", "front-end", "back-end", "fullstack", "programação", "programador", "desenvolvedor", "webdev", "webdeveloper", "webdesign"],
    twitter: {
        site: "@drypzz",
        card: "summary_large_image",
        images: "/me.jpeg",
    },
    openGraph: {
        title: "DRYPZZ - DEV | Dashboard",
        description: "Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.",
        siteName: "DRYPZZ - DEV | Dashboard",
        type: "website",
        url: "https://drypzz.netlify.app/dashboard",
        images: [{ url: "/me.jpeg" }],
        countryName: "Brazil",
        locale: "pt_BR",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
};  