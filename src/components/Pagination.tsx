'use client';
import { MdNavigateNext } from '@/utils/icons';
import BoxSolid from '@/components/BoxSolid';
import Button from '@/components/Button';
function Pagination({ totalPages, numberPage, searchPage, hiddenPagination, totalPagination, pathName, onPrevPage, onNextPage }: any) {
  return (
    <div className='flex items-center justify-end gap-[6px] my-10'>
      <div className='flex *:text-sm *:py-[6px] *:px-3 *:border *:border-ccc gap-[6px] *:cursor-pointer'>
        {totalPages !== numberPage.one && (
          <BoxSolid
            className={`${searchPage === numberPage.one ? 'opacity-40 !cursor-not-allowed' : ''}`}
            icon={<MdNavigateNext fontSize={20} className={`rotate-180 `} />}
            onClick={onPrevPage}
          />
        )}
        {searchPage > numberPage.three && <button className={`${searchPage === totalPages ? 'block' : 'hidden'}`}>...</button>}
        {Array(totalPages)
          .fill(0)
          .map((_item, index) => {
            if (index >= hiddenPagination && index < totalPagination) {
              return (
                <Button
                  key={index}
                  className={Number(searchPage ?? 0) === index + numberPage.one ? 'text-primary border-white' : 'hover:text-primary border-white'}
                  content={`${index + numberPage.one}`}
                  href={`${pathName}?page=${index + numberPage.one}`}
                />
              );
            }
            return null;
          })}
        {totalPages > numberPage.three && <button className={`${searchPage === totalPages ? 'hidden' : 'block'}`}>...</button>}
        {totalPages !== numberPage.one && (
          <BoxSolid
            onClick={onNextPage}
            className={`${searchPage === totalPages && 'opacity-40 !cursor-not-allowed'}`}
            icon={<MdNavigateNext fontSize={20} />}
          />
        )}
      </div>
    </div>
  );
}

export default Pagination;
