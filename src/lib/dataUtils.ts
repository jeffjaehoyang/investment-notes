import { InvestmentRecord, StockData, User } from '@/types';

export function api(url: string): Promise<StockData[]> {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data.data;
    });
}

/**
 *
 * @param record: InvestmentRecord
 * @param rawData: StockData[]
 * @returns { dates: Array<string>, data: Array<number>}
 */
export const getStartDateMatchingData = (
  record: InvestmentRecord,
  rawData: StockData[]
): {
  dates: Array<string>;
  data: Array<number>;
} => {
  // if raw data is null, return empty lists
  if (rawData == null)
    return {
      dates: [],
      data: [],
    };
  // construct dates array from rawData
  const datesArray = Object.values(rawData).map((d) => {
    return getDateString(new Date(d.date));
  });
  // construct stock adjusted closing price array from rawData
  const dataArray = Object.values(rawData).map((d) => Number(d.adjClose));
  // get start datestring from investment record
  const startDate = getDateString(new Date(record.startDate));
  // find index of startDate string in datesArray
  let index = datesArray.indexOf(startDate);
  // if there is no stock data for start date that user entered, get the nearest one after it
  if (index === -1) index = findNextAvailableDate(startDate, datesArray);
  return {
    dates: datesArray.slice(index), // datesArray from index to end
    data: dataArray.slice(index), // dataArray from index to end
  };
};

export const getWeeksDifference = (dt1: Date, dt2: Date) => {
  const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
  // Convert both dates to milliseconds
  const date1_ms = dt1.getTime();
  const date2_ms = dt2.getTime();
  // Calculate the difference in milliseconds
  const difference_ms = Math.abs(date1_ms - date2_ms);
  // Convert back to weeks and return hole weeks
  return Math.floor(difference_ms / ONE_WEEK);
};

export const getDaysDifference = (dt1: Date, dt2: Date) => {
  // Convert both dates to milliseconds
  const date1_ms = dt1.getTime();
  const date2_ms = dt2.getTime();
  // To calculate the no. of days between two dates
  const diff_ms = Math.abs(date1_ms - date2_ms);
  const diffDays = diff_ms / (1000 * 3600 * 24);
  return Math.round(diffDays);
};

export const getMultiplier = (data: number[]): number => {
  if (data.length === 0) return 0;
  const multiplier = data ? data[data.length - 1] / data[0] : 0;
  const realMultiplier = Number(multiplier.toFixed(2));
  return realMultiplier;
};

export const getDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};

/**
 * this function is called if startDate was not found in datesArray
 * this typically means that startDate was a weekend / holiday, where there is no market data
 * in such a case, we need to find the next available date after startDate
 * @param startDate: string
 * @param dates : Array<string>
 * @returns index
 */
export const findNextAvailableDate = (
  startDate: string,
  dates: Array<string>
): number => {
  const todayDateString = getDateString(new Date());
  if (startDate >= todayDateString) {
    return dates.length - 1;
  }
  // find the first index where date is greater than startDate
  const nextAvailableDateIndex = dates.findIndex((date) => date > startDate);
  // if for some reason, index couldn't be found, just return dates.length - 1
  return nextAvailableDateIndex === -1
    ? dates.length - 1
    : nextAvailableDateIndex;
};

export const formatDate = (date: Date = new Date()) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', { month: '2-digit' });
  const day = date.toLocaleString('default', { day: '2-digit' });

  return [year, month, day].join('-');
};

export const getFirstName = (user: User) => {
  return user.name.split(' ')[0];
};
