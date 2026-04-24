import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  status: 'available' | 'unavailable';
  price: number;
}

interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['全部', 'Claude', 'ChatGPT', 'Gemini', 'Grok', '邮箱', '社交'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products?category=${selectedCategory}&page=${currentPage}&limit=8`
      );
      const data: ProductListResponse = await response.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / data.limit));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          VIPPlus.Pro
        </h1>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-3">
                  <div className="h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">暂无商品</p>
              </div>
            )}
          </>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
