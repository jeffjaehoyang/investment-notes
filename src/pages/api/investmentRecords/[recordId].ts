import { getErrorMessage } from '@/lib/functionUtils';
import prisma from '@/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * This API endpoint does CRUD operations for InvestmentRecord.
 *
 * @param req
 * @param res
 * @returns
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { recordId } = req.query;

    if (req.method !== 'GET' && req.method !== 'DELETE') {
      return res.status(405).json({
        error: `${req.method} is not allowed for endpoint. Only GET and DELETE requests are allowed.`,
      });
    }

    if (req.method === 'GET') {
      const investmentRecord = await prisma.investmentRecord.findUniqueOrThrow({
        where: {
          id: Number(recordId),
        },
      });
      return res.status(200).json({ data: investmentRecord });
    }

    if (req.method === 'DELETE') {
      await prisma.investmentRecord.delete({
        where: {
          id: Number(recordId),
        },
      });
      return res.status(200).json({ data: recordId });
    }
  } catch (error) {
    // catch all errors, and send back as server error response
    return res.status(500).json({ error: getErrorMessage(error) });
  }
}
