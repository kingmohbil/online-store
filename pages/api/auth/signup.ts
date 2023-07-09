import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, NextHandler } from 'next-connect';
import { body, validationResult } from 'express-validator';
import dbConnect from '@/lib/database/dbConnect';
const Users = require('@lib/database/models/userModel');
const bcrypt = require('bcryptjs');

const router = createRouter<NextApiRequest, NextApiResponse>().post(
  // connecting to the database
  async (req, res, next) => {
    await dbConnect();
    return next();
  }, // validating and sanitizing the first name
  body('firstName')
    .trim()
    .isLength({
      min: 3,
    })
    .withMessage("First name can't less than 3 characters")
    .isLength({ max: 20 })
    .withMessage("First name can't more than 20 characters")
    // making sure that those are the allowed characters
    .matches(/^[A-Za-z_@#]*$/)
    .withMessage('Invalid Inputs')
    .escape(),
  // validating and sanitizing the first name
  body('lastName')
    .trim()
    .isLength({
      min: 3,
    })
    .withMessage("Last name can't less than 3 characters")
    .isLength({ max: 20 })
    .withMessage("Last name can't more than 20 characters")
    // making sure that those are the allowed characters
    .matches(/^[A-Za-z_@#]*$/)
    .withMessage('Invalid Inputs')
    .escape(),
  // validating and sanitizing the email
  body('email', 'Invalid email address')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    // checking if the email exists for another user or not
    .custom(async (email) => {
      const exists = await Users.exists({ 'email.email_address': email });
      if (exists === null) {
        return true;
      }
      throw new Error('Email already exists');
    }),
  // validating and sanitizing the phone number
  body('phoneNumber', 'Invalid phone number')
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage('Phone number must be 10 numbers')
    // validating that the phone number starts with jordan providers
    .matches(/^(079|078|077)\d+$/)
    .custom(async (number) => {
      const exists = await Users.exists({
        'contact_details.phone_number': number,
      });

      if (exists === null) {
        return true;
      }
      throw new Error('Phone number is linked to another account');
    })
    .escape(),
  // validating and sanitizing the password field
  body('password', 'Invalid password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 20 })
    .withMessage('Password must be at most 20 characters')
    // validating that the password does not contain malicious characters
    .matches(/^[A-Za-z0-9_@$]*$/)
    .withMessage('Password Contain invalid characters')
    .escape(),
  // comparing the password to the confirm password field
  body('confirmPassword')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 20 })
    .withMessage('Password must be at most 20 characters')
    .matches(/^[A-Za-z0-9_@$]*$/)
    .withMessage('Password Contain invalid characters')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  // this is the middleware that will be called to check for
  // validation errors
  async (req: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const errors = validationResult(req);
    // checking if there is no validation errors to call the next middleware
    if (errors.isEmpty()) {
      return next();
    }
    // mapping through the errors to send them as a response
    const responseErrors = errors.array().map((error: any, i) => {
      const path = error.path || i;
      return { [path]: error.msg };
    });
    // sending the response with 400 BAD REQUEST error
    return res.status(400).json({ errors: responseErrors });
  },
  // the middleware that adds the user to the database
  async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        first_name: firstName,
        last_name: lastName,
        email: {
          email_address: email,
        },
        contact_details: {
          phone_number: phoneNumber,
        },
        password: hashedPassword,
        roles: 'user',
      });
      return res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
);
export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});
