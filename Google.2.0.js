// ==UserScript==
// @name                   Remover GoogleHistory
// @description            Remove em qual link foi clicado por último no Google
// @version                2.0
// @author                 Cowanbas
// @match                  *://*/*
// @match                  *://*.google.tld/*
// @match                  *://www.google.tld/search?*
// @run-at                 document-start

// Bloqueio de Rastreadores
(function () {
  // Limpar cookies
  document.cookie.split(';').forEach(function (c) {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/(=.*|$)/, '=;expires=' + new Date().toUTCString() + ';path=/');
  });

  // Bloquear rastreadores de scripts de terceiros
  const blockThirdPartyScripts = () => {
    const scriptTags = document.getElementsByTagName('script');
    for (let i = 0; i < scriptTags.length; i++) {
      let script = scriptTags[i];
      const src = script.getAttribute('src');
      const blockedDomains = ['google-analytics.com', 'facebook.com', 'doubleclick.net'];
      if (blockedDomains.some(domain => src && src.includes(domain))) {
        script.parentNode.removeChild(script);
      }
    }
  };

  // Bloquear iframe de rastreadores
  const blockIframes = () => {
    const iframes = document.getElementsByTagName('iframe');
    for (let i = 0; i < iframes.length; i++) {
      const iframe = iframes[i];
      const src = iframe.getAttribute('src');
      if (src && src.includes('google.com') && src.includes('search')) {
        continue; // Permite o iframe da pesquisa
      }
      const blockedDomains = ['youtube.com', 'vimeo.com', 'google.com'];
      if (blockedDomains.some(domain => src && src.includes(domain))) {
        iframe.parentNode.removeChild(iframe);
      }
    }
  };

  // Executar bloqueios ao carregar
  window.addEventListener('load', () => {
    blockThirdPartyScripts();
    blockIframes();
  });
})();

// Remover GoogleHistory
(function () {
  'use strict';

  // Desativa o Google Analytics
  unsafeWindow._gaUserPrefs = {
    ioo() {
      return true;
    }
  };

  // Impede a modificação da função rwt
  Object.defineProperty(unsafeWindow, 'rwt', {
    value: function () { },
    writable: false
  });

  // Modifica os links nos resultados de pesquisa, removendo o redirecionamento do Google
  const cleanGoogleResults = () => {
    const results = document.querySelectorAll('a[href^="/url"]');
    for (let i = 0; i < results.length; i++) {
      const url = new URL(results[i].href);
      results[i].href = url.searchParams.get('q') || results[i].href;
    }
  };

  // Monitorar alterações na página
  const observer = new MutationObserver(cleanGoogleResults);
  observer.observe(document.body, { childList: true, subtree: true });

  // Executar ao carregar
  document.addEventListener('DOMContentLoaded', cleanGoogleResults);
})();