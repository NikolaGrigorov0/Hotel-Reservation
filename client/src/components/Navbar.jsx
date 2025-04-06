import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">HotelFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Centered navigation links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
              <Link to="/" className="hover:text-blue-200 transition duration-300">
                Home
              </Link>
              <Link to="/hotels" className="hover:text-blue-200 transition duration-300">
                Hotels
              </Link>
              {user && (
                <Link to="/favorites" className="hover:text-blue-200 transition duration-300 flex items-center">
                  <FaHeart className="mr-1" />
                  Favorites
                </Link>
              )}
            </div>

            {/* Right-aligned auth links */}
            <div className="ml-auto flex space-x-6">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="hover:text-blue-200 transition duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link to="/signIn" className="hover:text-blue-200 transition duration-300">
                    Sign In
                  </Link>
                  <Link to="/signUp" className="bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition duration-300">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              to="/"
              className="block hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className="block hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotels
            </Link>
            {user && (
              <Link
                to="/favorites"
                className="block hover:bg-blue-700 px-3 py-2 rounded transition duration-300 flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaHeart className="mr-2" />
                Favorites
              </Link>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/signIn"
                  className="block hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signUp"
                  className="block hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 