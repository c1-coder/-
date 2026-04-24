import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  status: 'available' | 'unavailable';
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="text-blue-600 font-bold mb-2">
          ¥{product.price.toFixed(2)}
        </div>
        <div className="mt-auto">
          <Link
            to={`/product/${product.id}`}
            className={`block w-full py-2 text-center rounded-md text-sm font-medium transition-colors ${
              product.status === 'available'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed pointer-events-none'
            }`}
          >
            {product.status === 'available' ? '购买' : '暂无库存'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
