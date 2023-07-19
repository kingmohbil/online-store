import Head from 'next/head';
import AppBar from '@/components/AppBar';
import HomeComponent from '@/components/HomePage';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';
import { Box } from '@mui/material';
import { websiteName } from '@/constants';

export default function Home() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <BackToTop />
        <Head>
          <meta
            name="description"
            content="Home page for a brief description about the store"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <AppBar />
        <HomeComponent />
        <Box sx={{ flexGrow: 1 }}></Box>
        <Footer />
      </Box>
    </>
  );
}
