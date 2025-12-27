import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../api/axios";

export default function ManageCategories() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/categories", category);
      setCategory({ name: "", description: "" });
      fetchCategories();

      setMessage("Category added successfully");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add category");
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
      await api.delete(`/admin/categories/${selectedCategoryId}`);
      fetchCategories();

      setMessage("Category deleted successfully");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Cannot delete category (used by items)");
      setMessageType("error");
    } finally {
      setShowModal(false);
      setSelectedCategoryId(null);

      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2500);
    }
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT LIST */}
        <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>

          <input
            type="text"
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
          />

          {filteredCategories.length === 0 ? (
            <div className="text-gray-400 text-sm">No categories found...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {filteredCategories.map((c) => (
                <div
                  key={c.categoryId}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-start"
                >
                  <div>
                    <div className="font-semibold text-lg">{c.name}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      {c.description}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCategoryId(c.categoryId);
                      setShowModal(true);
                    }}
                    className="p-2 rounded bg-red-600 hover:bg-red-700 transition"
                    title="Delete category"
                  >
                    <Trash2 size={16} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Add Category</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              value={category.name}
              onChange={handleChange}
              placeholder="Category name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            />

            <textarea
              name="description"
              value={category.description}
              onChange={handleChange}
              rows={4}
              placeholder="Category description"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
            />

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg">
              Save
            </button>
          </form>
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-96">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-sm text-gray-400 mb-5">
              This category may be used by items. Are you sure?
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
