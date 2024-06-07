import Category from '@/components/Category';
import Loading from '@/components/Loading';
import { Suspense } from 'react';
const page = async ({ params }: { params: { cat: string } }) => {
  const { cat } = params;
  return (
    <Suspense fallback={<Loading />}>
      <Category cat={cat} />
    </Suspense>
  );
};

export default page;
