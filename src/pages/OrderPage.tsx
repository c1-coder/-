import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Order {
  id: string;
  productId: number;
  productName: string;
  quantity: number;
  amount: number;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  contactInfo: string;
  createdAt: string;
  updatedAt: string;
}

const OrderPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const response = await fetch(`/api/order/${orderId}`);
      if (!response.ok) {
        throw new Error('订单不存在');
      }
      const data = await response.json();
      setOrder(data.order);
    } catch (err) {
      setError(err instanceof Error ? err.message : '查询失败');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '待支付';
      case 'paid':
        return '已支付';
      case 'delivered':
        return '已发货';
      case 'cancelled':
        return '已取消';
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'paid':
        return 'text-blue-600';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          查询订单
        </h1>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="orderId" className="block text-gray-700 font-medium mb-2">
                订单号
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="请输入订单号"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {loading ? '查询中...' : '查询'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {order && (
            <div className="mt-6 p-4 border border-gray-200 rounded-md">
              <h2 className="text-lg font-bold text-gray-800 mb-3">订单详情</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">订单号:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">商品名称:</span>
                  <span className="font-medium">{order.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">数量:</span>
                  <span className="font-medium">{order.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">金额:</span>
                  <span className="font-medium">¥{order.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">状态:</span>
                  <span className={`font-medium ${getStatusClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">联系方式:</span>
                  <span className="font-medium">{order.contactInfo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">创建时间:</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">更新时间:</span>
                  <span className="font-medium">{new Date(order.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderPage;
