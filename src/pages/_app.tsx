import Wrapper from '@/components/layout/Wrapper';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Wrapper>
        <Component {...pageProps} />
        <Toaster />
      </Wrapper>
    </SessionProvider>
  );
};

export default App;
