import dbConnect from '../database/dbConnect';
const tokensWhiteList = require('../database/models/tokenWhiteList');
const jwt = require('jsonwebtoken');
export async function generateAccessToken(payload: {}) {
  if (process.env.TOKEN_SECRET_KEY == null) {
    console.log('Please provide TOKEN_SECRET_KEY variable');
    return;
  }
  return await jwt.sign(
    // Set an expiration date of 30 minutes
    { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 30 },
    process.env.TOKEN_SECRET_KEY
  );
}

export async function generateRefreshToken(payload: {}) {
  if (process.env.REFRESH_TOKEN_SECRET_KEY == null) {
    console.log('Please provide REFRESH_TOKEN_SECRET_KEY variable');
    return;
  }
  const refreshToken = await jwt.sign(
    {
      ...payload,
      // Set an expiration date of 15 days for the refresh toke
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
  try {
    await dbConnect();
    await tokensWhiteList.create({
      token: refreshToken,
    });
    return refreshToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
