export function initTimeline() {

    //  Place holder data
    const CHAPTERS = [
        {
            number: "01",
            tag: "Origins",
            title: "Where It Started",
            body: "EDIT: The first lines of code, the first real bug, the first time something actually worked.",
            skills: ["HTML", "CSS", "Curiosity"],
        },
        {
            number: "02",
            tag: "First Steps",
            title: "Learning to Build",
            body: "EDIT: The jump from tutorials to actually building something of your own.",
            skills: ["JavaScript", "Git", "Debugging"],
        },
        {
            number: "03",
            tag: "Breaking Things",
            title: "The Backend Rabbit Hole",
            body: "EDIT: Where server-side logic entered the picture.",
            skills: ["Node.js", "Express", "APIs"],
        },
        {
            number: "04",
            tag: "Structure",
            title: "Thinking in Systems",
            body: "EDIT: The shift from writing code that works to writing code that scales.",
            skills: ["Databases", "Architecture", "Design Patterns"],
        },
        {
            number: "05",
            tag: "Leadership",
            title: "Becoming a Technical Lead",
            body: "EDIT: The moment responsibility shifted from just your own code to guiding a team\u2019s.",
            skills: ["Mentorship", "Code Review", "Communication"],
        },
        {
            number: "06",
            tag: "Craft",
            title: "Where Reading Meets Code",
            body: "EDIT: How the literary side started shaping the engineering side.",
            extraContent: [
                "EDIT: Where things stand today, and what you\u2019re actively building toward.",
            ],
            skills: ["Technical Writing", "Refactoring", "Clarity"],
        },
        {
            number: "07",
            tag: "Now",
            title: "What\u2019s Next",
            body: "EDIT: Where things stand today, and what you\u2019re actively building toward.",
            skills: ["AI Workflows", "Python", "Growth"],
        },
    ];

    const CHAPTER_START_INDEX = {};

    function buildInsidePages() {
        const pages = [];
        pages.push({ type: "endpaper" });
        pages.push({ type: "title-page" });
        pages.push({ type: "toc" });
        pages.push({ type: "preface" });

        CHAPTERS.forEach((ch) => {
            CHAPTER_START_INDEX[ch.number] = pages.length;
            console.log(CHAPTER_START_INDEX);

            pages.push({ type: "chapter", chapter: ch });
            if (ch.extraContent) {
                ch.extraContent.forEach((extra) => {
                    pages.push({ type: "chapter-continued", chapter: ch, body: extra });
                });
            }
        });

        pages.push({ type: "closing" });
        pages.push({ type: "colophon" });

        if (pages.length % 2 !== 0) pages.push({ type: "endpaper" });
        return pages;
    }

    const INSIDE_PAGES = buildInsidePages();
    const TOTAL_SPREADS = INSIDE_PAGES.length / 2;

}
