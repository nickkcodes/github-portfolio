const dots = document.querySelector('.dots')
const fill = document.getElementById('loader-fill')
let count = 0
let progress = 0

const dotInterval = setInterval(() => {
    count = (count + 1) % 4
    dots.textContent = '.'.repeat(count)
}, 400)

const progressInterval = setInterval(() => {
    progress += 2
    fill.style.width = progress + '%'
    document.getElementById('loader-percent').textContent = progress + '%'
    if (progress >= 100) {
        clearInterval(progressInterval)
        tryHideLoader()
    }
}, 40)

const welcomeText = "Welcome to my Portfolio"
const welcomeEl = document.getElementById('loader-welcome')
let i = 0

const typeInterval = setInterval(() => {
    welcomeEl.textContent += welcomeText[i]
    i++
    if (i >= welcomeText.length) clearInterval(typeInterval)
}, 80)

function tryHideLoader() {
    if (progress >= 100 && pageLoaded) {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden')

            const elements = document.querySelectorAll('.animate-left, .animate-right, .animate-bottom')
            elements.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('show')
                }, i * 400)
            })

            setTimeout(typeWriter, 1000)

        }, 500)
    }
}

window.addEventListener('load', () => {
    pageLoaded = true
    tryHideLoader()
})

const words = ["Nick Dela Cruz", "Future Dev"]
let wordIndex = 0
let letterIndex = 0
let isDeleting = false

function typeWriter() {
    const current = words[wordIndex]
    const el = document.getElementById('typewriter')

    if(isDeleting) {
        el.textContent = current.substring(0, letterIndex - 1)
        letterIndex--
    } else {
        el.textContent = current.substring(0, letterIndex + 1)
        letterIndex++
    }

    if (!isDeleting && letterIndex === current.length) {
        setTimeout(() => isDeleting = true, 1500)
    }

    if (isDeleting && letterIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
    }

    setTimeout(typeWriter, isDeleting ? 80 : 120)
}

const canvas = document.getElementById('stars')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const stars= []
for (let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        speed: Math.random() * 0.02
    })
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    stars.forEach(star => {
        star.opacity += star.speed
        if (star.opacity > 1 || star.opacity < 0) star.speed *= -1

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
    })
    requestAnimationFrame(drawStars)
}

drawStars()

