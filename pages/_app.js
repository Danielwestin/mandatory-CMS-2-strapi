import App from "next/app";
import CMS from "../cms";
import Layout from "../components/Layout";
import CartProvider from "../contexts/cart";
import UserProvider from "../contexts/user";
import ModalMiddleware from "../middlewares/Modal";
import NotificationMiddleware from "../middlewares/Notification";
import "../styles/variables.css";
import "../styles/utils.css";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps, categories }) {
  return (
    <UserProvider>
      <CartProvider>
        <NotificationMiddleware>
          <ModalMiddleware>
            <Layout categories={categories}>
              <Component {...pageProps} />
            </Layout>
          </ModalMiddleware>
        </NotificationMiddleware>
      </CartProvider>
    </UserProvider>
  );
}

MyApp.getInitialProps = async (applicationContext) => {
  const categories = await CMS.categories();
  const appProps = await App.getInitialProps(applicationContext);

  appProps.categories = categories;

  return { ...appProps };
};
