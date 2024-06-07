const Loading = dynamic(() => import('@/components/Loading'), {
  ssr: false,
});
import UserInfo from '@/components/UserInfo';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const page = async ({ params }: { params: { cat: string } }) => {
  const { cat } = params;
  return (
    <Suspense fallback={<Loading />}>
      <UserInfo />
    </Suspense>
  );
};

export default page;
