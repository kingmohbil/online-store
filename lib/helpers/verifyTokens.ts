import { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';
import dbConnect from '@/lib/database/dbConnect';
const jwt = require('jsonwebtoken');
const whitelistTokens = require('lib/database/models/tokenWhitelist');

export async function verifyRefreshToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  if (process.env.REFRESH_TOKEN_SECRET_KEY == null) {
    console.log('Please provide REFRESH_TOKEN_SECRET_KEY variable');
    return res.end();
  }
  await dbConnect();

  const authHeader = req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res.status(401).json({ message: "Refresh token isn't sent" });

  try {
    await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
    await whitelistTokens.exists({ token }).orFail();
    return next();
  } catch (error) {
    const exist = await whitelistTokens.exists({ token });
    if (exist) {
      await whitelistTokens.delete({ token });
    }
    res.status(401).json({ message: "Refresh token isn't valid" });
  }
}

export function verifyAccessToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  if (process.env.TOKEN_SECRET_KEY == null) {
    console.log('Please provide TOKEN_SECRET_KEY variable');
    return res.end();
  }
  const authHeader = req.headers?.['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    jwt
      .verifyToken(token, process.env.TOKEN_SECRET_KEY)
      .then((decoded: any) => {
        return next();
      })
      .catch((error: any) => {
        res.status(401).json(null);
      });
  }
}
