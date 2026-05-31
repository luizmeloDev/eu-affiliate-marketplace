import Link from 'next/link';

export default function Footer() {
  return (
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
              <li><Link href="/privacy" className="hover:text-white transition">Política de Privacidade</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Termos de Uso</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Afiliados</h3>
            <p className="text-sm mb-4">Este site contém links de afiliado. Ganhamos comissão sobre compras qualificadas.</p>
            <div className="flex gap-2 flex-wrap">
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
  );
}
