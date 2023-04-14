import { siteName } from '@/constant/env';
import React from 'react';

const Footer: React.FC = () => (
  <div className='bg-transparent py-4 mt-10'>
    <div className='mx-auto flex w-full flex-wrap p-5'>
      <div className='flex w-full justify-center text-sm font-bold'>
        {siteName}
      </div>
      <div className='flex w-full justify-center py-1 text-sm'>
        © {new Date().getFullYear()} by Jeff Yang
      </div>
    </div>
  </div>
);

export default Footer;
