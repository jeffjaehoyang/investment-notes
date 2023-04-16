import { getErrorMessage } from '@/lib/functionUtils';
import type { NextApiRequest, NextApiResponse } from 'next';
import yf from 'yahoo-finance2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tickerSymbol = req.query.ticker;

    if (req.method !== 'GET') {
      return res.status(405).json({
        error: `${req.method} is not allowed for endpoint. Only GET requests are allowed.`,
      });
    }

    if (req.method === 'GET') {
      const searchResults = await yf.search(tickerSymbol as string, {
        quotesCount: 5,
        newsCount: 0,
      });
      const filteredResult = searchResults.quotes.slice(0, 5).map((quote) => {
        return {
          value: quote.symbol,
          label: `${quote.symbol} (${quote.shortname})`,
        };
      });
      return res.status(200).json({
        data: filteredResult,
      });
    }
  } catch (error) {
    return res.status(500).json({ data: null, error: getErrorMessage(error) });
  }
}
