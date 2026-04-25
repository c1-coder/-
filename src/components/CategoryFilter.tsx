
interface CategoryFilterProps {
  currentCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: '全部' },
  { id: 'subscription', name: '订阅服务' },
  { id: 'education', name: '教育课程' },
  { id: 'books', name: '电子书' },
  { id: 'software', name: '软件工具' },
  { id: 'design', name: '设计素材' },
];

export default function CategoryFilter({ 
  currentCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentCategory === category.id
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
