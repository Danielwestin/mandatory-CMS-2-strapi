import { useEffect, useState } from "react";
import CMS from "../../cms";
import CartItem from "../../components/modules/CartItem";
import CheckoutIcon from "../../components/svg/Checkout";
import RegisterIcon from "../../components/svg/Register";
import { useCartContext } from "../../contexts/cart";
import { useNotify } from "../../contexts/notification";
import { useUser } from "../../contexts/user";
import { desnakeify, titleize } from "../../library/strings";
import styles from "./Checkout.module.css";

const inputs = [
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: false },
  { name: "city", type: "text", required: true },
  { name: "street", type: "text", required: true },
  { name: "zip_code", type: "number", required: true },
];

function toTotalAmount(acc, cur) {
  return acc + cur.amount * cur.price;
}

export default function Cart() {
  const notify = useNotify();
  const { cart } = useCartContext();
  const user = useUser();
  const [formValues, setFormValues] = useState({
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.street || "",
    city: user?.city || "",
    zip_code: user?.zip_code || "",
  });

  useEffect(() => {
    setFormValues((prev) => ({
      email: user?.email || prev.email,
      phone: user?.phone || prev.phone,
      street: user?.street || prev.street,
      city: user?.city || prev.city,
      zip_code: user?.zip_code || prev.zip_code,
    }));
  }, [user]);

  function handleChange(e) {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const body = {
        ...formValues,
        details: cart.map(({ id, title, amount, price }) => ({
          id,
          title,
          amount,
          price,
        })),
        customer: user.id,
      };
      const response = await CMS.placeOrder(body);
      // console.log("is ok", response);
    } catch ({ message }) {
      notify({
        type: "error",
        content: message,
      });
    }
  }

  const totalAmount = cart.reduce(toTotalAmount, 0).toFixed(2);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.details}>
        {cart.map((item) => (
          <CartItem key={item.id} product={item} />
        ))}
      </ul>
      <header className={styles.header}>
        {/* <RegisterIcon /> */}
        <form id="formy" onSubmit={handleSubmit}>
          {inputs.map(({ name, ...props }) => (
            <label key={name}>
              {titleize(desnakeify(name))}
              <input
                name={name}
                {...props}
                value={formValues[name]}
                onChange={handleChange}
              />
            </label>
          ))}
        </form>
      </header>

      <footer className={styles.footer}>
        <span>
          <b>Total:</b> {totalAmount} moneys
        </span>
        <button type="submit" form="formy">
          Place order <CheckoutIcon />
        </button>
      </footer>
    </div>
  );
}
