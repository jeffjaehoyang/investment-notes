import { motion } from 'framer-motion';
import React from 'react';

import LandingImage from '@/images/svg/landing.svg';

const Landing: React.FC = () => {
  return (
    <div className='mb-4 mt-4 flex w-full flex-col items-center'>
      <div className='mb-4 mt-8 flex w-full flex-col items-center justify-center rounded-2xl bg-transparent p-3 text-center'>
        <LandingImage height={200} width='100%' />
      </div>
      <div className='flex flex-col items-center justify-between pb-20 pt-20'>
        <div className='mb-4 flex text-lg font-bold md:text-3xl'>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <i>Record</i> your investment decisions.
          </motion.div>
        </div>
        <div className='mb-4 mt-4 flex text-lg font-bold md:text-3xl'>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            Let <i>time</i> do the work.
          </motion.div>
        </div>
        <div className='mb-4 mt-4 flex text-lg font-bold md:text-3xl'>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3 }}
          >
            Look back & <i>Learn</i>.
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
