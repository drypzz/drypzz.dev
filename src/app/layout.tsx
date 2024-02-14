import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DRYPZZ - DEV',
  description: 'Olá, seja bem vindo(a), esse é meu portfolio. Aqui você verá alguns de meus projetos e minhas tecnologias 🙂.',
};

type HeadProps = {
  image: string;
  url: string;
  type: string;
  color: string;
};

export const getHeads = ({image, url, type, color}: HeadProps) => {
  return (
    <>
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      <meta property='og:color' content={color} />
      <meta property='twitter:color' content={color} />
    </>
  )
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        {getHeads({
          image: '/images/0.jpg',
          url: 'https://drypzz.netlify.app/',
          type: 'website',
          color: '#037edb'
        })}
      </head>
      <body className={inter.className}>
        <main className='gradient-bg-welcome'>
          {children}
        </main>
      </body>
    </html>
  );
}
