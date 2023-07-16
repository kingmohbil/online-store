import dbConnect from '@/lib/database/dbConnect';
const Orders = require('@/lib/database/models/orderModel');
const Products = require('@/lib/database/models/productModel');
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

interface OrderDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location_details: {
    city: string;
    location: string;
  };
  order_details: {
    products: [
      {
        product_id: string;
        name: string;
        quantity: number;
        price: number;
      }
    ];
    delivery_fees: number;
  };
}
const router = createRouter<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    if (req.body.payment_method === 'cash')
      try {
        // extracting fields from the request body
        const {
          first_name,
          last_name,
          email,
          phone_number,
          location_details,
          order_details,
          product_ids,
          items,
        } = req.body;
        await dbConnect();
        // getting the product pricing info
        const products = await Products.find({
          _id: {
            $in: product_ids,
          },
          available: true,
        }).select('+ name + price');
        // combining each product with it's corresponding quantity
        const productDetails = products.map((product: any) => ({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: items[product.id],
        }));
        // creating the order
        const order = await handleCashOnDelivery({
          first_name,
          last_name,
          email,
          phone_number,
          location_details,
          order_details: {
            products: productDetails,
            delivery_fees: order_details.delivery_fees,
          },
        });
        res.status(201).json({ order: order });
      } catch (error) {
        console.log(error);
        res.status(400).json({ order: null });
      }
    else res.status(404).json(null);
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});

async function handleCashOnDelivery(order: OrderDetails) {
  try {
    await dbConnect();
    return Promise.resolve(Orders.create(order));
  } catch (error) {
    return Promise.reject(error);
  }
}
