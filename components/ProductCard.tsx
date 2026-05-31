'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

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

export default function ProductCard({ product }: { product: Product }) {
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
    <Link href={`/products/${product.id}`} className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 block">
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
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">{formatPrice(product.price, product.currency)}</span>
          <span className="text-xs text-gray-400">{product.clicks || 0} cliques</span>
        </div>
      </div>
    </Link>
  );
}
