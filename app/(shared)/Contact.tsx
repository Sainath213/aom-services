import Link from 'next/link';

export default function Contact() {
  return (
    <section className='mx-auto w-full max-w-[1336px] px-6 md:px-16'>
      <span className='font-semibold tracking-[2.6px] text-[#2F4C77]'>
        TALK TO US
      </span>
      <h2 className='mb-8 text-5xl font-bold'>Interested in our work?</h2>
      <span className='font-medium'>
        Get in touch via email {''}
        <Link href={'#'} className='font-bold underline '>
          info@AOMservicesllc.com
        </Link>
      </span>
    </section>
  );
}
