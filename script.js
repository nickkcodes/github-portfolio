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