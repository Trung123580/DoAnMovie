import Search from '@/components/Search';
const page = async ({ searchParams }: { searchParams: { query: string } }) => {
  const { query } = searchParams;
  return <Search query={query} />;
};

export default page;
