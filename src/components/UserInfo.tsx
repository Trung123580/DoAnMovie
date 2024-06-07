'use client';
import Button from '@/components/Button';
import { useApp } from '@/context/ContextProvider';
import { comboList, popup } from '@/utils/constants';
import { extractNumber, formatCurrency } from '@/utils/helpers';
import Image from 'next/image';
import React from 'react';

const UserInfo = () => {
  const {
    user,
    handle: { onShowPopup },
  }: any = useApp();
  console.log(user);
  return (
    <div className='container'>
      {/* <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-7 gap-y-6 my-16 h-full'>
        {comboList.map(({ id, defaultMoney, desc, discountMoney, icon: Icon, title }, index) => (
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
            <div className='flex flex-col items-center pt-7 pb-5 px-5 h-full'>
              <Image src='/images/logo.jpg' className='w-40  md:w-52 h-auto object-contain aspect-[208/41]' height={1000} width={1000} alt='logo' />
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
      </div> */}
      <div className='grid grid-cols-4 gap-5 border-t-[1px] border-primary py-6'>
        <div className='col-span-1'>
          <h3>{user?.displayName}</h3>
          <div>email: {user?.email}</div>
          <div>thời gian khởi tạo: {user?.createdAt}</div>
          <div>
            <Image width={1000} height={1000} alt='' src={user?.photoURL || 'images/default-avatar.jpg'} />
          </div>
        </div>
        <div className='col-span-3'>
          content
          <Button content={'mua gói xem phim'} onClick={() => onShowPopup(popup.packages)} />
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
