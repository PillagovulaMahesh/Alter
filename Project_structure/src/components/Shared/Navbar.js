import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';

const Navbar = () => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('You have been logged out.');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <nav className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/" className="hover:text-blue-400">
          SocialMediaApp
        </Link>
      </div>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-400">
              Login
            </Link>
            <Link to="/register" className="hover:text-blue-400">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-blue-400">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="hover:text-blue-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
