import dbConnect from '@/lib/database/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, NextHandler } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    res.end();
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});
