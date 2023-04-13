import { useSession } from 'next-auth/react';
import * as React from 'react';

import DashboardPage from '@/components/DashboardPage';
import LandingPage from '@/components/LandingPage';
import Seo from '@/components/Seo';

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Seo />
      {session && session.user ? <DashboardPage /> : <LandingPage />}
    </>
  );
}
