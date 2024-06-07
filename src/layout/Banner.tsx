'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from '@/utils/moduleSwiper';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';
import { MdOutlineDateRange, MdTimelapse } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import BoxBG from '@/components/BoxBG';
import BoxSolid from '@/components/BoxSolid';
const Banner = ({ data }: { data: any }) => {
  return (
    <div className='relative lg:top-0 w-full banner'>
      <Swiper
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        keyboard={true}
        rewind={true}
        navigation={true}
        noSwiping={true}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}>
        {data.map((movie: any) => (
          <SwiperSlide key={uuid()}>
            <div className='alpha-blur '>
              <Image
                src={movie?.poster_url}
                className='w-full h-full object-cover md:h-[70vh] lg:h-screen aspect-video  '
                alt=''
                priority
                width={0}
                height={0}
                sizes='100vw'
              />
              <div className='absolute position-center !top-[90%] !left-[54%]  sm:!left-[52%] md:!left-[54%] md:position-center z-30 w-full flex container  sm:!top-[80%] md:!top-[70%] h-[350px] lg:h-[480px] '>
                <div className='flex-1 h-max z-20'>
                  <div className='text-white '>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold font-VarelaRound text-primary md:mb-4 mb-2 md:w-3/4 text-wrap line-clamp-1 md:line-clamp-none '>
                      {movie.name}
                    </h2>
                    <h4 className='text-lg sm:text-xl font-bold tracking-wide'>{movie?.origin_name}</h4>
                  </div>
                  <div className='my-3 md:mt-10 md:mb-5 flex flex-wrap gap-x-3 gap-y-2 md:text-md font-medium *:flex-basis *:flex *:flex-center *:gap-x-1 '>
                    <div className='w-full md:w-auto'>
                      <div className='flex-basis flex gap-1'>
                        <BoxBG value={movie?.episode_current} />
                        <BoxSolid value={movie?.quality} />
                      </div>
                      <div className='flex-center'>
                        <span className='text-md'>{movie?.cate_name}</span>
                      </div>
                    </div>
                    <div className='!gap-x-3 *:flex *:items-center *:gap-x-1'>
                      <div className=''>
                        <MdOutlineDateRange className='text-primary' />
                        <span>{movie?.publish_year}</span>
                      </div>
                      <div className='-tracking-tighter '>
                        <MdTimelapse className='text-primary' />
                        <span>{movie?.episode_time}</span>
                      </div>
                      <div className=''>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          aria-hidden='true'
                          role='img'
                          className='text-primary iconify iconify--tdesign'
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'>
                          <path
                            fill='currentColor'
                            d='M1 3h22v18H1zm2 2v14h18V5zm2 5a2 2 0 0 1 2-2h4v2H7v4h4v2H7a2 2 0 0 1-2-2zm8 0a2 2 0 0 1 2-2h4v2h-4v4h4v2h-4a2 2 0 0 1-2-2z'></path>
                        </svg>
                        <span>{movie?.language}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/details/${movie.slug}`}
                    className='uppercase text-xs md:text-xl gap-x-2 font-bold py-2 px-4 md:py-4 md:px-8 rounded-full border-2 border-primary duration-300 flex flex-center w-max hover:text-black hover:bg-primary'>
                    <FaPlay /> xem ngay
                  </Link>
                </div>
                <div className='z-20 w-32 h-full right-[5%] sm:relative md:-top-14 border-8 rounded-lg md:w-60 lg:w-80 border-primary hidden md:block'>
                  <Image src={movie?.thumb_url} width={1000} height={1000} priority className='w-full h-full object-cover !aspect-[2/3]' alt='' />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;
