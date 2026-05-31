// EU Affiliate Importer - Content Script
(function() {
  'use strict';

  let panel = null;
  let API_URL = '';
  let API_KEY = '';

  // Carregar configurações
  chrome.storage.sync.get(['apiUrl', 'apiKey'], (result) => {
    API_URL = result.apiUrl || 'https://seu-site.vercel.app/api';
    API_KEY = result.apiKey || '';
  });

  function detectStore() {
    const host = window.location.hostname;
    if (host.includes('amazon')) return 'amazon';
    if (host.includes('zalando')) return 'zalando';
    if (host.includes('asos')) return 'asos';
    if (host.includes('ebay')) return 'ebay';
    if (host.includes('mediamarkt')) return 'mediamarkt';
    if (host.includes('saturn')) return 'saturn';
    if (host.includes('otto')) return 'otto';
    if (host.includes('thomann')) return 'thomann';
    return 'generic';
  }

  function extractAmazonData() {
    const title = document.querySelector('#productTitle, [data-automation-id="product-title"], h1.a-size-large')?.innerText?.trim();
    const priceWhole = document.querySelector('.a-price-whole, .a-price .a-offscreen')?.innerText?.trim();
    const priceFraction = document.querySelector('.a-price-fraction')?.innerText?.trim();
    const price = priceWhole ? (priceFraction ? `${priceWhole}.${priceFraction}` : priceWhole) : '';
    const image = document.querySelector('#landingImage, #imgBlkFront, .a-dynamic-image')?.src;
    const asin = document.querySelector('[data-asin]')?.getAttribute('data-asin') || 
               window.location.pathname.match(/\/dp\/([A-Z0-9]{10})/)?.[1];

    return {
      title,
      price: price.replace(/[^0-9.,]/g, ''),
      currency: document.querySelector('.a-price-symbol')?.innerText || '€',
      image,
      url: window.location.href,
      store: 'amazon',
      store_domain: window.location.hostname,
      product_id: asin,
      category: document.querySelector('#wayfinding-breadcrumbs_feature_div, .a-breadcrumb')?.innerText?.trim()?.substring(0, 100) || 'Geral'
    };
  }

  function extractGenericData() {
    const title = document.querySelector('h1')?.innerText?.trim() || 
                  document.querySelector('[class*="title"], [class*="name"]')?.innerText?.trim() || 
                  document.title;

    const priceEl = document.querySelector('[class*="price"], [class*="Price"], [class*="preço"], [class*="preco"]');
    const price = priceEl?.innerText?.trim() || '';

    const image = document.querySelector('img[class*="product"], img[class*="main"], .product-image img, [class*="gallery"] img')?.src ||
                  document.querySelector('meta[property="og:image"]')?.content;

    return {
      title: title?.substring(0, 200),
      price: price.replace(/[^0-9.,]/g, ''),
      currency: price.includes('£') ? '£' : price.includes('EUR') ? 'EUR' : '€',
      image,
      url: window.location.href,
      store: detectStore(),
      store_domain: window.location.hostname,
      product_id: null,
      category: 'Geral'
    };
  }

  function extractProductData() {
    const store = detectStore();
    if (store === 'amazon') return extractAmazonData();
    return extractGenericData();
  }

  function createPanel() {
    if (panel) return;

    panel = document.createElement('div');
    panel.id = 'eu-affiliate-importer';
    panel.innerHTML = `
      <div class="eai-header">
        <span class="eai-logo">🛒 EU Affiliate</span>
        <button class="eai-close">×</button>
      </div>
      <div class="eai-body">
        <div class="eai-field">
          <label>Título</label>
          <input type="text" id="eai-title" placeholder="Título do produto">
        </div>
        <div class="eai-row">
          <div class="eai-field">
            <label>Preço</label>
            <input type="text" id="eai-price" placeholder="0.00">
          </div>
          <div class="eai-field">
            <label>Moeda</label>
            <select id="eai-currency">
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>
        </div>
        <div class="eai-field">
          <label>Categoria</label>
          <input type="text" id="eai-category" placeholder="Ex: Eletrônicos">
        </div>
        <div class="eai-field">
          <label>Link de Afiliado (opcional)</label>
          <input type="text" id="eai-affiliate-url" placeholder="Seu link de afiliado">
        </div>
        <div class="eai-preview">
          <img id="eai-preview-img" src="" alt="Preview">
        </div>
        <div class="eai-actions">
          <button class="eai-btn eai-btn-primary" id="eai-import">📥 Importar Produto</button>
          <button class="eai-btn eai-btn-secondary" id="eai-clear">Limpar</button>
        </div>
        <div class="eai-status" id="eai-status"></div>
      </div>
    `;

    document.body.appendChild(panel);

    // Eventos
    panel.querySelector('.eai-close').onclick = () => {
      panel.style.display = 'none';
    };

    panel.querySelector('#eai-import').onclick = async () => {
      const data = {
        title: panel.querySelector('#eai-title').value,
        price: parseFloat(panel.querySelector('#eai-price').value) || 0,
        currency: panel.querySelector('#eai-currency').value,
        category: panel.querySelector('#eai-category').value,
        image_url: panel.querySelector('#eai-preview-img').src,
        original_url: window.location.href,
        store: detectStore(),
        store_domain: window.location.hostname,
        product_id: extractProductData().product_id,
        affiliate_url: panel.querySelector('#eai-affiliate-url').value || window.location.href,
        status: 'active'
      };

      const status = panel.querySelector('#eai-status');
      status.innerHTML = '<span class="eai-loading">⏳ Importando...</span>';

      try {
        const res = await fetch(`${API_URL}/import`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          const result = await res.json();
          status.innerHTML = `<span class="eai-success">✅ Importado! ID: ${result.id}</span>`;
          setTimeout(() => { panel.style.display = 'none'; }, 2000);
        } else {
          const err = await res.text();
          status.innerHTML = `<span class="eai-error">❌ Erro: ${err}</span>`;
        }
      } catch (e) {
        status.innerHTML = `<span class="eai-error">❌ Erro de conexão. Verifique a API URL nas configurações.</span>`;
      }
    };

    panel.querySelector('#eai-clear').onclick = () => {
      panel.querySelector('#eai-title').value = '';
      panel.querySelector('#eai-price').value = '';
      panel.querySelector('#eai-category').value = '';
      panel.querySelector('#eai-affiliate-url').value = '';
      panel.querySelector('#eai-preview-img').src = '';
      panel.querySelector('#eai-status').innerHTML = '';
    };
  }

  function fillPanel(data) {
    if (!panel) createPanel();
    panel.style.display = 'block';

    panel.querySelector('#eai-title').value = data.title || '';
    panel.querySelector('#eai-price').value = data.price || '';
    panel.querySelector('#eai-currency').value = data.currency === '£' ? 'GBP' : 'EUR';
    panel.querySelector('#eai-category').value = data.category || '';
    panel.querySelector('#eai-preview-img').src = data.image || '';
    panel.querySelector('#eai-status').innerHTML = '';
  }

  // Criar botão flutuante
  const floatBtn = document.createElement('button');
  floatBtn.id = 'eai-float-btn';
  floatBtn.innerHTML = '🛒';
  floatBtn.title = 'Importar para EU Affiliate';
  floatBtn.onclick = () => {
    const data = extractProductData();
    fillPanel(data);
  };
  document.body.appendChild(floatBtn);

  // Auto-detectar se é página de produto
  const isProductPage = 
    document.querySelector('#productTitle, h1, [class*="product-title"], [class*="productTitle"]') &&
    (document.querySelector('[class*="price"], [class*="Price"]') || window.location.pathname.includes('/dp/'));

  if (isProductPage) {
    setTimeout(() => {
      const data = extractProductData();
      if (data.title && data.price) {
        fillPanel(data);
      }
    }, 1500);
  }
})();
