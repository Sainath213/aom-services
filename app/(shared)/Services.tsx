import {
  FileCheck2,
  FilePenLine,
  FileSearch2,
  FileStack,
  Newspaper,
  ScrollText,
} from 'lucide-react';

export default function Services() {
  return (
    <section className='mx-auto max-w-[1336px] px-6 md:px-16'>
      <div className='mb-6 text-black md:mb-12'>
        <span className='text-base font-semibold text-[#2F4C77]'>WORKS</span>
        <h2 className='text-4xl font-bold md:text-5xl'>Services</h2>
      </div>
      <ul className='grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16'>
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
    </section>
  );
}

interface CardProps {
  icon: JSX.Element;
  text: string;
}

const Card = ({ icon, text }: CardProps) => {
  return (
    <li className='flex max-h-16 items-center gap-6'>
      <div className='grid min-h-16 min-w-16 place-items-center rounded-lg bg-black'>
        {icon}
      </div>
      <span className='max-w-[476px] text-lg font-semibold text-black md:text-2xl'>
        {text}
      </span>
    </li>
  );
};
