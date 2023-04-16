import GoogleAuthButton from '@/components/buttons/GoogleAuthButton';
import { siteName } from '@/constant/env';
import LogoImg from '@/images/svg/logo.svg';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className='flex w-full flex-row items-center justify-between pb-3 pt-8'>
      <Link
        href={session?.user ? '/dashboard' : '/'}
        className='flex cursor-pointer flex-row items-center text-base font-bold'
      >
        <LogoImg className='mr-2' height={30} width={30} />
        <span className='invisible sm:visible'>{siteName}</span>
      </Link>
      <GoogleAuthButton />
    </div>
  );
};

export default Navbar;
