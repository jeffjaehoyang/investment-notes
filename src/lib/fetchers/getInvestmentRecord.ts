import { InvestmentRecord } from '@/types';

export default async function getInvestmentRecord(
  input: { url: string },
  init?: RequestInit
): Promise<InvestmentRecord> {
  const res = await fetch(`${input.url}`, init);
  const rawData = await res.json();
  return rawData.data;
}
