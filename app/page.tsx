import Contact from '@/app/(shared)/Contact';
import Footer from '@/app/(shared)/Footer';
import Hero from '@/app/(shared)/Hero';
import Services from '@/app/(shared)/Services';

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-between gap-16 md:gap-32'>
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
