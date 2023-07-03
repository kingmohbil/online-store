import dbConnect from '@/lib/database/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, NextHandler } from 'next-connect';
const Products = require('lib/database/models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

interface ProductsType {
  id: string;
  quantity: number;
}

interface DbProduct {
  id: string;
  name: string;
  price: number;
}

const router = createRouter<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    const productId: ProductsType[] = req.body.products;
    const mappedProduct = new Map(
      productId.map((product) => [product.id, product.quantity])
    );
    try {
      await dbConnect();
      const data = await Products.find({
        _id: {
          $in: productId.map((productId) => productId.id),
        },
        available: true,
      }).select('-__v -category -image_url -description -available');
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: data.map((product: DbProduct) => {
          const quantity = mappedProduct.get(product.id);
          return {
            price_data: {
              currency: 'jod',
              product_data: {
                name: product.name,
              },
              unit_amount: product.price * 1000,
            },
            quantity,
          };
        }),
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}`,
      });
      res.json({ url: session.url });
    } catch (error: any) {
      console.log(error.message);
      res.status(404).json({});
    }
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});
