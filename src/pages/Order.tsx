
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, CheckCircle, Package } from 'lucide-react';

interface Order {
  id: string;
  product_id: number;
  customer_name: string;
  customer_email: string;
  status: string;
  created_at: string;
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  };
}

export default function Order() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderIdFromUrl = searchParams.get('orderId');
  
  const [orderId, setOrderId] = useState(orderIdFromUrl || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    try {
      const response = await fetch(`/api/orders/${orderId.trim()}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        setError('订单未找到，请检查订单编号是否正确');
      }
    } catch (err) {
      setError('查询失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderIdFromUrl) {
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          返回首页
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">订单查询</h1>
          <p className="text-gray-600">输入您的订单编号来查询订单详情</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                订单编号
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="请输入订单编号"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Search className="h-5 w-5 mr-2" />
                  )}
                  {loading ? '查询中...' : '查询'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {order && (
            <div className="border-t pt-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">订单详情</h2>
                  <p className="text-gray-600">订单号：{order.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">客户姓名</label>
                    <p className="text-gray-900 font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">电子邮箱</label>
                    <p className="text-gray-900 font-medium">{order.customer_email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">订单状态</label>
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {order.status === 'completed' ? '已完成' : order.status}
                    </span>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">创建时间</label>
                    <p className="text-gray-900 font-medium">
                      {new Date(order.created_at).toLocaleString('zh-CN')}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={order.product.image}
                      alt={order.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.product.name}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{order.product.description}</p>
                      <p className="text-xl font-bold text-blue-600">${order.product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  返回首页
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
