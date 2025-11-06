import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/Button';
import { Product } from '../types';

export const ProductsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products, categories } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categoryId: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    sortBy: 'newest' as 'price-asc' | 'price-desc' | 'name' | 'newest',
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoryId: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
    }));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (filters.categoryId) {
      result = result.filter((p) => p.categoryId === filters.categoryId);
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand?.toLowerCase().includes(searchLower)
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    // Filter by brand
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return result;
  }, [products, filters]);

  const brands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(brandSet) as string[];
  }, [products]);

  const selectedCategory = categories.find((c) => c.id === filters.categoryId);

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад на главную
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            {selectedCategory ? selectedCategory.name : 'Все товары'}
          </h1>
          {selectedCategory && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {selectedCategory.description}
            </p>
          )}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-light dark:text-text-dark flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Фильтры
                </h2>
                <button
                  onClick={() => setFilters({
                    categoryId: '',
                    search: '',
                    minPrice: '',
                    maxPrice: '',
                    brand: '',
                    sortBy: 'newest',
                  })}
                  className="text-sm text-primary hover:underline"
                >
                  Сбросить
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                    Категория
                  </label>
                  <select
                    value={filters.categoryId}
                    onChange={(e) => setFilters({ ...filters, categoryId: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                  >
                    <option value="">Все категории</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                    Цена (сум)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="От"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                    />
                    <input
                      type="number"
                      placeholder="До"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                    Бренд
                  </label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                  >
                    <option value="">Все бренды</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                    Сортировка
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                  >
                    <option value="newest">Новинки</option>
                    <option value="price-asc">Цена: по возрастанию</option>
                    <option value="price-desc">Цена: по убыванию</option>
                    <option value="name">По названию</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                Найдено товаров: <span className="font-semibold">{filteredProducts.length}</span>
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Фильтры
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Товары не найдены
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
