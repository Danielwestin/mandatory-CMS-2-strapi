import Link from "next/link";
import { useState, useEffect } from "react";
import CMS from "../../../cms";
import { useSetUser, useUser } from "../../../contexts/user";
import LoginModal from "../LoginModal";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  const [modalActive, setModalActive] = useState(false);
  const [categories, setCategories] = useState([]);
  const user = useUser();
  const setUser = useSetUser();

  const buttonLabel = user ? "Logout" : "Login";
  const handleLoginOrLogout = () =>
    user ? setUser(undefined) : setModalActive(true);

  useEffect(() => {
    (async function () {
      const response = await CMS.categories();
      setCategories(response);
    })();
  }, []);

  return (
    <header className={styles.header}>
      <nav className="dropdownParent">
        categories
        <ul className="dropdown dropdownAlignLeft">
          {categories.map(({ id, test }) => (
            <li key={test}>
              <Link href="/categories/[id]" as={`/categories/${id}`}>
                <a>{test}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <Link href="/">
        <a>Logo</a>
      </Link>
      <section>
        <nav>
          <ul className={styles.loginAndCart}>
            <li className="dropdownParent">
              <button onClick={handleLoginOrLogout}>{buttonLabel}</button>
              <nav className="dropdown dropdownAlignRight">
                <ul>
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
              </nav>
            </li>
            <li className="dropdownParent">
              <Link href="/cart">
                <a>Cart</a>
              </Link>
              <section className="dropdown dropdownAlignRight">
                <ul>
                  <li>fruits</li>
                  <li>fruits</li>
                  <li>fruits</li>
                  <li>fruits</li>
                  <li>fruits</li>
                  <li>vegetable</li>
                </ul>
              </section>
            </li>
          </ul>
        </nav>
      </section>
      {modalActive && <LoginModal close={() => setModalActive(false)} />}
    </header>
  );
}
