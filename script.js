document.ondragstart=()=>false;document.addEventListener('contextmenu',e=>e.preventDefault());
document.onkeydown=(e)=>{if(e.keyCode==123||(e.ctrlKey&&e.shiftKey&&[73,74,67].includes(e.keyCode))||(e.ctrlKey&&[85,83].includes(e.keyCode)))return false;};
setInterval(()=>{const b=new Date().getTime();debugger;if(new Date().getTime()-b>100)document.body.innerHTML="<div style='color:red;text-align:center;margin-top:20vh;'>Debugger detected.</div>";},1000);
new MutationObserver((m)=>m.forEach(mu=>mu.addedNodes.forEach(n=>{if(['SCRIPT','IFRAME'].includes(n.tagName))n.remove();}))).observe(document.body,{childList:true,subtree:true});

// GỌI BACKEND ĐẾM VIEW THEO IP
async function fetchRealTimeViews() {
    try {
        const res = await fetch('/api/views'); // Trỏ tới Backend của Vercel
        const data = await res.json();
        document.getElementById('visit-count').innerText = data.views.toLocaleString();
    } catch (err) {
        document.getElementById('visit-count').innerText = "1";
    }
}
fetchRealTimeViews();

const text="Hello! I am a software developer with a strong passion for automation and system optimization. Always ready to solve real-world logic problems.";
let i=0,del=false;function type(){const el=document.getElementById("about-text");if(!del&&i<=text.length)el.innerHTML=text.substring(0,i++);else if(!del){del=true;setTimeout(type,5000);return;}else if(del&&i>=0)el.innerHTML=text.substring(0,i--);else del=false;setTimeout(type,del?10:25);}
type();
const modal=document.getElementById('donateModal'),mCon=document.getElementById('modalContent');
function toggleSettings(){document.getElementById('settingsMenu').classList.toggle('show');}
document.addEventListener('click',(e)=>{if(!document.querySelector('.settings-container').contains(e.target))document.getElementById('settingsMenu').classList.remove('show');});
function openDonate(){modal.style.display='flex';setTimeout(()=>{modal.style.opacity='1';mCon.style.transform='scale(1)';},10);}
function closeDonate(){modal.style.opacity='0';mCon.style.transform='scale(0.95)';setTimeout(()=>modal.style.display='none',200);}
function updateQR(){const a=document.getElementById('donateAmount').value.replace(/\D/g,'');document.getElementById('qrImage').src=`https://img.vietqr.io/image/ACB-33689707-compact2.png?amount=${a}&accountName=NGUYEN%20NGOC%20TRI%20VINH&addInfo=Donate%20Vinhx`;}
modal.addEventListener('click',(e)=>{if(e.target===modal)closeDonate();});
function triggerJumpscare(){const js=document.getElementById('jumpscare-container');js.style.display='block';setTimeout(()=>js.style.display='none',1500);}
function changeCursor(t,btn){document.querySelectorAll('#cursor-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.body.style.cursor=t;document.querySelectorAll('a,button,input,.skill-tag').forEach(el=>{if(!el.classList.contains('yapping-skill')&&!el.classList.contains('hello-tag'))el.style.cursor=(t==='default')?'pointer':t;});}
let curEff=null,effInt;function toggleEffect(t,btn){clearInterval(effInt);document.querySelectorAll('.effect-item').forEach(e=>e.remove());if(curEff===t){curEff=null;btn.classList.remove('active');return;}document.querySelectorAll('#effect-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');curEff=t;if(t==='snow')effInt=setInterval(()=>cp('❄️','snow-anim',3,10),150);if(t==='lightning')effInt=setInterval(()=>cp('⚡','lightning-anim',1.5,15),300);if(t==='leaf')effInt=setInterval(()=>cp('🍂','leaf-anim',4,12),250);}
function cp(i,a,d,s){const e=document.createElement('div');e.classList.add('effect-item',a);e.innerHTML=i;e.style.left=Math.random()*100+'vw';e.style.animationDuration=Math.random()*2+d+'s';e.style.fontSize=Math.random()*10+s+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),5000);}
