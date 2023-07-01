import Head from 'next/head';
import AppBar from '@/components/AppBar';
import HomeComponent from '@/components/HomePage';
import { websiteName } from '@/constants';

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Home page for a brief description about the store"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <HomeComponent />
    </>
  );
}
