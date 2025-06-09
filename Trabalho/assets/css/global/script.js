const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("expandido");
    } else {
        header.classList.remove("expandido");
        console.log("Voltou ao normal.");
    }

});





const container = document.querySelector('.carousel-snap-container');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const cards = document.querySelectorAll('.card');

let index = 0;
const cardWidth = cards[0].offsetWidth + 10; // largura real do card + espaçamento
const maxIndex = cards.length - 1; // Último índice válido

function updateScroll() {
    container.style.transform = `translateX(-${index * cardWidth}px)`;
    container.style.transition = "transform 0.5s ease-in-out"; // Animação suave
}

// Próximo card
btnNext.addEventListener('click', () => {
    if (index < maxIndex) {
        index++;
    } else {
        index = maxIndex; // Impede que passe do último card
    }
    updateScroll();
});

// Card anterior
btnPrev.addEventListener('click', () => {
    if (index > 0) {
        index--;
    } else {
        index = 0; // Impede que vá além do primeiro card
    }
    updateScroll();
});

// Scroll automático com limite no último card
setInterval(() => {
    if (index < maxIndex) {
        index++;
    } else {
        index = 0; // Retorna ao início
    }
    updateScroll();
}, 3000);
