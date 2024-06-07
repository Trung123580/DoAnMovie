'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const notFound = () => {
  const router = useRouter();
  useEffect(() => {
    router.back();
  }, []);
  return <></>;
};

export default notFound;
