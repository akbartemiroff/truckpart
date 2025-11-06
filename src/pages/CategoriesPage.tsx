import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { CategoryCard } from '../components/CategoryCard';

export const CategoriesPage = () => {
  const { categories } = useStore();

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            Категории товаров
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Выберите категорию для просмотра доступных запчастей
          </p>
        </motion.div>

        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Категории не найдены
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
