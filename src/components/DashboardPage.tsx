import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useSWR from 'swr';

import ShowCreateRecordFormButton from '@/components/buttons/ShowCreateRecordFormButton';
import CreateRecordForm from '@/components/forms/CreateRecordForm';
import RecordCard from '@/components/RecordCard';
import { getFirstName } from '@/lib/dataUtils';
import getInvestmentRecordsForUser from '@/lib/fetchers/getInvestmentRecordsForUser';
import { InvestmentRecord, User } from '@/types';

const Dashboard = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);
  const { data: investmentRecords } = useSWR<InvestmentRecord[]>(
    session?.user
      ? { url: '/api/investmentRecords/', args: session?.user.email }
      : null,
    getInvestmentRecordsForUser
  );
  return (
    <div>
      <div className='text-sm bg-violet-800 bg-opacity-10 rounded-md p-4 mt-4'>
        <div className='text-xl'>
          Hi, {session?.user && getFirstName(session.user as User)} 👋
        </div>
        <div className='mt-4'>{investmentRecords?.length} Records</div>
      </div>

      <ShowCreateRecordFormButton
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <CreateRecordForm showModal={showModal} setShowModal={setShowModal} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
        {investmentRecords &&
          investmentRecords.map(
            (investmentRecord: InvestmentRecord, idx: number) => (
              <RecordCard key={idx} investmentRecord={investmentRecord} />
            )
          )}
      </div>
    </div>
  );
};

export default Dashboard;
