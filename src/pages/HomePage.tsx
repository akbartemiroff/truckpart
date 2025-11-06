import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mockCategories, mockProducts } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

// Hero slides data
const heroSlides = [
  {
    id: 1,
    title: 'АВТОЗАПЧАСТИ',
    subtitle: 'ДЛЯ ГРУЗОВЫХ АВТОМОБИЛЕЙ',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80',
  },
  {
    id: 2,
    title: 'ОРИГИНАЛЬНЫЕ ЗАПЧАСТИ',
    subtitle: 'ОТ ВЕДУЩИХ ПРОИЗВОДИТЕЛЕЙ',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=80',
  },
  {
    id: 3,
    title: 'БЫСТРАЯ ДОСТАВКА',
    subtitle: 'ПО ВСЕМУ УЗБЕКИСТАНУ',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
  },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const { setProducts, setCategories, products } = useStore();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setProducts(mockProducts);
    setCategories(mockCategories);
  }, [setProducts, setCategories]);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            
            {/* Slide Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="font-display text-2xl md:text-3xl text-primary font-bold tracking-wide">
                    {heroSlides[currentSlide].subtitle}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-3 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-primary w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark tracking-tight">
              КАТЕГОРИИ
            </h2>
            <button
              onClick={() => navigate('/categories')}
              className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2 text-sm md:text-base"
            >
              Все категории
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockCategories.slice(0, 6).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/products?category=${category.id}`)}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all group"
              >
                <div className="aspect-square bg-white dark:bg-gray-700 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <h3 className="text-center text-sm font-semibold text-text-light dark:text-text-dark tracking-wide">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark tracking-tight">
              РЕКОМЕНДУЕМЫЕ ТОВАРЫ
            </h2>
            <button
              onClick={() => navigate('/products')}
              className="text-primary hover:text-primary-dark font-semibold flex items-center gap-2 text-sm md:text-base"
            >
              Все товары
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
