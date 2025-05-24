const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Estrellas normales
const STAR_COUNT = 200;
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.3,
        speed: Math.random() * 0.2 + 0.05,
        alpha: Math.random() * 0.5 + 0.5
    });
}

// Estrellas fugaces
const SHOOTING_STAR_COUNT = 2;
const shootingStars = [];
function createShootingStar() {
    const y = Math.random() * window.innerHeight * 0.7;
    shootingStars.push({
        x: Math.random() * window.innerWidth * 0.7,
        y: y,
        len: Math.random() * 200 + 200,
        speed: Math.random() * 8 + 6,
        size: Math.random() * 2 + 1,
        life: 0,
        maxLife: Math.random() * 0.5 + 0.8,
        trail: []
    });
}
setInterval(() => {
    if (shootingStars.length < SHOOTING_STAR_COUNT) createShootingStar();
}, 1200);

function drawStars() {
    for (let star of stars) {
        ctx.save();
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Movimiento lento
        star.x += star.speed;
        if (star.x > window.innerWidth) star.x = 0;
    }
}

function drawShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let s = shootingStars[i];
        // Trail
        s.trail.unshift({x: s.x, y: s.y});
        if (s.trail.length > 30) s.trail.pop();

        // Dibuja la estela
        for (let j = 0; j < s.trail.length - 1; j++) {
            let t1 = s.trail[j];
            let t2 = s.trail[j + 1];
            ctx.save();
            ctx.strokeStyle = "rgba(0,255,128," + (1 - j / s.trail.length) + ")";
            ctx.lineWidth = s.size;
            ctx.beginPath();
            ctx.moveTo(t1.x, t1.y);
            ctx.lineTo(t2.x, t2.y);
            ctx.stroke();
            ctx.restore();
        }

        // Dibuja la estrella fugaz
        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#00ff80";
        ctx.shadowColor = "#00ff80";
        ctx.shadowBlur = 16;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();

        // Movimiento diagonal
        s.x += s.speed;
        s.y += s.speed * 0.3;
        s.life += 0.016;

        if (s.x > window.innerWidth + s.len || s.y > window.innerHeight + s.len || s.life > s.maxLife) {
            shootingStars.splice(i, 1);
        }
    }
}

function animate() {
    setCanvasSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawShootingStars();
    requestAnimationFrame(animate);
}
animate();
