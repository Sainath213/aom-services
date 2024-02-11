import {
  FileStack,
  FilePenLine,
  Newspaper,
  FileCheck2,
  FileSearch2,
  ScrollText,
} from 'lucide-react';

export default function Services() {
  return (
    <>
      <section className='bg-white'>
        <div className='max-w-[1272px] mx-auto md:px-8 px-6 pb-32'>
          <div className='text-black mb-12'>
            <span className='font-semibold text-base text-[#2F4C77]'>
              WORKS
            </span>
            <h2 className='md:text-5xl text-4xl font-bold'>Services</h2>
          </div>
          <ul className='grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-12'>
            <Card
              icon={<FileStack size={32} color='#7AACF5' />}
              text={'LLC Formations + Other Entity Filings'}
            />
            <Card
              icon={<FilePenLine size={32} color='#7AACF5' />}
              text={'Entity Management/Annual Report Filing'}
            />
            <Card
              icon={<Newspaper size={32} color='#7AACF5' />}
              text={'Registered Agent Services'}
            />
            <Card
              icon={<FileCheck2 size={32} color='#7AACF5' />}
              text={'UCC Searches & Filings'}
            />
            <Card
              icon={<FileSearch2 size={32} color='#7AACF5' />}
              text={'Document Retrievals'}
            />
            <Card
              icon={<ScrollText size={32} color='#7AACF5' />}
              text={
                'Corporate Transparency Filing/Beneficial Ownership Information Report'
              }
            />
            <Card
              icon={<FileStack size={32} color='#7AACF5' />}
              text={'Judment, Lien and Litigation Searches'}
            />
          </ul>
        </div>
      </section>
    </>
  );
}

interface CardProps {
  icon: JSX.Element;
  text: string;
}

const Card = ({ icon, text }: CardProps) => {
  return (
    <li className='flex items-center gap-6 max-h-16'>
      <div className='min-w-16 min-h-16 grid place-items-center bg-black rounded-lg'>
        {icon}
      </div>
      <span className='text-black md:text-2xl text-lg max-w-[476px] font-semibold'>
        {text}
      </span>
    </li>
  );
};
