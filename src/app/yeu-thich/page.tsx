import FaVouRite from '@/components/FaVouRite';
const page = async () => {
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, 1000)
  );
  return <FaVouRite />;
};
export default page;
