import Head from "next/head";
import SiteHeader from "./modules/SiteHeader/";

export default function SiteLayout({ children }) {
  return (
    <div>
      <Head>
        <title>Fruit King</title>
        <link rel="icon" href="/Banana.ico" />
      </Head>
      <SiteHeader />
      {children}
    </div>
  );
}
