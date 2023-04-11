import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import useSWR from 'swr';

import StockChart from '@/components/StockChart';
import UpTriangle from '@/images/svg/up-triangle.svg';
import UpsideDownTriangle from '@/images/svg/upside-down-triangle.svg';
import { getChartOptionsConfig } from '@/lib/chartConfig';
import { getMultiplier, getStartDateMatchingData } from '@/lib/dataUtils';
import fetcherWithRecordId from '@/lib/fetcherWithRecordId';
import fetcherWithTicker from '@/lib/fetcherWithTicker';
import { InvestmentRecord, StockData } from '@/types';

const DetailsPage = () => {
  const router = useRouter();
  const { recordId } = router.query;
  const { data: investmentRecord } = useSWR<{
    investmentRecord: InvestmentRecord;
  }>(
    recordId ? { url: '/api/investmentRecordById/', recordId: recordId } : null,
    fetcherWithRecordId
  );
  const tickerSymbol = investmentRecord?.investmentRecord?.tickerSymbol;
  const {
    data: stockData,
    error,
    isLoading,
  } = useSWR<{ data: StockData[] }>(
    tickerSymbol
      ? {
          url: '/api/stockData/',
          ticker: tickerSymbol,
        }
      : null,
    fetcherWithTicker
  );
  const stockDataMatchingDates = getStartDateMatchingData(
    investmentRecord?.investmentRecord as InvestmentRecord,
    stockData?.data as StockData[]
  );
  const record = {
    ...investmentRecord?.investmentRecord,
    marketData: stockDataMatchingDates,
  };
  const options = getChartOptionsConfig(
    new Date(
      investmentRecord?.investmentRecord.startDate as Date
    ).toLocaleDateString(),
    tickerSymbol,
    record.marketData.data,
    record.marketData.dates
  );
  const series = [
    {
      name: 'Price per share',
      data: record.marketData.data,
    },
  ];
  const multiplier = getMultiplier(stockDataMatchingDates.data);
  const gains =
    multiplier >= 1
      ? Math.round((multiplier - 1) * 100)
      : Math.round((1 - multiplier) * 100);

  return (
    <>
      <div className='flex flex-row items-center justify-center mb-10'>
        {investmentRecord && (
          <>
            <Image
              alt='logo'
              src={`https://logo.clearbit.com/${investmentRecord.investmentRecord.companyDomain}`}
              width={40}
              height={40}
              className='rounded-lg'
            />
            <div className='ml-4'>
              {investmentRecord.investmentRecord.tickerSymbol}
            </div>
            <div className='ml-4 flex flex-row items-center'>
              {multiplier && multiplier < 1 ? (
                <UpsideDownTriangle width={20} height={20} fill='red' />
              ) : (
                <UpTriangle width={20} height={20} fill='green' />
              )}
              <div
                className={clsx([
                  !multiplier && 'text-white',
                  multiplier < 1 && 'text-red-400',
                  multiplier >= 1 && 'text-green-400',
                ])}
              >
                {isLoading ? '--' : gains}%
              </div>
            </div>
          </>
        )}
      </div>
      <StockChart options={options} series={series} />
      <div>Investment Notes</div>
      <div className='relative mt-2 rounded-md bg-gray-500 bg-opacity-30 p-4'>
        <IoChatbubbleEllipsesOutline
          style={{ position: 'absolute', left: -5, top: -5 }}
        />
        <div>{investmentRecord?.investmentRecord.notes}</div>
      </div>
    </>
  );
};

export default DetailsPage;
