import Loading from '@/components/Loading';
const loading = () => {
  return (
    <div>
      <h1 className='h-screen bg-primary w-full'>
        <Loading />
      </h1>
    </div>
  );
};

export default loading;
