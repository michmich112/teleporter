const s = document.createElement('script');
s.src = chrome.runtime.getURL('teleport.js');
(document.head || document.documentElement).appendChild(s)
