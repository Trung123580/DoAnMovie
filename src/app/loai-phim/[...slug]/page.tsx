import Loading from '@/components/Loading';
import TypeMovie from '@/components/TypeMovie';
import { Suspense } from 'react';

async function page({ params }: any) {
  const {
    slug: [type, single],
  } = params;
  return (
    <Suspense fallback={<Loading />}>
      <TypeMovie type={type} slug={single} />;
    </Suspense>
  );
}

export default page;
