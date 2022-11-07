import "../styles/globals.css";
import { Flowbite, Spinner } from "flowbite-react";
import { Suspense } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { flowbiteTheme as theme } from "../theme";

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">
            <Spinner size="lg" /> Loading..
          </div>
        }
      >
        <Flowbite theme={{ theme }}>
          <Component {...pageProps} />
        </Flowbite>
      </Suspense>
    </SessionProvider>
  );
}
