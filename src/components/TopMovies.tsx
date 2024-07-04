'use client';
import { useEffect, useMemo, useState } from 'react';
import CardProduct from '@/components/CardProduct';
import TitlePath from '@/components/TitlePath';
import { getCatMovie, getRegionsMovie, getTopMovies, getTopMoviesCategory, getTopMoviesRegions, getTopTypeMovies, getTypeMovie } from '@/service';
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
function TopMovies({ slug }: { slug: any[] }) {
  const [dataNewMovie, setDataNewMovie] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(numberPage.one);
  const [totalPagination, setTotalPagination] = useState<number>(numberPage.three);
  const [hiddenPagination, setHiddenPagination] = useState<number>(numberPage.zero);
  const [categoryName, setCategoryName] = useState('');
  const {
    currentUser,
    handle: { onLoading, onToggleMovie },
    headerData,
  }: any = useApp();
  const [category, cat, slugType] = slug as any;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchPage: number | null = Number(searchParams.get('page') ?? numberPage.one);
  const handleScrollToTop = () => {
    window.scrollTo({ top: numberPage.one, behavior: 'smooth' });
  };
  const pathCategory = useMemo(() => category, []);
  useEffect(() => {
    if (pathCategory !== category) router.push(`${pathName}/page=1`);
  }, [category, pathCategory]);
  useEffect(() => {
    (async () => {
      onLoading(true);
      if (dataNewMovie.length) setDataNewMovie([]);
      if (slug.length === 2) {
        if (category === 'the-loai') {
          const response = await getTopMoviesCategory(cat, Number(searchPage));
          setDataNewMovie(response?.data || []);
          setTotalPages(Number(response.totalPages));
          const nameType = headerData.category.find((item: any) => item.cate_slug === cat)?.name;
          setCategoryName(nameType);
        }
        if (category === 'quoc-gia') {
          const response = await getTopMoviesRegions(cat, Number(searchPage));
          setDataNewMovie(response?.data || []);
          setTotalPages(Number(response.totalPages));
          const nameType = headerData.regions.find((item: any) => item.slug === cat)?.name;
          setCategoryName(nameType);
        }
      }
      if (slug.length === 3) {
        const response = await getTopTypeMovies(cat, slugType, Number(searchPage));
        setDataNewMovie(response?.data || []);
        setTotalPages(Number(response.totalPages));
        setCategoryName(filterNameMovie(slugType));
      }
      if (slug.length === 1) {
        const response = await getTopMovies(Number(searchPage));
        setDataNewMovie(response?.data || []);
        setTotalPages(Number(response.totalPages));
        setCategoryName('Lượt xem');
      }
      handleScrollToTop();
      onLoading(false);
    })();
  }, [slug.length, searchPage]);
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
      <TitlePath title={`Top ${categoryName}`} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
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

export default TopMovies;
