import { toggleModalScroll } from "./modal-scroll-behavior.js";

const menuIcon = document.querySelector('.j_menu_icon');
const menuOverlay = document.querySelector('.j_menu_overlay');
const menu = document.querySelector('.j_menu');
const menuItems = [document.querySelector(".j_logo"), ...menu.querySelectorAll('.j_menu_item')];

/**
 * Função para controle do menu mobile, incluindo abertura, fechamento e comportamento de scroll
 */
export const MobileMenu = () => {
    menuIcon.addEventListener('click', () => {
        menu.classList.toggle('menu-open');
        toggleModalScroll(menu.classList.contains('menu-open'));
    });

    menuOverlay.addEventListener('click', ({ target }) => {
        if (menu.classList.contains('menu-open') && target.classList.contains('j_close')) {
            menu.classList.remove('menu-open');
            toggleModalScroll(false);
        }
    });

    menuOverlay.addEventListener('touchmove', function (e) {
        // Se a modal não tiver scroll interno, bloqueia tudo
        if (this.scrollHeight <= this.clientHeight) {
            e.preventDefault();
        }
    }, { passive: false });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('menu-open');
            toggleModalScroll(false);
        });
    });
}