import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Product, CartItem, Category, Order } from '../types';

interface StoreState {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;

  // Favorites
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Products & Categories
  products: Product[];
  categories: Category[];
  setProducts: (products: Product[]) => void;
  setCategories: (categories: Category[]) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (categoryId: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      setUser: (user) => set({ user }),
      login: async (email, password) => {
        // Mock login - в реальном проекте здесь будет API запрос
        if (email === 'admin@truckparts.com' && password === 'admin123') {
          set({
            user: {
              id: '1',
              name: 'Администратор',
              email: 'admin@truckparts.com',
              phone: '+998901234567',
              address: 'Ташкент, Узбекистан',
              role: 'admin',
            },
          });
          return true;
        } else if (email === 'user@example.com' && password === 'user123') {
          set({
            user: {
              id: '2',
              name: 'Иван Петров',
              email: 'user@example.com',
              phone: '+998907654321',
              address: 'Самарканд, Узбекистан',
              role: 'user',
            },
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),

      // Theme
      theme: 'light',
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      // Cart
      cart: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      // Favorites
      favorites: [],
      addToFavorites: (product) =>
        set((state) => {
          if (!state.favorites.find((p) => p.id === product.id)) {
            return { favorites: [...state.favorites, product] };
          }
          return state;
        }),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== productId),
        })),
      isFavorite: (productId) => {
        const { favorites } = get();
        return favorites.some((p) => p.id === productId);
      },

      // Products & Categories
      products: [],
      categories: [],
      setProducts: (products) => set({ products }),
      setCategories: (categories) => set({ categories }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategory: (category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
        })),
      deleteCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== categoryId),
        })),

      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: 'truckparts-storage',
    }
  )
);
