export function initAboutMe() {
    const ABOUT_CARD_DATA = [
        {
            id: "card-philosophy",
            title: "Philosophy",
            iconName: "code",
            cardType: "paragraph",
            body: {
                text: "Leads with architecture — believes most bugs are design decisions that haven't been made yet.",
                tags: ["Systems", "Mentoring", "Clean Code"],
            },
        },
        {
            id: "card-tech",
            title: "Tech Stack",
            iconName: "terminal",
            cardType: "list",
            body: {
                description: "My daily drivers and editor preferences.",
                items: [
                    "VS Code (Tokyo Night)",
                    "Warp Terminal",
                    "Figma",
                    "Vim Motions",
                ],
            },
        },
        {
            id: "card-top-books",
            title: "Top 3 Books",
            iconName: "book-open",
            cardType: "list",
            body: {
                description: "Books that completely shifted my perspective.",
                items: ["Atomic Habits", "1984 by George Orwell", "Sapiens"],
            },
        },
        {
            id: "card-workspace",
            title: "Workspace",
            iconName: "monitor",
            cardType: "list",
            body: {
                description: "Ergonomics and minimalism to stay in the zone.",
                items: ['M2 MacBook Pro 14"', "Keychron Q1 Pro", "MX Master 3S"],
            },
        },
        {
            id: "card-currently",
            title: "Currently",
            iconName: "clock",
            cardType: "split",
            body: {
                data: [
                    { label: "READING", value: "The Pragmatic Programmer" },
                    { label: "FOCUS", value: "Building a personal portfolio" },
                ],
            },
        },
    ];

    // SVG ICON
    function getSVGIcon(name) {
        const icons = {
            clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
            code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
            terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
            "book-open": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
            monitor: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        };
        return icons[name] || icons["clock"];
    }

    // Generate the back of the card html
    function getCardBackHTML(card) {
        if (card.cardType === "split") {
            return card.body.data
                .map(
                    (item) => `
            <div class="about-card__status-row">
                <span class="about-card__status-label">${item.label}</span>
                <span class="about-card__status-value">${item.value}</span>
            </div>
        `,
                )
                .join("");
        } else if (card.cardType === "paragraph") {
            const tagsHTML = card.body.tags
                ? `<div class="about-card__tags">${card.body.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>`
                : "";
            return `
            <p class="about-card__back-text">${card.body.text}</p>
            ${tagsHTML}
        `;
        } else if (card.cardType === "list") {
            return `
            <p class="about-card__back-text" style="margin-bottom: 0.2rem;">${card.body.description}</p>
            <ul class="about-card__list">
                ${card.body.items.map((item) => `<li>${item}</li>`).join("")}
            </ul>
        `;
        }
    }

    // Rendering Cards
    const deckEl = document.getElementById("deck");

    function initCards() {
        deckEl.innerHTML = "";
        const totalCards = ABOUT_CARD_DATA.length;

        ABOUT_CARD_DATA.forEach((card, index) => {
            const cardEl = document.createElement("div");
            cardEl.classList.add("about-card");
            cardEl.dataset.cardId = card.id;

            cardEl.innerHTML = `
                <div class="about-card__inner">
                    <div class="about-card__face about-card__face--front">
                        <span class="about-card__icon ${card.iconName === "clock" ? "about-card__icon--pulse" : ""}">
                            ${getSVGIcon(card.iconName)}
                        </span>
                        <span class="about-card__label">${card.title}</span>
                    </div>
                    <div class="about-card__face about-card__face--back">
                        ${getCardBackHTML(card)}
                    </div>
                </div>
            `;

            const centerIndex = (totalCards - 1) / 2;
            const offset = index - centerIndex;
            const normalized = offset / centerIndex;

            const restRot = Math.random() * 8 - 4 + "deg";
            const restX = Math.random() * 10 - 5 + "px";
            const restY = Math.random() * 10 - 5 + "px";

            const maxSpreadX = window.innerWidth < 760 ? 100 : 250;
            const spreadX = normalized * maxSpreadX + "px";

            const spreadY = Math.abs(normalized) * 40 + "px";

            const spreadRot = normalized * 25 + "deg";

            cardEl.style.setProperty("--card-index", index);
            cardEl.style.setProperty("--rest-x", restX);
            cardEl.style.setProperty("--rest-y", restY);
            cardEl.style.setProperty("--rest-rot", restRot);
            cardEl.style.setProperty("--spread-x", spreadX);
            cardEl.style.setProperty("--spread-y", spreadY);
            cardEl.style.setProperty("--spread-rot", spreadRot);

            deckEl.appendChild(cardEl);
        });

        bindEvents();
    }

    function bindEvents() {
        const cardEls = document.querySelectorAll('.about-card');

        deckEl.addEventListener('mouseenter', () => {
            deckEl.classList.add('is-spread');
        });

        deckEl.addEventListener('mouseleave', () => {
            deckEl.classList.remove('is-spread');

            cardEls.forEach(c => c.classList.remove('is-flipped'));
        });

        cardEls.forEach((card) => {
            card.addEventListener('click', () => {
                const isCurrentlyFlipped = card.classList.contains('is-flipped');

                cardEls.forEach(c => c.classList.remove('is-flipped'));

                if (!isCurrentlyFlipped) {
                    card.classList.add('is-flipped');
                }
            });
        });
    }
    initCards();

    window.addEventListener('resize', () => {
        initCards();
    });
}
