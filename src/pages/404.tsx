import Seo from '@/components/Seo';
import ArrowLink from '@/components/links/ArrowLink';
import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section>
          <div className='layout flex flex-col items-center justify-center text-center'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-3xl'>Page Not Found</h1>
            <ArrowLink className='mt-4' href='/'>
              Back to Home
            </ArrowLink>
          </div>
        </section>
      </main>
    </>
  );
}
