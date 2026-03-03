const copyrightYear = document.querySelector('.j_copyright_year');

/**
 * Função para atualizar o ano no rodapé automaticamente
 */
export const UpdateCopyrightYear = () => {
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
}