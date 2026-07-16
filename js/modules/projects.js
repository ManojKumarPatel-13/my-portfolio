export function initProjects() {
    const projectData = [
        {
            projectId: 1,
            projectTitle: "StudentOS",
            projectDescription: "An all-in-one productivity dashboard for students featuring assignment tracking, note-taking, and automated schedule organization.",
            projectImgSrc: "../../assets/signature.png",
            tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 2,
            projectTitle: "Weather Dashboard",
            projectDescription: "A sleek, minimalist weather application providing real-time forecasts, air quality indices, and interactive radar charts.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 3,
            projectTitle: "To-do App",
            projectDescription: "A high-performance task manager utilizing drag-and-drop mechanics, keyboard shortcuts, and local storage persistence.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["JavaScript", "HTML5 Canvas", "Framer Motion", "Tailwind"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 4,
            projectTitle: "Img Editor",
            projectDescription: "A browser-based canvas editor allowing users to apply custom filters, crop dimensions, and adjust image matrices in real-time.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["TypeScript", "WebGL", "React Canvas", "Tailwind"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 5,
            projectTitle: "Tech Terminal",
            projectDescription: "A lightning-fast tech news reader featuring infinite scroll, dynamic layout caching, and customizable RSS feed integration.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["React", "React Query", "Node.js", "Express"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 6,
            projectTitle: "Linear Clone",
            projectDescription: "A meticulous front-end clone of the Linear issue tracker, focusing heavily on keyboard navigation and sub-millisecond page transitions.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["Next.js", "Zustand", "Tailwind CSS", "Shadcn UI"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
        },
        {
            projectId: 7,
            projectTitle: "Vue Framework Simple Clone",
            projectDescription: "A lightweight, custom JavaScript reactivity engine designed from scratch to mimic Vue's core virtual DOM patching algorithm.",
            projectImgSrc: "../../assets/paper-texture.jpg",
            tags: ["Vanilla JS", "HTML5", "Vite", "Vitest"],
            liveLink: "https://vercel.app",
            githubLink: "https://github.com"
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
