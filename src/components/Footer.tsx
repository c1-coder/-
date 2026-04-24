import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">© 2026 VIPPlus.Pro. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-blue-600 text-sm">
              条款
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-blue-600 text-sm">
              隐私
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-blue-600 text-sm">
              售后
            </Link>
            <Link to="/cooperation" className="text-gray-600 hover:text-blue-600 text-sm">
              合作
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
