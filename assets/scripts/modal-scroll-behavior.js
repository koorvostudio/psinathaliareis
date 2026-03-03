const body = document.body;

/**
 * Função para controlar o scroll do body quando a modal estiver aberta
 * @param {boolean} isOpen - Indica se a modal está aberta ou fechada
 */
export const toggleModalScroll = (isOpen) => {
    if (isOpen) {
        // 1. Calcula a largura da scrollbar para evitar saltos de layout
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

        // 2. Trava o scroll
        body.classList.add('no-scroll');
    } else {
        // 3. Libera o scroll
        body.classList.remove('no-scroll');
        body.style.removeProperty('--scrollbar-width');
    }
}