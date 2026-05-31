export const metadata = {
  title: 'Política de Privacidade - EU Affiliate Marketplace',
  description: 'Como tratamos seus dados na EU Affiliate Marketplace'
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 text-gray-600">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Introdução</h2>
            <p>A EU Affiliate Marketplace respeita sua privacidade. Esta política explica como coletamos, usamos e protegemos suas informações pessoais em conformidade com o GDPR (Regulamento Geral de Proteção de Dados) da União Europeia.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Dados Coletados</h2>
            <p>Coletamos apenas dados necessários para o funcionamento do site:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Dados de navegação:</strong> IP, user agent, páginas visitadas (para analytics)</li>
              <li><strong>Cookies:</strong> Essenciais para funcionamento e preferências</li>
              <li><strong>Cliques:</strong> Registramos cliques em produtos para estatísticas de afiliados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Uso dos Dados</h2>
            <p>Seus dados são usados exclusivamente para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Funcionamento do marketplace e redirecionamento para lojas</li>
              <li>Estatísticas de performance de afiliados</li>
              <li>Melhoria da experiência do usuário</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Compartilhamento</h2>
            <p>Não vendemos seus dados. Compartilhamos apenas com:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Lojas parceiras (via links de afiliado) — apenas dados de cliques</li>
              <li>Provedores de hospedagem (Vercel, Supabase) — para operação técnica</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Seus Direitos (GDPR)</h2>
            <p>Você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acessar seus dados</li>
              <li>Solicitar correção ou exclusão</li>
              <li>Retirar consentimento a qualquer momento</li>
              <li>Portabilidade de dados</li>
            </ul>
            <p className="mt-2">Para exercer seus direitos, entre em contato pelo email de suporte.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies</h2>
            <p>Usamos cookies essenciais para funcionamento do site e cookies analíticos (Google Analytics) para entender o tráfego. Você pode recusar cookies não essenciais.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Alterações</h2>
            <p>Esta política pode ser atualizada. A versão mais recente sempre estará disponível nesta página.</p>
          </section>

          <p className="text-sm text-gray-400 pt-4 border-t border-gray-100">
            Última atualização: Maio 2026
          </p>
        </div>
      </div>
    </div>
  );
}
