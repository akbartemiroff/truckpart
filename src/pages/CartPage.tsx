import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/ui/Modal';

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart, user, addOrder } = useStore();
  const navigate = useNavigate();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' сум';
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = () => {
    const order = {
      id: Date.now().toString(),
      userId: user!.id,
      items: cart,
      total: getCartTotal(),
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      shippingAddress: user!.address,
    };
    addOrder(order);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full mb-6">
              <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
              Заказ успешно оформлен!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Мы свяжемся с вами в ближайшее время для подтверждения заказа
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/profile')} variant="primary">
                Мои заказы
              </Button>
              <Button onClick={() => navigate('/products')} variant="outline">
                Продолжить покупки
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-background-light dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
            <ShoppingCart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark mb-4">
            Корзина
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Проверьте выбранные товары перед оформлением заказа
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4">
              Ваша корзина пуста
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <Button onClick={() => navigate('/products')} size="lg">
              Перейти к покупкам
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {item.product.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-semibold w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.min(item.product.stock, item.quantity + 1))}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.product.price)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 h-fit text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-text-light dark:text-text-dark mb-6">
                  Итого
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Товары ({cart.length})</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-xl font-bold text-text-light dark:text-text-dark">
                      <span>К оплате</span>
                      <span className="text-primary">{formatPrice(getCartTotal())}</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleCheckout} fullWidth size="lg">
                  Оформить заказ
                </Button>
                <button
                  onClick={() => clearCart()}
                  className="w-full mt-4 text-red-500 hover:text-red-600 font-medium"
                >
                  Очистить корзину
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Оформление заказа"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Данные получателя</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p><strong>Имя:</strong> {user?.name}</p>
              <p><strong>Телефон:</strong> {user?.phone}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Адрес доставки:</strong> {user?.address}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Состав заказа</h3>
            <div className="space-y-2">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span>Итого:</span>
              <span className="text-primary">{formatPrice(getCartTotal())}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button onClick={handlePlaceOrder} fullWidth>
              Подтвердить заказ
            </Button>
            <Button onClick={() => setShowCheckoutModal(false)} variant="outline" fullWidth>
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
