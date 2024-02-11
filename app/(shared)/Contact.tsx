import Link from 'next/link';

export default function Contact() {
  return (
    <section className='mx-auto w-full max-w-[1336px] px-6 md:px-16'>
      <span className='font-semibold tracking-[2.6px] text-[#2F4C77]'>
        TALK TO US
      </span>
      <h2 className='mb-8 text-4xl font-bold md:text-5xl'>
        Interested in our work?
      </h2>
      <p className='text-lg font-medium md:text-2xl'>
        Get in touch via email {''}
        <Link
          target='_blank'
          rel='noopener noreferrer'
          href='mailto://info@AOMservicesllc.com'
          className='font-bold underline'
        >
          info@AOMservicesllc.com
        </Link>
      </p>
    </section>
  );
}
