'use client';
import { useCallback, useMemo, useRef } from 'react';
import CardProduct from '@/components/CardProduct';
import Loading from '@/components/Loading';
import TitlePath from '@/components/TitlePath';
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import { MdNavigateNext } from 'react-icons/md';
import { useApp } from '@/context/ContextProvider';
const DynamicHeader = dynamic(() => import('@/layout/Banner'), {
  ssr: false,
  loading: () => <Loading />,
});
const HomeApp = ({ dataSlides, data }: { dataSlides: any; data: any }) => {
  const {
    currentUser,
    handle: { onToggleMovie },
  }: any = useApp();
  const renderData = Object.keys(data);
  const renderSwipers = renderData.map((key: string) => {
    return { key, ref: useRef(null) };
  });
  const renderTitle = useMemo(() => {
    return renderData.map((key, _index, arr) => {
      return {
        [key]: key === arr[0] ? 'hành động' : key === arr[1] ? 'Kinh dị' : key === arr[2] ? 'Viễn Tưởng' : 'tình cảm',
      };
    });
  }, [renderData]);
  const handleNext = useCallback(
    (key: string) => {
      const findSwiper = renderSwipers.find((item) => item.key === key);
      if (findSwiper?.ref.current) {
        const swiper = findSwiper.ref.current.swiper;
        swiper.slidePrev();
      }
    },
    [renderSwipers.length]
  );
  const handlePrev = useCallback(
    (key: string) => {
      const findSwiper = renderSwipers.find((item) => item.key === key);
      if (findSwiper?.ref.current) {
        const swiper = findSwiper.ref.current.swiper;
        swiper.slideNext();
      }
    },
    [renderSwipers.length]
  );
  return (
    <>
      <DynamicHeader data={dataSlides || []} />
      <div className='bg-overlay'>
        <div className='container'>
          {renderData.map((key: string, index: number) => {
            const { ref }: any = renderSwipers.find((item) => item.key === key);
            return (
              <div key={key}>
                <TitlePath title={renderTitle[index][key]} onClickNext={() => handleNext(key)} onClickPrev={() => handlePrev(key)} />
                <Swiper
                  ref={ref}
                  // autoplay={{
                  //   delay: 7000,
                  //   disableOnInteraction: false,
                  //   pauseOnMouseEnter: true,
                  // }}
                  breakpoints={{
                    200: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    360: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    480: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 15,
                    },
                    728: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    984: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1248: {
                      slidesPerView: 4,
                    },
                  }}
                  spaceBetween={20}
                  loop={true}
                  keyboard={true}
                  rewind={true}
                  noSwiping={true}
                  slidesPerView={4}
                  // modules={[Autoplay]}
                >
                  {data[key].map((movie: any) => (
                    <SwiperSlide key={movie.id}>
                      <CardProduct
                        data={movie}
                        onToggleMovie={() => onToggleMovie(movie)}
                        findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className='mt-7 flex-center'>
                  <Button
                    className='border rounded-md border-primary py-2 px-5 flex items-center flex-row-reverse font-semibold hover:bg-primary duration-300 hover:text-black'
                    content={`Xem Tất Cả`}
                    icon={<MdNavigateNext className='h-5 w-6' />}
                    onClick={() => null}
                    href={`the-loai/${data[key][0].cate_slug}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomeApp;
