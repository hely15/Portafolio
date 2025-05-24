const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const slideCount = slides.length;

// Duplica los slides para efecto infinito
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
});

let position = 0;
const speed = 1.2; // píxeles por frame

function animateCarousel() {
    position -= speed;
    // Ancho total de los slides originales
    const totalWidth = slides.reduce((acc, slide) => acc + slide.offsetWidth, 0);
    if (Math.abs(position) >= totalWidth) {
        position = 0;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animateCarousel);
}

animateCarousel();
