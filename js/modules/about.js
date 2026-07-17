export function initAboutMe() {

    const ABOUT_CARD_DATA = [
        {
            id: "card-philosophy",
            title: "Philosophy",
            iconName: "code",
            cardType: "paragraph",
            body: {
                text: "Leads with architecture — believes most bugs are design decisions that haven't been made yet.",
                tags: ["Systems", "Mentoring", "Clean Code"]
            }
        },
        {
            id: "card-tech",
            title: "Tech Stack",
            iconName: "terminal",
            cardType: "list",
            body: {
                description: "My daily drivers and editor preferences.",
                items: ["VS Code (Tokyo Night)", "Warp Terminal", "Figma", "Vim Motions"]
            }
        },
        {
            id: "card-top-books",
            title: "Top 3 Books",
            iconName: "book-open",
            cardType: "list",
            body: {
                description: "Books that completely shifted my perspective.",
                items: ["Atomic Habits", "1984 by George Orwell", "Sapiens"]
            }
        },
        {
            id: "card-workspace",
            title: "Workspace",
            iconName: "monitor",
            cardType: "list",
            body: {
                description: "Ergonomics and minimalism to stay in the zone.",
                items: ["M2 MacBook Pro 14\"", "Keychron Q1 Pro", "MX Master 3S"]
            }
        },
        {
            id: "card-currently",
            title: "Currently",
            iconName: "clock",
            cardType: "split",
            body: {
                data: [
                    { label: "READING", value: "The Pragmatic Programmer" },
                    { label: "FOCUS", value: "Building a personal portfolio" }
                ]
            }
        },
    ];

    // SVG ICON
    function getSVGIcon(name) {
        const icons = {
            'clock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
            'code': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
            'terminal': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
            'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
            'monitor': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        };
        return icons[name] || icons['clock'];
    }

} 
