export function initProjects() {
    const projectData = [
        {
            projectId: 1,
            projectTitle: "StudentOS",
            projectDescription: "A collaborative, all-in-one workspace for students engineered in 15 days under extreme pressure for the Google Solution Challenge.",
            projectImgSrc: "../../assets/studentos.png",
            tags: ["Next.js", "Tailwind CSS", "Firebase", "Gemini API"],
            liveLink: "https://student-os-khaki.vercel.app/",
            githubLink: "https://github.com/ManojKumarPatel-13/StudentOS"
        },
        {
            projectId: 2,
            projectTitle: "VueFramework-Clone",
            projectDescription: "A custom vanilla JavaScript reconstruction of Vue.js internals, featuring an HTML template compiler, proxy-driven reactivity observer, and batched update scheduler.",
            projectImgSrc: "../../assets/vue-clone.png",
            tags: ["Vanilla JS", "Virtual DOM", "Compiler Logic", "HTML5"],
            liveLink: "https://manojkumarpatel-13.github.io/VueFramework-Clone/",
            githubLink: "https://github.com/ManojKumarPatel-13/VueFramework-Clone"
        },
        {
            projectId: 3,
            projectTitle: "Parallel-Image-Processor",
            projectDescription: "A hardware-accelerated, multi-threaded web image editor leveraging Web Workers for parallel multi-core CPU processing and custom blur filter matrices.",
            projectImgSrc: "../../assets/image-processor.png",
            tags: ["JavaScript", "Web Workers", "Canvas API", "HTML5"],
            liveLink: "https://manojkumarpatel-13.github.io/Parallel-Image-Processor/",
            githubLink: "https://github.com/ManojKumarPatel-13/Parallel-Image-Processor"
        },
        {
            projectId: 4,
            projectTitle: "TechTerminal-Portal",
            projectDescription: "A tech aggregate portal powered by a decoupled asynchronous Event Bus architecture, featuring real-time news streams and technical content engines.",
            projectImgSrc: "../../assets/tech-terminal.png",
            tags: ["JavaScript", "Event Bus", "REST APIs", "CSS3"],
            liveLink: "https://manojkumarpatel-13.github.io/TechTerminal-Portal/",
            githubLink: "https://github.com/ManojKumarPatel-13/TechTerminal-Portal"
        },
        {
            projectId: 5,
            projectTitle: "Focus Premium Task Manager",
            projectDescription: "A sleek, dark-themed Kanban workspace featuring live search, card operations, and a modular architecture built for deep-dive task analytics.",
            projectImgSrc: "../../assets/task-manager.png",
            tags: ["JavaScript", "CSS Grid", "DOM Architecture", "Local Storage"],
            liveLink: "https://manojkumarpatel-13.github.io/focus-premium-task-manager/",
            githubLink: "https://github.com/ManojKumarPatel-13/focus-premium-task-manager"
        },
        {
            projectId: 6,
            projectTitle: "Aerosky Weather Dashboard",
            projectDescription: "A real-time weather analytics dashboard utilizing Open-Meteo APIs to demonstrate asynchronous DOM lifecycle handling and reactive data rendering.",
            projectImgSrc: "../../assets/weather-dashboard.png",
            tags: ["JavaScript", "Open-Meteo API", "Async/Await", "Flexbox"],
            liveLink: "https://manojkumarpatel-13.github.io/aerosky-weather-dashboard/",
            githubLink: "https://github.com/ManojKumarPatel-13/aerosky-weather-dashboard "
        },
        {
            projectId: 7,
            projectTitle: "Linear Clone",
            projectDescription: "A precision frontend clone of Linear's highly complex interface, built entirely from scratch to master advanced CSS layouts and pixel-perfect UI design.",
            projectImgSrc: "../../assets/linear-clone.png",
            tags: ["HTML5", "Advanced CSS", "UI/UX", "Vanilla JS"],
            liveLink: "https://manojkumarpatel-13.github.io/Linear-Clone/",
            githubLink: "https://github.com/ManojKumarPatel-13/Linear-Clone"
        }
    ];

    let currentIndex = 0;

    const cardsViewport = document.querySelector(".project__cards");
    const prevBtn = document.getElementById("prev-project-btn");
    const nextBtn = document.getElementById("next-project-btn");
    const indexCounter = document.getElementById("current-project-index");
    const totalCounter = document.getElementById("total-projects-count");

    if (totalCounter) {
        totalCounter.textContent = String(projectData.length).padStart(2, "0");
    }

    const track = document.createElement("div");
    track.className = "projects__track";
    cardsViewport.appendChild(track);

    projectData.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
            <div class="project-card__img-wrap">
                <img src="${project.projectImgSrc}" alt="${project.projectTitle}" class="project-card__img" loading="lazy">
            </div>
            <div class="project-card__content">
                <h3 class="project-card__title">${project.projectTitle}</h3>
                <p class="project-card__desc">${project.projectDescription}</p>
                <div class="project-card__tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join("")}
                </div>
                <div class="project-card__actions">
                    <a href="${project.liveLink}" target="_blank" rel="noopener" class="project-btn project-btn--primary">Live Link</a>
                    <a href="${project.githubLink}" target="_blank" rel="noopener" class="project-btn project-btn--secondary">View Code</a>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    const cards = track.querySelectorAll(".project-card");

    function updateCarousel() {
        cards.forEach((card, idx) => {
            card.classList.remove("is-active");
            if (idx === currentIndex) {
                card.classList.add("is-active");
            }
        });

        if (indexCounter) {
            indexCounter.textContent = String(currentIndex + 1).padStart(2, "0");
        }

        const viewportWidth = cardsViewport.offsetWidth;
        const activeCard = cards[currentIndex];
        const cardWidth = activeCard.offsetWidth;

        const centerOffset = (viewportWidth / 2) - (cardWidth / 2);
        const cardPositionLeft = activeCard.offsetLeft;
        const transformValue = centerOffset - cardPositionLeft;

        track.style.transform = `translateX(${transformValue}px)`;
    }

    function navigateTo(direction) {
        if (direction === "next") {
            currentIndex = (currentIndex + 1) % projectData.length;
        } else {
            currentIndex = (currentIndex - 1 + projectData.length) % projectData.length;
        }
        updateCarousel();
    }

    prevBtn.addEventListener("click", () => navigateTo("prev"));
    nextBtn.addEventListener("click", () => navigateTo("next"));

    window.addEventListener("keydown", (e) => {
        if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;

        if (e.key === "ArrowLeft") navigateTo("prev");
        if (e.key === "ArrowRight") navigateTo("next");
    });

    let startX = 0;
    let isSwiping = false;

    cardsViewport.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: true });

    cardsViewport.addEventListener("touchend", (e) => {
        if (!isSwiping) return;
        const endX = e.changedTouches[0].clientX;
        const distanceDelta = startX - endX;

        if (Math.abs(distanceDelta) > 60) {
            navigateTo(distanceDelta > 0 ? "next" : "prev");
        }
        isSwiping = false;
    }, { passive: true });

    window.addEventListener("resize", updateCarousel);

    updateCarousel();
}
