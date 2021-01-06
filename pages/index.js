import { useEffect } from "react";
import CMS from "../CMS";
import ArticleCard from "../components/modules/ArticleCard";
import styles from "./Home.module.css";
import ProductCarousel from "../components/modules/ProductCarousel";

export default function Home({ articles, latestProducts }) {
  return (
    <>
      <section className={styles.carouselWrapper}>
        <ProductCarousel products={latestProducts} />
      </section>
      <section className={styles.Articles}>
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
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
  const latestProducts = await CMS.products("?_sort=updated_at:desc&_limit=15");

  return {
    props: {
      articles,
      latestProducts,
    },
  };
}
