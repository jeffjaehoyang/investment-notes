import { InvestmentRecord } from '@/types';

export default async function getInvestmentRecordsForUser(
  input: { url: string; args: string },
  init?: RequestInit
): Promise<InvestmentRecord[]> {
  const res = await fetch(`${input.url}?email=${input.args}`, init);
  const rawData = await res.json();
  return rawData.data;
}
