'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, ShoppingBag, ExternalLink, Store, Tag, Eye } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  image_url: string;
  original_url: string;
  affiliate_url: string;
  store: string;
  store_domain: string;
  category: string;
  product_id: string;
  clicks: number;
  created_at: string;
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  async function fetchProduct(id: string) {
    try {
      const allRes = await fetch('/api/products?limit=100');
      const data = await allRes.json();
      const found = data.products?.find((p: Product) => p.id === id);
      setProduct(found || null);

      if (found) {
        const relatedProducts = data.products?.filter(
          (p: Product) => p.category === found.category && p.id !== id
        ).slice(0, 4);
        setRelated(relatedProducts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuy() {
    if (!product) return;
    try {
      await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id })
      });
      window.open(product.affiliate_url || product.original_url, '_blank');
    } catch (err) {
      console.error(err);
    }
  }

  function formatPrice(price: number, currency: string) {
    const symbols: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };
    return `${symbols[currency] || currency} ${price.toFixed(2).replace('.', ',')}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Produto não encontrado</p>
          <Link href="/" className="text-indigo-600 hover:underline mt-4 inline-block">Voltar para início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-gray-50 p-8 flex items-center justify-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              ) : (
                <ShoppingBag className="w-32 h-32 text-gray-300" />
              )}
            </div>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium capitalize">
                  {product.store}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {product.category}
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-indigo-600">{formatPrice(product.price, product.currency)}</span>
                <span className="text-gray-400 text-sm">na {product.store}</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Store className="w-5 h-5" />
                  <span>Loja: <strong className="text-gray-900">{product.store_domain || product.store}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Tag className="w-5 h-5" />
                  <span>Categoria: <strong className="text-gray-900">{product.category}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Eye className="w-5 h-5" />
                  <span>{product.clicks || 0} pessoas clicaram nesta oferta</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>🔗 Link de Afiliado:</strong> Ao clicar em "Ver Oferta", você será redirecionado para a loja original. 
                  Este site recebe comissão sobre compras qualificadas.
                </p>
              </div>

              <button
                onClick={handleBuy}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold px-6 py-4 rounded-xl hover:opacity-90 transition flex items-center justify-center gap-3 text-lg"
              >
                <ExternalLink className="w-5 h-5" />
                Ver Oferta na {product.store}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos Similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition">
                  <div className="h-48 bg-gray-100">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-2">{p.title}</h3>
                    <span className="text-lg font-bold text-indigo-600">{formatPrice(p.price, p.currency)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
