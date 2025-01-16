﻿// ==UserScript==
// @name                   Remover GoogleHistory
// @description            Remove em qual link foi clicado por último no Google
// @namespace              CowanGOOGLE
// @license                CowBas
// @version                1.0
// @author                 Cowanbas
// @match                  *://*/*
// @match                  *://*.google.tld/*
// @match                  *://www.google.tld/search?*
// @run-at                 document-start
// ==/UserScript==

// Desativa o Google Analytics
(function () {
  'use strict';

  unsafeWindow._gaUserPrefs = {
    ioo() {
      return true;
    }
  }
})();

// Impede a modificação da função rwt
Object.defineProperty(unsafeWindow, 'rwt', {
  value: function () { },
  writable: false
});

// Modifica os links nos resultados de pesquisa, removendo o redirecionamento do Google
if (document.querySelector('.cleanslate')) {
  let results = document.querySelectorAll('a[href^="/url"]');
  for (let i = 0; i < results.length; i++) {
    let url = new URL(results[i].href);
    results[i].href = url.searchParams.get('q');
  }
}

else if (document.querySelector('#desktop-search')) {
  let results = document.querySelectorAll('.r a');
  for (let i = 0; i < results.length; i++) {
    let url = new URL(results[i].href);
    results[i].href = url.searchParams.get('q');
  }
}
