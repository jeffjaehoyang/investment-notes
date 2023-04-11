import dynamic from 'next/dynamic';
import React from 'react';

// need dynamic import since react-apexchart uses global obj window, which doesn't exist in node runtime
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const StockChart = ({ options, series }: any) => {
  return (
    <>
      {typeof window !== 'undefined' && (
        <Chart
          type='area'
          options={options}
          series={series}
          width='100%'
          height='200'
        />
      )}
    </>
  );
};

export default StockChart;
