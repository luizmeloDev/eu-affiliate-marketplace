import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EU Affiliate Marketplace - Melhores Ofertas da Europa',
  description: 'Descubra os melhores produtos das maiores lojas da Europa. Compre com segurança e os melhores preços.',
  keywords: 'marketplace, affiliate, europa, ofertas, amazon, zalando, compras',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
