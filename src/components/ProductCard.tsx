import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { Button } from './ui/Button';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore();
  const favorite = isFavorite(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer relative"
    >
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 rounded-2xl" />
      <div className="relative overflow-hidden h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-500"
        />
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 bg-gradient-to-r from-accent to-yellow-400 text-gray-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1"
          >
            <span className="text-lg">⭐</span>
            Хит продаж
          </motion.div>
        )}
        <motion.button
          onClick={handleToggleFavorite}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all ${
            favorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
        </motion.button>
        {product.stock < 10 && product.stock > 0 && (
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className="absolute bottom-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1"
          >
            <span className="animate-pulse">🔥</span>
            Осталось {product.stock} шт
          </motion.div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white text-xl font-bold">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-6 relative z-20">
        <div className="mb-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.brand}</span>
        </div>
        <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2 line-clamp-2 h-14 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>
          {product.stock > 0 && (
            <span className="text-sm font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              В наличии
            </span>
          )}
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          fullWidth
          variant="primary"
          className="flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          В корзину
        </Button>
      </div>
    </motion.div>
  );
};
