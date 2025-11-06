import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Star, Package, Shield, Truck, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, categories, addToCart, addToFavorites, removeFromFavorites, isFavorite } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);
  const category = product ? categories.find((c) => c.id === product.categoryId) : null;
  const favorite = product ? isFavorite(product.id) : false;

  // Моковые отзывы
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Алексей Иванов',
      rating: 5,
      comment: 'Отличное качество! Товар полностью соответствует описанию. Доставка быстрая, упаковка надежная. Рекомендую!',
      date: '2024-02-15',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Сергей Петров',
      rating: 4,
      comment: 'Хороший товар за свою цену. Единственный минус - немного долго ждал доставку, но качество отличное.',
      date: '2024-02-10',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Дмитрий Сидоров',
      rating: 5,
      comment: 'Покупаю уже второй раз. Качество на высоте, цена адекватная. Спасибо магазину!',
      date: '2024-02-05',
    },
  ]);

  useEffect(() => {
    if (!product) {
      navigate('/products');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  // Дополнительные изображения (в реальном проекте будут из данных)
  const images = [product.image, product.image, product.image];

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </Button>
        </motion.div>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white dark:bg-gray-800 rounded-xl p-2 transition-all ${
                    selectedImage === index
                      ? 'ring-4 ring-primary'
                      : 'hover:ring-2 ring-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              {/* Category */}
              {category && (
                <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  {category.name}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {averageRating.toFixed(1)} ({reviews.length} отзывов)
                </span>
              </div>

              {/* Brand */}
              {product.brand && (
                <div className="mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Бренд: </span>
                  <span className="font-semibold text-text-light dark:text-text-dark">
                    {product.brand}
                  </span>
                </div>
              )}

              {/* Part Number */}
              {product.partNumber && (
                <div className="mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Артикул: </span>
                  <span className="font-semibold text-text-light dark:text-text-dark">
                    {product.partNumber}
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                  Описание
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Compatibility */}
              {product.compatibility && product.compatibility.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-light dark:text-text-dark mb-2">
                    Совместимость
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((brand, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="mb-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.stock > 0 ? (
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full font-semibold">
                      В наличии: {product.stock} шт
                    </span>
                  ) : (
                    <span className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full font-semibold">
                      Нет в наличии
                    </span>
                  )}
                </div>

                {/* Quantity */}
                {product.stock > 0 && (
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-600 dark:text-gray-400">Количество:</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    fullWidth
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Добавить в корзину
                  </Button>
                  <button
                    onClick={handleToggleFavorite}
                    className={`p-3 rounded-xl transition-all ${
                      favorite
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <Package className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                      Быстрая доставка
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1-3 дня</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <Shield className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                      Гарантия
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">12 месяцев</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <Truck className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                      Бесплатная доставка
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">От 500 000 сум</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
            Отзывы покупателей ({reviews.length})
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                На основе {reviews.length} отзывов
              </p>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((r) => r.rating === rating).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={rating} className="flex items-center gap-3 mb-2">
                    <span className="text-sm w-12">{rating} звезд</span>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-text-light dark:text-text-dark">
                        {review.userName}
                      </h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(review.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
