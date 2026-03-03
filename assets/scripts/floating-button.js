const whatsappBtn = document.querySelector('.th-whatsapp-float');
let scrollTimeout;
let isMouseOver = false;

/**
 * Função para esconder o botão com segurança, garantindo que ele não desapareça se o mouse estiver sobre ele
 */
const hideButton = () => {
    if (!isMouseOver && window.scrollY > 300) {
        whatsappBtn.classList.remove('show');
    }
}

/**
 * Função para controlar a visibilidade do botão flutuante do WhatsApp com base no scroll e na interação do mouse
 */
export const ShowOrHideWhatsAppButton = () => {
    if (window.scrollY > 300) {
        whatsappBtn.classList.add('show');

        // Reinicia o timer toda vez que rola
        clearTimeout(scrollTimeout);

        // Só agenda o sumiço se o mouse NÃO estiver em cima
        if (!isMouseOver) {
            scrollTimeout = setTimeout(hideButton, 3000);
        }
    } else {
        whatsappBtn.classList.remove('show');
    }
}

/**
 * Função para mostrar o botão do WhatsApp quando o mouse se aproxima
 * @param {number} positionX - Posição X do mouse
 * @param {number} positionY - Posição Y do mouse
 */
export const ShowOnApproachWhatsAppButton = (positionX, positionY) => {
    const threshold = 150; // Distância em pixels para ativar
    const rect = whatsappBtn.getBoundingClientRect();

    // Calcula distância do mouse até o centro do botão
    const buttonX = rect.left + rect.width / 2;
    const buttonY = rect.top + rect.height / 2;
    const distance = Math.hypot(positionX - buttonX, positionY - buttonY);

    if (distance < threshold && window.scrollY > 300) {
        whatsappBtn.classList.add('show');
        clearTimeout(scrollTimeout);
    }
}

/**
 * Função para controlar a interação do mouse com o botão flutuante do WhatsApp, garantindo que ele permaneça visível enquanto o mouse estiver sobre ele
 */
export const FloatingWhatsAppButton = () => {
    // 2. Interação de Mouse: Manter visível no Hover
    whatsappBtn.addEventListener('mouseenter', () => {
        isMouseOver = true;
        clearTimeout(scrollTimeout); // Cancela qualquer agendamento de sumiço
        whatsappBtn.classList.add('show');
    });

    // 3. Interação de Mouse: Voltar a contar tempo ao sair
    whatsappBtn.addEventListener('mouseleave', () => {
        isMouseOver = false;
        // Quando o mouse sai, damos mais 2 segundos antes de esconder
        scrollTimeout = setTimeout(hideButton, 2000);
    });
}