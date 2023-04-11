export const getChartOptionsConfig = (
  startDate: string | undefined,
  symbol: string | undefined,
  data: Array<number> | null | undefined,
  dates: Array<string> | null | undefined
) => {
  const options = {
    xaxis: {
      categories: dates,
      labels: {
        show: false,
      },
      minHeight: 0,
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      show: true,
      showAlways: true,
      labels: {
        show: true,
        rotate: -45,
        offsetX: -5,
        style: {
          fontSize: '10px',
          colors: ['white'],
        },
        formatter: (value: number) => {
          return `$${value.toFixed(2)}`;
        },
      },
    },
    stroke: {
      curve: 'smooth' as const,
      width: 2,
    },
    colors: ['#30ccad'],
    grid: {
      show: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 0,
    },
    title: {
      text: `${symbol} Stock Performance (${startDate} - Present)`,
      align: 'center' as const,
      style: {
        color: 'white',
      },
    },
    chart: {
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: true,
      followCursor: true,
      intersect: false,
      inverseOrder: false,
      fillSeriesColor: false,
      theme: true,
    },
  };
  return options;
};
