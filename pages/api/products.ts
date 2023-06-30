import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter, NextHandler } from 'next-connect';
import dbConnect from '@/lib/database/dbConnect';
const Products = require('@/lib/database/models/productModel.ts');
const router = createRouter<NextApiRequest, NextApiResponse>().post(
  async (req, res) => {
    try {
      await dbConnect();
      const { name, description, imageSrc, price, available, category } =
        req.body;
      const product = await Products.create({
        name,
        description,
        image_url: imageSrc,
        price,
        category,
        available,
      });
      res.json({ message: 'hello', product });
    } catch (error) {
      console.log(error);
    }
  }
);

export default router.handler({
  onNoMatch: async (req, res) => {
    res.status(405).json({ message: 'Method Not Allowed' });
  },
});
