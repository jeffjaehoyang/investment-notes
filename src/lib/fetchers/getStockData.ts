import { StockData } from '@/types';

export default async function getStockData(
  input: { url: string; ticker: string },
  init?: RequestInit
): Promise<StockData[]> {
  const res = await fetch(`${input.url}?ticker=${input.ticker}`, init);
  const rawData = await res.json();
  return rawData.data;
}
