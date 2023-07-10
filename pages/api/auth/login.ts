import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, NextHandler } from 'next-connect';
import { body, validationResult } from 'express-validator';
import {
  generateAccessToken,
  generateRefreshToken,
} from '@/lib/helpers/generateTokens';
import dbConnect from '@/lib/database/dbConnect';
const Users = require('@/lib/database/models/userModel');
const bcrypt = require('bcryptjs');

const router = createRouter<NextApiRequest, NextApiResponse>().post(
  // validating and sanitizing the email
  body('email', 'Invalid email address')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape(),
  // validating and sanitizing the password field
  body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 20 })
    .withMessage('Password must be at most 20 characters')
    // validating that the password does not contain malicious characters
    .matches(/^[A-Za-z0-9_@$]*$/)
    .withMessage('Password Contain invalid characters')
    .escape(),
  // this is the middleware that will be called to body for
  // validation errors
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const errors = validationResult(req);
    // bodying if there is no validation errors to call the next middleware
    if (errors.isEmpty()) {
      return next();
    }
    // mapping through the errors to send them as a response
    let responseErrors = {};
    errors.array().map((error: any, i) => {
      const path = error.path || i;
      responseErrors = {
        ...responseErrors,
        [path]: error.msg,
      };
      return;
    });
    // sending the response with 400 BAD REQUEST error
    return res.status(400).json({ errors: responseErrors });
  },
  // the middleware that authenticates the user from the database
  async (req, res) => {
    const { email, password } = req.body;
    try {
      // connecting to the database
      await dbConnect();
      const user = await Users.findOne({
        'email.email_address': email,
      }).orFail();
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const refreshToken = await generateRefreshToken({
          userId: user.id,
          email: user.email,
        });

        const accessToken = await generateAccessToken({
          userId: user.id,
          email: user.email,
        });
        return res.json({ refreshToken, accessToken });
      }
      return res
        .status(401)
        .json({ errorMessage: 'Incorrect username or password' });
    } catch {
      return res
        .status(401)
        .json({ errorMessage: 'Incorrect username or password' });
    }
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ errorMessage: 'Method Not Allowed' });
  },
});
