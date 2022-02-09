import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp
