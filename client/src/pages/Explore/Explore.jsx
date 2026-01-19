import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ShoppingCart, Plus, Minus } from "lucide-react";

/* ================= RAZORPAY LOADER ================= */

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Explore() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await api.get("/categories");
      const itemRes = await api.get("/items");
      setCategories(catRes.data);
      setItems(itemRes.data);
    };
    fetchData();
  }, []);

  /* ================= FILTER ITEMS ================= */

  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "ALL" ||
      item.categoryName === selectedCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  /* ================= CART LOGIC ================= */

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.itemId === item.itemId);
      if (existing) {
        return prev.map((i) =>
          i.itemId === item.itemId ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (itemId) => {
    setCart((prev) =>
      prev.map((i) =>
        i.itemId === itemId ? { ...i, qty: i.qty + 1 } : i
      )
    );
  };

  const decreaseQty = (itemId) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.itemId === itemId ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = total * 0.01;
  const grandTotal = total + tax;

  /* ================= SAVE ORDER ================= */

  const saveOrderToBackend = async () => {
    await api.post("/api/orders", {
      customerName,
      phoneNumber: customerPhone,
      totalAmount: grandTotal,
      items: cart.map((c) => ({
        itemName: c.name,
        price: c.price,
        quantity: c.qty,
      })),
    });
  };

  /* ================= RAZORPAY PAYMENT ================= */

  const handleUPIPayment = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!customerName || !customerPhone) {
      alert("Enter customer details");
      return;
    }

    const loaded = await loadRazorpay();
    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const res = await api.post("/api/payments/create-order", {
      amount: Math.round(grandTotal * 100),
      currency: "INR",
      method: "UPI",
    });

    const order = res.data;

    const options = {
      key: "rzp_test_S5iaLqNEs3rz3u",
      amount: order.amount,
      currency: order.currency,
      name: "Retail Billing System",
      description: "Order Payment",
      order_id: order.razorpayOrderId,

      handler: async function () {
        await saveOrderToBackend();
        alert("Payment Successful");

        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
      },

      theme: { color: "#facc15" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  /* ================= UI ================= */

  return (
    <div className="bg-gray-900 text-white h-screen overflow-hidden p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 h-full flex flex-col">

          {/* CATEGORIES */}
          <div className="flex gap-4 mb-6 pb-2 overflow-x-auto">
            <CategoryCard
              label="All Items"
              count={items.length}
              active={selectedCategory === "ALL"}
              onClick={() => setSelectedCategory("ALL")}
            />

            {categories.map((c) => (
              <CategoryCard
                key={c.categoryId}
                label={c.name}
                count={items.filter(i => i.categoryName === c.name).length}
                active={selectedCategory === c.name}
                onClick={() => setSelectedCategory(c.name)}
              />
            ))}
          </div>

          {/* SEARCH */}
          <div className="flex mb-6">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search items..."
              className="flex-1 bg-gray-700 px-4 py-2 rounded-l-lg text-sm"
            />
            <button className="bg-yellow-500 px-4 rounded-r-lg text-black">
              🔍
            </button>
          </div>

          {/* ITEMS */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.itemId}
                  className="bg-gray-700 rounded-lg p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-400">₹{item.price}</div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <ShoppingCart size={18} className="text-yellow-400" />
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-green-600 p-2 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="bg-gray-800 rounded-xl p-6 h-full flex flex-col">

          {/* CUSTOMER DETAILS */}
          <div className="mb-4 space-y-3">
            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-gray-700 px-3 py-2 rounded text-sm"
            />
            <input
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full bg-gray-700 px-3 py-2 rounded text-sm"
            />
          </div>

          {/* CART */}
          <div className="flex-1 overflow-y-auto space-y-2">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
            ) : (
              cart.map((c) => (
                <div
                  key={c.itemId}
                  className="grid grid-cols-[1fr_120px_90px] bg-gray-700 px-3 py-4 rounded"
                >
                  <span>{c.name}</span>

                  <div className="flex justify-center gap-2">
                    <button onClick={() => decreaseQty(c.itemId)} className="bg-red-600 p-1 rounded">
                      <Minus size={14} />
                    </button>
                    <span>{c.qty}</span>
                    <button onClick={() => increaseQty(c.itemId)} className="bg-green-600 p-1 rounded">
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="text-right">₹{(c.price * c.qty).toFixed(2)}</span>
                </div>
              ))
            )}
          </div>

          {/* TOTAL */}
          <div className="border-t border-gray-600 pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Items</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (1%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleUPIPayment}
            className="mt-6 bg-blue-600 py-2 rounded"
          >
            Pay with UPI
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= CATEGORY CARD ================= */

function CategoryCard({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[160px] p-4 rounded-lg text-left ${
        active ? "bg-yellow-500 text-black" : "bg-gray-700"
      }`}
    >
      <div className="font-semibold">{label}</div>
      <div className="text-sm">{count} Items</div>
    </button>
  );
}
