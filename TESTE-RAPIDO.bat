@echo off
chcp 65001 >nul
title 🛒 EU Affiliate - Teste Rápido
cls

echo ==========================================
echo    🛒 Teste Rápido (Modo Demo)
echo ==========================================
echo.
echo    Este script roda o site SEM banco de dados.
echo    Apenas para visualizar a plataforma.
echo.

if not exist "package.json" (
    echo ❌ ERRO: Execute este arquivo DENTRO da pasta WEB!
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo 📦 Instalando dependencias...
    npm install
)

if not exist ".env.local" (
    echo 📝 Criando .env.local de teste...
    (
        echo NEXT_PUBLIC_SUPABASE_URL=https://demo.supabase.co
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=demo-key
        echo SUPABASE_SERVICE_ROLE_KEY=demo-key
        echo API_SECRET_KEY=demo-key
    ) > .env.local
)

echo.
echo 🚀 Iniciando servidor...
echo    Site: http://localhost:3000
echo.
start http://localhost:3000
npm run dev
