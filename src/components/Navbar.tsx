import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div>
      {/* 顶部导航 */}
      <nav className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-gray-800">
            VIPPlus.Pro
          </Link>
          <div className="hidden md:flex space-x-8">
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

      {/* 底部导航栏 - 移动端 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 md:hidden">
        <div className="flex justify-around py-3">
          <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <span className="text-2xl">🏠</span>
            <span className="text-xs mt-1">首页</span>
          </Link>
          <Link to="/order" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <span className="text-2xl">📜</span>
            <span className="text-xs mt-1">查询订单</span>
          </Link>
          <Link to="/support" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
            <span className="text-2xl">👤</span>
            <span className="text-xs mt-1">售后服务</span>
          </Link>
        </div>
      </nav>
      
      {/* 为底部导航栏留出空间 */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default Navbar;
