#!/bin/bash
# Deploy Script for Vercel

echo "🚀 Deploy para Vercel"
echo "====================="
echo ""

# Verificar Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm i -g vercel
fi

cd web

echo "🔧 Fazendo build..."
npm run build

echo "📤 Deployando..."
vercel --prod

echo ""
echo "✅ Deploy completo!"
echo "Atualize a URL da API na extensão Chrome."
