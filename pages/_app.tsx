import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { store, persistedStore } from '@/lib/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';
import { websiteName } from '@/constants';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <Head>
            <title>{websiteName}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
          <Analytics />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
