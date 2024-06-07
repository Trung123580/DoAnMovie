import Regions from '@/components/Regions';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <Suspense fallback={<Loading />}>
      <Regions slug={slug} />
    </Suspense>
  );
};

export default page;
