export const metadata = {
  title: 'Termos de Uso - EU Affiliate Marketplace',
  description: 'Termos e condições de uso da EU Affiliate Marketplace'
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Aceitação dos Termos</h2>
            <p>Ao acessar e usar a EU Affiliate Marketplace, você concorda com estes termos. Se não concordar, não use o site.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Natureza do Serviço</h2>
            <p>A EU Affiliate Marketplace é uma plataforma de agregação de produtos. Não vendemos produtos diretamente. Todas as compras são feitas diretamente nas lojas parceiras (Amazon, Zalando, ASOS, etc.).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Links de Afiliado</h2>
            <p>Este site contém links de afiliado. Quando você clica em um produto e compra na loja parceira, recebemos uma comissão. Isso não aumenta o preço para você.</p>
            <p className="mt-2">Sempre informamos claramente quando um link é de afiliado.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Precisão das Informações</h2>
            <p>Fazemos o possível para manter preços e informações atualizadas, mas não garantimos precisão em tempo real. Preços e disponibilidade podem mudar sem aviso. Sempre verifique na loja original antes de comprar.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Responsabilidade</h2>
            <p>Não somos responsáveis por:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Qualidade dos produtos vendidos pelas lojas parceiras</li>
              <li>Entrega, devoluções ou reembolsos (são responsabilidade da loja)</li>
              <li>Alterações de preço após redirecionamento</li>
              <li>Disponibilidade de estoque</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Propriedade Intelectual</h2>
            <p>Imagens e descrições de produtos pertencem às lojas parceiras. Usamos sob fair use para fins de comparação e redirecionamento. Se você é proprietário e deseja remoção, entre em contato.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Alterações nos Termos</h2>
            <p>Podemos atualizar estes termos a qualquer momento. O uso continuado do site após alterações constitui aceitação.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Lei Aplicável</h2>
            <p>Estes termos são regidos pelas leis da União Europeia e do país onde o site está hospedado.</p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
            Última atualização: Maio 2026
          </p>
        </div>
      </div>
    </div>
  );
}
