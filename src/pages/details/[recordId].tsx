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
  const { data: investmentRecord } = useSWR<InvestmentRecord>(
    recordId ? { url: `/api/investmentRecords/${recordId}/` } : null,
    getInvestmentRecord
  );
  const tickerSymbol = investmentRecord?.tickerSymbol;
  const {
    data: stockData,
    error,
    isLoading,
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
                {isLoading ? '--' : percentageGains}%
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
            (
            {dollarGains >= 0
              ? `+$${dollarGains.toLocaleString()}`
              : `-$${Math.abs(dollarGains).toLocaleString()}`}
            )
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
  );
};

export default DetailsPage;
