import Image from 'next/image';
import Link from 'next/link';
import { aboutIcon, aboutUs } from '@/utils/constants';
const Footer = () => {
  return (
    <footer className='container my-10'>
      <div className='py-6 md:py-8 border-t-[1px] border-primary'>
        <Link href='/' className='flex items-center gap-x-[10px] flex-basis '>
          <Image src='/images/logo.jpg' className='w-40  md:w-52 h-full object-contain aspect-[208/41]' height={1000} width={1000} alt='logo' />
        </Link>
        <div className='flex justify-between items-center mt-6 md:mt-8'>
          <ul className='flex gap-x-7 gap-y-2 md:flex-row flex-col text-sm md:text-base *:hover:text-primary'>
            {aboutUs.map(({ name, path, id }) => (
              <li key={id}>
                <Link href={path} className='hover:text-primary duration-300'>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <ul className='flex md:gap-x-4 gap-x-2'>
            {aboutIcon.map(({ path, icon: Icon, id }) => (
              <li key={id}>
                <Link href={path}>{<Icon size={25} />}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
