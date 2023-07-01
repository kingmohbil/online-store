import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { store } from '@/lib/store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { websiteName } from '@/constants';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Head>
          <title>{websiteName}</title>
        </Head>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
