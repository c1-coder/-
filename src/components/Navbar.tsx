import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          VIPPlus.Pro
        </Link>
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            首页
          </Link>
          <Link to="/order" className="text-gray-700 hover:text-blue-600">
            查询订单
          </Link>
          <Link to="/support" className="text-gray-700 hover:text-blue-600">
            售后服务
          </Link>
          <Link to="/recharge" className="text-gray-700 hover:text-blue-600">
            自助充值
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
