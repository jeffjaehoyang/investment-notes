import LandingPage from '@/components/LandingPage';
import Seo from '@/components/Seo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    router.push('/dashboard');
  }

  return (
    <>
      <Seo />
      <LandingPage />
    </>
  );
}
