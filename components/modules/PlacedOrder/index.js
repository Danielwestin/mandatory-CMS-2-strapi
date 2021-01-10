import styles from "./PlacedOrder.module.css";
import Delete from "../../svg/Delete";
import CMS from "../../../CMS";
import { useNotify } from "../../../contexts/notification";

export default function PlacedOrder({ order, handleRemovedOrder }) {
  const notify = useNotify();

  //   function SplitTime(date) {
  //     return date.split("T").shift();
  //   }

  async function RemoveOrder() {
    try {
      await CMS.deleteOrder(order.id);
      handleRemovedOrder(order.id);
      notify({
        type: "success",
        content: "YES",
      });
    } catch ({ message }) {
      notify({
        type: "error",
        content: message,
      });
    }
  }

  return (
    <li className={styles.orderWrapper}>
      <section>
        <h4>Information regarding you order</h4>

        <p>
          <b>Placed:</b> {new Date(order.created_at).toLocaleDateString()}
        </p>
        <p>
          <b>Confirmed email:</b> {order.email}, ID: {order.id}
        </p>
        <p>
          <b>Entered phone:</b> 0{order.phone}
        </p>
        <p>
          <b>Shipps to:</b> {order.street}, {order.city}
        </p>
        <p>
          <b>Ordered by:</b> {order.customer.username}
        </p>
        <ul>
          <b>Products in Order:</b>{" "}
          {order.details.map((product) => (
            <li key={product.id}>
              {product.title}, {product.price}, {product.amount}{" "}
              {product.amount > 1 ? "units" : "unit"}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <button onClick={() => RemoveOrder()}>
          <Delete />
        </button>
      </section>
    </li>
  );
}
