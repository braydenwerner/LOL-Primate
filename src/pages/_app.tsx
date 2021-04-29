import type { AppProps /*, AppContext */ } from 'next/app'
import { AppProvider } from '../providers/AppProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
