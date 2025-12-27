import { useEffect, useState } from "react";
import api from "../../api/axios";
import { ShoppingCart, Plus, Minus } from "lucide-react";

export default function Explore() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

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

  /* ================= UI ================= */

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">

          {/* CATEGORIES */}
          <div className="flex gap-4 mb-6 pb-6 overflow-x-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.itemId}
                className="bg-gray-700 rounded-lg p-4 flex flex-col justify-between
                           transition transform duration-200
                           hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30"
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-400">₹{item.price}</div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <ShoppingCart size={18} className="text-yellow-400" />
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 hover:bg-green-700 p-2 rounded transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= RIGHT (CART) ================= */}
        <div className="bg-gray-800 rounded-xl p-6 h-[720px] flex flex-col">

          {/* CUSTOMER INFO */}
          <input
            placeholder="Customer name"
            className="w-full mb-3 bg-gray-700 px-3 py-2 rounded"
          />
          <input
            placeholder="Mobile number"
            className="w-full mb-4 bg-gray-700 px-3 py-2 rounded mb-10"
          />

          {/* CART ITEMS */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-2 pr-1">
            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm">Your cart is empty.</p>
            ) : (
              cart.map((c) => (
                <div
                  key={c.itemId}
                  className="grid grid-cols-[1fr_120px_90px] items-center
                             bg-gray-700 px-3 py-7 rounded"
                >
                  <span className="truncate text-sm">{c.name}</span>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => decreaseQty(c.itemId)}
                      className="bg-red-600 hover:bg-red-700 p-1 rounded transition"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-6 text-center">{c.qty}</span>

                    <button
                      onClick={() => increaseQty(c.itemId)}
                      className="bg-green-600 hover:bg-green-700 p-1 rounded transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="text-right font-medium tabular-nums">
                    ₹{(c.price * c.qty).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* TOTALS */}
          <div className="border-t border-gray-600 pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Item:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (1%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>₹{(total + tax).toFixed(2)}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            <button className="bg-green-600 py-2 rounded">Cash</button>
            <button className="bg-blue-600 py-2 rounded">UPI</button>
          </div>

          <button className="w-full mt-4 bg-yellow-600 text-black py-2 rounded">
            Place Order
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
      className={`min-w-[160px] p-4 rounded-lg text-left
        transition-all duration-200 hover:scale-[1.03]
        ${active
          ? "bg-yellow-500 text-black shadow-lg"
          : "bg-gray-700 hover:bg-gray-600"
        }`}
    >
      <div className="font-semibold">{label}</div>
      <div className="text-sm">{count} Items</div>
    </button>
  );
}
