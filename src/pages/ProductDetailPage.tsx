import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status: 'available' | 'unavailable';
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [contactInfo, setContactInfo] = useState('');
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/product/${id}`);
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || product.status !== 'available') return;

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
          contactInfo
        })
      });
      const data = await response.json();
      setOrderId(data.orderId);
      setPaymentUrl(data.paymentUrl);
      setOrderCreated(true);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gray-200 animate-pulse h-96"></div>
              <div className="w-full md:w-1/2 p-6">
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-32 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">商品不存在</h2>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              返回首页
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {orderCreated ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">订单创建成功</h2>
            <p className="text-gray-700 mb-1">订单号: <span className="font-mono font-medium">{orderId}</span></p>
            <p className="text-gray-600 mb-6 text-sm">请记录好订单号，以便查询</p>
            <a
              href={paymentUrl}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              去支付
            </a>
            <div className="mt-4">
              <Link 
                to="/" 
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                继续购物
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 p-6">
                <Link 
                  to="/" 
                  className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-flex items-center"
                >
                  ◀ 返回首页
                </Link>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <div className="text-blue-600 text-2xl font-bold mb-4">
                  ¥{product.price.toFixed(2)}
                </div>
                <div className="mb-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    product.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {product.status === 'available' ? '有库存' : '暂无库存'}
                  </div>
                </div>
                {product.description && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 font-medium mb-2">商品描述</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}
                <div className="mb-6">
                  <span className="text-gray-500 text-sm">分类: {product.category}</span>
                </div>
                {product.status === 'available' && (
                  <form onSubmit={handleBuy} className="space-y-4">
                    <div>
                      <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">
                        联系方式（邮箱或手机号）
                      </label>
                      <input
                        type="text"
                        id="contactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="请输入您的联系方式"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      立即购买
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
