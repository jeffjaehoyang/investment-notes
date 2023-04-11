export default async function fetcherWithTicker<JSON = any>(
  input: { url: string; ticker: string },
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(`${input.url}?ticker=${input.ticker}`, init);
  return res.json();
}
