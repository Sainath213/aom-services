import Image from 'next/image';
import hero_background from '@/public/hero_background.png';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between'>
      <section className='w-full max-w-[1472px] md:px-8 px-3 pt-6 mx-auto'>
        <header className='rounded-xl overflow-hidden relative aspect-[11/5] flex flex-col justify-center'>
          <Image
            alt='Manhattan background'
            src={hero_background}
            quality={100}
            className='absolute w-full h-full object-cover'
          />
          <div className='absolute ml-24'>
            <span className='underline text-white'>AOM Services</span>
            <h1 className='text-white text-6xl max-w-[680px]'>
              Streamline Filings for Your Business
            </h1>
          </div>
        </header>
      </section>
    </main>
  );
}
