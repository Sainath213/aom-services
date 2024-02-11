import Link from 'next/link';

export default function TalkToUsSection() {
  return (
    <>
      <section className='bg-white'>
        <div className='max-w-[1272px] mx-auto text-black pb-32'>
          <span className='text-[#2F4C77] font-semibold text-base'>
            TALK TO US
          </span>
          <h2 className='font-bold text-5xl mb-8'>Interested in our work?</h2>
          <span className='font-medium'>
            Get in touch via email {''}
            <Link href={'#'} className='underline font-bold '>
              info@AOMservicesllc.com
            </Link>
          </span>
        </div>
      </section>
    </>
  );
}
