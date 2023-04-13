import { getErrorMessage } from '@/lib/functionUtils';
import prisma from '@/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * This API endpoint returns a list of InvestmentRecords.
 * User is identified by an email. This API will return
 * all InvestmentRecords with email identical to that of
 * current session's user email.
 *
 * This endpoint only accepts GET requests.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = req.query?.email as string;

    if (req.method !== 'GET' && req.method !== 'POST') {
      return res.status(405).json({
        error: `${req.method} is not allowed for endpoint. Only GET and POST requests are allowed.`,
      });
    }

    // handle POST request
    if (req.method === 'POST') {
      const newRecord = await prisma.investmentRecord.create({
        data: {
          ...req.body,
          // form passes a string, and database expects DateTime
          startDate: new Date(req.body.startDate),
          didInvest: req.body.didInvest === 'true' ? true : false,
        },
      });
      return res.status(200).json({ data: newRecord });
    }

    if (req.method === 'GET') {
      const investmentRecords = await prisma.investmentRecord.findMany({
        where: {
          email: email,
        },
      });
      return res.status(200).json({ data: investmentRecords });
    }
  } catch (error) {
    return res.status(500).json({ data: null, error: getErrorMessage(error) });
  }
}
