import { useEffect } from "react";
import CMS from "../CMS";
import ArticleCard from "../components/modules/ArticleCard";
import styles from "./Home.module.css";

export default function Home({ articles }) {
  return (
    <>
      <section className={styles.Categories}>testing: one two, one two</section>
      <section className={styles.Articles}>
        {articles.map((article, index) => (
          <ArticleCard
            article={article}
            size={index >= 2 ? "medium" : "large"}
          />
        ))}
      </section>
    </>
  );
}

export async function getStaticProps() {
  const articles = await CMS.articles();

  return {
    props: {
      articles,
    },
  };
}
