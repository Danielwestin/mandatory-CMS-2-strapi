import Image from "next/image";
import { useRemoveFromCart } from "../../../contexts/cart";
import { useSetModal } from "../../../contexts/modal";
import { STRAPI_URL } from "../../../library/constants";
import { pluralize } from "../../../library/strings";
import Delete from "../../svg/Delete";
import Edit from "../../svg/Edit";
import styles from "./CartItem.module.css";

export default function CartItem({ product }) {
  const src = product.image.formats?.thumbnail?.url || product.image.url;
  const setModal = useSetModal();
  const removeFromCart = useRemoveFromCart();

  const amount = product.unit && "Unit";

  return (
    <li className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <Image
          src={STRAPI_URL + src}
          layout="fill"
          objectFit="cover"
          alt={product.title}
        />
      </div>
      <h5>{product.title}</h5>
      <div className={styles.priceDetails}>
        <span>
          {product.amount >= 2
            ? `${product.amount} ${pluralize(amount)}`
            : `${product.amount} ${amount}`}
        </span>
        <b>{(product.amount * product.price).toFixed(2)}</b>
      </div>
      <div className={styles.menu}>
        <button
          onClick={() =>
            setModal("AddCartItemModal", { product, type: "edit" })
          }
        >
          <Edit />
        </button>
        <button onClick={() => removeFromCart(product)}>
          <Delete />
        </button>
      </div>
    </li>
  );
}
