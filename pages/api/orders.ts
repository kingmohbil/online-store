import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { verifyAccessToken } from '@/lib/helpers/verifyTokens';
import dbConnect from '@/lib/database/dbConnect';
const jwt = require('jsonwebtoken');
const Orders = require('@/lib/database/models/orderModel');

const router = createRouter<NextApiRequest, NextApiResponse>().get(
  verifyAccessToken,
  async (req, res) => {
    const authHeader = req.headers?.['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
      const decodedToken = await jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY
      );
      if (decodedToken.roles === 'admin') {
        const orders = await getAllAdminOrders();
        res.json({ orders, role: decodedToken.roles });
      } else if (decodedToken.roles === 'delivery') {
        const orders = await getAllDeliveryOrders();
        res.json({ orders, role: decodedToken.roles });
      } else {
        res.json({ orders: [], role: decodedToken.roles });
      }
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Your token is't valid" });
    }
  }
);
export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});

async function getAllAdminOrders() {
  try {
    await dbConnect();
    return Promise.resolve(Orders.find({}).select({ __v: 0 }));
  } catch (error: any) {
    return Promise.reject(error);
  }
}

async function getAllDeliveryOrders() {
  try {
    await dbConnect();
    return Promise.resolve(
      Orders.find({}).select({
        __v: 0,
        email: 0,
        order_details: 0,
        confirmed: 0,
      })
    );
  } catch (error) {
    return Promise.reject(error);
  }
}
