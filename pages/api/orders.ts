import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { verifyAccessToken } from '@/lib/helpers/verifyTokens';
import {
  sendCustomerInvoice,
  sendManagerInvoice,
  sendDeliveryEmail,
  sendProductProviderEmail,
} from '@/lib/mailSender';

import dbConnect from '@/lib/database/dbConnect';
const jwt = require('jsonwebtoken');
const Orders = require('@/lib/database/models/orderModel');

const router = createRouter<NextApiRequest, NextApiResponse>()
  .get(verifyAccessToken, async (req, res) => {
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
  })
  .put(verifyAccessToken, async (req, res) => {
    // Extracting access token for getting the roles
    const authHeader = req.headers?.['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    try {
      // verifying the token to get the access level
      const decodedToken = await jwt.verify(
        token,
        process.env.TOKEN_SECRET_KEY
      );
      const role = decodedToken.roles;
      const { body } = req;
      // updating delivered status for a particular order
      if (
        typeof body.delivered !== 'undefined' &&
        (role === 'admin' || role === 'delivery')
      ) {
        await Orders.updateOne(
          { _id: body.id },
          { $set: { delivered: body.delivered } }
        ).orFail();
        return res.end();
      } // updating confirmed requires admin access level
      else if (typeof body.confirmed !== 'undefined' && role === 'admin') {
        const result = await Orders.findOneAndUpdate(
          { _id: body.id },
          { $set: { confirmed: body.confirmed } },
          { new: true }
        ).orFail();
        if (result.confirmed) {
          const total = result.order_details.products.reduce(
            (acc: number, cur: any) => acc + cur.price * cur.quantity,
            0
          );
          const values = {
            orderId: result.id,
            customerName: `${result.first_name} ${result.last_name}`,
          };

          sendCustomerInvoice({
            ...values,
            customerEmail: result.email,
            orderDetails: result.order_details,
            total: `${total + result.order_details.delivery_fees}`,
          });

          sendDeliveryEmail({
            ...values,
            customerPhone: result.phone_number,
            customerSecondPhone: '',
            customerLocation: result.location_details.location,
            customerPayment: `${
              total + result.order_details.delivery_fees
            } JOD to collect.`,
          });

          sendProductProviderEmail({
            orderId: result.id,
            orderDetails: result.order_details,
          });

          sendManagerInvoice({
            ...values,
            customerEmail: result.email,
            orderDetails: result.order_details,
            customerPhone: result.phone_number,
            customerSecondPhone: '',
            customerLocation: result.location_details.location,
            paymentMethod: 'cash',
            total: `${total + result.order_details.delivery_fees}`,
          });
        }
        res.end();
      } else return res.status(400).end();
    } catch (error) {
      res.status(500).end();
    }
  });

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
