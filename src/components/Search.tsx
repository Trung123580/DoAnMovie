'use client';
import React, { useEffect, useState } from 'react';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { useApp } from '@/context/ContextProvider';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getCatMovie, getSearchMovies } from '@/service';
import Pagination from '@/components/Pagination';
import Button from '@/components/Button';
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
const Search = ({ query }: { query: string }) => {
  const [dataNewMovie, setDataNewMovie] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(numberPage.one);
  const [totalPagination, setTotalPagination] = useState<number>(numberPage.three);
  const [hiddenPagination, setHiddenPagination] = useState<number>(numberPage.zero);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchPage: number | null = Number(searchParams.get('page') ?? numberPage.one);
  console.log(query);
  const {
    currentUser,
    handle: { onToggleMovie, onLoading },
  }: any = useApp();
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: 'smooth' });
  };
  useEffect(() => {
    (async () => {
      onLoading(true);
      if (dataNewMovie.length) setDataNewMovie([]);
      const response = await getSearchMovies(query, Number(searchPage));
      setDataNewMovie(response?.data || []);
      console.log(response);

      setTotalPages(Number(response.totalPages));
      handleScrollToTop();
      onLoading(false);
    })();
  }, [searchPage, query]);
  console.log(searchPage);

  const handlePrevPage = () => {
    if (searchPage === numberPage.one) return;
    if (totalPagination !== numberPage.three) setTotalPagination(totalPagination - numberPage.one);
    if (hiddenPagination !== 0) setHiddenPagination(hiddenPagination - numberPage.one);
    router.push(`${pathName}?page=${searchPage - 1}`);
  };
  const handleNextPage = () => {
    if (searchPage === totalPages) return;
    router.push(`${pathName}?page=${searchPage + 1}`);
  };
  useEffect(() => {
    if (searchPage > totalPagination) {
      setTotalPagination(searchPage);
      setHiddenPagination(hiddenPagination + numberPage.one);
    }
  }, [searchPage]);
  const optionPagination = {
    totalPages,
    numberPage,
    searchPage,
    hiddenPagination,
    totalPagination,
    pathName,
    onPrevPage: handlePrevPage,
    onNextPage: handleNextPage,
  };
  if (!dataNewMovie.length) {
    return (
      <div className='container '>
        <div className='h-[70vh] flex items-center justify-center flex-col'>
          <h1 className='text-base md:text-2xl font-semibold text-primary capitalize'>(không tìm thấy phim / chưa cập nhập)</h1>
          <Button
            className='translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-sm text-black font-semibold leading-none border-2 border-primary text-white w-36'
            content={'Quay lại'}
            onClick={() => router.replace('/')}
          />
        </div>
      </div>
    );
  }
  return (
    <div className='container'>
      <TitlePath title={`Kết quả tìm kiếm ${query}`} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {dataNewMovie?.map((movie: any) => (
          <CardProduct
            data={movie}
            key={movie.id}
            onToggleMovie={() => onToggleMovie(movie)}
            findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
          />
        ))}
      </div>
      <Pagination {...optionPagination} />
    </div>
  );
};

export default Search;
