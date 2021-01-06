import Image from "next/image";
import { useState } from "react";
import CMS from "../../cms";
import { useAddToCart } from "../../contexts/cart";
import { STRAPI_URL } from "../../library/constants";
import styles from "./Product.module.css";

export default function Product({ product }) {
  const [amount, setAmount] = useState(1);
  const addToCart = useAddToCart();

  function handleSubmit(e) {
    e.preventDefault();
    addToCart(product, amount);
  }

  return (
    <div className={styles.wrapper}>
      <section className={styles.image}>
        <Image
          src={STRAPI_URL + product.image.url}
          alt={product.name}
          layout="fill"
          objectFit="cover"
        />
      </section>
      <section>
        <dl className={styles.list}>
          <dt>
            Name: <b>{product.title}</b>
          </dt>
          <dt>Description:</dt>
          <dd>
            <b>{product.description}</b>
          </dd>

          <dt>
            Price:{" "}
            <b>
              {product.price} {product.unit && "Per unit"}
            </b>
          </dt>

          <dt>Last Updated</dt>
          <dd>
            <time dateTime={product.updated_at}>{product.updated_at}</time>
          </dd>
        </dl>
        <form onSubmit={handleSubmit} className={styles.cartForm}>
          <label>
            Amount to order
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              min={1}
            />
          </label>
          <button type="submit">Add to cart</button>
        </form>
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  const response = await CMS.productPaths();
  const paths = response.map(({ id }) => ({ params: { id: `${id}` } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(ctx) {
  const product = await CMS.product(ctx.params.id);

  return {
    props: { product },
    revalidate: 600,
  };
}
