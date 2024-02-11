'use client';

import BurguerMobileIcon from '@/public/svg/BurguerMobileIcon';
import NavbarIcon from '@/public/svg/NavbarIcon';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
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

  /////////////NavbarDesktop
  return (
    <>
      <nav className='w-full fixed top-0 left-0 md:px-8 px-6 pt-12 items-center z-10'>
        <div className='flex justify-between items-center mx-auto max-w-[1272px] z-50'>
          <Link href={'#home'}>
            <NavbarIcon />
          </Link>
          <ul className='text-base md:flex hidden gap-10 text-white'>
            <li>
              <Link href='#home' className='hover:underline'>HOME</Link>
            </li>
            <li>
              <Link href={'#services'} className='hover:underline'>SERVICES</Link>
            </li>
            <li>
              <Link href={'#contact'} className='hover:underline'>CONTACT</Link>
            </li>
          </ul>
          {/* nav mobile */}
          <button
            className={cn(
              'md:hidden flex burguer-menu z-[9999]',
              mobileOpen ? 'burguer-menu-open' : 'burguer-menu-closed'
            )}
            onClick={toggleMenu}
          >
            <BurguerMobileIcon />
          </button>
          {/* nav mobile */}
        </div>
        {mobileOpen ? (
          <div className='fixed h-full w-full top-0 left-0 text-center bg-white flex flex-col z-10 justify-center md:hidden pt-[40px]'>
            <ul className='flex flex-col gap-8 mb-10'>
              <NavMobileLink href='#home' onClick={closeNavbar} delay={0.1}>
                Home
              </NavMobileLink>
              <NavMobileLink href='#services' onClick={closeNavbar} delay={0.2}>
                Services
              </NavMobileLink>
              <NavMobileLink
                href='#contact'
                onClick={closeNavbar}
                delay={0.3}
              >
                Contact
              </NavMobileLink>
            </ul>
          </div>
        ) : null}
      </nav>
    </>
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
        className='inline-block font-header font-semibold text-[54px] text-[#050505]'
        onClick={onClick}
      >
        {children}
      </a>
    </motion.li>
  );
};
