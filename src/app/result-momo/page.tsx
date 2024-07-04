import { redirect } from 'next/navigation';
import { transactionMomo } from '@/service';
import dayjs from 'dayjs';
import { formatViToEN } from '@/utils/helpers';
import ResultMoMo from '@/components/ResultMoMo';
const page = async ({ searchParams }: { searchParams: any }) => {
  if (!searchParams?.partnerCode) redirect('/');
  const { orderId, type } = searchParams;
  const res = await transactionMomo({ orderId });
  const { lastUpdated } = res;
  // partnerCode; hinh thuc thanh toan partnerCode
  const secondsLastUpdated = lastUpdated / 1000; // Chia cho 1000 vì dayjs tính bằng mili giây
  const dateTimeLastUpdated = dayjs.unix(secondsLastUpdated);
  const data = {
    ...res,
    payAt: formatViToEN(dateTimeLastUpdated.format()),
    type: type,
  };
  return <ResultMoMo data={data} />;
};

export default page;
