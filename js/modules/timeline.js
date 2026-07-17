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
    console.log(INSIDE_PAGES)

    // Render page
    function renderInsidePage(page, indexInBook) {
        const num = `<span class="page-number">${indexInBook + 1}</span>`;
        const hand = page.type !== "title-page";
        const contentClass = `page-content${hand ? " page-content--hand" : ""}`;

        switch (page.type) {
            case "endpaper":
                return `<div class="${contentClass} surface-paper"></div>`;

            case "title-page":
                return `
                    <div class="${contentClass} page-content--center surface-paper">
                        <p class="page-tag">The Journey</p>
                        <h2 class="page-title">Manoj Kumar Patel</h2>
                        <p class="page-subtitle">A chronicle of how the code \u2014 and the person writing it \u2014 grew up.</p>
                        ${num}
                    </div>`;

            case "toc":
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Contents</p>
                        <h3 class="page-title">Table of Contents</h3>
                        <ul class="toc-list">
                            <li><span>Preface</span><span>04</span></li>
                            ${CHAPTERS.map((c) => `<li><span>Ch. ${c.number} \u2014 ${c.title}</span><span>${CHAPTER_START_INDEX[c.number] + 1}</span></li>`).join("")}
                            <li><span>Closing</span><span>${INSIDE_PAGES.length - 1}</span></li>
                        </ul>
                        ${num}
                    </div>`;

            case "preface":
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Preface</p>
                        <h3 class="page-title">Before We Begin</h3>
                        <p class="page-body">EDIT: A short, honest note on why this timeline exists \u2014 not a resume, a record of how each stage actually happened.</p>
                        ${num}
                    </div>`;

            case "chapter": {
                const c = page.chapter;
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Chapter ${c.number} \u2014 ${c.tag}</p>
                        <h3 class="page-title">${c.title}</h3>
                        <hr class="chapter-divider">
                        <p class="page-body">${c.body}</p>
                        <div class="page-footnote">
                            Skills touched:
                            <div class="skills-row">${c.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}</div>
                        </div>
                        ${num}
                    </div>`;
            }

            case "chapter-continued": {
                const c = page.chapter;
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="chapter-continued-tag">Ch. ${c.number} \u2014 ${c.title} (cont'd)</p>
                        <p class="page-body">${page.body}</p>
                        ${num}
                    </div>`;
            }

            case "closing":
                return `
                    <div class="${contentClass} page-content--center surface-paper">
                        <p class="page-tag">The Last Page</p>
                        <h3 class="page-title">To Be Continued</h3>
                        <p class="page-body">EDIT: A short closing line \u2014 this story is still being written.</p>
                        ${num}
                    </div>`;

            case "colophon":
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Colophon</p>
                        <p class="page-body">Set in Caveat &amp; Source Serif 4. Built entirely in vanilla HTML, CSS &amp; JavaScript.</p>
                        ${num}
                    </div>`;

            default:
                return `<div class="${contentClass} surface-paper"></div>`;
        }
    }

    function renderCover(side) {
        const title = side === 'front' ? '[Your Name]' : '';
        const sub = side === 'front' ? 'The Digital Codex' : 'Fin.';
        return `
            <div class="page-content page-content--center page-cover surface-leather">
                <span class="page-cover__mark">&#10022;</span>
                <h2 class="page-title"><!-- EDIT: your name -->${title}</h2>
                <p class="page-subtitle">${sub}</p>
            </div>`;
    }

    const pageLeftEl = document.getElementById('page-left');
    const pageRightEl = document.getElementById('page-right');
    const leafEl = document.getElementById('book-leaf');
    const leafFrontEl = document.getElementById('leaf-front');
    const leafBackEl = document.getElementById('leaf-back');
    const navPrev = document.getElementById('nav-prev');
    const navNext = document.getElementById('nav-next');
    const progressEl = document.getElementById('timeline-progress');
    const bookEl = document.getElementById('book');

    let state = 'closed-front';
    let currentSpread = 0;
    let isFlipping = false;

    function resetLeaf() {
        leafEl.classList.remove('is-flipping', 'book-leaf--forward', 'book-leaf--backward',
            'book-leaf--opening-front', 'book-leaf--closing-front');
        gsap.set(leafEl, { rotationY: 0 });
    }

    function renderStatic() {
        bookEl.classList.remove('is-closed-front', 'is-closed-back');

        if (state === 'closed-front') {
            pageLeftEl.classList.add('book-page--hidden');
            pageRightEl.classList.remove('book-page--hidden');
            pageRightEl.innerHTML = renderCover('front');
            progressEl.textContent = 'Closed \u2014 tap to open';
            bookEl.classList.add('is-closed-front');
        } else if (state === 'closed-back') {
            pageRightEl.classList.add('book-page--hidden');
            pageLeftEl.classList.remove('book-page--hidden');
            pageLeftEl.innerHTML = renderCover('back');
            progressEl.textContent = 'Closed \u2014 the end';
            bookEl.classList.add('is-closed-back');
        } else {
            pageLeftEl.classList.remove('book-page--hidden');
            pageRightEl.classList.remove('book-page--hidden');
            pageLeftEl.innerHTML = renderInsidePage(INSIDE_PAGES[currentSpread * 2], currentSpread * 2);
            pageRightEl.innerHTML = renderInsidePage(INSIDE_PAGES[currentSpread * 2 + 1], currentSpread * 2 + 1);
            progressEl.textContent = `Spread ${currentSpread + 1} / ${TOTAL_SPREADS}`;
        }
        navPrev.disabled = false;
        navNext.disabled = false;
    }

    function runFlip({ leafClass, frontHTML, backHTML, targetRotation, onMidpoint, onComplete }) {
        isFlipping = true;
        resetLeaf();
        leafEl.classList.add('is-flipping', leafClass);
        leafFrontEl.innerHTML = frontHTML;
        leafBackEl.innerHTML = backHTML;

        const isForward = leafClass === 'book-leaf--forward';
        leafFrontEl.classList.toggle('is-right-side', isForward);
        leafFrontEl.classList.toggle('is-left-side', !isForward);
        leafBackEl.classList.toggle('is-right-side', isForward);
        leafBackEl.classList.toggle('is-left-side', !isForward);

        let midpointDone = false;
        gsap.to(leafEl, {
            rotationY: targetRotation,
            duration: 0.9,
            ease: 'power2.inOut',
            onUpdate: function () {
                if (!midpointDone && this.progress() >= 0.5) {
                    midpointDone = true;
                    onMidpoint();
                }
            },
            onComplete: () => {
                onComplete();
                isFlipping = false;
            },
        });
    }

    function openCover() {
        runFlip({
            leafClass: 'book-leaf--forward',
            frontHTML: renderCover('front'),
            backHTML: renderInsidePage(INSIDE_PAGES[0], 0),
            targetRotation: -180,
            onMidpoint: () => {
                pageRightEl.classList.remove('book-page--hidden');
                pageRightEl.innerHTML = renderInsidePage(INSIDE_PAGES[1], 1);
                pageLeftEl.classList.remove('book-page--hidden');
                pageLeftEl.innerHTML = renderInsidePage(INSIDE_PAGES[0], 0);
            },
            onComplete: () => {
                resetLeaf();
                state = 'open';
                currentSpread = 0;
                renderStatic();
            },
        });
    }

    function closeCoverBack() {
        runFlip({
            leafClass: 'book-leaf--forward',
            frontHTML: renderInsidePage(INSIDE_PAGES[0], 0),
            backHTML: renderCover('front'),
            targetRotation: -180,
            onMidpoint: () => {
                pageLeftEl.classList.add('book-page--hidden');
                pageRightEl.classList.remove('book-page--hidden');
                pageRightEl.innerHTML = renderCover('front');
            },
            onComplete: () => {
                resetLeaf();
                state = 'closed-front';
                renderStatic();
            },
        });
    }

    function closeBookAtEnd() {
        const lastRightIdx = (TOTAL_SPREADS - 1) * 2 + 1;
        runFlip({
            leafClass: 'book-leaf--forward',
            frontHTML: renderInsidePage(INSIDE_PAGES[lastRightIdx], lastRightIdx),
            backHTML: renderCover('back'),
            targetRotation: -180,
            onMidpoint: () => {
                pageRightEl.classList.add('book-page--hidden');
                pageLeftEl.classList.add('book-page--hidden');
            },
            onComplete: () => {
                resetLeaf();
                state = 'closed-back';
                renderStatic();
            },
        });
    }

    function reopenFromEnd() {
        const lastRightIdx = (TOTAL_SPREADS - 1) * 2 + 1;
        const lastLeftIdx = lastRightIdx - 1;
        runFlip({
            leafClass: 'book-leaf--backward',
            frontHTML: renderCover('back'),
            backHTML: renderInsidePage(INSIDE_PAGES[lastRightIdx], lastRightIdx),
            targetRotation: 180,
            onMidpoint: () => {
                pageLeftEl.classList.remove('book-page--hidden');
                pageLeftEl.innerHTML = renderInsidePage(INSIDE_PAGES[lastLeftIdx], lastLeftIdx);
                pageRightEl.classList.remove('book-page--hidden');
                pageRightEl.innerHTML = renderInsidePage(INSIDE_PAGES[lastRightIdx], lastRightIdx);
            },
            onComplete: () => {
                resetLeaf();
                state = 'open';
                currentSpread = TOTAL_SPREADS - 1;
                renderStatic();
            },
        });
    }

    function interiorFlip(direction) {
        const forward = direction === 'next';
        const curLeftIdx = currentSpread * 2;
        const curRightIdx = currentSpread * 2 + 1;
        const newSpread = forward ? currentSpread + 1 : currentSpread - 1;
        const newLeftIdx = newSpread * 2;
        const newRightIdx = newSpread * 2 + 1;
        const frontIdx = forward ? curRightIdx : curLeftIdx;
        const backIdx = forward ? curRightIdx + 1 : curLeftIdx - 1;

        runFlip({
            leafClass: forward ? 'book-leaf--forward' : 'book-leaf--backward',
            frontHTML: renderInsidePage(INSIDE_PAGES[frontIdx], frontIdx),
            backHTML: renderInsidePage(INSIDE_PAGES[backIdx], backIdx),
            targetRotation: forward ? -180 : 180,
            onMidpoint: () => {
                pageLeftEl.innerHTML = renderInsidePage(INSIDE_PAGES[newLeftIdx], newLeftIdx);
                pageRightEl.innerHTML = renderInsidePage(INSIDE_PAGES[newRightIdx], newRightIdx);
            },
            onComplete: () => {
                resetLeaf();
                currentSpread = newSpread;
                renderStatic();
            },
        });
    }

    function next() {
        if (isFlipping) return;
        if (state === 'closed-front') return openCover();
        if (state === 'closed-back') return;
        if (state === 'open' && currentSpread < TOTAL_SPREADS - 1) return interiorFlip('next');
        if (state === 'open' && currentSpread === TOTAL_SPREADS - 1) return closeBookAtEnd();
    }

    function prev() {
        if (isFlipping) return;
        if (state === 'closed-back') return reopenFromEnd();
        if (state === 'closed-front') return;
        if (state === 'open' && currentSpread > 0) return interiorFlip('prev');
        if (state === 'open' && currentSpread === 0) return closeCoverBack();
    }

    renderStatic();
    navPrev.addEventListener('click', prev);
    navNext.addEventListener('click', next);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    let swipeAccum = 0;
    let swipeLock = false;
    const SWIPE_THRESHOLD = 60;

    bookEl.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
        e.preventDefault();
        if (swipeLock) return;

        swipeAccum += e.deltaX;
        if (Math.abs(swipeAccum) > SWIPE_THRESHOLD) {
            if (swipeAccum > 0) next(); else prev();
            swipeAccum = 0;
            swipeLock = true;
            setTimeout(() => { swipeLock = false; }, 900);
        }
    }, { passive: false });
}
