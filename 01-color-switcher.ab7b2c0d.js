!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),a=null;e.disabled=!0,t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,a=setInterval((function(){var t="#".concat(Math.floor(16777215*Math.random()).toString(16));n.style.backgroundColor=t}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.ab7b2c0d.js.map