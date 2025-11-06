import { motion } from 'framer-motion';
import { LiquidButton } from '../components/ui/LiquidButton';
import { Button } from '../components/ui/Button';
import { ShoppingCart, Heart, Star, Zap, Sparkles } from 'lucide-react';

export const ButtonShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            iOS 26 Liquid Glass Buttons
          </h1>
          <p className="text-xl text-gray-300">
            Современные кнопки с эффектом жидкого стекла и плавными анимациями
          </p>
        </motion.div>

        {/* Standard Buttons */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Стандартные кнопки с Glassmorphism
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-white font-semibold mb-2">Primary</h3>
              <Button variant="primary" size="lg">
                <ShoppingCart className="w-5 h-5" />
                Купить сейчас
              </Button>
              <Button variant="primary" size="md">
                Добавить в корзину
              </Button>
              <Button variant="primary" size="sm">
                Подробнее
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-white font-semibold mb-2">Secondary</h3>
              <Button variant="secondary" size="lg">
                <Star className="w-5 h-5" />
                Избранное
              </Button>
              <Button variant="secondary" size="md">
                Сохранить
              </Button>
              <Button variant="secondary" size="sm">
                Поделиться
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-white font-semibold mb-2">Outline</h3>
              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
                Нравится
              </Button>
              <Button variant="outline" size="md">
                Отменить
              </Button>
              <Button variant="outline" size="sm">
                Закрыть
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 p-6 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-white font-semibold mb-2">Danger</h3>
              <Button variant="danger" size="lg">
                Удалить
              </Button>
              <Button variant="danger" size="md">
                Отклонить
              </Button>
              <Button variant="danger" size="sm">
                Сбросить
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Liquid Glass Buttons */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Liquid Glass варианты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-blue-400 font-semibold text-lg mb-2">Glass Blue</h3>
              <LiquidButton variant="glass-blue" size="lg" icon={<Zap className="w-5 h-5" />}>
                Быстрая покупка
              </LiquidButton>
              <LiquidButton variant="glass-blue" size="md">
                Добавить в корзину
              </LiquidButton>
              <LiquidButton variant="glass-blue" size="sm">
                Подробнее
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-purple-400 font-semibold text-lg mb-2">Glass Purple</h3>
              <LiquidButton variant="glass-purple" size="lg" icon={<Sparkles className="w-5 h-5" />}>
                Премиум доступ
              </LiquidButton>
              <LiquidButton variant="glass-purple" size="md">
                Подписаться
              </LiquidButton>
              <LiquidButton variant="glass-purple" size="sm">
                Узнать больше
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-pink-400 font-semibold text-lg mb-2">Glass Pink</h3>
              <LiquidButton variant="glass-pink" size="lg" icon={<Heart className="w-5 h-5" />}>
                В избранное
              </LiquidButton>
              <LiquidButton variant="glass-pink" size="md">
                Нравится
              </LiquidButton>
              <LiquidButton variant="glass-pink" size="sm">
                Сохранить
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-green-400 font-semibold text-lg mb-2">Glass Green</h3>
              <LiquidButton variant="glass-green" size="lg">
                Подтвердить
              </LiquidButton>
              <LiquidButton variant="glass-green" size="md">
                Оплатить
              </LiquidButton>
              <LiquidButton variant="glass-green" size="sm">
                Готово
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-orange-400 font-semibold text-lg mb-2">Glass Orange</h3>
              <LiquidButton variant="glass-orange" size="lg">
                Специальное предложение
              </LiquidButton>
              <LiquidButton variant="glass-orange" size="md">
                Акция
              </LiquidButton>
              <LiquidButton variant="glass-orange" size="sm">
                Скидка
              </LiquidButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col gap-4 p-8 bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10"
            >
              <h3 className="text-white font-semibold text-lg mb-2">Full Width</h3>
              <LiquidButton variant="glass-blue" size="lg" fullWidth>
                Полная ширина Large
              </LiquidButton>
              <LiquidButton variant="glass-purple" size="md" fullWidth>
                Полная ширина Medium
              </LiquidButton>
              <LiquidButton variant="glass-pink" size="sm" fullWidth>
                Полная ширина Small
              </LiquidButton>
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Интерактивная демонстрация
          </h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Попробуйте эффект Liquid Glass
              </h3>
              <p className="text-gray-300">
                Нажмите на кнопки, чтобы увидеть эффект ripple и liquid push анимацию
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LiquidButton
                variant="glass-blue"
                size="lg"
                fullWidth
                icon={<ShoppingCart className="w-6 h-6" />}
              >
                Добавить в корзину
              </LiquidButton>
              <LiquidButton
                variant="glass-purple"
                size="lg"
                fullWidth
                icon={<Heart className="w-6 h-6" />}
              >
                В избранное
              </LiquidButton>
              <LiquidButton
                variant="glass-pink"
                size="lg"
                fullWidth
                icon={<Star className="w-6 h-6" />}
              >
                Оценить товар
              </LiquidButton>
              <LiquidButton
                variant="glass-green"
                size="lg"
                fullWidth
                icon={<Zap className="w-6 h-6" />}
              >
                Быстрый заказ
              </LiquidButton>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};
