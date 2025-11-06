import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onClick={() => navigate(`/products?category=${category.id}`)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group relative"
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-all duration-500"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed mb-3">
              {category.description}
            </p>
            <div className="flex items-center text-accent font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
              <span>Смотреть товары</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Corner */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <span className="text-2xl">📦</span>
        </div>
      </div>
    </motion.div>
  );
};
