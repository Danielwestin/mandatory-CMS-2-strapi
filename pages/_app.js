import SiteLayout from "../components/SiteLayout";
import UserProvider from "../contexts/user";
import NotificationProvider from "../middlewares/Notification";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <NotificationProvider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </NotificationProvider>
    </UserProvider>
  );
}

export default MyApp;
