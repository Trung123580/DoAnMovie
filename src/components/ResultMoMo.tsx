'use client';
import { useEffect, useRef } from 'react';
import { useApp } from '@/context/ContextProvider';
import dayjs from 'dayjs';
import { extractNumber, formatCurrency, formatDate, formatViToEN } from '@/utils/helpers';
import Image from 'next/image';
import { comboList } from '@/utils/constants';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const ResultMoMo = ({ data }: any) => {
  const router = useRouter();
  console.log(data);

  const {
    currentUser,
    handle: { onAddPayHistory },
  }: any = useApp();
  const dateRef = useRef(0);
  useEffect(() => {
    // Initial timestamp
    const type = data.type;
    const timestamp = data.lastUpdated;
    console.log(data.lastUpdated);
    console.log(new Date().valueOf());

    const date = dayjs(timestamp);

    if (Number(type) === 1) {
      // Add one month
      const datePlusOneMonth = date.add(1, 'month'); // add 1thang
      dateRef.current = datePlusOneMonth.valueOf();
    }
    if (Number(type) === 2) {
      // Add seven months
      const datePlusSevenMonths = date.add(7, 'month'); // add 7thg
      dateRef.current = datePlusSevenMonths.valueOf();
    }

    if (Number(type) === 3) {
      // Add seven months
      const datePlusOneYear = date.add(1, 'year'); // add 7thg
      dateRef.current = datePlusOneYear.valueOf();
    }
    if (Number(type) === 4) {
      // Add one month
      const datePlusOneMonth = date.add(1, 'minute'); // add 1 phut
      dateRef.current = datePlusOneMonth.valueOf();
    }
  }, [data]);
  useEffect(() => {
    if (data?.lastUpdated) {
      const currentDate = new Date();
      const nextMonthDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1)).valueOf();
      (async () => {
        await onAddPayHistory(data.type, currentUser, Number(nextMonthDate));
      })();
    }
  }, [data?.lastUpdated, currentUser]);
  const infoPay = comboList.find(({ type }) => type === Number(data.type));
  const datePackage = formatDate(dayjs(dateRef.current).format());
  return (
    <div className='container'>
      <div className='h-[90vh] flex items-center justify-center'>
        <div className=' w-[90vw] max-w-max min-w-[35vw] flex justify-center items-center'>
          <div className='w-full lg:w-1/2 border border-primary p-8 rounded'>
            <Image src='/images/logo.jpg' className='w-40  md:w-52 h-full object-contain aspect-[208/41]' height={1000} width={1000} alt='logo' />
            <div className='mt-5 text-xl'>
              <div className='capitalize mb-2 '>
                <h1 className='font-bold  text-center lg:text-3xl font-VarelaRound'>bạn vừa đăng ký {data?.message}</h1>
                <h3 className='font-bold pb-2 text-center lg:text-2xl font-VarelaRound'>
                  <span className='text-primary capitalize'>{infoPay?.title}</span> xem phim không giới hạn
                </h3>
                <div className='flex text-lg my-1 items-center gap-x-2 border-t-primary border-t pt-3'>
                  <span className='text-primary capitalize text-lg'>giá: </span>
                  <span className='line-through opacity-55 text-lg'>{formatCurrency(extractNumber(`${infoPay?.defaultMoney}`))}</span>
                  <span className='text-xl font-semibold text-primary'>{formatCurrency(extractNumber(`${infoPay?.discountMoney}`))}</span>
                </div>
                <div className='flex text-lg items-center gap-x-2'>
                  <span className='text-primary capitalize text-lg'>thời hạn: </span>
                  <h3>{data?.payAt}</h3>
                  <h3>{datePackage?.lastDate}</h3>
                </div>
              </div>
              <p className='w-full text-base'>
                <span className='text-primary capitalize text-lg'>thông tin:</span> {infoPay?.desc}
              </p>
            </div>
            <div className='mt-3 flex justify-end'>
              <Button
                className='uppercase text-xs md:text-md gap-x-2 font-bold py-2 px-4 md:px-6 rounded-full border-2 border-primary duration-300 flex flex-center w-max hover:text-white hover:bg-red'
                content={'Quay Lại'}
                onClick={() => router.back()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMoMo;
