import { useSession } from 'next-auth/react';
import * as React from 'react';

import Dashboard from '@/components/dashboard';
import Landing from '@/components/landing';
import Seo from '@/components/Seo';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Seo />
      {session && session.user ? <Dashboard /> : <Landing />}
    </>
  );
}
