import prisma from '@/lib/prisma';

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const recordId = req.query?.recordId;

    if (req.method === 'POST') {
      return res.status(200).json({});
    }

    let investmentRecord;

    if (req.method === 'GET') {
      if (typeof recordId !== undefined) {
        investmentRecord = await prisma.investmentRecord.findUniqueOrThrow({
          where: {
            id: Number(recordId),
          },
        });
        return res.status(200).json({ investmentRecord: investmentRecord });
      } else {
        return res.status(500).json({
          message:
            'expected recordId param to be nonnull for investmentRecordById endpoint.',
        });
      }
    }
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
