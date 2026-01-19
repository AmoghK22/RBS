import { useEffect, useState } from "react";
import api from "../../api/axios";

const Dashboard = () => {
  const [orders, setOrders] = useState(null); // 👈 IMPORTANT
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders");
        console.log("ORDERS API RESPONSE 👉", res.data);

        // FORCE array
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="text-white p-6">Loading...</div>;

  if (!orders || orders.length === 0) {
    return <div className="text-gray-400 p-6">No orders yet.</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5"
          >
            {/* HEADER */}
            <div className="flex justify-between mb-3">
              <div>
                <div className="font-semibold">Order #{order.id}</div>
                <div className="text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="font-bold text-green-400">
                ₹{order.totalAmount}
              </div>
            </div>

            {/* CUSTOMER */}
            <div className="text-sm mb-3 text-gray-300">
              <span className="font-medium">{order.customerName}</span> ·{" "}
              {order.phoneNumber}
            </div>

            {/* ITEMS */}
            <div className="border-t border-gray-700 pt-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-gray-300 mb-1"
                >
                  <span>
                    {item.itemName} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
