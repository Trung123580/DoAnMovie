'use client';
import { useEffect, useMemo, useState } from 'react';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { getRegionsMovie, getTypeMovie } from '@/service';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/ContextProvider';
import Pagination from '@/components/Pagination';
import { filterNameMovie } from '@/utils/helpers';
enum numberPage {
  zero,
  one,
  two,
  three,
  four,
}
function TypeMovie({ slug, type }: { slug: string; type: string }) {
  const [dataNewMovie, setDataNewMovie] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(numberPage.one);
  const [totalPagination, setTotalPagination] = useState<number>(numberPage.three);
  const [hiddenPagination, setHiddenPagination] = useState<number>(numberPage.zero);
  const {
    currentUser,
    handle: { onLoading, onToggleMovie },
    headerData: { typeMovie },
  }: any = useApp();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchPage: number | null = Number(searchParams.get('page') ?? numberPage.one);
  const DEFAULT_SLUG = [
    {
      path: 'L%E1%BB%93ng%20Ti%E1%BA%BFng',
      name: 'Lồng Tiếng',
    },
    {
      path: 'Thuy%E1%BA%BFt%20Minh',
      name: 'Thuyết Minh',
    },
  ];
  const categoryName = typeMovie.find((item: any) => item.type === slug);
  const cateName2 = useMemo(() => {
    if (!categoryName) return DEFAULT_SLUG.find(({ path }) => path === slug)?.name;
    return null;
  }, [categoryName]);
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: 'smooth' });
  };
  useEffect(() => {
    (async () => {
      onLoading(true);
      if (dataNewMovie.length) setDataNewMovie([]);
      const response = await getTypeMovie(type, slug, Number(searchPage));
      setDataNewMovie(response?.data || []);
      setTotalPages(Number(response.totalPages));
      handleScrollToTop();
      onLoading(false);
    })();
  }, [searchPage, slug, type]);
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
  if (!dataNewMovie.length) return null;
  return (
    <div className='container'>
      <TitlePath
        title={categoryName ? filterNameMovie(categoryName?.type) : cateName2}
        noSlide={true}
        onClickNext={() => null}
        onClickPrev={() => null}
      />
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  md:gap-x-5 gap-x-[15px] gap-y-6 md:gap-y-10'>
        {dataNewMovie.map((movie: any) => (
          <CardProduct
            data={movie}
            onToggleMovie={() => onToggleMovie(movie)}
            findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
          />
        ))}
      </div>
      <Pagination {...optionPagination} />
    </div>
  );
}

export default TypeMovie;
