import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DRYPZZ - DEV',
  applicationName: 'DRYPZZ - DEV',
  description: 'Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.',
  creator: 'DRYPZZ',
  viewport: { width: 'device-width', initialScale: 1 },
  themeColor: '#037edb',
  authors: [{ name: 'Next.js Team', url: 'https://nextjs.org' }],
  generator: 'NextJS',
  keywords: ['DRYPZZ', 'DEV', 'portfolio', 'projetos', 'tecnologias', 'desenvolvimento', 'web', 'mobile', 'front-end', 'back-end', 'fullstack', 'programação', 'programador', 'desenvolvedor', 'webdev', 'webdeveloper', 'webdesign'],
  twitter: {
    site: '@drypzz',
    card: 'summary_large_image',
    images: '/images/0.jpg',
  },
  openGraph: {
    title: 'DRYPZZ - DEV',
    description: 'Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.',
    siteName: 'DRYPZZ - DEV',
    type: 'website',
    url: 'https://drypzz.netlify.app/',
    images: [{url: '/images/0.jpg'}],
    countryName: 'Brazil',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body className={inter.className}>
        <main className='gradient-bg-welcome'>
          {children}
        </main>
      </body>
    </html>
  );
}
