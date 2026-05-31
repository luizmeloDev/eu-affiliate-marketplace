@echo off
chcp 65001 >nul
title 🚀 Deploy para Vercel
cls

echo ==========================================
echo    🚀 Deploy para Vercel (Grátis)
echo ==========================================
echo.

:: Verificar se esta na pasta web
if not exist "package.json" (
    echo ❌ ERRO: Voce precisa estar na pasta WEB!
    echo.
    pause
    exit /b 1
)

:: Verificar Vercel CLI
echo [1/3] Verificando Vercel CLI...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    Vercel CLI nao encontrado. Instalando...
    npm i -g vercel
)
echo ✅ Vercel CLI OK
echo.

:: Build
echo [2/3] Fazendo build...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build!
    pause
    exit /b 1
)
echo ✅ Build completo!
echo.

:: Deploy
echo [3/3] Deployando...
echo.
echo    Siga as instrucoes na tela:
echo    - Login com GitHub/Google (se pedir)
echo    - Confirme o projeto
echo    - Aguarde o deploy
echo.
vercel --prod

echo.
echo ✅ Deploy enviado!
echo.
echo    ⚠️  IMPORTANTE:
echo    1. Va no dashboard da Vercel
echo    2. Adicione as variaveis de ambiente (Supabase)
echo    3. Atualize a URL da API na extensao Chrome
echo.
pause
