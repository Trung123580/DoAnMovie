import BoxBG from '@/components/BoxBG';
import BoxSolid from '@/components/BoxSolid';
import Image from 'next/image';
import { FaEye, IoShareSocial, LuHeart, LuHeartCrack, MdOutlineDateRange, MdTimelapse, RiGlobalLine } from '@/utils/icons';
import Button from '@/components/Button';
import Link from 'next/link';
import { getIdVideo } from '@/utils/helpers';
const DetailsBanner = ({
  data,
  onShowPopup,
  popup,
  onToggleMovie,
  findIsLoveMovie,
}: {
  data: any;
  onShowPopup: any;
  popup: popup;
  onToggleMovie: funcProps;
  findIsLoveMovie: boolean;
}) => {
  return (
    <div
      className={`w-full h-[80vh] !bg-cover !bg-no-repeat aspect-video relative !bg-center alpha-blur wrapper-banner `}
      style={{ background: `url('${data?.poster_url}')` }}>
      <div className='container relative z-20 pt-5 md:pt-24 pb-10 px-4 flex md:flex-row flex-col gap-8 justify-center items-center '>
        <div className='max-w-[300px] min-w-[300px]'>
          <Image src={data?.thumb_url ?? ''} alt='banner' width={1000} height={1000} className='w-full h-full aspect-[2/3] rounded-lg' />
        </div>
        <div className='flex-1'>
          <h2 className='text-4xl font-extrabold lg:text-5xl  text-wrap line-clamp-3'>{data?.name}</h2>
          <span className='text-primary font-bold'>{data?.origin_name}</span>
          <div className='mt-2 flex gap-x-4 flex-col  lg:flex-row gap-2'>
            <div className='flex gap-x-2'>
              <BoxBG value={data?.episode_current} />
              <BoxSolid value={data?.quality} />
            </div>
            <div className='flex items-center gap-x-2  flex-wrap '>
              {(data?.slugMovies || []).map((slug: any, index: number, arr: any) => (
                <Link className='hover:text-primary duration-300' href={`/the-loai/${slug.cate_slug}`} key={slug.id}>
                  {slug.name}
                  {arr.length - 1 === index ? '' : ','}
                </Link>
              ))}
            </div>
          </div>
          <div className='*:flex-basis *:flex *:flex-center *:gap-x-1 flex items-center *:items-center gap-x-3 flex-wrap'>
            <div className='-tracking-tighter flex items-center '>
              <FaEye className='text-primary' />
              <span>{data?.totalViews}</span>
            </div>
            <div className='-tracking-tighter flex items-center '>
              <MdTimelapse className='text-primary' />
              <span>{data?.episode_time}</span>
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
              <span>{data?.language}</span>
            </div>
            <div className='my-2 *:flex-basis *:flex *:flex-center *:gap-x-1 flex items-center *:items-center gap-x-3'>
              <div>
                <MdOutlineDateRange className='text-primary' />
                <span>
                  {data?.episode_current === 'Full'
                    ? 1
                    : data?.status === 'completed'
                    ? data?.episode_total.split(' ')[0]
                    : String(data?.episode_current).split(' ')[1]}
                  / {data?.episode_total?.split(' ').length ? data?.episode_total.split(' ')[0] : data?.episode_total}
                </span>
              </div>
              <div className='-tracking-tighter flex items-center '>
                <RiGlobalLine className='text-primary' />
                {(data?.slugRegions || []).map((slug: any) => (
                  <Link className='hover:text-primary duration-300' href={`/quoc-gia/${slug.slug}`} key={slug.id}>
                    {slug?.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className='text-md max-h-60 overflow-auto movie-details'>
            <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
          </div>
          <div className='border border-white/5 bg-white/5 px-4 py-4 flex justify-around items-center w-full sm:w-max rounded-lg mt-4 gap-1.5 md:gap-5 md:px-7'>
            <Button
              content='Copy Link'
              onClick={() => onShowPopup(popup.sharePopup)}
              icon={<IoShareSocial fontSize={20} />}
              className='flex-col justify-center items-center gap-1 text-sm flex hover:text-primary duration-300'
            />
            <span className='h-12 w-0.5 bg-white/10 md:block'></span>
            <div className='flex-col sm:flex-row flex items-center gap-3 text-sm font-bold '>
              <Button
                content='Trailer'
                onClick={() => onShowPopup(popup.trailerPopup, getIdVideo(data.trailer_url))}
                disabled={data?.trailer_url ? false : true}
                className='rounded-full bg-primary text-black px-8 py-3 disabled:bg-borderColor disabled:hover:bg-zinc-600 disabled:text-white'
              />
              <Button
                content={findIsLoveMovie ? 'Bỏ Thích' : 'Yêu Thích'}
                onClick={onToggleMovie}
                icon={findIsLoveMovie ? <LuHeartCrack size={20} /> : <LuHeart fontSize={20} />}
                className={`${
                  findIsLoveMovie ? ' bg-red text-black border-red hover:bg-red/80' : 'bg-black/70 border-primary hover:bg-primary hover:text-black'
                } flex items-center gap-2 rounded-full border-2 px-5 py-2.5 duration-300`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
