import Head from "next/head";
import SiteHeader from "../modules/SiteHeader";
import styles from "./Layout.module.css";

export default function Layout({ children, categories }) {
  return (
    <div>
      <Head>
        <title>Fruit King</title>
        <link rel="icon" href="../../public/Banana.ico" />
      </Head>
      <SiteHeader categories={categories} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
