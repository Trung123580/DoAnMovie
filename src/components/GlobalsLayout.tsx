'use client';

import Loading from '@/components/Loading';
import { useApp } from '@/context/ContextProvider';
import { useEffect, useState } from 'react';
import { IoClose } from '@/utils/icons';
import { FacebookShareButton, TwitterShareButton, XIcon, FacebookIcon, TelegramShareButton, TelegramIcon } from 'react-share';
import { ToastContainer } from 'react-toastify';
import Button from '@/components/Button';
import { comboList, popup, typeToast } from '@/utils/constants';
import Image from 'next/image';
import { extractNumber, formatCurrency } from '@/utils/helpers';
const GlobalsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { handle, user, isLoading, showPopup }: any = useApp();
  const { onLoginGG, onLoginTW, onAppSignOut, onShowToast, onShowPopup } = handle;
  console.log(user);
  const [hydrated, setHydrated] = useState(false);
  const handleUrlShare = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    } else {
      return '';
    }
  };
  const url = handleUrlShare();
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;
  return (
    <>
      {children}
      <button onClick={onLoginTW}>tw</button>
      <button onClick={onLoginGG}>login GG</button>
      <button onClick={onAppSignOut}>logout gg</button>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        // icon={<LuHeartCrack className='text-primary' />}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
      {isLoading && <Loading />}
      {showPopup.isShow && (
        <div className='bg-black/95 fixed top-0 left-0 w-full h-screen z-50 p-4'>
          <div className='flex justify-end cursor-pointer'>
            <Button icon={<IoClose fontSize={35} />} onClick={() => onShowPopup()} />
          </div>
          {showPopup.popup === popup.sharePopup && (
            <div className='flex-center h-full '>
              <div className='bg-[#18181b] rounded-lg p-6 w-[90vw] max-w-max min-w-[40vw] '>
                <h3 className='text-center text-2xl font-bold sm:text-3xl'>Chia sẻ</h3>
                <div className='flex gap-x-4 py-4'>
                  <FacebookShareButton url={url}>
                    <FacebookIcon size={50} round={true} />
                  </FacebookShareButton>
                  <TwitterShareButton url={url}>
                    <XIcon size={50} round={true} />
                  </TwitterShareButton>
                  <TelegramShareButton url={url}>
                    <TelegramIcon size={50} round={true} />
                  </TelegramShareButton>
                </div>
                <div className='bg-black p-4 rounded-lg border border-white/20 flex items-center gap-1 w-full justify-between gap-x-4'>
                  <h3 className='line-clamp-1'>{url}</h3>
                  <Button
                    onClick={() => {
                      onShowToast('đã copy vào clipBoard', typeToast.success);
                      navigator.clipboard.writeText(window.location.href);
                    }}
                    content='Sao chép'
                    className='rounded-full min-w-max px-2.5 py-1.5 text-black text-sm font-bold flex items-center gap-1.5 bg-primary hover:opacity-80 duration-300'
                  />
                </div>
              </div>
            </div>
          )}
          {showPopup.popup === popup.trailerPopup && (
            <div className='flex-center h-full'>
              <div className='w-full max-w-[85vw] md:max-w-[60vw]'>
                <iframe
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  className='w-full bg-white/5 aspect-video overflow-hidden bg-stone-900 rounded-md '
                  src={`https://www.youtube.com/embed/${showPopup.srcTrailer}?autoplay=1`}
                  loading='lazy'
                  allowFullScreen={true}
                />
              </div>
            </div>
          )}
          {showPopup.popup === popup.packages && (
            <div className='container'>
              <div className='min-h-[1000px] overflow-y-scroll md:overflow-y-hidden h-[80vh] md:h-full'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-6 my-5 pr-5 md:px-0 md:my-16 h-full'>
                  {comboList.map(({ id, defaultMoney, desc, discountMoney, title }, index) => (
                    <div key={id} className='relative overflow-hidden bg-primary/10 rounded-lg h-full'>
                      <div
                        className={`-z-10 absolute w-full h-full scale-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
                          index === 0 ? 'rotate-45' : index === 1 ? 'rotate-[120deg]' : 'rotate-[20deg]'
                        }`}>
                        <Image
                          src='/images/logo.jpg'
                          className='w-full h-full object-contain aspect-[208/41] opacity-50'
                          height={1000}
                          width={1000}
                          alt='logo'
                        />
                      </div>
                      <div className='flex flex-col items-center pt-7 pb-5 px-5 md:h-full'>
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
      )}
    </>
  );
};
export default GlobalsLayout;
