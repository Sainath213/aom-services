import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FinCenNavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white shadow-lg py-0 px-5 h-16">
      <div className="ml-5 relative h-10 w-10"> 
        <Image 
          src="/images/Screenshot%202024-07-04%20at%204.17.35%20PM.png" 
          alt="Logo" 
          layout="fill" 
          objectFit="contain"
        />
      </div>
      <div className="flex gap-5 pr-8">
        <Link href="/llc" className="text-blue-500 text-base hover:text-blue-700 transition-colors">
          LLC Form
        </Link>
      </div>
    </nav>
  );
};

export default FinCenNavBar;
