import yf from 'yahoo-finance2';

import { getErrorMessage } from '@/lib/functionUtils';

import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tickerSymbol = req.query.ticker;

    if (req.method !== 'GET') {
      return res.status(405).json({});
    }

    if (req.method === 'GET') {
      const queryOptions = { period1: '1970-01-01' };
      const stockData = await yf.historical(
        tickerSymbol as string,
        queryOptions
      );
      return res.status(200).json({
        data: stockData,
      });
    }
  } catch (error) {
    return res.status(500).json({ data: null, error: getErrorMessage(error) });
  }
}
