import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import Navbar from '@/app/(shared)/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AOM Services',
  description: 'AOM Services, your full title company!',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aomservices.com',
    images: 'https://aom-services.vercel.app/og.png',
    title: 'AOM Services',
  },
  twitter: {
    images: 'https://aom-services.vercel.app/og.png',
    site: 'https://aomservices.com',
    title: 'AOM Services',
    card: 'summary',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* fonts */}
        <link
          href='https://api.fontshare.com/v2/css?f[]=recia@700,400&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
