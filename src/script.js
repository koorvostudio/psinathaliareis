const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animação opcional do ícone hambúrguer (X)
    const bars = document.querySelectorAll('.bar');
    bars[0].classList.toggle('rotate-down');
    bars[1].classList.toggle('fade-out');
    bars[2].classList.toggle('rotate-up');
});