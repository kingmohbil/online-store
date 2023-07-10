import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import dbConnect from '@/lib/database/dbConnect';
const tokenWhiteList = require('@/lib/database/models/tokenWhiteList');

const router = createRouter<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(400).json({ message: 'Invalid Request' });
    }
    const refreshToken = authHeader.split(' ')[1];
    try {
      await dbConnect();
      await tokenWhiteList.deleteOne({ token: refreshToken });
      return res.status(200).json({ message: 'user logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router.handler({
  onNoMatch: (req, res) => {
    return res.status(405).json({ errorMessage: 'Method Not Allowed' });
  },
});
