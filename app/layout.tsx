import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import TalkToUsSection from '@/app/(email-section)/TalkToUsSection';

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
        <TalkToUsSection />
      </body>
    </html>
  );
}
