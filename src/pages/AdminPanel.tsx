import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Grid, Plus, Edit2, Trash2, Settings, Search, TrendingUp, ShoppingCart, DollarSign, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Product, Category } from '../types';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, products, categories, addProduct, updateProduct, deleteProduct, addCategory, updateCategory, deleteCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
    stock: '',
    brand: '',
    partNumber: '',
    compatibility: '',
    featured: false,
  });

  // Category Modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    image: '',
    slug: '',
  });

  if (!user || user.role !== 'admin') {
    navigate('/');
    return null;
  }

  const handleAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      image: '',
      categoryId: '',
      stock: '',
      brand: '',
      partNumber: '',
      compatibility: '',
      featured: false,
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      categoryId: product.categoryId,
      stock: product.stock.toString(),
      brand: product.brand || '',
      partNumber: product.partNumber || '',
      compatibility: product.compatibility?.join(', ') || '',
      featured: product.featured || false,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = () => {
    const productData: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: productForm.name,
      description: productForm.description,
      price: Number(productForm.price),
      image: productForm.image,
      categoryId: productForm.categoryId,
      stock: Number(productForm.stock),
      brand: productForm.brand,
      partNumber: productForm.partNumber,
      compatibility: productForm.compatibility ? productForm.compatibility.split(',').map(s => s.trim()).filter(Boolean) : undefined,
      featured: productForm.featured,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }
    setIsProductModalOpen(false);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setCategoryForm({
      name: '',
      description: '',
      image: '',
      slug: '',
    });
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description,
      image: category.image,
      slug: category.slug,
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = () => {
    const categoryData: Category = {
      id: editingCategory?.id || Date.now().toString(),
      name: categoryForm.name,
      description: categoryForm.description,
      image: categoryForm.image,
      slug: categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-'),
    };

    if (editingCategory) {
      updateCategory(categoryData);
    } else {
      addCategory(categoryData);
    }
    setIsCategoryModalOpen(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
  };

  // Quick stock update
  const handleQuickStockUpdate = (productId: string, newStock: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct({ ...product, stock: newStock });
    }
  };

  // Quick price update
  const handleQuickPriceUpdate = (productId: string, newPrice: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct({ ...product, price: newPrice });
    }
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock < 10).length;
  const outOfStockProducts = products.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            Панель администратора
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Управление товарами и категориями
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<TrendingUp className="w-5 h-5" />}
            label="Дашборд"
          />
          <TabButton
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
            icon={<Package className="w-5 h-5" />}
            label="Товары"
          />
          <TabButton
            active={activeTab === 'categories'}
            onClick={() => setActiveTab('categories')}
            icon={<Grid className="w-5 h-5" />}
            label="Категории"
          />
          <TabButton
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
            icon={<Settings className="w-5 h-5" />}
            label="Настройки"
          />
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<Package className="w-8 h-8 text-primary" />}
                title="Всего товаров"
                value={totalProducts}
                bgColor="bg-blue-50 dark:bg-blue-900/20"
              />
              <StatCard
                icon={<DollarSign className="w-8 h-8 text-green-600" />}
                title="Общая стоимость"
                value={formatPrice(totalValue)}
                bgColor="bg-green-50 dark:bg-green-900/20"
              />
              <StatCard
                icon={<AlertCircle className="w-8 h-8 text-yellow-600" />}
                title="Мало на складе"
                value={lowStockProducts}
                bgColor="bg-yellow-50 dark:bg-yellow-900/20"
              />
              <StatCard
                icon={<ShoppingCart className="w-8 h-8 text-red-600" />}
                title="Нет в наличии"
                value={outOfStockProducts}
                bgColor="bg-red-50 dark:bg-red-900/20"
              />
            </div>

            {/* Low Stock Alert */}
            {lowStockProducts > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600 shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-yellow-900 dark:text-yellow-200 mb-2">
                      Внимание! Товары заканчиваются
                    </h3>
                    <p className="text-yellow-800 dark:text-yellow-300 mb-4">
                      У {lowStockProducts} товаров осталось менее 10 единиц на складе.
                    </p>
                    <div className="space-y-2">
                      {products.filter(p => p.stock < 10 && p.stock > 0).slice(0, 5).map(product => (
                        <div key={product.id} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                            <div>
                              <p className="font-semibold text-text-light dark:text-text-dark">{product.name}</p>
                              <p className="text-sm text-gray-500">Осталось: {product.stock} шт</p>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleEditProduct(product)}
                            variant="outline"
                            className="text-sm"
                          >
                            Пополнить
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
                Товары по категориям
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => {
                  const categoryProducts = products.filter(p => p.categoryId === category.id);
                  const categoryValue = categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);
                  return (
                    <div key={category.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                      <h4 className="font-semibold text-text-light dark:text-text-dark mb-2">{category.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <p>Товаров: {categoryProducts.length}</p>
                        <p>Стоимость: {formatPrice(categoryValue)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                Товары ({filteredProducts.length})
              </h2>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                >
                  <option value="">Все категории</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <Button onClick={handleAddProduct} className="flex items-center gap-2 whitespace-nowrap">
                  <Plus className="w-5 h-5" />
                  Добавить товар
                </Button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Изображение
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Название
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Категория
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Цена
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-text-light dark:text-text-dark">
                        Наличие
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-text-light dark:text-text-dark">
                        Действия
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="px-6 py-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-text-light dark:text-text-dark">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {product.brand}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                          {categories.find((c) => c.id === product.categoryId)?.name}
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={product.price}
                            onChange={(e) => handleQuickPriceUpdate(product.id, Number(e.target.value))}
                            className="w-32 px-3 py-1 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-primary font-semibold focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={product.stock}
                              onChange={(e) => handleQuickStockUpdate(product.id, Number(e.target.value))}
                              className={`w-20 px-3 py-1 rounded-lg border-2 font-semibold focus:outline-none focus:border-primary ${
                                product.stock > 10
                                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400'
                                  : product.stock > 0
                                  ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400'
                                  : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                              }`}
                            />
                            <span className="text-sm text-gray-500">шт</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text-light dark:text-text-dark">
                Категории ({categories.length})
              </h2>
              <Button onClick={handleAddCategory} className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Добавить категорию
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="flex-1 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors font-medium"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
              Настройки сайта
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                  Название сайта
                </label>
                <input
                  type="text"
                  defaultValue="TruckParts"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                  Email для связи
                </label>
                <input
                  type="email"
                  defaultValue="info@truckparts.uz"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  defaultValue="+998 (90) 123-45-67"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
                />
              </div>
              <Button>Сохранить настройки</Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={editingProduct ? 'Редактировать товар' : 'Добавить товар'}
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Название
            </label>
            <input
              type="text"
              value={productForm.name}
              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Бренд
            </label>
            <input
              type="text"
              value={productForm.brand}
              onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Описание
            </label>
            <textarea
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Цена (сум)
            </label>
            <input
              type="number"
              value={productForm.price}
              onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Наличие (шт)
            </label>
            <input
              type="number"
              value={productForm.stock}
              onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Категория
            </label>
            <select
              value={productForm.categoryId}
              onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Артикул
            </label>
            <input
              type="text"
              value={productForm.partNumber}
              onChange={(e) => setProductForm({ ...productForm, partNumber: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={productForm.image}
              onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
            {productForm.image && (
              <div className="mt-3">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Предпросмотр:</p>
                <img 
                  src={productForm.image} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
              </div>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Совместимость (через запятую)
            </label>
            <input
              type="text"
              value={productForm.compatibility}
              onChange={(e) => setProductForm({ ...productForm, compatibility: e.target.value })}
              placeholder="Mercedes, Volvo, Scania, MAN"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Укажите марки грузовиков, с которыми совместим товар
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={productForm.featured}
                onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-primary focus:ring-2 focus:ring-primary"
              />
              <div>
                <span className="text-sm font-semibold text-text-light dark:text-text-dark">
                  Хит продаж
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Товар будет отображаться с меткой "Хит продаж" на главной странице
                </p>
              </div>
            </label>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <h4 className="text-sm font-semibold text-text-light dark:text-text-dark mb-3">
            Сводка товара:
          </h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Название:</span>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {productForm.name || '-'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Бренд:</span>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {productForm.brand || '-'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Цена:</span>
              <p className="font-semibold text-primary">
                {productForm.price ? `${Number(productForm.price).toLocaleString('ru-RU')} сум` : '-'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Остаток:</span>
              <p className={`font-semibold ${
                Number(productForm.stock) > 10 
                  ? 'text-green-600' 
                  : Number(productForm.stock) > 0 
                  ? 'text-yellow-600' 
                  : 'text-red-600'
              }`}>
                {productForm.stock ? `${productForm.stock} шт` : '-'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Категория:</span>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {categories.find(c => c.id === productForm.categoryId)?.name || '-'}
              </p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Статус:</span>
              <p className="font-semibold text-text-light dark:text-text-dark">
                {productForm.featured ? '⭐ Хит продаж' : 'Обычный'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handleSaveProduct} fullWidth>
            {editingProduct ? '💾 Сохранить изменения' : '➕ Добавить товар'}
          </Button>
          <Button onClick={() => setIsProductModalOpen(false)} variant="outline" fullWidth>
            Отмена
          </Button>
        </div>
      </Modal>

      {/* Category Modal */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title={editingCategory ? 'Редактировать категорию' : 'Добавить категорию'}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Название
            </label>
            <input
              type="text"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Описание
            </label>
            <textarea
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={categoryForm.slug}
              onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
              placeholder="Автоматически из названия"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-light dark:text-text-dark mb-2">
              URL изображения
            </label>
            <input
              type="url"
              value={categoryForm.image}
              onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-text-light dark:text-text-dark focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <Button onClick={handleSaveCategory} fullWidth>
            {editingCategory ? 'Сохранить' : 'Добавить'}
          </Button>
          <Button onClick={() => setIsCategoryModalOpen(false)} variant="outline" fullWidth>
            Отмена
          </Button>
        </div>
      </Modal>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton = ({ active, onClick, icon, label }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
        active
          ? 'bg-primary text-white shadow-lg'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  bgColor: string;
}

const StatCard = ({ icon, title, value, bgColor }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${bgColor} rounded-2xl p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between mb-4">
        {icon}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-text-light dark:text-text-dark">{value}</p>
    </motion.div>
  );
};
