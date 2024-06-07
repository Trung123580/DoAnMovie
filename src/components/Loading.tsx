import Image from 'next/image';

const Loading = ({ hFull }: { hFull?: boolean }) => {
  return (
    <div className={`${hFull ? 'h-full' : 'h-screen '} flex-center bg-blur`}>
      <div className='w-[40%] min-w-[260px] h-full'>
        <Image src='/images/logo.jpg' className='mx-auto  w-full h-full object-contain aspect-[308/141]' height={1000} width={1000} alt='logo' />
      </div>
    </div>
  );
};

export default Loading;
