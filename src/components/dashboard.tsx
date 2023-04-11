import { useSession } from 'next-auth/react';
import React from 'react';
import useSWR from 'swr';

import RecordCard from '@/components/RecordCard';
import fetcherWithUser from '@/lib/fetcherWithUser';
import { InvestmentRecord } from '@/types';

const Dashboard = () => {
  const { data: session } = useSession();
  const { data } = useSWR<{ investmentRecords: InvestmentRecord[] }>(
    { url: '/api/investmentRecordsForUser/', args: session?.user },
    fetcherWithUser
  );
  return (
    <div>
      <div className='text-sm bg-violet-800 bg-opacity-10 rounded-md p-4 mt-4'>
        <div className='text-xl'>
          Hi, {session?.user?.name?.split(' ')[0]} 👋
        </div>
        <div className='mt-4'>{data?.investmentRecords?.length} Records</div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {data?.investmentRecords &&
          data?.investmentRecords?.map(
            (investmentRecord: InvestmentRecord, idx: number) => (
              <RecordCard key={idx} investmentRecord={investmentRecord} />
            )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
