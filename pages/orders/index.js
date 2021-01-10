import { useEffect, useState } from "react";
import CMS from "../../CMS";
import { useNotify } from "../../contexts/notification";
import PlacedOrder from "../../components/modules/PlacedOrder";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const notify = useNotify();

  function handleRemovedOrder(id) {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await CMS.getOrders();
        setOrders(response);
      } catch ({ message }) {
        notify({
          type: "error",
          content: message,
        });
      }
    })();
  }, []);

  return (
    <main className="wrapper">
      <ul>
        {orders.length > 0 ? (
          orders.map((order) => (
            <PlacedOrder
              key={order.id}
              order={order}
              handleRemovedOrder={handleRemovedOrder}
            />
          ))
        ) : (
          <h1>No orders to display</h1>
        )}
      </ul>
    </main>
  );
}
