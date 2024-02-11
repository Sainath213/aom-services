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

  return (
      <nav className='w-full fixed top-0 left-0 z-10'>
        <div className='flex justify-between items-center mx-auto md:px-16 px-6 pt-12 max-w-[1336px]'>
          <Link href={'#home'}>
            <NavbarIcon />
          </Link>
          <ul className='text-base md:flex hidden gap-10 text-white'>
            <li>
              <a href='#home' className='hover:underline'>HOME</a>
            </li>
            <li>
              <a href={'#services'} className='hover:underline'>SERVICES</a>
            </li>
            <li>
              <a href={'#contact'} className='hover:underline'>CONTACT</a>
            </li>
          </ul>
          {/* mobile trigger button */}
          <button
            className={cn(
              'md:hidden flex burguer-menu z-[9999]',
              mobileOpen ? 'burguer-menu-open' : 'burguer-menu-closed'
            )}
            onClick={toggleMenu}
          >
            <BurguerMobileIcon />
          </button>
        </div>
        {mobileOpen ? (
          <div className='fixed h-full w-full top-0 left-0 text-center bg-white flex flex-col z-20 justify-center md:hidden pt-10'>
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
