'use client';

import { MouseEventHandler, useEffect, useState } from 'react';
import Link from 'next/link';
import BurguerMobileIcon from '@/public/svg/BurguerMobileIcon';
import NavbarIcon from '@/public/svg/NavbarIcon';
import cn from 'clsx';
import { AnimatePresence, motion, useScroll } from 'framer-motion';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  const closeNavbar = () => {
    setMobileOpen(false);
  };

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setScrolled(v > 0);
    });
  
    return () => unsubscribe();
    
  }, [scrollYProgress]);

  return (
    <nav
      className={cn(
        'absolute left-0 top-0 z-10 w-full transition-all duration-300 ease-in-out',
        scrolled && '!fixed bg-[#ffffff] shadow-md',
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-[1336px] items-center justify-between px-6 pt-7 md:px-16 md:pt-12',
          scrolled && '!pb-1 !pt-1',
        )}
      >
        <Link href="/">
          <NavbarIcon />
        </Link>
        <ul className="hidden gap-10 text-base text-white md:flex">
          <li>
            <Link href="/" className={cn('hover:underline', scrolled && 'text-[#050505]')}>
              HOME
            </Link>
          </li>
          <li>
            <Link href="/#services" className={cn('hover:underline', scrolled && 'text-[#050505]')}>
              SERVICES
            </Link>
          </li>
          <li>
            <Link href="/#contact" className={cn('hover:underline', scrolled && 'text-[#050505]')}>
              CONTACT
            </Link>
          </li>
          <li>
            <Link href="/llc" className={cn('hover:underline', scrolled && 'text-[#050505]')}>
              LLC Formation
            </Link>
          </li>
          <li>
            <Link href="/fincen" className={cn('hover:underline', scrolled && 'text-[#050505]')}>
              BOI Report
            </Link>
          </li>
        </ul>
        {/* mobile trigger button */}
        <button
          className={cn(
            'burguer-menu z-[9999] inline-grid h-12 w-12 place-items-center md:hidden',
            mobileOpen
              ? 'burguer-menu-open !stroke-[#050505]'
              : 'burguer-menu-closed',
            scrolled ? 'stroke-[#050505]' : 'stroke-[#ffffff]',
          )}
          onClick={toggleMenu}
        >
          <BurguerMobileIcon />
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed left-0 top-0 z-20 flex h-full w-full flex-col justify-center bg-white pt-10 text-center md:hidden"
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="mb-10 flex flex-col gap-8">
              <NavMobileLink href="/" onClick={closeNavbar} delay={0.1}>
                Home
              </NavMobileLink>
              <NavMobileLink href="/#services" onClick={closeNavbar} delay={0.2}>
                Services
              </NavMobileLink>
              <NavMobileLink href="/#contact" onClick={closeNavbar} delay={0.3}>
                Contact
              </NavMobileLink>
              <NavMobileLink href="/llc" onClick={closeNavbar} delay={0.4}>
                LLC Form
              </NavMobileLink>
              <NavMobileLink href="/fincen" onClick={closeNavbar} delay={0.5}>
                FinCen Form
              </NavMobileLink>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
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
      <Link href={href} className="font-header inline-block text-[54px] font-semibold text-[#050505]" onClick={onClick}>
        {children}
      </Link>
    </motion.li>
  );
};
