import Image from 'next/image';
import hero_background from '@/public/hero_background.png';

export default function Hero() {
  return (
    <header className='mx-auto w-full max-w-[1472px] px-3 pt-6 md:px-8'>
      <div className='relative aspect-[11/5] overflow-hidden rounded-xl md:rounded-3xl'>
        <Image
          alt='Manhattan background'
          src={hero_background}
          quality={100}
          className='absolute h-full w-full object-cover'
        />
        <div className='absolute flex h-full w-full flex-col justify-center'>
          <div className='mx-auto mb-12 w-full max-w-[1272px] px-3 md:px-8'>
            <span className='text-white underline'>AOM Services</span>
            <h1 className='max-w-[680px] font-serif text-6xl font-bold text-white'>
              Streamline Filings for Your Business
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
