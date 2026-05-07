document.ondragstart=()=>false;document.addEventListener('contextmenu',e=>e.preventDefault());
document.onkeydown=(e)=>{if(e.keyCode==123||(e.ctrlKey&&e.shiftKey&&[73,74,67].includes(e.keyCode))||(e.ctrlKey&&[85,83].includes(e.keyCode)))return false;};
setInterval(()=>{const b=new Date().getTime();debugger;if(new Date().getTime()-b>100)document.body.innerHTML="<div style='color:red;text-align:center;margin-top:20vh;'>Debugger detected.</div>";},1000);
new MutationObserver((m)=>m.forEach(mu=>mu.addedNodes.forEach(n=>{if(['SCRIPT','IFRAME'].includes(n.tagName))n.remove();}))).observe(document.body,{childList:true,subtree:true});

// GỌI BACKEND ĐẾM VIEW THEO IP (24h)
async function fetchRealTimeViews(){try{const res=await fetch('/api/views');const data=await res.json();document.getElementById('visit-count').innerText=data.views.toLocaleString();}catch(err){document.getElementById('visit-count').innerText="1";}}
fetchRealTimeViews();

// HIEU UNG CON MAT DI THEO CHUOT (NEW)
const eyeParent = document.getElementById('eye-parent');
const pupil = eyeParent.querySelector('.pupil');
document.addEventListener('mousemove',(e)=>{
    const rect = eyeParent.getBoundingClientRect();
    const eyeX = rect.left + rect.width/2;
    const eyeY = rect.top + rect.height/2;
    const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
    const distance = Math.min(6, Math.hypot(e.clientX - eyeX, e.clientY - eyeY)/15);
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;
    pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
});

// TYPING EFFECT
const text="Hello! I am a software developer with a strong passion for automation and system optimization. Always ready to solve real-world logic problems.";
let i=0,del=false;function type(){const el=document.getElementById("about-text");if(!del&&i<=text.length)el.innerHTML=text.substring(0,i++);else if(!del){del=true;setTimeout(type,5000);return;}else if(del&&i>=0)el.innerHTML=text.substring(0,i--);else del=false;setTimeout(type,del?10:25);}
type();

// SETTINGS & MODAL
const modal=document.getElementById('donateModal'),mCon=document.getElementById('modalContent');
function toggleSettings(){document.getElementById('settingsMenu').classList.toggle('show');}
document.addEventListener('click',(e)=>{if(!document.querySelector('.settings-container').contains(e.target))document.getElementById('settingsMenu').classList.remove('show');});
function openDonate(){modal.style.display='flex';setTimeout(()=>{modal.style.opacity='1';mCon.style.transform='scale(1)';},10);fetchQR();}
function closeDonate(){modal.style.opacity='0';mCon.style.transform='scale(0.95)';setTimeout(()=>modal.style.display='none',200);}
function updateQR(){const a=document.getElementById('donateAmount').value.replace(/\D/g,'');document.getElementById('qrImage').src=`https://img.vietqr.io/image/ACB-33689707-compact2.png?amount=${a}&accountName=NGUYEN%20NGOC%20TRI%20VINH&addInfo=Donate%20Vinhx`;}
modal.addEventListener('click',(e)=>{if(e.target===modal)closeDonate();});
function triggerJumpscare(){const js=document.getElementById('jumpscare-container');js.style.display='block';setTimeout(()=>js.style.display='none',1500);}

// CURSORS & EFFECTS SYSTEM (NEW - NO ICONS)
function changeCursor(t,btn){
    document.querySelectorAll('#cursor-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    document.body.style.cursor=t;
    document.querySelectorAll('a,button,input,.skill-tag').forEach(el=>{if(!el.classList.contains('yapping-skill')&&!el.classList.contains('hello-tag'))el.style.cursor=(t==='default')?'pointer':t;});
}

let curEff=null,effInt, mouseX=0, mouseY=0;
document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });

function toggleEffect(t,btn){
    clearInterval(effInt);
    document.querySelectorAll('.particle-effect').forEach(e=>e.remove());
    if(curEff===t){curEff=null;btn.classList.remove('active');return;}
    document.querySelectorAll('#effect-group .ctrl-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    curEff=t;
    if(t==='snow') effInt = setInterval(() => createParticle('snow'), 100);
    if(t==='spark') effInt = setInterval(() => createParticle('spark'), 50); // Tao tai vi tri chuot
    if(t==='sakura') effInt = setInterval(() => createParticle('sakura'), 150);
}

// Chuyen dong Particle System
function createParticle(type){
    const el = document.createElement('div');
    el.classList.add('particle-effect');
    
    let size, color, duration, startX, startY, endX, endY, behavior;

    if(type === 'snow'){
        size = Math.random() * 5 + 2 + 'px';
        color = '#fff';
        duration = Math.random() * 3 + 2;
        startX = Math.random() * 100 + 'vw';
        startY = '-10px';
        endX = `calc(${startX} + ${Math.random() * 40 - 20}px)`;
        endY = '100vh';
        el.style.boxShadow = '0 0 5px #fff';
    } else if(type === 'sakura'){
        size = Math.random() * 8 + 5 + 'px';
        color = '#ffb7c5'; // Hong hoa anh dao
        duration = Math.random() * 4 + 3;
        startX = Math.random() * 100 + 'vw';
        startY = '-10px';
        endX = `calc(${startX} + ${Math.random() * 100 - 50}px)`;
        endY = '100vh';
        el.style.borderRadius = '50% 0 50% 50%'; // Tao hinh canh hoa
        el.style.transform = `rotate(${Math.random() * 360}deg)`;
    } else if(type === 'spark'){
        size = Math.random() * 4 + 1 + 'px';
        color = `hsl(${Math.random() * 30 + 30}, 100%, 70%)`; // Mau vàng/cam lua
        duration = Math.random() * 0.5 + 0.5;
        startX = mouseX + 'px'; // Bat dau tai chuot
        startY = mouseY + 'px';
        endX = `calc(${startX} + ${Math.random() * 100 - 50}px)`;
        endY = `calc(${startY} + ${Math.random() * 100 - 50}px)`;
        el.style.boxShadow = `0 0 10px ${color}`;
    }

    el.style.width = size;
    el.style.height = size;
    el.style.backgroundColor = color;
    el.style.left = startX;
    el.style.top = startY;
    el.style.opacity = '0.8';
    
    document.body.appendChild(el);

    // Animation bang JS de toi uu cho particle dong
    const animation = el.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 0.8 },
        { transform: `translate(calc(${endX} - ${startX}), calc(${endY} - ${startY})) rotate(${type==='sakura'?Math.random()*720:0}deg)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'linear',
    });

    animation.onfinish = () => el.remove();
}
