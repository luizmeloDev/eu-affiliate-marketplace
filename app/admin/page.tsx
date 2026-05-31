'use client';

import { useState, useEffect } from 'react';
import { Trash2, Eye, ExternalLink, TrendingUp, DollarSign, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  store: string;
  category: string;
  clicks: number;
  status: string;
  created_at: string;
  affiliate_url: string;
  image_url?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (authenticated) fetchProducts();
  }, [authenticated]);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products?limit=100');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: string) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      // Note: precisaria de endpoint DELETE - simplificado aqui
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const totalClicks = products.reduce((sum, p) => sum + (p.clicks || 0), 0);
  const totalProducts = products.length;
  const avgPrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">🔐 Painel Admin</h1>
          <p className="text-gray-600 mb-4">Digite a senha de admin para acessar.</p>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && setAuthenticated(true)}
          />
          <button
            onClick={() => setAuthenticated(true)}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition"
          >
            Entrar
          </button>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Nota: Em produção, use autenticação real (Supabase Auth, NextAuth, etc.)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">📊 Painel de Controle</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-600">Total de Produtos</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-600">Total de Cliques</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{totalClicks}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-indigo-600" />
              <span className="text-gray-600">Preço Médio</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">€ {avgPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Produtos Importados</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Carregando...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-gray-500">Nenhum produto importado ainda.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Produto</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Loja</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Preço</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Clicks</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {product.image_url && (
                            <img src={product.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{product.title.substring(0, 50)}...</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium capitalize">{product.store}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-indigo-600">
                        {product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : '$'} {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{product.clicks || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <a 
                            href={product.affiliate_url || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-gray-600 hover:text-indigo-600 transition"
                            title="Ver link"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <button 
                            onClick={() => deleteProduct(product.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
