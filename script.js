document.ondragstart=()=>false;document.addEventListener('contextmenu',e=>e.preventDefault());
document.onkeydown=(e)=>{if(e.keyCode==123||(e.ctrlKey&&e.shiftKey&&[73,74,67].includes(e.keyCode))||(e.ctrlKey&&[85,83].includes(e.keyCode)))return false;};
setInterval(()=>{const b=new Date().getTime();debugger;if(new Date().getTime()-b>100)document.body.innerHTML="<div style='color:red;text-align:center;margin-top:20vh;'>Debugger detected.</div>";},1000);
new MutationObserver((m)=>m.forEach(mu=>mu.addedNodes.forEach(n=>{if(['SCRIPT','IFRAME'].includes(n.tagName))n.remove();}))).observe(document.body,{childList:true,subtree:true});

// GỌI BACKEND ĐẾM VIEW
async function fetchRealTimeViews(){try{const res=await fetch('/api/views');const data=await res.json();document.getElementById('visit-count').innerText=data.views.toLocaleString();}catch(err){document.getElementById('visit-count').innerText="1";}}
fetchRealTimeViews();

// MẮT ÁC QUỶ THEO CHUỘT
const eyeParent = document.getElementById('eye-parent');
const pupil = eyeParent.querySelector('.pupil');
document.addEventListener('mousemove',(e)=>{
    const rect = eyeParent.getBoundingClientRect();
    const eyeX = rect.left + rect.width/2;
    const eyeY = rect.top + rect.height/2;
    const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
    const distance = Math.min(5, Math.hypot(e.clientX - eyeX, e.clientY - eyeY)/15);
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;
    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
});

// TYPING
const text="Hello! I am a software developer with a strong passion for automation and system optimization. Always ready to solve real-world logic problems.";
let i=0,del=false;function type(){const el=document.getElementById("about-text");if(!del&&i<=text.length)el.innerHTML=text.substring(0,i++);else if(!del){del=true;setTimeout(type,5000);return;}else if(del&&i>=0)el.innerHTML=text.substring(0,i--);else del=false;setTimeout(type,del?10:25);}
type();

// SETTINGS & MODAL
const modal=document.getElementById('donateModal'),mCon=document.getElementById('modalContent');
function toggleSettings(){document.getElementById('settingsMenu').classList.toggle('show');}
document.addEventListener('click',(e)=>{if(!document.querySelector('.settings-container').contains(e.target))document.getElementById('settingsMenu').classList.remove('show');});
function openDonate(){modal.style.display='flex';setTimeout(()=>{modal.style.opacity='1';mCon.style.transform='scale(1)';},10);}
function closeDonate(){modal.style.opacity='0';mCon.style.transform='scale(0.95)';setTimeout(()=>modal.style.display='none',200);}
function updateQR(){const a=document.getElementById('donateAmount').value.replace(/\D/g,'');document.getElementById('qrImage').src=`https://img.vietqr.io/image/ACB-33689707-compact2.png?amount=${a}&accountName=NGUYEN%20NGOC%20TRI%20VINH&addInfo=Donate%20Vinhx`;}
modal.addEventListener('click',(e)=>{if(e.target===modal)closeDonate();});
function triggerJumpscare(){const js=document.getElementById('jumpscare-container');js.style.display='block';setTimeout(()=>js.style.display='none',1500);}

// CUSTOM CURSORS
let cursorTrailActive = false;
function changeCursor(t, btn){
    document.querySelectorAll('#cursor-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    
    cursorTrailActive = (t === 'trail');
    document.querySelectorAll('.cursor-trail-dot').forEach(d => d.remove());

    let cursorStyle = 'default';
    if(t === 'sniper') cursorStyle = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' fill='none' stroke='%23ef4444' stroke-width='2'/><path d='M12 2v4m0 12v4m-10-10h4m12 0h4' stroke='%23ef4444' stroke-width='2'/></svg>") 12 12, crosshair`;
    if(t === 'flame') cursorStyle = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M12 2C12 2 5 10 5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16C19 10 12 2 12 2Z' fill='%23f97316'/></svg>") 12 12, pointer`;
    if(t === 'trail') cursorStyle = `crosshair`;

    document.body.style.cursor = cursorStyle;
    document.querySelectorAll('a,button,input,.skill-tag').forEach(el=>{
        el.style.cursor = (t === 'default') ? 'pointer' : cursorStyle;
    });
}

let curEff=null,effInt, mouseX=0, mouseY=0;
document.addEventListener('mousemove', (e) => { 
    mouseX = e.clientX; mouseY = e.clientY; 
    
    // Logic cho hiệu ứng Trail bám theo chuột
    if(cursorTrailActive) {
        const dot = document.createElement('div');
        dot.classList.add('cursor-trail-dot');
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
        document.body.appendChild(dot);
        setTimeout(() => dot.remove(), 500);
    }
});

function toggleEffect(t,btn){
    clearInterval(effInt);
    document.querySelectorAll('.particle-effect').forEach(e=>e.remove());
    if(curEff===t){curEff=null;btn.classList.remove('active');return;}
    document.querySelectorAll('#effect-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    curEff=t;
    if(t==='snow') effInt = setInterval(() => createParticle('snow'), 100);
    if(t==='spark') effInt = setInterval(() => createParticle('spark'), 50);
    if(t==='sakura') effInt = setInterval(() => createParticle('sakura'), 150);
}

function createParticle(type){
    const el = document.createElement('div');
    el.classList.add('particle-effect');
    
    let size, color, duration, startX, startY, endX, endY;

    if(type === 'snow'){
        size = Math.random() * 5 + 2 + 'px'; color = '#fff'; duration = Math.random() * 3 + 2;
        startX = Math.random() * 100 + 'vw'; startY = '-10px';
        endX = `calc(${startX} + ${Math.random() * 40 - 20}px)`; endY = '100vh';
        el.style.boxShadow = '0 0 5px #fff';
    } else if(type === 'sakura'){
        size = Math.random() * 8 + 5 + 'px'; color = '#ffb7c5'; duration = Math.random() * 4 + 3;
        startX = Math.random() * 100 + 'vw'; startY = '-10px';
        endX = `calc(${startX} + ${Math.random() * 100 - 50}px)`; endY = '100vh';
        el.style.borderRadius = '50% 0 50% 50%'; el.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else if(type === 'spark'){
        size = Math.random() * 4 + 1 + 'px'; color = `hsl(${Math.random() * 30 + 30}, 100%, 70%)`; duration = Math.random() * 0.5 + 0.5;
        startX = mouseX + 'px'; startY = mouseY + 'px';
        endX = `calc(${startX} + ${Math.random() * 100 - 50}px)`; endY = `calc(${startY} + ${Math.random() * 100 - 50}px)`;
        el.style.boxShadow = `0 0 10px ${color}`;
    }

    el.style.width = size; el.style.height = size; el.style.backgroundColor = color;
    el.style.left = startX; el.style.top = startY; el.style.opacity = '0.8';
    
    document.body.appendChild(el);
    const animation = el.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.8 },
        { transform: `translate(calc(${endX} - ${startX}), calc(${endY} - ${startY})) rotate(${type==='sakura'?Math.random()*720:0}deg)`, opacity: 0 }
    ], { duration: duration * 1000, easing: 'linear' });
    animation.onfinish = () => el.remove();
}
