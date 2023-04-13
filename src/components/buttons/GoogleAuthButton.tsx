import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';

import { GoogleIcon } from '@/components/icons';

export const GoogleAuthButton: React.FC = () => {
  const { data: session } = useSession();

  return session && session.user ? (
    <button
      className='flex flex-row items-center rounded-md border border-gray-800 bg-black px-4 py-1 text-sm font-semibold text-neutral-200 transition-all hover:text-white'
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  ) : (
    <button
      className='flex flex-row items-center rounded-md border border-gray-800 bg-black px-4 py-1 text-sm font-semibold text-neutral-200 transition-all hover:text-white'
      onClick={() => signIn('google')}
    >
      <GoogleIcon />
      <div className='ml-3'>Sign in</div>
    </button>
  );
};

export default GoogleAuthButton;
