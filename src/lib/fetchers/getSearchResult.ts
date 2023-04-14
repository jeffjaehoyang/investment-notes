import { SearchResult } from 'yahoo-finance2/dist/esm/src/modules/search';

export default async function getSearchResult(
  input: { url: string; ticker: string },
  init?: RequestInit
): Promise<SearchResult> {
  const res = await fetch(`${input.url}?ticker=${input.ticker}`, init);
  const rawData = await res.json();
  return rawData.data;
}
