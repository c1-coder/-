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
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 bg-gray-100 rounded-lg animate-pulse h-96"></div>
            <div className="w-full md:w-1/2">
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-32 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">商品不存在</h2>
            <Link to="/" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              返回首页
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        {orderCreated ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">订单创建成功</h2>
            <p className="text-gray-700 mb-2">订单号: {orderId}</p>
            <p className="text-gray-700 mb-6">请点击下方按钮进行支付</p>
            <a
              href={paymentUrl}
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              去支付
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-blue-600 text-xl font-medium mb-6">
                  ¥{product.price.toFixed(2)}
                </p>
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-2">商品描述</h3>
                  <p className="text-gray-600">{product.description || '暂无描述'}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-gray-700 font-medium mb-2">库存状态</h3>
                  <p className={`font-medium ${product.status === 'available'
                    ? 'text-green-600'
                    : 'text-red-600'
                    }`}>
                    {product.status === 'available' ? '有库存' : '无库存'}
                  </p>
                </div>
                <form onSubmit={handleBuy} className="space-y-4">
                  <div>
                    <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">
                      联系方式
                    </label>
                    <input
                      type="text"
                      id="contactInfo"
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder="请输入您的联系方式（邮箱或手机号）"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={product.status !== 'available'}
                    className={`w-full py-3 rounded-md font-medium transition-colors ${product.status === 'available'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                  >
                    购买
                  </button>
                </form>
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
