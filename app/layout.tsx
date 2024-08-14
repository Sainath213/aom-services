import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientNavbar from './ClientNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AOM Services',
  description: 'AOM Services, your full title company!',
  metadataBase: new URL('https://aomservices.com'), 
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/og.png', 
    title: 'AOM Services',
    images: '/og.png',
  },
  twitter: {
    images: '/og.png', 
    site: 'https://aomservices.com',
    title: 'AOM Services',
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=recia@700,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <ClientNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
