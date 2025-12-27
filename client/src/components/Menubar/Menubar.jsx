import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const linkStyle = "text-white no-underline hover:no-underline";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null; // Don't render navbar if not logged in
  }

  const isAdmin = user.role === "ADMIN";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-4 py-8 overflow-x-hidden">
      <div className="flex justify-between items-center">
        <Link to="/dashboard" className={linkStyle}>
          My App
        </Link>

        <button onClick={() => setOpen(!open)} className="sm:hidden text-white">
          ☰
        </button>

        <div className="hidden sm:flex gap-4">
          <Link to="/dashboard" className={linkStyle}>Dashboard</Link>
          <Link to="/explore" className={linkStyle}>Explore</Link>
          {isAdmin && <Link to="/manageCategories" className={linkStyle}>ManageCategories</Link>}
          {isAdmin && <Link to="/manageItems" className={linkStyle}>ManageItems</Link>}
          {isAdmin && <Link to="/manageUsers" className={linkStyle}>ManageUsers</Link>}
          <button onClick={handleLogout} className="text-white bg-transparent border-none cursor-pointer hover:underline">Logout</button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden mt-3 flex flex-col gap-2">
          <Link to="/dashboard" className={linkStyle}>Dashboard</Link>
          <Link to="/explore" className={linkStyle}>Explore</Link>
          {isAdmin && <Link to="/manageCategories" className={linkStyle}>ManageCategories</Link>}
          {isAdmin && <Link to="/manageItems" className={linkStyle}>ManageItems</Link>}
          {isAdmin && <Link to="/manageUsers" className={linkStyle}>ManageUsers</Link>}
          <button onClick={handleLogout} className="text-white bg-transparent border-none cursor-pointer hover:underline text-left">Logout</button>
        </div>
      )}
    </nav>
  );
}
