import React from "react";

import type { Metadata } from "next";

import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import ClientLayout from "./components/layout/ClientLayout";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drypzz.netlify.app"),
  title: {
    default: "DRYPZZ - DEV | Portfolio",
    template: "%s | DRYPZZ"
  },
  applicationName: "DRYPZZ Portfolio",
  description: "Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.",
  creator: "DRYPZZ",
  authors: [{ name: "Gustavo", url: "https://drypzz.netlify.app" }],
  generator: "Next.js",
  keywords: ["DRYPZZ", "DEV", "portfolio", "fullstack", "react", "nextjs", "bitrix24", "developer"],
  twitter: {
    card: "summary_large_image",
    images: "/me.jpeg",
  },
  openGraph: {
    title: "DRYPZZ - DEV | Portfolio",
    description: "Desenvolvedor Full-Stack & Especialista Bitrix24.",
    siteName: "DRYPZZ Portfolio",
    type: "website",
    url: "https://drypzz.netlify.app",
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
    <html lang="pt-br">
      <ClientLayout fonts={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        {children}
      </ClientLayout>
    </html>
  );
}