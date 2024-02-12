'use client';

import { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import BurguerMobileIcon from '@/public/svg/BurguerMobileIcon';
import NavbarIcon from '@/public/svg/NavbarIcon';
import cn from 'clsx';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeNavbar = () => {
    setMobileOpen(false);
  };

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <nav className='fixed left-0 top-0 z-10 w-full'>
      <div className='mx-auto flex max-w-[1336px] items-center justify-between px-6 pt-7 md:px-16 md:pt-12'>
        <Link href={'#home'}>
          <NavbarIcon />
        </Link>
        <ul className='hidden gap-10 text-base text-white md:flex'>
          <li>
            <a href='#home' className='hover:underline'>
              HOME
            </a>
          </li>
          <li>
            <a href={'#services'} className='hover:underline'>
              SERVICES
            </a>
          </li>
          <li>
            <a href={'#contact'} className='hover:underline'>
              CONTACT
            </a>
          </li>
        </ul>
        {/* mobile trigger button */}
        <button
          className={cn(
            'burguer-menu z-[9999] inline-grid h-12 w-12 place-items-center md:hidden',
            mobileOpen ? 'burguer-menu-open' : 'burguer-menu-closed',
          )}
          onClick={toggleMenu}
        >
          <BurguerMobileIcon />
        </button>
      </div>
      {mobileOpen ? (
        <div className='fixed left-0 top-0 z-20 flex h-full w-full flex-col justify-center bg-white pt-10 text-center md:hidden'>
          <ul className='mb-10 flex flex-col gap-8'>
            <NavMobileLink href='#home' onClick={closeNavbar} delay={0.1}>
              Home
            </NavMobileLink>
            <NavMobileLink href='#services' onClick={closeNavbar} delay={0.2}>
              Services
            </NavMobileLink>
            <NavMobileLink href='#contact' onClick={closeNavbar} delay={0.3}>
              Contact
            </NavMobileLink>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}

interface NavMobileLinkProps {
  children: string;
  href: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  delay: number;
}

const NavMobileLink = ({
  children,
  href,
  onClick,
  delay,
}: NavMobileLinkProps) => {
  return (
    <motion.li
      initial={{
        y: 60,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: delay,
      }}
    >
      <a
        href={href}
        className='font-header inline-block text-[54px] font-semibold text-[#050505]'
        onClick={onClick}
      >
        {children}
      </a>
    </motion.li>
  );
};
