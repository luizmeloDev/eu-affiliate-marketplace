# 🛒 EU Affiliate Marketplace - PRONTO PARA USAR

## ▶️ Como rodar (3 passos)

### 1. Extraia o ZIP

### 2. Entre na pasta `web/`
```
cd web
```

### 3. Instale e rode
```bash
npm install
npm run dev
```

Abra no navegador: **http://localhost:3000**

---

## ⚙️ Configurar Supabase (para salvar produtos)

1. Acesse https://supabase.com → crie conta → New Project (Frankfurt)
2. Vá em SQL Editor → cole o conteúdo de `../supabase/schema.sql` → Run
3. Vá em Project Settings → API → copie as 3 chaves
4. Edite o arquivo `web/.env.local` e cole suas chaves
5. Reinicie: `npm run dev`

---

## 🔌 Instalar Extensão Chrome

1. Chrome → `chrome://extensions/`
2. Ative "Modo do desenvolvedor"
3. "Carregar sem compactação" → selecione pasta `chrome-extension/`
4. Clique no ícone 🛒 → configure URL e API Key

---

## 📦 Estrutura

```
├── web/              ← Site Next.js (rode aqui)
│   ├── .env.local    ← Configure suas chaves
│   └── ...
├── chrome-extension/ ← Extensão Chrome
├── supabase/         ← Schema do banco
└── README.md         ← Este arquivo
```

---

## 🆘 Problemas?

- **npm não encontrado?** Instale Node.js: https://nodejs.org
- **Porta 3000 ocupada?** Use: `npm run dev -- -p 3001`
- **Erro de conexão?** Verifique se `.env.local` está configurado

Boa sorte! 🚀
