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

const skills = [
  { name: 'Python',     color: '#3572A5', icon: '🐍' },
  { name: 'JavaScript', color: '#f7df1e', icon: '⚡' },
  { name: 'HTML5',      color: '#e34c26', icon: '🌐' },
  { name: 'CSS3',       color: '#1572b6', icon: '🎨' },
  { name: 'React',      color: '#61DAFB', icon: '⚛' },
  { name: 'Node.js',    color: '#68A063', icon: '🟢' },
  { name: 'Git',        color: '#f05032', icon: '🔀' },
  { name: 'VS Code',    color: '#007acc', icon: '💻' },
  { name: 'Figma',      color: '#a259ff', icon: '🎭' },
  { name: 'MySQL',      color: '#00758f', icon: '🗄' },
  { name: 'C++',        color: '#f34b7d', icon: '⚙' },
  { name: 'TypeScript', color: '#3178c6', icon: '📘' },
  { name: 'Linux',      color: '#fcc624', icon: '🐧' },
  { name: 'REST APIs',  color: '#7F77DD', icon: '🔌' },
];

let sW, sH, sCx, sCy, sR;

function sResize() {
  const wrap = skillsCanvas.parentElement;
  sW = skillsCanvas.width = wrap.clientWidth;
  sH = skillsCanvas.height = wrap.clientHeight;
  sCx = sW / 2; sCy = sH / 2;
  sR = Math.min(sW, sH) * 0.28;
}
sResize();
window.addEventListener('resize', sResize);

const sPts = skills.map((s, i) => {
  const phi = Math.acos(-1 + (2 * i) / skills.length);
  const theta = Math.sqrt(skills.length * Math.PI) * phi;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.sin(phi) * Math.sin(theta),
    z: Math.cos(phi),
    skill: s
  };
});

let sRotX = 0.3, sRotY = 0;
let sVelX = 0, sVelY = 0;
let sDragging = false;
let sLastMX = 0, sLastMY = 0;
let sAutoRotate = true;

function sRotatePoint(p) {
  let { x, y, z } = p;
  let y2 = y * Math.cos(sRotX) - z * Math.sin(sRotX);
  let z2 = y * Math.sin(sRotX) + z * Math.cos(sRotX);
  let x2 = x * Math.cos(sRotY) + z2 * Math.sin(sRotY);
  let z3 = -x * Math.sin(sRotY) + z2 * Math.cos(sRotY);
  return { x: x2, y: y2, z: z3 };
}

function sGetScreenPos(p) {
  const r = sRotatePoint(p);
  const perspective = 2.4;
  const scale = perspective / (perspective + r.z + 1);
  return {
    sx: sCx + r.x * sR * scale,
    sy: sCy + r.y * sR * scale,
    depth: r.z,
    scale
  };
}