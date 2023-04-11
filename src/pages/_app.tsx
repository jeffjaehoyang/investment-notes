import '@/styles/globals.css';

import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';

import Wrapper from '@/components/layout/Wrapper';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>
  );
};

export default App;
