// ==UserScript==
// @name         kongfz搜索页
// @namespace    http://tampermonkey.net/
// @version      2024-01-07
// @description  try to take over the world!
// @author       You
// @match        https://search.kongfz.com/product_result/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kongfz.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const search = decodeURIComponent(location.search);
  const [, year, month, date] = /(\d{4})年(\d{1,2})月(\d{1,2})日/.exec(search) || [];

  if (year && month && date) {
    fetch(`http://localhost:3000/?time=${year}-${month}-${date}`)
  }
})();