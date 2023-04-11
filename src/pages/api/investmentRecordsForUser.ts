import prisma from '@/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = req.query?.email as string;

    if (req.method === 'POST') {
      return res.status(200).json({});
    }

    let investmentRecords;

    if (req.method === 'GET') {
      if (email !== null) {
        investmentRecords = await prisma.investmentRecord.findMany({
          where: {
            email: email,
          },
        });
      } else {
        return res.status(500).json({
          investmentRecords: null,
          errorMessage:
            'expected email param to be nonnull for investmentRecordsForUser endpoint.',
        });
      }

      return res.status(200).json({ investmentRecords: investmentRecords });
    }
  } catch (e: any) {
    return res
      .status(500)
      .json({ investmentRecords: null, errorMessage: e.message });
  }
}
