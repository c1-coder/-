import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, string> = {
  '全部': '🗂️',
  'Claude': '🤖',
  'ChatGPT': '💬',
  'Gemini': '✨',
  'Grok': '🎯',
  '邮箱': '📧',
  '社交': '🌐'
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8 px-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>{categoryIcons[category] || '📦'}</span>
          <span>{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
