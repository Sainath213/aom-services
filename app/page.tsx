import Image from 'next/image';
import hero_background from '@/public/hero_background.png';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <Hero />
    </main>
  );
}

const Hero = () => {
  return (
    <header className='w-full max-w-[1472px] md:px-8 px-3 pt-6 mx-auto'>
      <div className='rounded-xl overflow-hidden relative aspect-[11/5]'>
        <Image
          alt='Manhattan background'
          src={hero_background}
          quality={100}
          className='absolute h-full object-cover w-full'
        />
        <div className='w-full h-full absolute flex flex-col justify-center'>
          <div className='mb-12 mx-auto md:px-8 px-3 max-w-[1272px] w-full'>
            <span className='text-white underline'>AOM Services</span>
            <h1 className='text-white text-6xl max-w-[680px] font-bold'>
              Streamline Filings for Your Business
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
