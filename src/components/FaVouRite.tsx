'use client';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { useApp } from '@/context/ContextProvider';
import React from 'react';
const FaVouRite = () => {
  const {
    currentUser,
    handle: { onToggleMovie },
  }: any = useApp();
  if (!currentUser?.loveMovie.length) {
    return <div>chưa có phim yêu thích</div>;
  }
  return (
    <div className='container'>
      <TitlePath title={'Phim Yêu Thích'} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {currentUser?.loveMovie.map((movie: any) => (
          <CardProduct
            data={movie}
            onToggleMovie={() => onToggleMovie(movie)}
            findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaVouRite;
