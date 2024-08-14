import React from 'react';
import Link from 'next/link';

const LLCNavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between bg-white shadow-lg py-0 px-5 h-16">
      <div className="ml-5">
        <img src="/images/Screenshot%202024-07-04%20at%204.17.35%20PM.png" alt="Logo" className="h-10" />
      </div>
      <div className="flex gap-5 pr-8">
        {/* <Link href="/login" className="text-blue-500 text-base hover:text-blue-700 transition-colors">
          Login
        </Link> */}
        <Link href="/fincen" className="text-blue-500 text-base hover:text-blue-700 transition-colors">
          FinCen Form
        </Link>
      </div>
    </nav>
  );
};

export default LLCNavBar;
