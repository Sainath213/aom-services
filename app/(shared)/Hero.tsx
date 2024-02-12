import Image from 'next/image';
import hero_background from '@/public/hero_background.png';

export default function Hero() {
  return (
    <header className='mx-auto w-full max-w-[1472px] px-3 pt-3 md:px-8 md:pt-6'>
      <div className='relative h-[418px] overflow-hidden rounded-xl md:h-[640px]'>
        <Image
          alt='Manhattan background'
          src={hero_background}
          quality={100}
          className='absolute h-full w-full object-cover'
        />
        <div className='absolute flex h-full w-full flex-col justify-end pb-4 sm:justify-center sm:pb-0'>
          <div className='mx-auto w-full max-w-[1272px] px-3 md:mb-12 md:px-8'>
            <span className='tracking-[2.6px] text-white underline'>
              AOM Services
            </span>
            <h1 className='max-w-[680px] font-serif text-5xl font-bold text-white sm:text-6xl'>
              Streamline Filings for Your Business
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
