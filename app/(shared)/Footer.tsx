'use client';

import Link from 'next/link';
import FooterIcon from '@/public/svg/FooterIcon';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className='w-full bg-[#0E0E0F]'>
      <motion.div
        className='mx-auto w-full max-w-[1336px] px-6 md:px-16'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className='flex w-full flex-col items-start justify-between pt-6 md:flex-row md:items-center'>
          <div className='flex flex-col items-start gap-6 pb-6 md:flex-row md:items-center md:gap-12 md:pb-0'>
            <FooterIcon />
            <ul className=''>
              <FooterButton
                label={'ADDRESS'}
                address={'207 Rockaway Turnpike Lawrence, NY 11559'}
                href='https://maps.app.goo.gl/APqcMr4SfxnxeHck6'
              />
              <FooterButton
                label={'PHONE'}
                address={'(516) 295-3294'}
                href='tel:+15162953294'
              />
              <FooterButton
                label={'EMAIL'}
                address={'info@AOMservicesllc.com'}
                href='mailto:info@AOMservicesllc.com'
              />
            </ul>
          </div>
          <ul className='space-y-3 text-start text-white md:space-y-5 md:text-end'>
            <li>
              <Link href='#home' className='hover:underline md:pr-6'>
                Home
              </Link>
            </li>
            <li>
              <Link href='#services' className='hover:underline md:pr-6'>
                Services
              </Link>
            </li>
            <li>
              <Link
                href='mailto:info@AOMservicesllc.com?subject=New%20Order'
                className='rounded-lg bg-[#0C4AA6] px-6 py-2 font-bold'
                rel='noopener noreferrer'
                target='_blank'
              >
                New Order
              </Link>
            </li>
          </ul>
        </div>
        <hr className='my-8 border-x-0 border-b-[1px] border-t-0 border-[#5091F2]' />
        <span className='flex justify-end pb-6 text-white hover:underline'>
          © AOM. All rights reserved.
        </span>
      </motion.div>
    </footer>
  );
}

interface FooterButtonProps {
  label: string;
  address: string;
  href: string;
}

const FooterButton = ({ label, address, href }: FooterButtonProps) => {
  return (
    <li className='mb-5 flex justify-end gap-3'>
      <span className='w-20 text-left text-[#87909F] md:text-right'>
        {label}
      </span>
      <Link
        href={href}
        className='w-[200px] text-white hover:underline'
        target='_blank'
        rel='noopener noreferrer'
      >
        {address}
      </Link>
    </li>
  );
};
