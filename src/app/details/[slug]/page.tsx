const DetailsDynamic = dynamic(() => import('@/components/Details'));
const Loading = dynamic(() => import('@/components/Loading'));
import dynamic from 'next/dynamic';
import { getComments, updateViews } from '@/service';
import { Suspense } from 'react';
const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  // updateViews({ slug }); // update
  const responseComment = await getComments(slug);
  return (
    <Suspense fallback={<Loading />}>
      <DetailsDynamic slug={slug} dataComment={responseComment} />
    </Suspense>
  );
};

export default page;
