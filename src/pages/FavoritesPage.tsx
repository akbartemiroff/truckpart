import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const FavoritesPage = () => {
  const { favorites } = useStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
            <Heart className="w-10 h-10 text-red-500 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            Избранное
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Товары, которые вам понравились
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Ваш список избранного пуст
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Добавьте товары в избранное, чтобы не потерять их
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              Перейти к покупкам
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Товаров в избранном: <span className="font-semibold">{favorites.length}</span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {favorites.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
