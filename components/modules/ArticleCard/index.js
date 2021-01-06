import Image from "next/image";
import CMS from "../../../CMS";
import styles from "./ArticleCard.module.css";
import { STRAPI_URL } from "../../../library/constants";

export default function ArticleCard({ article, size }) {
  return (
    <article className={styles.card + " " + styles[size]}>
      <Image
        src={STRAPI_URL + article.image.url}
        layout="fill"
        objectFit="cover"
        alt={article.title}
      />
      <h1>{article.title}</h1>
      <p>{article.subtitle}</p>
    </article>
  );
}
