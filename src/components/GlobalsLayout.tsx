'use client';

import Loading from '@/components/Loading';
import { useApp } from '@/context/ContextProvider';
import React, { useEffect, useRef, useState } from 'react';
import { FaGooglePlusSquare, FaSquareXTwitter, IoClose, IoIosSearch, IoMicOutline, MdOutlineRecordVoiceOver } from '@/utils/icons';
import { FacebookShareButton, TwitterShareButton, XIcon, FacebookIcon, TelegramShareButton, TelegramIcon } from 'react-share';
import { ToastContainer } from 'react-toastify';
import Button from '@/components/Button';
import { comboList, popup, typeToast } from '@/utils/constants';
import Image from 'next/image';
import { extractNumber, formatCurrency } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
const GlobalsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { handle, user, isLoading, showPopup }: any = useApp();
  const { onLoginGG, onLoginTW, onShowToast, onPayMoMo, onShowPopup, onRemovePackage } = handle;
  const [hydrated, setHydrated] = useState(false);
  const [valueVoice, setValueVoice] = useState('');
  const [isActiveVoice, setIsActiveVoice] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const handleOnRecord = (type?: boolean) => {
    if (type && recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onend = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setIsActiveVoice(false);
      setValueVoice('');
      return;
      // clear voice
    }
    // voice search
    const SpeechRecordCognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecordCognition();
    recognitionRef.current.lang = 'vi';
    if (type && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsActiveVoice(false);
      setValueVoice('');
      return;
    }
    recognitionRef.current.onresult = async (event: any) => {
      const value = event.results[0][0].transcript;
      setValueVoice(value);
      if (value) {
        onShowPopup();
        router.push(`search-result?query=${value}`);
      }
      recognitionRef.current?.stop();
    };
    recognitionRef.current.onstart = () => setIsActiveVoice(true);
    recognitionRef.current.onend = () => setIsActiveVoice(false);
    recognitionRef.current.start();
  };
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
  useEffect(() => {
    if (showPopup.isShow) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      if (document.body.classList.contains('overflow-y-hidden')) document.body.classList.remove('overflow-y-hidden');
    }
  }, [showPopup.isShow]);
  useEffect(() => {
    if (valueVoice && inputSearchRef.current) {
      inputSearchRef.current.value = valueVoice;
    }
  }, [valueVoice, inputSearchRef]);
  const handleSearchForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('search');
    if (value) {
      setValueVoice('');
      onShowPopup();
      router.push(`search-result?query=${value || valueVoice}`);
      return;
    } else {
      inputSearchRef.current?.focus();
      onShowToast('chưa nhập từ khóa search', typeToast.error);
    }
  };
  const dataInfoPay = showPopup?.infoPay?.data;
  const dataPopupYesNo = showPopup?.dataPopupYesNo;
  if (!hydrated) return;
  return (
    <>
      {children}
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
            <div className='relative flex-center h-full '>
              <div className={`-z-10 absolute  w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
              </div>
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
            <div className='relative flex-center h-full '>
              <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
              </div>
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
            <div className='relative container overflow-auto  h-screen pb-10 md:h-full'>
              <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-4 md:gap-x-7 gap-y-6 pr-5 md:px-0 sm:h-auto h-[1500px]'>
                {comboList.map(({ id, defaultMoney, desc, discountMoney, title, type }, index) => (
                  <div key={id} className={`relative overflow-hidden bg-primary/10 rounded-lg h-full `}>
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
                      <div className='flex flex-col my-3 items-center shadow shadow-primary rounded-md px-2 py-1'></div>{' '}
                      <span className='line-through opacity-55 text-lg'>{formatCurrency(extractNumber(defaultMoney))}</span>
                      <span className='text-xl font-semibold text-primary'>{formatCurrency(extractNumber(discountMoney))}</span>
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
          )}
          {showPopup.popup === popup.info && (
            <div className='flex-center h-full '>
              <div className='relative bg-[#18181b] rounded-lg py-8 px-4 w-[90vw] max-w-max min-w-[40vw] '>
                <div className={`-z-10 absolute w-full h-full scale-[2.2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                  <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
                </div>
                <h3 className='text-center text-2xl font-bold sm:text-3xl'>
                  <div className='flex items-center justify-between'>
                    <Image
                      src='/images/logo.jpg'
                      className='w-40  md:w-52 h-full object-contain aspect-[208/41]'
                      height={1000}
                      width={1000}
                      alt='logo'
                    />
                  </div>
                </h3>
                <div className='mt-6 capitalize'>
                  <div className='gap-y-3 mb-6 flex flex-col  items-center text-lg md:text-xl w-full'>
                    <div>
                      ban vừa hết hạn gói : <span className='text-primary'>{dataInfoPay.title}</span>
                    </div>
                    <div>
                      giá gói : <span className='text-primary'>{formatCurrency(extractNumber(dataInfoPay.discountMoney))}</span>
                    </div>
                  </div>
                  <div className='w-full flex flex-col gap-3 *:capitalize'>
                    <Button
                      content={'mua gói khác'}
                      href={'/thong-tin'}
                      className='translate-y-3  text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                    <Button
                      content={'Đóng'}
                      onClick={() => onShowPopup()}
                      className='translate-y-3 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showPopup.popup === popup.popupYesNo && (
            <div className='flex-center h-full relative'>
              <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
              </div>
              <div className='relative bg-[#18181b] rounded-lg py-8 px-4 w-[90vw] max-w-max min-w-[35vw] '>
                <div className='mb-4 flex justify-center'>
                  <Image
                    src='/images/logo.jpg'
                    className='w-40  md:w-52 h-full object-contain aspect-[208/41]'
                    height={1000}
                    width={1000}
                    alt='logo'
                  />
                </div>
                <div className='flex items-center justify-center'>
                  <div className='w-4/5'>
                    <h1 className='text-2xl capitalize first-letter:text-primary'>
                      Bạn đang muốn hủy gói <span className='text-primary text-nowrap'>{dataPopupYesNo?.title}</span>
                    </h1>
                    <h3 className='capitalize text-lg  mb-3 first-letter:text-primary'>
                      giá gói: {formatCurrency(extractNumber(dataPopupYesNo?.defaultMoney))}
                    </h3>
                  </div>
                </div>
                <div>
                  <div className='w-full flex justify-center gap-3 *:capitalize'>
                    <Button
                      content={'Xác nhận'}
                      href={'/thong-tin'}
                      onClick={() => onRemovePackage(dataPopupYesNo)}
                      className='translate-y-3 text-nowrap w-32 text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                    <Button
                      content={'Thoát'}
                      onClick={() => onShowPopup()}
                      className='translate-y-3 w-32 text-center group-hover:-translate-y-0 hover:bg-primary hover:text-black hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showPopup.popup === popup.logins && (
            <div className='flex-center h-full relative'>
              <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
              </div>
              <div className='relative bg-[#18181b] rounded-lg py-10 px-4 w-[90vw] max-w-max min-w-[35vw]'>
                <div className='mb-4 flex justify-center'>
                  <Image
                    src='/images/logo.jpg'
                    className='w-40  md:w-52 h-full object-contain aspect-[208/41]'
                    height={1000}
                    width={1000}
                    alt='logo'
                  />
                </div>
                <div className='mt-5'>
                  <div className='w-full flex flex-col justify-center gap-3 *:capitalize'>
                    <Button
                      content={'Đăng nhập google'}
                      onClick={onLoginGG}
                      icon={<FaGooglePlusSquare size={25} className='text-primary' />}
                      className='flex gap-x-2 items-center justify-center translate-y-3 text-nowrap w-full text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                    <Button
                      icon={<FaSquareXTwitter size={25} className='text-primary' />}
                      content={'Đăng nhập Twitter'}
                      onClick={onLoginTW}
                      className='flex gap-x-2 items-center justify-center translate-y-3 w-full text-center group-hover:-translate-y-0 hover:bg-red hover:text-white hover:border-white duration-300 bg-blur py-2.5 px-6 rounded-full text-lg  text-black font-semibold leading-none border-2 border-primary text-white '
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {showPopup.popup === popup.search && (
            <div className='flex-center h-full relative '>
              <div className={`-z-10 absolute w-full h-full scale-[1] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12`}>
                <Image src='/images/logo.jpg' className='w-full h-full object-contain  opacity-50' height={1000} width={1000} alt='logo' />
              </div>
              <div className='relative bg-[#18181b] rounded-lg py-5 px-4 w-[90vw] max-w-max min-w-[60vw]'>
                <form method='GET' onSubmit={handleSearchForm} className='flex items-center border-b border-primary'>
                  <div className='w-full flex-1'>
                    <input
                      ref={inputSearchRef}
                      type='text'
                      name='search'
                      className='w-full outline-none p-1 bg-transparent placeholder:text-primary '
                      placeholder='Tìm Phim,...'
                      autoComplete='off'
                      autoFocus
                    />
                  </div>
                  {isActiveVoice ? (
                    <MdOutlineRecordVoiceOver
                      size={25}
                      className={`text-primary ${isActiveVoice ? 'animate-pulse' : ''}`}
                      onClick={() => handleOnRecord(true)}
                    />
                  ) : (
                    <IoMicOutline size={25} className={`text-primary`} onClick={() => handleOnRecord(false)} />
                  )}
                  <button type='submit'>
                    <IoIosSearch size={25} className='text-primary' />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default GlobalsLayout;
