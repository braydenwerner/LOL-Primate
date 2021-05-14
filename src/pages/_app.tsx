import { useEffect } from 'react'
import type { AppProps /*, AppContext */ } from 'next/app'
import { AppProvider } from '../providers/AppProvider'
import Head from 'next/head';

import { analytics } from '../config/firebaseConfig'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    //  have to initialize here, SSR does not work with analytics; no window available
    if (process.env.NODE_ENV === 'production') {
      //  log when a user views the page in production
      const logEvent = () => {
        analytics().logEvent('screen_view');
      }

      logEvent();
    }

    // Remove the server-side injected CSS.
    const jssStyles: Element | null = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, [])

  return (
    <>
      <Head>
        <title>LOL Primate</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
export default MyApp
