import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Home, Grid, Moon, Sun, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SearchBar } from './ui/SearchBar';
import { motion } from 'framer-motion';

export const Header = () => {
  const navigate = useNavigate();
  const { user, cart, favorites, theme, toggleTheme, logout } = useStore();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-primary"
            >
              🚛 TruckParts
            </motion.div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Navigation Icons */}
          <nav className="flex items-center gap-1">
            <NavLink to="/" icon={<Home className="w-6 h-6" />} label="Главная" />
            <NavLink to="/categories" icon={<Grid className="w-6 h-6" />} label="Категории" />
            <NavLink
              to="/favorites"
              icon={<Heart className="w-6 h-6" />}
              label="Избранное"
              badge={favorites.length}
            />
            <NavLink
              to="/cart"
              icon={<ShoppingCart className="w-6 h-6" />}
              label="Корзина"
              badge={cart.length}
            />
            
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  icon={<User className="w-6 h-6" />}
                  label="Профиль"
                />
                {user.role === 'admin' && (
                  <NavLink
                    to="/admin"
                    icon={<span className="text-sm font-bold">ADM</span>}
                    label="Админ"
                  />
                )}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    title="Выйти"
                  >
                    <LogOut className="w-6 h-6 text-red-500" />
                  </button>
                  <span className="text-[10px] text-text-secondary dark:text-text-tertiary mt-1">Выйти</span>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                icon={<User className="w-6 h-6" />}
                label="Войти"
              />
            )}

            <div className="flex flex-col items-center">
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}
              >
                {theme === 'light' ? (
                  <Moon className="w-6 h-6" />
                ) : (
                  <Sun className="w-6 h-6" />
                )}
              </button>
              <span className="text-[10px] text-text-secondary dark:text-text-tertiary mt-1">
                {theme === 'light' ? 'Темная' : 'Светлая'}
              </span>
            </div>
          </nav>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
}

const NavLink = ({ to, icon, label, badge }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="flex flex-col items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group relative"
    >
      <div className="relative">
        <div className="text-text-light dark:text-text-dark">{icon}</div>
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      <span className="text-[10px] text-text-secondary dark:text-text-tertiary mt-1 whitespace-nowrap">
        {label}
      </span>
    </Link>
  );
};
