import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsFillCalendar2CheckFill } from 'react-icons/bs';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { RiDeleteBin6Fill, RiMoneyDollarCircleFill } from 'react-icons/ri';
import { RxDoubleArrowRight } from 'react-icons/rx';
import useSWR from 'swr';

import UpTriangle from '@/images/svg/up-triangle.svg';
import UpsideDownTriangle from '@/images/svg/upside-down-triangle.svg';
import { getMultiplier, getStartDateMatchingData } from '@/lib/dataUtils';
import fetcherWithTicker from '@/lib/fetcherWithTicker';
import { InvestmentRecord, StockData } from '@/types';

interface props {
  investmentRecord: InvestmentRecord;
}

/**
 * This component is responsible for rendering an investment record
 * in the dashboard.
 */
const RecordCard = ({ investmentRecord }: props) => {
  const tickerSymbol = investmentRecord?.tickerSymbol;
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
    investmentRecord,
    stockData?.data as StockData[]
  );
  const multiplier = getMultiplier(stockDataMatchingDates.data);
  const gains =
    multiplier >= 1
      ? Math.round((multiplier - 1) * 100)
      : Math.round((1 - multiplier) * 100);

  return (
    <div className='group flex flex-col rounded-lg border border-gray-800 bg-gray-900 bg-opacity-75 px-4 py-4 text-sm transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200'>
      {/* record card header */}
      <div className='flex flex-row items-center justify-between text-lg font-semibold'>
        <div className='flex flex-row items-center'>
          <Image
            alt='logo'
            src={`https://logo.clearbit.com/${investmentRecord.companyDomain}`}
            width={40}
            height={40}
            className='rounded-lg'
          />
          <div className='ml-4'>{investmentRecord.tickerSymbol}</div>
        </div>

        <button className='invisible group-hover:visible'>
          <RiDeleteBin6Fill className='text-red-400' />
        </button>
      </div>

      {/* record card body */}
      <div className='mt-2 flex flex-row justify-between'>
        <div className='mt-2 flex flex-col'>
          <div className='flex flex-row items-center'>
            <BsFillCalendar2CheckFill />
            <div className='ml-2'>
              Date Recorded:{' '}
              {new Date(investmentRecord.startDate).toLocaleDateString()}
            </div>
          </div>
          <div className='flex flex-row items-center'>
            <RiMoneyDollarCircleFill />
            <div className='ml-2'>
              Capital: ${investmentRecord.amount.toLocaleString()}
            </div>
          </div>
        </div>
        <div className='flex h-12 w-12 flex-row items-center justify-center'>
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
      </div>

      {/* record card notes section */}
      <div className='relative mt-5 rounded-md bg-gray-500 bg-opacity-30 p-2'>
        <IoChatbubbleEllipsesOutline
          style={{ position: 'absolute', left: -5, top: -5 }}
        />
        <div className='text-elipsis line-clamp-1'>
          {investmentRecord.notes}
        </div>
      </div>

      {/* record card details link section */}
      <div className='mt-2 flex flex-row-reverse hover:cursor-pointer'>
        <Link
          className='flex flex-row items-center max-w-fit'
          href={`/details/${investmentRecord.id}`}
        >
          See Details
          <RxDoubleArrowRight className='ml-2' />
        </Link>
      </div>
    </div>
  );
};

export default RecordCard;
