// ==UserScript==
// @name         kongfz去水印
// @namespace    http://tampermonkey.net/
// @version      2023-12-16
// @description  try to take over the world!
// @author       You
// @match        https://www0.kfzimg.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=kfzimg.com
// @grant        none
// ==/UserScript==


(function () {
  'use strict';

  if (/_(b|s)\.jpg$/.test(location.href)) {
    location.href = location.href.replace('_b.jpg', '_c.jpg').replace('_s.jpg', '_c.jpg');
  }

  if (/_c\.jpg$/.test(location.href)) {

    fetch(`http://localhost:3000/?url=${location.href}`)
  }
  // Your code here...
})();