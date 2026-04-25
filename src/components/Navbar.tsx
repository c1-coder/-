
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold">
              VIP PLUS
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                }`}
              >
                首页
              </Link>
              <Link
                to="/order"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/order') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                }`}
              >
                订单查询
              </Link>
              <Link
                to="/support"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/support') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
                }`}
              >
                支持
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-900">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
              }`}
            >
              首页
            </Link>
            <Link
              to="/order"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/order') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
              }`}
            >
              订单查询
            </Link>
            <Link
              to="/support"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/support') ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white'
              }`}
            >
              支持
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
