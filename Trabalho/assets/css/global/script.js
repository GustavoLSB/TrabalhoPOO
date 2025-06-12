//BARRA EXPANDIDA


const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("expandido");
    } else {
        header.classList.remove("expandido");
        console.log("Voltou ao normal.");
    }

});






//ALTERAR PREÇO








//CARROUSEL CARDS

const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');

const cardWidth = 410; // largura do card + margin
const visibleCards = 5;
const originalCards = Array.from(track.children).filter(c => !c.classList.contains('clone'));

// Clona cards para loop infinito
originalCards.forEach(card => {
    const cloneStart = card.cloneNode(true);
    cloneStart.classList.add('clone');
    track.appendChild(cloneStart);
});
originalCards.forEach(card => {
    const cloneEnd = card.cloneNode(true);
    cloneEnd.classList.add('clone');
    track.insertBefore(cloneEnd, track.firstChild);
});

const totalCards = track.children.length;
const realStartIndex = 0; // índice do primeiro card real
const realEndIndex = realStartIndex + 4; // índice do último card real

let currentIndex = realStartIndex;
let transitioning = false;

// Define posição inicial para o primeiro card real
track.style.transition = 'none';
track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;

function moveTo(index, smooth = true) {
    if (transitioning) return;
    transitioning = true;

    track.style.transition = smooth ? 'transform 0.5s ease' : 'none';
    track.style.transform = `translateX(-${cardWidth * index}px)`;

    setTimeout(() => {
        if (index > realEndIndex) {
            // Passou do último card real, "teletransporte" para o primeiro real
            currentIndex = realStartIndex;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
        } else if (index < realStartIndex) {
            // Passou do primeiro card real para trás, teletransporte para o último real
            currentIndex = realEndIndex;
            track.style.transition = 'none';
            track.style.transform = `translateX(-${cardWidth * currentIndex}px)`;
        } else {
            currentIndex = index;
        }

        transitioning = false;
    }, 500);
}

function nextSlide() {
    moveTo(currentIndex + 1);
}

function prevSlide() {
    moveTo(currentIndex - 1);
}

let autoSlideTimeout;

function startAutoSlide() {
    autoSlideTimeout = setTimeout(function slide() {
        nextSlide();
        autoSlideTimeout = setTimeout(slide, 4000);
    }, 4000);
}

function stopAutoSlide() {
    clearTimeout(autoSlideTimeout);
}

nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    setTimeout(startAutoSlide, 4000);
});

prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    setTimeout(startAutoSlide, 4000);
});

document.querySelector('.carousel-wrapper').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.carousel-wrapper').addEventListener('mouseleave', () => {
    setTimeout(startAutoSlide, 4000);
});

window.addEventListener('load', () => {
    startAutoSlide();
});
