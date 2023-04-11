import type { NextApiRequest, NextApiResponse } from 'next';
import yf from 'yahoo-finance2';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tickerSymbol = req.query.ticker;

    if (req.method === 'POST') {
      return res.status(200).json({});
    }

    if (req.method === 'GET') {
      if (typeof tickerSymbol !== 'undefined' && tickerSymbol) {
        const queryOptions = { period1: '1970-01-01' };
        const stockData = await yf.historical(
          tickerSymbol as string,
          queryOptions
        );
        // const storableStockData = JSON.stringify(stockData);
        return res.status(200).json({
          data: stockData,
        });
      } else {
        return res.status(500).json({ data: null, errorMessage: 'error' });
      }
    }
  } catch (e: any) {
    return res.status(500).json({ data: null, errorMessage: 'error' });
  }
}
