import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientNavbar from './ClientNavbar';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AOM Services',
  description: 'AOM Services, your full title company!',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aomservicesllc.com', 
    images: 'https://aom-services.vercel.app/og.png',
    title: 'AOM Services',
  },
  twitter: {
    images: 'https://aom-services.vercel.app/og.png',
    site: 'https://aomservicesllc.com',
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
        <ClientNavbar/>
        <main>{children}</main>
      </body>
    </html>
  );
}
