import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🚛 TruckParts</h3>
            <p className="text-sm mb-4">
              Ваш надежный поставщик качественных запчастей для грузовых автомобилей и фур.
              Работаем с 2010 года.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-primary rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-primary rounded-full transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-gray-800 hover:bg-primary rounded-full transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-primary transition-colors">
                  Категории
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-primary transition-colors">
                  Избранное
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-primary transition-colors">
                  Корзина
                </Link>
              </li>
            </ul>
          </div>

          {/* Категории */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Категории</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=1" className="hover:text-primary transition-colors">
                  Шины
                </Link>
              </li>
              <li>
                <Link to="/products?category=2" className="hover:text-primary transition-colors">
                  Диски
                </Link>
              </li>
              <li>
                <Link to="/products?category=3" className="hover:text-primary transition-colors">
                  Аккумуляторы
                </Link>
              </li>
              <li>
                <Link to="/products?category=4" className="hover:text-primary transition-colors">
                  Тормозная система
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+998901234567" className="hover:text-primary transition-colors">
                    +998 (90) 123-45-67
                  </a>
                  <br />
                  <a href="tel:+998901234568" className="hover:text-primary transition-colors">
                    +998 (90) 123-45-68
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0" />
                <a href="mailto:info@truckparts.uz" className="hover:text-primary transition-colors">
                  info@truckparts.uz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>г. Ташкент, ул. Шахрисабз, 123</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 TruckParts. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};
