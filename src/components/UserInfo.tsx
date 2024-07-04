'use client';
import Button from '@/components/Button';
import CardHistory from '@/components/CardHistory';
import TitlePath from '@/components/TitlePath';
import { useApp } from '@/context/ContextProvider';
import { comboList, popup } from '@/utils/constants';
import { extractNumber, formatCurrency } from '@/utils/helpers';
import dayjs from 'dayjs';
import Image from 'next/image';

const UserInfo = () => {
  const {
    user,
    currentUser,
    isAuthenticated,
    handle: { onShowPopup, onPayMoMo, onToggleMovie, onRemoveHistory, onAppSignOut },
  }: any = useApp();
  const currentDate = dayjs().valueOf();
  const checkPay: any = currentUser?.historyPay || [];
  const isCheckHistoryMovie = currentUser?.historyMovie || [];
  const isShowPay = checkPay.length;
  const timeOut = checkPay[0]?.deadline - currentDate;
  const daysRemaining = Math.ceil(timeOut / (1000 * 60 * 60 * 24));
  const currentPackage = comboList.find(({ type }) => type === Number(checkPay[0]?.type));

  return (
    <div className='container'>
      <div className='grid grid-cols-1 lg:grid-cols-5 xl:gap-x-3 border-t-[1px] border-primary p-3 lg:p-6 min-h-[80vh]'>
        <div className={`${!isShowPay ? 'col-span-2 flex-col' : 'col-span-5 md:flex-row '} flex  flex-col gap-2 h-max `}>
          <div>
            <div
              className={`${
                !isShowPay ? '' : 'row-span-2 h-max w-auto md:w-max'
              }  py-4 px-1 gap-y-3 flex flex-col lg:flex-row gap-x-3 border border-primary rounded-md `}>
              <div className='w-24 h-2w-24 min-w-24'>
                <Image
                  className='rounded-md w-full h-full object-contain'
                  width={1000}
                  height={1000}
                  alt=''
                  src={user?.photoURL || '/images/default-avatar.jpg'}
                />
              </div>
              <div className='flex flex-col gap-1 capitalize'>
                <h3>
                  Tên người dùng: <span className='text-primary'>{user?.displayName ?? 'Net Movie'}</span>
                </h3>
                <h3 className='text-nowrap line-clamp-1 text-sm'>
                  Email: <span className='text-primary'>{user?.email ?? 'NetMovie@gmail.com'}</span>
                </h3>
                <h3 className='text-nowrap line-clamp-1 text-sm'>
                  Gói đăng ký: <span className='text-primary'>{currentPackage?.title ?? 'chưa đăng ký'}</span>
                </h3>
                <h3 className='text-nowrap line-clamp-1 text-sm '>
                  Thời gian còn lại: <span className='text-primary'>{(checkPay || []).length ? `${daysRemaining} ngày` : '0 ngày'}</span>
                </h3>
              </div>
            </div>
            {!isAuthenticated && (
              <div className='mt-3'>
                <Button
                  content={'Đăng Nhập'}
                  onClick={() => onShowPopup(popup.logins)}
                  className='text-center w-[calc(100%)]  hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2 px-4 rounded-md text-sm text-black font-semibold leading-none border-2 border-primary text-white '
                />
              </div>
            )}
            {isAuthenticated && (
              <div className='mt-3'>
                <Button
                  content={'Đăng Xuất'}
                  onClick={onAppSignOut}
                  className='text-center w-[calc(100%)]  hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2 px-4 rounded-md text-sm text-black font-semibold leading-none border-2 border-primary text-white '
                />
              </div>
            )}
            {!!(checkPay || []).length && (
              <div className='mt-3'>
                {comboList
                  .filter(({ type }) => checkPay.some((pay: PayItem) => Number(pay.type) === type))
                  .map((item) => (
                    <div className='border border-primary rounded p-2 ' key={item.id}>
                      <div className='capitalize flex flex-wrap gap-x-1'>
                        đã đăng ký gói <span className='text-primary font-semibold'>{item?.title} </span>
                        <p>
                          giá <span className='text-primary font-semibold'>{formatCurrency(extractNumber(item?.discountMoney))}</span>
                        </p>
                      </div>
                      <div className='flex mt-2 gap-x-4'>
                        <Button
                          content={'Hủy gói'}
                          onClick={() =>
                            onShowPopup(popup.popupYesNo, '', null, {
                              ...item,
                            })
                          }
                          className='text-center w-[calc(100%)]  hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2 px-4 rounded-full text-sm text-black font-semibold leading-none border-2 border-primary text-white '
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className={`px-1 ${!isShowPay ? 'py-4 ' : 'row-span-3'}`}>
            <div className='col-span-2'>
              <>
                <TitlePath className={`!pt-0 !mb-3`} title={'lịch sử xem phim'} noSlide={true} onClickNext={() => null} onClickPrev={() => null} />
                {!!isCheckHistoryMovie.length && (
                  <div className='flex flex-col gap-y-3 md:gap-y-5 myScroll overflow-auto h-[40vh] sm:h-[60vh] md:h-[70vh]'>
                    {currentUser.historyMovie.map((movie: any) => (
                      <CardHistory
                        isShowPay={isShowPay}
                        onRemoveHistory={() => onRemoveHistory(movie)}
                        movie={movie}
                        onToggleMovie={() => onToggleMovie(movie)}
                        key={movie?.id}
                        findIsLoveMovie={currentUser?.loveMovie.some((item: any) => item.id === movie.id)}
                      />
                    ))}
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
        {!(checkPay || []).length && (
          <div className='col-span-3 mt-3 lg:mt-0  border-transparent rounded-none  md:border-primary md:rounded-md md:pr-[10px] lg:pr-0 '>
            <div className='myScroll overflow-auto h-[80vh]  px-2 rounded-md md:mt-0 mt-4'>
              <div className='grid grid-cols-1 gap-y-4 md:px-0 sm:h-auto h-[1300px]'>
                {comboList.map(({ id, defaultMoney, desc, discountMoney, title, type }, index) => (
                  <div key={id} className='relative overflow-hidden bg-primary/10 rounded-sm h-full'>
                    <div
                      className={`-z-10 absolute w-full h-full scale-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                        index === 0 ? 'rotate-45' : index === 1 ? 'rotate-[120deg]' : 'rotate-[20deg]'
                      }`}>
                      <Image
                        src='/images/logo.jpg'
                        className='w-full h-full object-contain aspect-[208/41] opacity-20'
                        height={1000}
                        width={1000}
                        alt='logo'
                      />
                    </div>
                    <div className='flex flex-col items-center pt-7 pb-5 px-5 h-full'>
                      <Image
                        src='/images/logo.jpg'
                        className='w-40  md:w-52 h-auto object-contain aspect-[208/41]'
                        height={1000}
                        width={1000}
                        alt='logo'
                      />
                      <h5 className='text-center mt-3 text-2xl font-semibold capitalize text-primary'>{title}</h5>
                      <div className='flex flex-col my-3 items-center shadow shadow-primary rounded-md px-2 py-1'>
                        <span className='line-through opacity-55 text-lg'>{formatCurrency(extractNumber(defaultMoney))}</span>
                        <span className='text-xl font-semibold text-primary'>{formatCurrency(extractNumber(discountMoney))}</span>
                      </div>
                      <div className='flex items-center flex-col gap-3 flex-1 '>
                        <p className='line-clamp-6 md:line-clamp-[9]  text-center text-wrap '>{desc}</p>
                        <div className='flex-1 flex flex-col justify-end'>
                          <Button
                            className='uppercase text-xs md:text-md gap-x-2 font-bold py-2 px-4 md:px-6 rounded-full border-2 border-primary duration-300 flex flex-center w-max hover:text-black hover:bg-primary'
                            content={'Mua ngay'}
                            onClick={() =>
                              onPayMoMo({
                                method: 'MOMO',
                                price: extractNumber(discountMoney).toString() ?? '0',
                                fullname: user?.displayName ?? '',
                                type: type,
                                title: title,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
