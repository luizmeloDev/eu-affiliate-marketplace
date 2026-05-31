// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('EU Affiliate Importer instalado!');
});

// Listener para mensagens do content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getConfig') {
    chrome.storage.sync.get(['apiUrl', 'apiKey'], (result) => {
      sendResponse(result);
    });
    return true;
  }
});
