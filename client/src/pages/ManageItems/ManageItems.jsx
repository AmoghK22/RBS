import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../api/axios";

export default function ManageItems() {
  const [item, setItem] = useState({
    name: "",
    categoryId: "",
    price: 0,
    description: "",
  });

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // UI-only states
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Popup message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/items", item);
      setItem({ name: "", categoryId: "", price: 0, description: "" });
      fetchItems();

      setMessage("Item added successfully");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add item");
      setMessageType("error");
    } finally {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2500);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/items/${selectedItemId}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setShowModal(false);
      setSelectedItemId(null);
    }
  };

  const filteredItems = items.filter(
    (it) =>
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      it.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ADD ITEM */}
        <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Add Item</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={handleChange}
              placeholder="Item name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            />

            <select
              name="categoryId"
              value={item.categoryId}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="price"
              value={item.price}
              onChange={handleChange}
              min={0}
              placeholder="Price"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
            />

            <textarea
              name="description"
              value={item.description}
              onChange={handleChange}
              rows={4}
              placeholder="Item description"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
            />

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg">
              Save
            </button>
          </form>
        </div>

        {/* ITEMS LIST */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Items List</h2>

          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
          />

          {filteredItems.length === 0 ? (
            <div className="text-gray-400 text-sm">No items found...</div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredItems.map((it) => (
                <div
                  key={it.itemId}
                  className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-400">
                      Category: {it.categoryName}
                    </div>
                    <div className="text-sm text-gray-300">₹{it.price}</div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedItemId(it.itemId);
                      setShowModal(true);
                    }}
                    className="p-2 rounded bg-red-700 hover:bg-red-700 transition"
                    title="Delete item"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-sm text-gray-400 mb-5">
              Are you sure you want to delete this item?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MESSAGE */}
      {message && (
        <div
          className={`fixed top-6 right-6 px-4 py-2 rounded-lg shadow-lg text-sm font-medium z-50
          ${messageType === "success" ? "bg-green-600" : "bg-red-600"} text-white`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
