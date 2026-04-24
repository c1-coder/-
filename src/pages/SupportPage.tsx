import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SupportPage: React.FC = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    contactInfo: '',
    issue: '',
    description: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // 模拟提交
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          售后服务
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 售后政策 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">售后政策</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">退换货政策</h3>
                <p className="text-gray-600 text-sm">
                  1. 数字商品一经售出，如无质量问题，不予退换。<br />
                  2. 如商品存在质量问题，请在收到商品后24小时内联系客服。<br />
                  3. 退换货时需提供订单号和问题描述。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">保修政策</h3>
                <p className="text-gray-600 text-sm">
                  1. 账号类商品提供7天质保期。<br />
                  2. 质保期内如出现账号无法使用的情况，可联系客服免费更换。<br />
                  3. 因用户自身原因导致账号被封或无法使用的，不在保修范围内。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">联系客服</h3>
                <p className="text-gray-600 text-sm">
                  客服邮箱: support@vipplus.pro<br />
                  工作时间: 周一至周五 9:00-18:00
                </p>
              </div>
            </div>
          </div>

          {/* 售后申请 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">提交售后申请</h2>
            {submitted ? (
              <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
                申请提交成功，我们会尽快处理您的售后请求。
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="orderId" className="block text-gray-700 font-medium mb-2">
                    订单号
                  </label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    value={formData.orderId}
                    onChange={handleChange}
                    placeholder="请输入订单号"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactInfo" className="block text-gray-700 font-medium mb-2">
                    联系方式
                  </label>
                  <input
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    placeholder="请输入邮箱或手机号"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="issue" className="block text-gray-700 font-medium mb-2">
                    问题类型
                  </label>
                  <select
                    id="issue"
                    name="issue"
                    value={formData.issue}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择问题类型</option>
                    <option value="账号无法使用">账号无法使用</option>
                    <option value="账号被封">账号被封</option>
                    <option value="充值失败">充值失败</option>
                    <option value="其他问题">其他问题</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                    问题描述
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="请详细描述您遇到的问题"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? '提交中...' : '提交申请'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportPage;
