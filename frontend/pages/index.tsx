import Head from "next/head";
import { useI18n } from "next-localization";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Header from "../components/Header/Header";
import PagesList from "../components/PagesList/PagesList";

export default function Home() {
  const router = useRouter();
  const i18n = useI18n();

  useEffect(() => {
    async function changeLocale() {
      if (router.locale === "en") {
        i18n.set("en", await import("../locales/en.json"));
        i18n.locale("en");
      } else if (router.locale === "fr") {
        i18n.set("fr", await import("../locales/fr.json"));
        i18n.locale("fr");
      }
    }
    changeLocale();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  return (
    <div>
      <Head>
        <title>Content Management App - Itai Keren</title>
        <meta name="description" content="Content Management App by Itai Keren" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen bg-gray-200">
        <div>
          <Header />
        </div>
        <div className="p-5">
          <PagesList />
        </div>
      </div>
    </div>
  );
}
