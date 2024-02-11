import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import Navbar from '@/app/(shared)/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AOM Services',
  description: 'AOM Services, your full title company!',
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
