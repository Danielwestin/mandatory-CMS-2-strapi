import Link from "next/link";
import { useCart, useClearCart } from "../../../contexts/cart";
import { useSetModal } from "../../../contexts/modal";
import { useSetUser, useUser } from "../../../contexts/user";
import { pluralize } from "../../../library/strings";
import CartItem from "../CartItem";
import styles from "./SiteHeader.module.css";
import Cart from "../../svg/Cart";
import User from "../../svg/User";
import Checkout from "../../svg/Checkout";
import ArrowRight from "../../svg/ArrowRight";

export default function SiteHeader({ categories }) {
  const setModal = useSetModal();
  const user = useUser();
  const setUser = useSetUser();
  const cart = useCart();
  const clearCart = useClearCart();

  const buttonLabel = user ? "Logout" : "Login";
  const handleLoginOrLogout = () =>
    user ? setUser(undefined) : setModal("LoginModal");

  return (
    <header className={styles.header}>
      <nav>
        <div className="dropdownParent">
          <Link href="/">
            <a>Categories</a>
          </Link>
          <ul
            className={`dropdownAlignLeft dropdown ${styles.categoriesDropdown}`}
          >
            {categories.map(({ id, title }) => (
              <li key={title}>
                <Link href={`/categories/${id}`}>
                  <a className={styles.category}>
                    {title} <ArrowRight />
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Link href="/">
        <a>logo</a>
      </Link>
      <nav>
        <div className="dropdownParent">
          <button onClick={handleLoginOrLogout}>
            <User />
          </button>
          <ul className="dropdownAlignRight dropdown ">
            <li>
              <button onClick={handleLoginOrLogout}>{buttonLabel}</button>
            </li>
            <li>
              <Link href="/registration">
                <a>Register</a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>Profile</a>
              </Link>
            </li>
            <li>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="dropdownParent">
          <Link href="/checkout">
            <a>
              <Cart />
            </a>
          </Link>
          <ul className={`dropdownAlignRight dropdown ${styles.cart}`}>
            {cart.length === 0 && <p>Your cart is empty.</p>}
            {cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
            {cart.length > 0 && (
              <div>
                <Link href="/checkout">
                  <a className="button--solid">
                    <Checkout /> Checkout
                  </a>
                </Link>
                <button onClick={clearCart}>Clear Cart</button>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
