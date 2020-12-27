import Image from "next/image";
import CMS from "../../../CMS";
import styles from "./ArticleCard.module.css";

export default function ArticleCard({ article, size }) {
  const style = [styles.card];
  return (
    <article className={styles.card + " " + styles[size]}>
      <Image src={`${CMS.CMS_ROOT}${article.image.url}`} layout="fill" />
      <p>{article.title}</p>
      <p>{article.subtitle}</p>
    </article>
  );
}
