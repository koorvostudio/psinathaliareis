const transitionDuration = 300
const transitionGap = 10

const transitionProps = (property = "all", duration = `${transitionDuration / 1000}s`, timingFunction = "ease", delay = "0s") =>
    `${property} ${duration} ${timingFunction} ${delay}`

const slideDown = (element, displayElement = "block") => {
    element.style.transition = "unset"
    element.style.display = displayElement

    let maxHeight = element.offsetHeight

    element.style.overflow = "hidden"
    element.style.maxHeight = 0
    element.style.marginTop = 0
    element.style.marginBottom = 0
    element.style.paddingTop = 0
    element.style.paddingBottom = 0
    element.style.borderTopWidth = 0
    element.style.borderBottomWidth = 0

    setTimeout(() => {
        element.style.transition = transitionProps()
        element.style.maxHeight = `${maxHeight}px`
        element.style.marginTop = ""
        element.style.marginBottom = ""
        element.style.paddingTop = ""
        element.style.paddingBottom = ""
        element.style.borderTopWidth = ""
        element.style.borderBottomWidth = ""

        setTimeout(() => {
            element.style.overflow = ""
            element.style.transition = ""
            element.style.maxHeight = ""
        }, transitionDuration - transitionGap)
    }, transitionGap)
}

const slideUp = (element, removeElement = false) => {
    element.style.maxHeight = `${element.offsetHeight}px`

    setTimeout(() => {
        element.style.transition = transitionProps()
        element.style.overflow = "hidden"
        element.style.maxHeight = 0
        element.style.marginTop = 0
        element.style.marginBottom = 0
        element.style.paddingTop = 0
        element.style.paddingBottom = 0
        element.style.borderTopWidth = 0
        element.style.borderBottomWidth = 0

        setTimeout(() => {
            element.style.display = "none"
            element.style.maxHeight = ""
            element.style.marginTop = ""
            element.style.marginBottom = ""
            element.style.paddingTop = ""
            element.style.paddingBottom = ""
            element.style.borderTopWidth = ""
            element.style.borderBottomWidth = ""
            element.style.overflow = ""
            element.style.transition = ""
            removeElement && element.remove()
        }, transitionDuration - transitionGap)
    }, transitionGap)
}

const setHeaderHeight = (header) => {
    const scrollValue = window.scrollY;

    // Usamos 100px em vez de 50px para dar uma margem de segurança
    if (scrollValue > 100) {
        header.classList.add('scrolling');
    } else if (scrollValue < 20) {
        // Só remove quando realmente voltar ao topo, evitando o "flicker" no meio
        header.classList.remove('scrolling');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.main-header');

    setHeaderHeight(navContainer); // Define a altura do header ao carregar a página

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna a classe tanto no menu quanto no próprio botão (para o X)
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (para navegar nas seções)
        const links = document.querySelectorAll('.nav-menu a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    window.addEventListener('scroll', () => setHeaderHeight(navContainer));

    // Efeitos de slide para a seção de Perguntas Frequentes
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-content');
        const icon = question.querySelector('.icon');

        question.addEventListener('click', () => {
            if (answer.style.display === 'block') {
                slideUp(answer);
                icon.classList.remove('spin');
            } else {
                slideDown(answer);
                icon.classList.add('spin');
            }
        });
    });

    // Comportamento do botão flutuante do WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-float');
    let scrollTimeout;
    let isMouseOver = false; // Flag para rastrear o mouse

    // Função para esconder o botão com segurança
    function hideButton() {
        if (!isMouseOver && window.scrollY > 300) {
            whatsappBtn.classList.remove('show');
        }
    }

    // 1. Lógica de Scroll
    window.addEventListener('scroll', () => {
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
    });

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

    // 4. Bônus: Reaparecer se o mouse chegar perto (Proximidade)
    document.addEventListener('mousemove', (e) => {
        const threshold = 150; // Distância em pixels para ativar
        const rect = whatsappBtn.getBoundingClientRect();

        // Calcula distância do mouse até o centro do botão
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;
        const distance = Math.hypot(e.clientX - buttonX, e.clientY - buttonY);

        if (distance < threshold && window.scrollY > 300) {
            whatsappBtn.classList.add('show');
            clearTimeout(scrollTimeout);
        }
    });

    const copyrightYearSpan = document.querySelector('.copyright-year');

    if (copyrightYearSpan) {
        const currentYear = new Date().getFullYear();
        copyrightYearSpan.textContent = currentYear;
    }
});