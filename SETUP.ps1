# 🛒 EU Affiliate Marketplace - Setup Automático
# Execute: Right-click → "Run with PowerShell"

$Host.UI.RawUI.WindowTitle = "🛒 EU Affiliate Marketplace - Setup"

function Show-Header {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "    🛒 EU Affiliate Marketplace" -ForegroundColor Cyan
    Write-Host "    Setup Automático para Windows" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Test-NodeJS {
    Write-Host "[1/5] Verificando Node.js..." -ForegroundColor Yellow
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
            return $true
        }
    } catch {}

    Write-Host "❌ Node.js NÃO encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Baixe e instale: https://nodejs.org" -ForegroundColor Yellow
    Write-Host "   (Baixe a versão LTS - botão verde)" -ForegroundColor Yellow
    Write-Host ""
    Start-Process "https://nodejs.org"
    Read-Host "Pressione Enter após instalar o Node.js"
    return Test-NodeJS
}

function Test-NPM {
    Write-Host "[2/5] Verificando npm..." -ForegroundColor Yellow
    try {
        $npmVersion = npm --version 2>$null
        Write-Host "✅ npm encontrado: v$npmVersion" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "❌ npm não encontrado!" -ForegroundColor Red
        return $false
    }
}

function Test-Location {
    Write-Host "[3/5] Verificando pasta..." -ForegroundColor Yellow
    if (Test-Path "package.json") {
        Write-Host "✅ Pasta correta: $(Get-Location)" -ForegroundColor Green
        return $true
    }

    Write-Host "❌ ERRO: Você precisa estar na pasta WEB!" -ForegroundColor Red
    Write-Host ""
    Write-Host "   Pasta atual: $(Get-Location)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   Solução:" -ForegroundColor Yellow
    Write-Host "   1. Feche este terminal" -ForegroundColor Yellow
    Write-Host "   2. Abra a pasta 'web' no Explorador" -ForegroundColor Yellow
    Write-Host "   3. Clique com botão direito → 'Abrir no Terminal'" -ForegroundColor Yellow
    Write-Host "   4. Execute: .\SETUP.ps1" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Pressione Enter para sair"
    exit 1
}

function New-EnvFile {
    Write-Host "[4/5] Verificando configurações..." -ForegroundColor Yellow
    if (Test-Path ".env.local") {
        Write-Host "✅ .env.local já existe" -ForegroundColor Green
        return
    }

    Write-Host "   Criando .env.local..." -ForegroundColor Yellow
    @"
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
API_SECRET_KEY=minha-chave-secreta-123
"@ | Out-File -FilePath ".env.local" -Encoding utf8

    Write-Host "✅ .env.local criado!" -ForegroundColor Green
    Write-Host ""
    Write-Host "   ⚠️  IMPORTANTE: Edite .env.local com suas chaves do Supabase" -ForegroundColor Yellow
    Write-Host "      (deixe assim por enquanto para testar o site)" -ForegroundColor Yellow
}

function Install-Dependencies {
    Write-Host ""
    Write-Host "[5/5] Instalando dependências..." -ForegroundColor Yellow
    Write-Host "   Isso pode levar 2-3 minutos na primeira vez..." -ForegroundColor Gray
    Write-Host ""

    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
}

function Start-Server {
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "    🚀 INICIANDO SERVIDOR..." -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "    Aguarde alguns segundos..." -ForegroundColor Gray
    Write-Host "    O site abrirá automaticamente no navegador" -ForegroundColor Gray
    Write-Host ""

    # Abrir navegador após 5 segundos
    Start-Job -ScriptBlock {
        Start-Sleep -Seconds 5
        Start-Process "http://localhost:3000"
    } | Out-Null

    # Iniciar Next.js
    npm run dev
}

# ============ EXECUÇÃO ============
Show-Header
Test-Location
Test-NodeJS
Test-NPM
New-EnvFile
Install-Dependencies

# Perguntar sobre modo
Write-Host ""
Write-Host "Configuração do banco de dados:" -ForegroundColor Cyan
Write-Host ""
Write-Host "   1 - Sim, já tenho as chaves do Supabase (modo completo)" -ForegroundColor White
Write-Host "   2 - Não, quero testar primeiro (modo demo)" -ForegroundColor White
Write-Host ""
$opcao = Read-Host "Escolha 1 ou 2"

if ($opcao -eq "1") {
    Write-Host ""
    Write-Host "   📝 Edite o arquivo .env.local com suas chaves:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co" -ForegroundColor Gray
    Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui" -ForegroundColor Gray
    Write-Host "   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-aqui" -ForegroundColor Gray
    Write-Host ""
    Read-Host "Depois de editar, pressione Enter"
}

if ($opcao -eq "2") {
    Write-Host ""
    Write-Host "   ✅ Modo DEMO ativado!" -ForegroundColor Green
    Write-Host "   O site vai abrir, mas produtos não serão salvos." -ForegroundColor Gray
    Write-Host "   Para salvar, configure o Supabase depois." -ForegroundColor Gray
    Write-Host ""
}

Start-Server
