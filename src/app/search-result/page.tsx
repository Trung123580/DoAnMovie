import Search from '@/components/Search';
import { removeVietnameseTones } from '@/utils/helpers';
const page = async ({ searchParams }: { searchParams: { query: string } }) => {
  const { query } = searchParams;
  const convertValue = removeVietnameseTones(query);
  return <Search query={convertValue} />;
};

export default page;
