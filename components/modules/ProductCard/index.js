import Image from "next/image";
import Link from "next/link";
import { useSetModal } from "../../../contexts/modal";
import { STRAPI_URL } from "../../../library/constants";
import Add from "../../svg/Add";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, size = "medium" }) {
  const setModal = useSetModal();
  const src =
    size === "medium"
      ? product.image.url
      : product.image.formats.small?.url || product.image.formats.thumbnail.url;

  function handleAdd(e) {
    e.stopPropagation();
    setModal("AddCartItemModal", { product, type: "add" });
  }

  return (
    <article className={`${styles[size]} ${styles.article}`}>
      <Link href={`/products/${product.id}`}>
        <a>
          <header>
            <Image
              src={STRAPI_URL + src}
              alt={product.title}
              layout="fill"
              objectFit="cover"
            />
          </header>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
        </a>
      </Link>
      <footer>
        <span>
          <b>{product.price}</b> / {product.unit}
        </span>
        <button onClick={handleAdd}>
          <Add />
        </button>
      </footer>
    </article>
  );
}
