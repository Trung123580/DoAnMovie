import Button from '@/components/Button';
import Image from 'next/image';
import { FaHeart, MdOutlineDateRange, MdTimelapse, RiGlobalLine } from '@/utils/icons';
import Link from 'next/link';
import BoxSolid from '@/components/BoxSolid';
import BoxBG from '@/components/BoxBG';
const CardHistory = ({
  isShowPay,
  movie,
  findIsLoveMovie,
  onToggleMovie,
  onRemoveHistory,
}: {
  onToggleMovie: funcProps;
  movie: any;
  isShowPay: number;
  findIsLoveMovie: boolean;
  onRemoveHistory: funcProps;
}) => {
  return (
    <div className={`grid ${isShowPay ? 'grid-cols-5' : 'grid-cols-5'} xl:grid-cols-5 gap-x-2 group`}>
      <div className={`overflow-hidden relative ${isShowPay ? 'col-span-2 xl:col-span-1' : ''}col-span-2 min-w-[110px] my-col `}>
        <Image
          width={1000}
          height={1000}
          loading='lazy'
          className='rounded-lg  w-full object-cover aspect-[2/3] xl:h-72'
          src={movie?.thumb_url}
          alt=''
        />
        <div className='bg-primary font-semibold rounded absolute top-2.5 left-2.5 text-xs text-black px-2 py-0.5'>{movie?.episode_current}</div>
        {findIsLoveMovie && (
          <div className='absolute top-2.5 right-2.5'>
            <FaHeart className='text-red' size={25} />
          </div>
        )}
        <div className='absolute px-4 z-10 bg-blur w-full h-full top-0 left-0 aspect-[2/3] flex-center flex-col gap-2  opacity-0 group-hover:opacity-100 duration-300'>
          <Button
            content={findIsLoveMovie ? 'Bỏ Thích' : 'Yêu Thích'}
            onClick={onToggleMovie}
            className={`w-full -translate-y-3 group-hover:translate-y-0 duration-300 ${
              findIsLoveMovie ? 'text-white bg-red' : ' bg-primary text-black'
            } py-1.5 px-4 rounded-full text-xs  font-semibold leading-none`}
          />
          <Button
            content='Chi Tiết'
            href={`/details/${movie.slug}`}
            className='w-full translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-1.5 px-4  rounded-full text-xs text-black font-semibold leading-none border-2 border-primary text-white '
          />
          <Button
            content='Xóa'
            onClick={onRemoveHistory}
            className='w-full translate-y-3 text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-1.5 px-4  rounded-full text-xs text-black font-semibold leading-none border-2 border-primary text-white '
          />
        </div>
      </div>
      <div className={`${isShowPay ? ' col-span-3 xl:col-span-3 ' : 'col-span-3'} my-col-2`}>
        <h2 className=' font-extrabold text-xl line-clamp-1'>{movie?.name}</h2>
        <span className='text-primary font-bold'>{movie?.origin_name}</span>
        <div className={`mt-2 flex gap-x-4 flex-col ${isShowPay && 'lg:flex-row'}  gap-2`}>
          <div className='flex gap-x-2'>
            <BoxBG value={movie?.episode_current} className='w-max h-max !leading-3 ' />
            <BoxSolid value={movie?.quality} className='w-max h-max !leading-3 ' />
          </div>
          <div className='flex items-center gap-x-2 flex-wrap line-clamp-2'>
            {(movie?.slugMovies || []).map((slug: any, index: number, arr: any) => (
              <Link className='hover:text-primary text-sm duration-300' href={`/the-loai/${slug.cate_slug}`} key={slug.id}>
                {slug.name}
                {arr.length - 1 === index ? '' : ','}
              </Link>
            ))}
          </div>
        </div>
        <div className='text-sm lg:text-base mt-2 *:flex-basis *:flex *:flex-center *:gap-x-1 flex items-center *:items-center gap-x-3 flex-wrap'>
          <div className='-tracking-tighter flex items-center '>
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
          <div className='*:flex-basis *:flex *:flex-center *:gap-x-1 flex items-center *:items-center gap-x-3'>
            <div>
              <MdOutlineDateRange className='text-primary' />
              <span>
                {movie?.episode_current === 'Full'
                  ? 1
                  : movie?.status === 'completed'
                  ? movie?.episode_total.split(' ')[0]
                  : String(movie?.episode_current).split(' ')[1]}
                / {movie?.episode_total?.split(' ').length ? movie?.episode_total.split(' ')[0] : movie?.episode_total}
              </span>
            </div>
            <div className='-tracking-tighter flex items-center '>
              <RiGlobalLine className='text-primary' />
              {(movie?.slugRegions || []).map((slug: any) => (
                <Link className='hover:text-primary duration-300' href={`/quoc-gia/${slug.slug}`} key={slug.id}>
                  {slug?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='text-md line-clamp-2 sm:line-clamp-3 md:line-clamp-2 lg:line-clamp-4 xl:line-clamp-4 mt-2 '>
          <div dangerouslySetInnerHTML={{ __html: movie?.content }}></div>
        </div>
      </div>
    </div>
  );
};

export default CardHistory;
