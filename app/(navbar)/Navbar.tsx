'use client';

import NavbarIcon from '@/public/svg/NavbarIcon';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeNavbar = () => {
    setMobileOpen(false);
  };

  /////////////NavbarDesktop
  return (
    <>
      <nav>
        <div className='px-[100px] py-6 flex justify-between items-center'>
          <NavbarIcon />
          <ul className='text-base md:flex gap-10'>
            <li>
              <Link href={'#'}>HOME</Link>
            </li>
            <li>
              <Link href={'#'}>ABOUT US</Link>
            </li>
            <li>
              <Link href={'#'}>CONTACT US</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
