export function formatPrice(price: number, currency: string) {
  const symbols: Record<string, string> = { EUR: '€', GBP: '£', USD: '$' };
  const symbol = symbols[currency] || currency;
  return `${symbol} ${price.toFixed(2).replace('.', ',')}`;
}

export function getAffiliateUrl(originalUrl: string, store: string, affiliateTag?: string) {
  if (store === 'amazon' && affiliateTag) {
    const url = new URL(originalUrl);
    url.searchParams.set('tag', affiliateTag);
    return url.toString();
  }
  return originalUrl;
}

export function slugify(text: string) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
