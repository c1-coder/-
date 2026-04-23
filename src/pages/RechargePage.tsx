import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RechargePage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wechat');
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleNext = () => {
    if (step === 1 && amount) {
      setStep(2);
    } else if (step === 2) {
      // 模拟创建订单
      setOrderId(`ORD${Date.now()}${Math.floor(Math.random() * 1000)}`);
      setOrderCreated(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
          自助充值
        </h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          {!orderCreated ? (
            <>
              {/* 步骤指示器 */}
              <div className="flex justify-between mb-8">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="text-sm font-medium">选择金额</span>
                </div>
                <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="text-sm font-medium">选择支付方式</span>
                </div>
              </div>

              {/* 步骤内容 */}
              {step === 1 ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">选择充值金额</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[100, 200, 300, 500, 1000, 2000].map((value) => (
                      <button
                        key={value}
                        onClick={() => setAmount(value.toString())}
                        className={`py-4 border rounded-md text-center transition-colors ${amount === value.toString()
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-300'
                          }`}
                      >
                        ¥{value}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="customAmount" className="block text-gray-700 font-medium mb-2">
                      自定义金额
                    </label>
                    <input
                      type="number"
                      id="customAmount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="请输入金额"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">选择支付方式</h2>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="wechat"
                        checked={paymentMethod === 'wechat'}
                        onChange={() => setPaymentMethod('wechat')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-md flex items-center justify-center text-white font-bold mr-3">
                          微信
                        </div>
                        <span className="text-gray-700">微信支付</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="alipay"
                        checked={paymentMethod === 'alipay'}
                        onChange={() => setPaymentMethod('alipay')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold mr-3">
                          支付宝
                        </div>
                        <span className="text-gray-700">支付宝</span>
                      </div>
                    </label>
                    <label className="flex items-center p-4 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-500 rounded-md flex items-center justify-center text-white font-bold mr-3">
                          银行
                        </div>
                        <span className="text-gray-700">银行转账</span>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  disabled={step === 1 && !amount}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {step === 1 ? '下一步' : '确认支付'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">充值订单创建成功</h2>
              <p className="text-gray-700 mb-6">订单号: {orderId}</p>
              <p className="text-gray-700 mb-8">金额: ¥{amount}</p>
              <div className="bg-gray-100 p-4 rounded-md mb-6">
                <p className="text-gray-600">请使用{paymentMethod === 'wechat' ? '微信' : paymentMethod === 'alipay' ? '支付宝' : '银行'}扫描下方二维码进行支付</p>
                <div className="w-48 h-48 bg-white mx-auto mt-4 flex items-center justify-center border">
                  <span className="text-gray-400">二维码</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setOrderCreated(false);
                  setStep(1);
                  setAmount('');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                完成
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RechargePage;
