import type { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFound: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      // router.go(-1)
      // router.go(1)
      router.push('/')
    }, 5000)
  }, [])

  return (
    <div>
      <h1>Oops...</h1>
      <h2>Page cannot be found!</h2>
      <p>Redirecting to Homepage in 5 seconds...</p>
    </div>
  );
};

export default NotFound;