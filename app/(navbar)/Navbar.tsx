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
      <nav className='w-full fixed top-0 left-0 md:px-8 px-6 pt-12 items-center'>
        <div className='flex justify-between items-center mx-auto max-w-[1272px] z-50'>
          <Link href={'#'}>
            <NavbarIcon />
          </Link>
          <ul className='text-base md:flex hidden gap-10'>
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
          <div className='fixed h-full w-full top-0 left-0 text-center bg-[#050505] flex flex-col z-10 justify-center md:hidden pt-[40px]'>
            <ul className='flex flex-col gap-8 mb-10'>
              <NavMobileLink href={'#home'} onClick={closeNavbar} delay={0.1}>
                Home
              </NavMobileLink>
              <NavMobileLink href={'#about'} onClick={closeNavbar} delay={0.2}>
                About Us
              </NavMobileLink>
              <NavMobileLink
                href={'#portfolio'}
                onClick={closeNavbar}
                delay={0.3}
              >
                Portfolio
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
        className='inline-block text-[#ffffff] font-header font-semibold text-[54px]'
        onClick={onClick}
      >
        {children}
      </a>
    </motion.li>
  );
};
