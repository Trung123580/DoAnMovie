import HomeApp from '@/components/HomeApp';
import { data2 } from '@/data';
import { getHomeMovie } from '@/service';
const Home = async () => {
  const dataSlides = data2.filter((_item, index) => index < 10);
  const dataHomeMovie = await getHomeMovie();
  const categorizedMovies = (dataHomeMovie || [])?.reduce(
    (acc: any, item: any) => {
      if (item?.cate_slug === 'hanh-dong') {
        acc.action.push(item);
      } else if (item?.cate_slug === 'kinh-di') {
        acc.horror.push(item);
      } else if (item?.cate_slug === 'vien-tuong') {
        acc.scify.push(item);
      } else if (item?.cate_slug === 'tinh-cam') {
        acc.romance.push(item);
      }
      return acc;
    },
    {
      action: [],
      horror: [],
      scify: [],
      romance: [],
    }
  );
  return <HomeApp dataSlides={dataSlides} data={categorizedMovies} />;
};
export default Home;
