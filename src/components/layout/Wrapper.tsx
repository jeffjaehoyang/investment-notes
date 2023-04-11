import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import Footer from './Footer';
import Navbar from './Navbar';

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className='mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center pl-5 pr-5 text-gray-100'>
      <AnimatePresence mode='wait'>
        <main className='flex min-h-screen w-full flex-col justify-between'>
          <Navbar />
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            {children}
          </motion.div>
          <Footer />
        </main>
      </AnimatePresence>
    </div>
  );
};

export default Wrapper;
