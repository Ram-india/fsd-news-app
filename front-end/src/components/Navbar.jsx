import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNews } from '../context/NewsContext';
import { Link, useNavigate } from 'react-router-dom';
const categories = [
  'business',
  'sports',
  'technology',
  'health',
  'science',
];

const Navbar = () => {
  const {fetchByCategory} = useNews();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-400 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white"> News App</h1>

      {/* categories */}
      <div className="hidden md:flex gap-4">
        {
          categories.map((cat) => (
            <button
            key={cat}
            onClick={() => fetchByCategory(cat)}
            className="bg-white px-3 py-1 text-sm rounded hover:bg-blue-500 hover:text-white transition"
            >
             {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>

          ))
        }
      </div>

      {user ? (
        <div className="relative">
          <img
            src="/default-avatar.png" // replace with user.profileImage if available
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;