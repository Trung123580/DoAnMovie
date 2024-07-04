'use client';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { useApp } from '@/context/ContextProvider';
import Image from 'next/image';
import React from 'react';
const FaVouRite = () => {
  const {
    currentUser,
    handle: { onToggleMovie },
  }: any = useApp();
  if (!currentUser?.loveMovie.length) {
    return (
      <div className='container'>
        <div className='h-[80vh] flex-col flex items-center justify-center'>
          <div className='w-3/4 opacity-70'>
            <Image src='/images/logo.jpg' className='w-full h-full object-contain ' height={1000} width={1000} alt='logo' />
          </div>
          <h1 className='text-2xl mt-5 lg:mt-7 capitalize md:text-4xl font-bold font-VarelaRound'>chưa có phim yêu thích</h1>
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
      <TitlePath title={'Phim Yêu Thích'} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {currentUser?.loveMovie.map((movie: any) => (
          <CardProduct
            data={movie}
            key={movie.id}
            onToggleMovie={() => onToggleMovie(movie)}
            findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaVouRite;
