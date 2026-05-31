'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, TrendingUp, Store, ArrowRight, Globe } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  store: string;
  category: string;
  clicks: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products?limit=24');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      params.set('limit', '24');

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuyClick(productId: string) {
    try {
      const res = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (data.redirectUrl) {
        window.open(data.redirectUrl, '_blank');
      }
    } catch (err) {
      console.error(err);
    }
  }

  function formatPrice(price: number, currency: string) {
    const symbols: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };
    return `${symbols[currency] || currency} ${price.toFixed(2).replace('.', ',')}`;
  }

  function getStoreColor(store: string) {
    const colors: Record<string, string> = {
      amazon: 'bg-orange-100 text-orange-700',
      zalando: 'bg-orange-100 text-orange-700',
      asos: 'bg-green-100 text-green-700',
      ebay: 'bg-blue-100 text-blue-700',
      mediamarkt: 'bg-red-100 text-red-700',
      saturn: 'bg-yellow-100 text-yellow-700',
      otto: 'bg-purple-100 text-purple-700',
      thomann: 'bg-gray-100 text-gray-700'
    };
    return colors[store] || 'bg-gray-100 text-gray-700';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EU Affiliate</h1>
                <p className="text-xs text-gray-500">Marketplace Europeu</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> Europa</span>
              <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {products.length} Produtos</span>
              <span className="flex items-center gap-1"><Store className="w-4 h-4" /> Múltiplas Lojas</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Melhores Ofertas da Europa</h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Descubra produtos das maiores lojas europeias. Clique, compre e aproveite os melhores preços com segurança.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button type="submit" className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setSelectedCategory('all'); handleSearch({ preventDefault: () => {} } as any); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); handleSearch({ preventDefault: () => {} } as any); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 animate-pulse">
                <div className="bg-gray-200 rounded-xl h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum produto encontrado. Importe produtos usando a extensão Chrome!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100">
                <div className="relative h-56 bg-gray-100">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ShoppingBag className="w-12 h-12" />
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStoreColor(product.store)}`}>
                    {product.store}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">{product.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-indigo-600">{formatPrice(product.price, product.currency)}</span>
                    <span className="text-xs text-gray-400">{product.clicks || 0} cliques</span>
                  </div>
                  <button
                    onClick={() => handleBuyClick(product.id)}
                    className="w-full btn-primary flex items-center justify-center gap-2"
                  >
                    Ver Oferta <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">EU Affiliate Marketplace</h3>
              <p className="text-sm">O melhor lugar para encontrar ofertas das maiores lojas europeias. Todos os produtos são redirecionados para as lojas originais.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Links Úteis</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition">Início</Link></li>
                <li><Link href="#" className="hover:text-white transition">Sobre</Link></li>
                <li><Link href="#" className="hover:text-white transition">Política de Privacidade</Link></li>
                <li><Link href="#" className="hover:text-white transition">Termos de Uso</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Afiliados</h3>
              <p className="text-sm mb-4">Este site contém links de afiliado. Ganhamos comissão sobre compras qualificadas.</p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-gray-800 rounded text-xs">Amazon EU</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-xs">Awin</span>
                <span className="px-3 py-1 bg-gray-800 rounded text-xs">CJ</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2026 EU Affiliate Marketplace. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
