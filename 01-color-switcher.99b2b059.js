const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.stopBtn.disabled=!0;let e=null;t.startBtn.addEventListener("click",(()=>{e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3),t.stopBtn.disabled=!1,t.startBtn.disabled=!0})),t.stopBtn.addEventListener("click",(()=>{t.stopBtn.disabled=!0,t.startBtn.disabled=!1,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.99b2b059.js.map
