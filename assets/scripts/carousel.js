
const track = document.querySelector('.j_carousel_track');
let isPaused = false;

/**
 * Função para criar um carrossel infinito com clonagem dinâmica e controle de velocidade
 */
export const Carousel = () => {

    // 1. Clonagem dinâmica para garantir o loop infinito
    const initialItems = track.innerHTML;
    track.innerHTML += initialItems; // Duplica os projetos

    let scrollAmount = 0;
    const speed = 0.6; // Velocidade constante e elegante

    function animateCarousel() {
        if (!isPaused) {
            scrollAmount -= speed;

            // 2. Cálculo de reset: quando a primeira metade sai da tela
            // O scrollWidth / 2 é exatamente onde a cópia começa
            if (Math.abs(scrollAmount) >= track.scrollWidth / 2) {
                scrollAmount = 0;
            }

            track.style.transform = `translateX(${scrollAmount}px)`;
        }
        requestAnimationFrame(animateCarousel);
    }

    // Interatividade: para ao passar o mouse para facilitar o clique na modal
    track.addEventListener('mouseenter', () => isPaused = true);
    track.addEventListener('mouseleave', () => isPaused = false);

    // Inicia o motor
    requestAnimationFrame(animateCarousel);
}