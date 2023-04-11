import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Wrapper from '@/components/layout/Wrapper';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}
