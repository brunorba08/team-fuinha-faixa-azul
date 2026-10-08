let installPrompt=null;
const installButton=document.getElementById('install-app'),installStatus=document.getElementById('install-status'),installHelp=document.getElementById('install-help');
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
function installed(){installButton.hidden=true;installHelp.hidden=true;installStatus.textContent='Você já está usando o aplicativo.';}
if(standalone())installed();
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.hidden=false;installButton.textContent='Instalar aplicativo ↓';});
window.addEventListener('appinstalled',()=>{installPrompt=null;installed();});
installButton.addEventListener('click',async()=>{
 if(!installPrompt){installHelp.hidden=!installHelp.hidden;return;}
 const prompt=installPrompt;installPrompt=null;installButton.disabled=true;
 try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted'){installStatus.textContent='Instalação solicitada. Siga a confirmação do navegador.';}else{installHelp.hidden=false;installStatus.textContent='Você pode instalar quando quiser pelo menu do navegador.';}}catch{installHelp.hidden=false;installStatus.textContent='Use as instruções abaixo para instalar.';}finally{installButton.disabled=false;}
});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{installStatus.textContent='Use o menu do navegador para adicionar à tela inicial.';}));}
