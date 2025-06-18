const projects = [
    {
        title: "Space Invaders:",
        image: "spaceinvaders",
        description: `
            <div class="project-content active">
                <h3 class="text-xl font-semibold text-cyan-400 mb-3">Una recreación del Juego Space Invaders</h3>
                <p class="mb-4">Una recreación del Juego Space Invaders con estetica vhs y funciones mas modernas</p>
                <div class="mb-4">
                    <h4 class="font-semibold text-gray-200 mb-2">Contiene:</h4>
                    <ul class="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Multijugador Local</li>
                        <li>Single-Player</li>
                        <li>Pantalla de Inicio con gameplay falso de fondo</li>
                        <li>Introducción con Creditos</li>
                    </ul>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs">Python</span>
                    <span class="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs">Aseprite</span>
                </div>
                <a href="https://github.com/ThiagoCollante/SpaceInvaders/tree/main/Space%20Invaders1" target='_blank' class="text-cyan-400 hover:underline text-sm">Descargar Proyecto →</a>
            </div>
        `
    },
    {
        title: "Portfolio:",
        image: "portfolio",
        description: `
            <div class="project-content active">
                <h3 class="text-xl font-semibold text-cyan-400 mb-3">Portfolio</h3>
                <p class="mb-4">Una pagina de presentación en la que muestro mis proyectos, habilidades y como contactarme.</p>
                <div class="mb-4">
                    <h4 class="font-semibold text-gray-200 mb-2">Contiene:</h4>
                    <ul class="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Descripción personal</li>
                        <li>Proyectos descargables</li>
                        <li>Fondo animado</li>
                        <li>Estetica espacial</li>
                    </ul>
                </div>
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs">Html</span>
                    <span class="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs">Css</span>
                    <span class="bg-gray-700 text-blue-300 px-2 py-1 rounded-full text-xs">Aseprite</span>
                </div>
                <a href="https://github.com/ThiagoCollante/Portfolio" target='_blank' class="text-cyan-400 hover:underline text-sm">Descargar Proyecto →</a>
            </div>
        `
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const stars = document.querySelectorAll('.star-item, .orbit-star');
    const bigImageContainer = document.getElementById('big-image-container');
    const bigImage = document.getElementById('big-image');
    const rightTextContainer = document.getElementById('right-text-container');
    const rightTextTitle = document.getElementById('right-text-title');
    const rightTextBody = document.getElementById('right-text-body');
    const rightTextClose = document.getElementById('right-text-close');
    const projectNavigation = document.getElementById('project-navigation');
    const prevProjectBtn = document.getElementById('prev-project');
    const nextProjectBtn = document.getElementById('next-project');
    const projectDots = document.querySelectorAll('.project-dot');

    let currentProject = 0;
    let isProjectsOpen = false;

    const updateProject = (index) => {
        currentProject = index;
        const project = projects[currentProject];

        bigImage.src = `assets/${project.image}.png`;
        bigImage.onerror = function() {
            this.onerror = null;
            this.src = `https://placehold.co/400x400/111827/06b6d4?text=${project.title}`;
        };

        const currentContent = rightTextBody.querySelector('.project-content');
        if (currentContent) {
            currentContent.classList.remove('active');
            setTimeout(() => {
                rightTextBody.innerHTML = project.description;
                setTimeout(() => {
                    const newContent = rightTextBody.querySelector('.project-content');
                    if (newContent) newContent.classList.add('active');
                }, 50);
            }, 200);
        } else {
            rightTextBody.innerHTML = project.description;
        }

        projectDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentProject);
        });
        
        prevProjectBtn.disabled = currentProject === 0;
        nextProjectBtn.disabled = currentProject === projects.length - 1;
    };

    const showContent = (title, content, imageName, type) => {
        if (type === 'projects') {
            isProjectsOpen = true;
            projectNavigation.style.display = 'flex';
            rightTextTitle.textContent = 'Mis Proyectos';
            updateProject(0);
        } else {
            isProjectsOpen = false;
            projectNavigation.style.display = 'none';
            rightTextTitle.textContent = title;
            rightTextBody.innerHTML = content;

            bigImage.src = `assets/${imageName}.png`;
            bigImage.onerror = function() {
                this.onerror = null;
                this.src = 'https://placehold.co/400x400/111827/a78bfa?text=Big+Image';
            };
        }
        
        bigImageContainer.classList.add('active');
        rightTextContainer.classList.add('active');
    };

    const hideContent = () => {
        bigImageContainer.classList.remove('active');
        rightTextContainer.classList.remove('active');
        projectNavigation.style.display = 'none';
        isProjectsOpen = false;
    };

    const openModal = (title, content, imageName, type) => {
        if (imageName) {
            showContent(title, content, imageName, type);
        } else {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.classList.remove('modal-hidden');
        }
    };

    const closeModal = () => {
        modal.classList.add('modal-hidden');
        hideContent();
    };

    prevProjectBtn.addEventListener('click', () => {
        if (currentProject > 0) {
            updateProject(currentProject - 1);
        }
    });

    nextProjectBtn.addEventListener('click', () => {
        if (currentProject < projects.length - 1) {
            updateProject(currentProject + 1);
        }
    });

    projectDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateProject(index);
        });
    });

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const title = star.dataset.title;
            const content = star.dataset.content;
            const imageName = star.dataset.image;
            const type = star.dataset.type;
            openModal(title, content, imageName, type);
        });
    });

    modalClose.addEventListener('click', closeModal);

    rightTextClose.addEventListener('click', hideContent);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    bigImageContainer.addEventListener('click', (e) => {
        if (e.target === bigImageContainer) {
            hideContent();
        }
    });

    rightTextContainer.addEventListener('click', (e) => {
        if (e.target === rightTextContainer) {
            hideContent();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") {
            if (!modal.classList.contains('modal-hidden')) {
                closeModal();
            } else if (rightTextContainer.classList.contains('active')) {
                hideContent();
            }
        }

        if (isProjectsOpen) {
            if (e.key === "ArrowLeft" && currentProject > 0) {
                updateProject(currentProject - 1);
            } else if (e.key === "ArrowRight" && currentProject < projects.length - 1) {
                updateProject(currentProject + 1);
            }
        }
    });
});