import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DRYPZZ - DEV',
  description: 'Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <head>
        <meta name='viewport' content={'width=device-width, initial-scale=1.0'} />
        <meta property='og:image' content={'/images/0.jpg'} />
        <meta property='og:url' content={'https://drypzz.netlify.app/'} />
        <meta property='og:type' content={'website'} />
        <meta property='og:color' content={'#037edb'} />
        <meta property='twitter:color' content={'#037edb'} />
      </head>
      <body className={inter.className}>
        <main className='gradient-bg-welcome'>
          {children}
        </main>
      </body>
    </html>
  );
}
