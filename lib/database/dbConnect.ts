import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }
  if (mongoose.connections[0].readyState) {
    console.log('connected to database.');
  } else {
    console.log(`database isn't connected.`);
    console.log('connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('connected to database.');
  }
}

export default dbConnect;
