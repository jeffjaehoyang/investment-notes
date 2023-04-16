import StockChart from '@/components/StockChart';
import UpTriangle from '@/images/svg/up-triangle.svg';
import UpsideDownTriangle from '@/images/svg/upside-down-triangle.svg';
import { getChartOptionsConfig } from '@/lib/chartConfig';
import { getMultiplier, getStartDateMatchingData } from '@/lib/dataUtils';
import getInvestmentRecord from '@/lib/fetchers/getInvestmentRecord';
import getStockData from '@/lib/fetchers/getStockData';
import { InvestmentRecord, StockData } from '@/types';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import useSWR from 'swr';

const DetailsPage = () => {
  const router = useRouter();
  const { recordId } = router.query;
  const {
    data: investmentRecord,
    error: investmentRecordError,
    isLoading: isInvestmentRecordLoading,
  } = useSWR<InvestmentRecord>(
    recordId ? { url: `/api/investmentRecords/${recordId}/` } : null,
    getInvestmentRecord
  );
  const tickerSymbol = investmentRecord?.tickerSymbol;
  const {
    data: stockData,
    error: stockDataError,
    isLoading: isStockDataLoading,
  } = useSWR<StockData[]>(
    tickerSymbol
      ? {
          url: '/api/stockData/',
          ticker: tickerSymbol,
        }
      : null,
    getStockData
  );
  const stockDataMatchingDates = getStartDateMatchingData(
    investmentRecord as InvestmentRecord,
    stockData as StockData[]
  );
  const record = {
    ...investmentRecord,
    marketData: stockDataMatchingDates,
  };
  const options = getChartOptionsConfig(
    new Date(investmentRecord?.startDate as Date).toLocaleDateString(),
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
  const dollarGains = (investmentRecord?.amount as number) * (multiplier - 1);
  const percentageGains =
    multiplier >= 1
      ? Math.round((multiplier - 1) * 100)
      : Math.round((1 - multiplier) * 100);

  return (
    <>
      {isInvestmentRecordLoading || isStockDataLoading ? (
        <div className='overflow-hidden relative space-y-5 rounded-2xl bg-gray-950 bg-gradient-to-r from-transparent via-gray-900 to-transparent p-4 shadow-sm shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:border-t before:border-gray-900 before:bg-gradient-to-r before:from-transparent before:via-gray-900 before:to-transparent'>
          <div className='flex flex-row items-center justify-center mb-8'>
            <div className='h-12 w-12 bg-gray-800 rounded-lg' />
            <div className='ml-4 h-3 w-40 rounded-lg bg-gray-800'></div>
            <div className='ml-4 flex flex-row items-center'>
              <div className='h-3 w-10 rounded-lg bg-gray-800'></div>
            </div>
          </div>
          <div className='h-40 rounded-lg bg-gray-800'></div>
          <div className='space-y-3'>
            <div className='h-3 rounded-lg bg-gray-800'></div>
            <div className='h-3 rounded-lg bg-gray-800'></div>
            <div className='h-3 rounded-lg bg-gray-800'></div>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='h-3 w-10 rounded-lg bg-gray-800 mb-8'></div>
            <div className='h-20 w-full rounded-lg bg-gray-800'></div>
          </div>
        </div>
      ) : (
        <>
          <div className='flex flex-row items-center justify-center mb-8'>
            {investmentRecord && (
              <>
                <Image
                  alt='logo'
                  src={`https://logo.clearbit.com/${investmentRecord.companyDomain}`}
                  width={40}
                  height={40}
                  className='rounded-lg'
                />
                <div className='ml-4'>{investmentRecord.tickerSymbol}</div>
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
                    {percentageGains}%
                  </div>
                </div>
              </>
            )}
          </div>
          <StockChart options={options} series={series} />
          <div className='mb-10 text-center grid grid-cols-3'>
            <div className='flex flex-col items-center justify-center'>
              <div className='font-bold text-xl mb-2'>Invested?</div>
              <div>{investmentRecord?.didInvest ? 'Yes' : 'No'}</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className='font-bold text-xl mb-2'>Initial Capital</div>
              <div>${investmentRecord?.amount.toLocaleString()}</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div className='font-bold text-xl mb-2'>Current</div>
              <div>
                $
                {(
                  (investmentRecord?.amount as number) + dollarGains
                ).toLocaleString()}{' '}
                {dollarGains >= 0
                  ? `(+$${dollarGains.toLocaleString()})`
                  : `(-$${Math.abs(dollarGains).toLocaleString()})`}
              </div>
              <div></div>
            </div>
          </div>
          <div>Investment Notes</div>
          <div className='relative mt-2 rounded-md bg-gray-500 bg-opacity-30 p-4'>
            <IoChatbubbleEllipsesOutline
              style={{ position: 'absolute', left: -5, top: -5 }}
            />
            <div>{investmentRecord?.notes}</div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailsPage;
