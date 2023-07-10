const tokensWhiteList = require('../database/models/tokenWhiteList');
const jwt = require('jsonwebtoken');
export async function generateAccessToken(payload: {}) {
  return await jwt.sign(
    // Set an expiration date of 30 minutes
    { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 30 },
    process.env.TOKEN_SECRET_KEY
  );
}

export async function generateRefreshToken(payload: {}) {
  const refreshToken = await jwt.sign(
    {
      ...payload,
      // Set an expiration date of 15 days for the refresh toke
      exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 15,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
  try {
    tokensWhiteList.create({
      token: refreshToken,
    });
    return refreshToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
