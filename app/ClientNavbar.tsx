'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/app/(shared)/Navbar';
import FinCenNavBar from './forms/FinCenNavBar';
import LLCNavBar from './forms/LLCNavBar';


export default function ClientNavbar() {
  const pathname = usePathname();

  if (pathname.includes('/fincen')) {
    return <FinCenNavBar/>;
  }

  if (pathname.includes('/llc')) {
    return <LLCNavBar/>;
  }

  return <Navbar />;
}
