@echo off
chcp 65001 >nul
title 🛒 EU Affiliate Marketplace - Setup
cls

echo ==========================================
echo    🛒 EU Affiliate Marketplace
echo    Setup Automatico para Windows
echo ==========================================
echo.

:: Verificar se esta na pasta web
if not exist "package.json" (
    echo ❌ ERRO: Voce precisa estar na pasta WEB!
    echo.
    echo    Pasta atual: %CD%
    echo.
    echo    Solucao:
    echo    1. Abra o Explorador de Arquivos
    echo    2. Entre na pasta: web    echo    3. Clique duplo neste arquivo (setup.bat)
    echo.
    pause
    exit /b 1
)

:: Verificar Node.js
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js NAO encontrado!
    echo.
    echo    Baixe e instale: https://nodejs.org
    echo    (Baixe a versao LTS - botao verde)
    echo.
    start https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('node --version') do set NODE_VER=%%a
echo ✅ Node.js encontrado: %NODE_VER%
echo.

:: Verificar npm
echo [2/5] Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm NAO encontrado!
    pause
    exit /b 1
)
for /f "tokens=*" %%a in ('npm --version') do set NPM_VER=%%a
echo ✅ npm encontrado: %NPM_VER%
echo.

:: Criar .env.local se nao existir
echo [3/5] Verificando configuracoes...
if not exist ".env.local" (
    echo    Criando .env.local...
    (
        echo NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
        echo SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
        echo API_SECRET_KEY=minha-chave-secreta-123
    ) > .env.local
    echo ✅ .env.local criado!
    echo.
    echo    ⚠️  IMPORTANTE: Edite .env.local com suas chaves do Supabase
    echo       (deixe assim por enquanto para testar o site)
) else (
    echo ✅ .env.local ja existe
)
echo.

:: Instalar dependencias
echo [4/5] Instalando dependencias...
echo    Isso pode levar 2-3 minutos na primeira vez...
echo.
npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependencias!
    pause
    exit /b 1
)
echo ✅ Dependencias instaladas!
echo.

:: Perguntar sobre Supabase
echo [5/5] Configuracao do banco de dados
echo.
echo    Voce ja configurou o Supabase?
echo    1 - Sim, ja tenho as chaves (modo completo)
echo    2 - Nao, quero testar primeiro (modo demo)
echo.
set /p OPCAO="Escolha 1 ou 2: "

if "%OPCAO%"=="1" (
    echo.
    echo    📝 Edite o arquivo .env.local com suas chaves:
    echo.
    echo    NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
    echo    NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
    echo    SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-aqui
    echo.
    echo    Depois de editar, pressione qualquer tecla...
    pause >nul
)

if "%OPCAO%"=="2" (
    echo.
    echo    ✅ Modo DEMO ativado!
    echo    O site vai abrir, mas produtos nao serao salvos.
    echo    Para salvar, configure o Supabase depois.
    echo.
)

:: Rodar o servidor
echo ==========================================
echo    🚀 INICIANDO SERVIDOR...
echo ==========================================
echo.
echo    Aguarde alguns segundos...
echo    O site abrira automaticamente no navegador
echo.

:: Abrir navegador apos 5 segundos
start /b cmd /c "timeout /t 5 /nobreak >nul && start http://localhost:3000"

:: Iniciar Next.js
npm run dev

:: Se der erro de porta, tenta outra
if %errorlevel% neq 0 (
    echo.
    echo    ⚠️  Porta 3000 ocupada. Tentando porta 3001...
    npm run dev -- -p 3001
)

echo.
pause