const sections = document.querySelectorAll('section')
const navLinks = document.querySelectorAll('.nav-links a')

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const top = section.offsetTop - 100
        const bottom = top + section.offsetHeight

        if (window.scrollY >= top && window.scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove('active'))
            const id = section.getAttribute('id')
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`)
            if (activeLink) activeLink.classList.add('active')
        }
    })
})

document.querySelector(`.nav-links a[href="#home"]`).classList.add('active')

const skillsCanvas = document.getElementById('skillsCanvas');
const sCtx = skillsCanvas.getContext('2d');
(()=>{
const cv=document.getElementById('skillsCanvas'),g=cv.getContext('2d');
let W,H,cx,cy,R;
const rsz=()=>{const p=cv.parentElement;W=cv.width=p.clientWidth;H=cv.height=p.clientHeight;cx=W/2;cy=H/2;R=Math.min(W,H)*0.27;};
rsz();window.addEventListener('resize',rsz);

const SK=[
  {n:'HTML5',c:'#e34c26',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {n:'CSS3',c:'#264de4',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
  {n:'JavaScript',c:'#f7df1e',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {n:'Python',c:'#4B8BBE',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {n:'React',c:'#61DAFB',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {n:'Node.js',c:'#68A063',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {n:'Git',c:'#f05032',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg'},
  {n:'TypeScript',c:'#3178c6',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'},
  {n:'MySQL',c:'#00adef',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'},
  {n:'VS Code',c:'#007acc',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg'},
  {n:'Linux',c:'#fcc624',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg'},
  {n:'Figma',c:'#a259ff',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg'},
  {n:'C++',c:'#00599C',u:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'},
];

const IM={};
SK.forEach(s=>{const i=new Image();i.crossOrigin='anonymous';i.src=s.u;IM[s.n]=i;});

const nrm=v=>{const l=Math.hypot(...v);return v.map(x=>x/l);};
const mdp=(a,b)=>nrm([(a[0]+b[0])/2,(a[1]+b[1])/2,(a[2]+b[2])/2]);

const PHI=(1+Math.sqrt(5))/2;
let V=[[-1,PHI,0],[1,PHI,0],[-1,-PHI,0],[1,-PHI,0],[0,-1,PHI],[0,1,PHI],[0,-1,-PHI],[0,1,-PHI],[PHI,0,-1],[PHI,0,1],[-PHI,0,-1],[-PHI,0,1]].map(v=>nrm(v));
let F=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];

for(let it=0;it<2;it++){
  const nF=[],mc={};
  const gm=(i,j)=>{const k=Math.min(i,j)+'_'+Math.max(i,j);if(!(k in mc)){V.push(mdp(V[i],V[j]));mc[k]=V.length-1;}return mc[k];};
  F.forEach(([a,b,c])=>{const ab=gm(a,b),bc=gm(b,c),ca=gm(c,a);nF.push([a,ab,ca],[b,bc,ab],[c,ca,bc],[ab,bc,ca]);});
  F=nF;
}

const SP=SK.map((s,i)=>{
  const p=Math.acos(-1+(2*i)/SK.length),t=Math.sqrt(SK.length*Math.PI)*p;
  return{x:Math.sin(p)*Math.cos(t),y:Math.sin(p)*Math.sin(t),z:Math.cos(p),s};
});

let rX=0.42,rY=0.2,vX=0,vY=0,drag=false,lX=0,lY=0,auto=true;

const rv=(v,rx,ry)=>{let[x,y,z]=v;const y2=y*Math.cos(rx)-z*Math.sin(rx),z2=y*Math.sin(rx)+z*Math.cos(rx);return[x*Math.cos(ry)+z2*Math.sin(ry),y2,-x*Math.sin(ry)+z2*Math.cos(ry)];};
const pj=v=>{const[x,y,z]=rv(v,rX,rY),d=3.5,sc=d/(d-z);return{sx:cx+x*R*sc,sy:cy+y*R*sc,z,sc};};

const draw=()=>{
  g.clearRect(0,0,W,H);

  F.map(([a,b,c])=>{const ra=rv(V[a],rX,rY),rb=rv(V[b],rX,rY),rc=rv(V[c],rX,rY),dz=(ra[2]+rb[2]+rc[2])/3;return{pa:pj(V[a]),pb:pj(V[b]),pc:pj(V[c]),dz};})
  .sort((a,b)=>a.dz-b.dz)
  .forEach(({pa,pb,pc,dz})=>{
    const t=Math.max(0,(dz+1)/2);
    g.beginPath();g.moveTo(pa.sx,pa.sy);g.lineTo(pb.sx,pb.sy);g.lineTo(pc.sx,pc.sy);g.closePath();
    g.fillStyle=`rgba(20,14,50,${t*0.55})`;g.fill();
    g.strokeStyle=`rgba(127,119,221,${t*0.45})`;g.lineWidth=0.55;g.stroke();
  });

  const atm=g.createRadialGradient(cx,cy,R*0.72,cx,cy,R*1.22);
  atm.addColorStop(1,'rgba(127,119,221,0.18)');atm.addColorStop(0.78,'rgba(105,42,22,0.07)');atm.addColorStop(1,'rgba(155,58,30,0.24)');
  g.beginPath();g.arc(cx,cy,R*1.22,0,Math.PI*2);g.fillStyle=atm;g.fill();

  SP.map(p=>{const r=pj([p.x,p.y,p.z]);return{...r,s:p.s};}).sort((a,b)=>a.z-b.z).forEach(({sx,sy,z,sc,s})=>{
    const al=Math.max(0.1,Math.min(1,(z+1.6)/2.6));
    const isz=Math.max(14,sc*48);
    const im=IM[s.n],ok=im&&im.complete&&im.naturalWidth>0;

    if(z>0.12){g.save();g.globalAlpha=al*0.4;g.shadowColor=s.c;g.shadowBlur=18*sc;g.beginPath();g.arc(sx,sy-isz*0.6,isz*0.38,0,Math.PI*2);g.fillStyle=s.c+'15';g.fill();g.shadowBlur=0;g.restore();}

    g.save();g.globalAlpha=al;
    if(ok){if(z>0){g.shadowColor=s.c;g.shadowBlur=9*sc;}g.drawImage(im,sx-isz/2,sy-isz*1.1,isz,isz);g.shadowBlur=0;}
    else{g.beginPath();g.arc(sx,sy-isz*0.58,isz*0.44,0,Math.PI*2);g.fillStyle=s.c+'cc';g.fill();g.font=`bold ${Math.round(isz*0.38)}px monospace`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(s.n[0],sx,sy-isz*0.58);}
    g.restore();

    if(z>-0.32){const fs=Math.max(9,Math.round(sc*13));g.save();g.globalAlpha=al*0.92;g.font=`600 ${fs}px 'Segoe UI',sans-serif`;g.textAlign='center';g.textBaseline='top';g.shadowColor='rgba(0,0,0,0.95)';g.shadowBlur=5;g.fillStyle='#ffffff';g.fillText(s.n,sx,sy+isz*0.06);g.shadowBlur=0;g.restore();}
  });
};

const loop=()=>{
  if(!drag&&auto){rY+=0.0045;rX+=0.0005;}
  else if(!drag){rY+=vY;rX+=vX;vY*=0.94;vX*=0.94;if(Math.abs(vX)<0.0002&&Math.abs(vY)<0.0002)auto=true;}
  draw();requestAnimationFrame(loop);
};
loop();

const gp=e=>{const r=cv.getBoundingClientRect(),src=e.touches?e.touches[0]:e;return{mx:src.clientX-r.left,my:src.clientY-r.top};};
cv.addEventListener('mousedown',e=>{drag=true;auto=false;const{mx,my}=gp(e);lX=mx;lY=my;vX=vY=0;});
cv.addEventListener('touchstart',e=>{e.preventDefault();drag=true;auto=false;const{mx,my}=gp(e);lX=mx;lY=my;},{passive:false});
const onM=e=>{if(!drag)return;const{mx,my}=gp(e);vY=(mx-lX)*0.007;vX=(my-lY)*0.007;rY+=vY;rX+=vX;lX=mx;lY=my;};
cv.addEventListener('mousemove',onM);cv.addEventListener('touchmove',e=>{e.preventDefault();onM(e);},{passive:false});
const onU=()=>{drag=false;setTimeout(()=>{if(!drag)auto=true;},2200);};
cv.addEventListener('mouseup',onU);cv.addEventListener('touchend',onU);window.addEventListener('mouseup',onU);
})();