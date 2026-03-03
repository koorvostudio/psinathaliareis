import { Modal } from "./modal.js";
import { projects } from "./portfolio.js";

const projectTriggers = () => document.querySelectorAll('.j_case_study');

/**
 * Conteúdo HTML para a modal de estudo de caso, gerado dinamicamente com base no projeto selecionado
 * @param {{id: number, name: string, description: string, image: string, details: string, url: string}} project - Objeto contendo as informações do projeto para preencher a modal
 * @returns {string} HTML string para o conteúdo da modal de estudo de caso
 */
const caseStudyContainer = (project) => {
    return `
        <div class="th-case-study">
            <div class="th-case-study__image">
                <a href="${project.url}" target="_blank" title="Visitar site">
                    <img src="/assets/images/${project.image}" alt="${project.name} - ${project.description}">
                </a>
            </div>

            <div class="th-case-study__info">
                <div class="th-case-study__details">
                    <h2 class="th-case-study__title">${project.name}</h2>
                    <div class="th-case-study__description">
                        ${project.details}
                    </div>
                </div>
                <div class="th-case-study__action">
                    <a href="${project.url}" target="_blank" class="th-button">Visitar Site</a>
                </div>
            </div>
        </div>
    `;
}

/**
 * Função para abrir modal de estudo de caso ao clicar em um projeto
 */
export const CaseStudy = () => {
    projectTriggers().forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = parseInt(trigger.dataset.id); // Supondo que cada trigger tenha um data-id correspondente ao projeto
            const project = projects.find(p => p.id === projectId); // Busca o projeto pelo ID

            if (project) {
                const content = caseStudyContainer(project);
                Modal(content, true, true);
            }
        });
    });
}