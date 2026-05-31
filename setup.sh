#!/bin/bash
# EU Affiliate Marketplace - Setup Script
# Execute: chmod +x setup.sh && ./setup.sh

echo "🛒 EU Affiliate Marketplace - Setup"
echo "===================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale primeiro: https://nodejs.org"
    exit 1
fi

echo "✅ Node.js encontrado: $(node -v)"

# Instalar dependências
echo "📦 Instalando dependências..."
cd web
npm install

# Criar .env.local se não existir
if [ ! -f .env.local ]; then
    echo "📝 Criando .env.local..."
    cp .env.local.example .env.local
    echo "⚠️  Edite .env.local com suas credenciais do Supabase!"
fi

echo ""
echo "✅ Setup completo!"
echo ""
echo "Próximos passos:"
echo "1. Configure o Supabase (veja README.md)"
echo "2. Edite .env.local com suas credenciais"
echo "3. Execute: npm run dev"
echo "4. Instale a extensão Chrome (chrome-extension/)"
echo ""
echo "🚀 Boa sorte com seu marketplace!"
