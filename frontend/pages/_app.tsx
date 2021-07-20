import { I18nProvider } from "next-localization";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { lngDict, ...rest } = pageProps;

  return (
    <I18nProvider lngDict={lngDict} locale={router.locale!}>
      <Component {...rest} />
    </I18nProvider>
  );
}
export default MyApp;
