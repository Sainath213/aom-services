import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Services from '@/app/(services-section)/Services';

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
      <body className={inter.className}>
        <Services />
      </body>
    </html>
  );
}
