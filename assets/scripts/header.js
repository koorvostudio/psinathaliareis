const header = document.querySelector('.j_header');

/**
 * Função para adicionar ou remover a classe de scroll no header com base na posição do scroll
 */
export const Header = () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolling');
    } else {
        header.classList.remove('scrolling');
    }
}