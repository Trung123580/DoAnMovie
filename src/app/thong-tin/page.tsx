import UserInfo from '@/components/UserInfo';
const page = async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 1000)
  );
  return <UserInfo />;
};

export default page;
