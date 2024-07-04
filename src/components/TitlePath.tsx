import Button from '@/components/Button';
import { MdNavigateNext } from '@/utils/icons';
function TitlePath({
  onClickNext,
  onClickPrev,
  title,
  noSlide,
  className,
}: {
  className?: string;
  title: any;
  onClickNext: func;
  onClickPrev: func;
  noSlide?: boolean;
}) {
  return (
    <div className={` pt-12 mb-6 flex justify-between items-center  text-2xl lg:text-3xl ${className}`}>
      <h3 className=' font-extrabold capitalize flex-basis'>{title}</h3>
      {!noSlide && (
        <div className='flex relative  rounded-full border border-borderColor *:px-2 *:py-1 md:*:px-3 md:*:py-1.5'>
          <Button onClick={onClickNext} className='hover:text-primary transition' icon={<MdNavigateNext className='w-8 h-7 rotate-180  ' />} />
          <div className='!p-0 w-[1px] h-3/4 border border-borderColor absolute position-center'></div>
          <Button onClick={onClickPrev} className=' hover:text-primary transition' icon={<MdNavigateNext className='w-8 h-7 ' />} />
        </div>
      )}
    </div>
  );
}

export default TitlePath;
