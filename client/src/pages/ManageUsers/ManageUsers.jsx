import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageUsers() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Popup message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", user);
      setUser({ name: "", email: "", password: "", role: "USER" });
      fetchUsers();

      setMessage("User added successfully");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add user");
      setMessageType("error");
    } finally {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2500);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* USERS LIST */}
        <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-3">Users</h2>

          <input
            type="text"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
          />

          {filteredUsers.length === 0 ? (
            <div className="text-gray-400 text-sm">No users found...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-h-96 overflow-y-auto">
              {filteredUsers.map((u) => (
                <div
                  key={u.userId}
                  className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-sm text-gray-400">{u.email}</div>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold
                      ${
                        u.role === "ADMIN"
                          ? "bg-yellow-500 text-black"
                          : "bg-gray-600 text-white"
                      }`}
                  >
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ADD USER */}
        <div className="md:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Add User</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            />

            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            />

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
              required
            />

            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>

            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg">
              Save
            </button>
          </form>
        </div>
      </div>

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
  