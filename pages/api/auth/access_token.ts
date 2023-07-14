import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { generateAccessToken } from '@/lib/helpers/generateTokens';
import { verifyRefreshToken } from '@/lib/helpers/verifyTokens';
const jwt = require('jsonwebtoken');

const router = createRouter<NextApiRequest, NextApiResponse>().post(
  verifyRefreshToken,
  async (req, res) => {
    const authHeader = req.headers?.['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
      const user = await jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      const accessToken = await generateAccessToken({
        userId: user.userId,
        email: user.email.email_address,
        roles: user.roles,
      });
      return res.json({ accessToken, message: 'Refresh token verified' });
    } catch (error) {
      return res.status(401).json({ message: "Refresh token isn't valid" });
    }
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ errorMessage: 'Method Not Allowed' });
  },
});
