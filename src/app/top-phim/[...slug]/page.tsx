import Loading from '@/components/Loading';
import TopMovies from '@/components/TopMovies';
import { Suspense } from 'react';
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return (
    <Suspense fallback={<Loading />}>
      <TopMovies slug={(slug as any) ?? []} />
    </Suspense>
  );
};

export default page;
