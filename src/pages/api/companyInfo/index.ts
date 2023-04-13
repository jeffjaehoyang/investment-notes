import yf from 'yahoo-finance2';

import { getErrorMessage } from '@/lib/functionUtils';

/**
 * This API endpoint returns an object with 2 fields.
 * - companyDomain
 * - companyName
 *
 * This endpoint only accepts GET requests.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
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
      const result = await yf.quoteSummary(tickerSymbol as string, {
        modules: ['summaryProfile', 'quoteType'],
      });
      const companyWebsiteUrl = result?.summaryProfile?.website;
      const domain = new URL(companyWebsiteUrl as string);
      let cleanDomain = domain.hostname.replace('www.', '');
      if (tickerSymbol === 'META') {
        cleanDomain = 'meta.com';
      }
      return res.status(200).json({
        data: {
          companyDomain: cleanDomain,
          companyName: result?.quoteType?.longName,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({ data: null, error: getErrorMessage(error) });
  }
}
