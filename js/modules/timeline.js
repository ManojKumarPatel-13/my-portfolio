export function initTimeline() {

    // The Digital Codex: Chapter Data
    const CHAPTERS = [
        {
            number: "01",
            tag: "Origins",
            title: "The Lockdown Loop",
            body: "The journey began in the quiet isolation of lockdown. My days found a relentless rhythm: read, code, eat, sleep. I started wrestling with the early syntax of HTML, CSS, JS, and Python, alongside building a PHP pizza delivery site from a tutorial. Watching my own logic render dynamically on the screen was a revelation. The true turning point, however, arrived when an incredible mentor—Shraddha mam—recognized my stubborn curiosity and gifted me my first real programming book. That single spark ignited a lifelong obsession, turning a passing fascination into a disciplined pursuit.",
        },
        {
            number: "02",
            tag: "Open Source",
            title: "The Local Host",
            body: "Entering college shifted my momentum. Amidst settling into a new environment, a December obsession with GSoC and open-source took over. I began tearing through Eloquent JavaScript and wrestled heavily with the Vue.js documentation. While I didn't master the frameworks then, I conquered Git and GitHub. The greatest victory of that era wasn't writing a perfect app—it was the sheer, adrenaline-fueled thrill of successfully cloning and compiling the massive CircuitVerse repository on my local machine."
        },
        {
            number: "03",
            tag: "Rejection",
            title: "Rejection & The Sprint",
            body: "Back in the classroom, I laid a structured foundation in C and SQL, but I was hungry to build under pressure. I aimed for a high-stakes AI hackathon, only to face a harsh reality: my team was rejected before the event even started. It was a frustrating false start. Yet, the sting of missing out permanently hooked me on competitive building. Seeking redemption, I formed a new team and pivoted toward the prestigious Google Solution Challenge, entirely unaware of the chaos ahead.",
            extraContent: [`We were late to the game. With only fifteen days on the clock and college projects piling up, it became a crash course in sheer survival. Relying heavily on momentum and "vibe coding," we stitched together and shipped StudentOS, my first major project. We didn't qualify for the second stage, but failure was secondary. Shipping a tangible product under fire taught me more about execution in two weeks than any tutorial ever could.`],
        },
        {
            number: "04",
            tag: "Reality-Check",
            title: "The Reality Check",
            body: "Failing the Solution Challenge was the ultimate teacher. Looking back at the chaos of those fifteen days, I realized that true engineering is about much more than just rushing features. It requires extreme time management, clear team communication, and a solid foundation. The illusion of surface-level coding shattered. I learned that you cannot just stitch pieces together and hope they hold under pressure; you need the essential, underlying skills to actually architect a solution.",
        },
        {
            number: "05",
            tag: "Full-Stack",
            title: "The Full-Stack Pursuit",
            body: "Determined to back up my ambition with actual skill, I used the semester break for an uncompromising reset. I dove relentlessly into core JavaScript, breaking down how the language truly executes under the hood until I built a confident command of it. While I am currently exploring React on the frontend, my true focus has been the server side, where I built a strong, reliable foundation in Node.js, Express, and MongoDB.",
            extraContent: [
                "Today, my curiosity has shifted toward the complexities of System Design and advanced backend architecture. The goal is no longer just building basic APIs; it is about learning how to engineer robust systems from the ground up."
            ]
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
                        <p class="page-subtitle">A chronicle of how the code &mdash; and the person writing it &mdash; grew up.</p>
                        ${num}
                    </div>`;

            case "toc":
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Contents</p>
                        <h3 class="page-title">Table of Contents</h3>
                        <ul class="toc-list">
                            <li><span>Preface</span><span>04</span></li>
                            ${CHAPTERS.map((c) => `<li><span>Ch. ${c.number} &mdash; ${c.title}</span><span>${CHAPTER_START_INDEX[c.number] + 1}</span></li>`).join("")}
                            <li><span>Closing</span><span>${INSIDE_PAGES.length - 1}</span></li>
                        </ul>
                        ${num}
                    </div>`;

            case "preface":
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Preface</p>
                        <h3 class="page-title">Before We Begin</h3>
                        <p class="page-body">This is not just a resume. It is a record of curiosity, late-night debugging, and the deliberate transition from writing mere syntax to engineering real systems. Every chapter represents a shift in perspective.</p>
                        ${num}
                    </div>`;

            case "chapter": {
                const c = page.chapter;
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="page-tag">Chapter ${c.number} &mdash; ${c.tag}</p>
                        <h3 class="page-title">${c.title}</h3>
                        <hr class="chapter-divider">
                        <p class="page-body">${c.body}</p>
                        <div class="page-footnote">
                            Page ${indexInBook + 1}
                        </div>
                    </div>`;
            }

            case "chapter-continued": {
                const c = page.chapter;
                return `
                    <div class="${contentClass} surface-paper">
                        <p class="chapter-continued-tag">Ch. ${c.number} &mdash; ${c.title} (cont'd)</p>
                        <p class="page-body">${page.body}</p>
                        <div class="page-footnote">
                            Page ${indexInBook + 1}
                        </div>
                    </div>`;
            }

            case "closing":
                return `
                    <div class="${contentClass} page-content--center surface-paper">
                        <p class="page-tag">The Last Page</p>
                        <h3 class="page-title">To Be Continued</h3>
                        <p class="page-body">The terminal remains open. The next chapter is currently compiling.</p>
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
        const title = side === 'front' ? 'Manoj Kumar Patel' : '';
        const sub = side === 'front' ? 'The Digital Codex' : 'Fin.';
        return `
            <div class="page-content page-content--center page-cover surface-leather">
                <span class="page-cover__mark">&#10022;</span>
                <h2 class="page-title">${title}</h2>
                <p class="page-subtitle">${sub}</p>
            </div>`;
    }

    const pageLeftEl = document.getElementById('page-left');
    const pageRightEl = document.getElementById('page-right');
    const leafEl = document.getElementById('book-leaf');
    const leafFrontFaceEl = document.getElementById('leaf-front-face');
    const leafBackFaceEl = document.getElementById('leaf-back-face');
    const leafFrontEl = document.getElementById('leaf-front');
    const leafBackEl = document.getElementById('leaf-back');
    const leafBendFrontEl = document.getElementById('leaf-bend-front');
    const leafBendBackEl = document.getElementById('leaf-bend-back');
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
        gsap.set(leafEl, { rotationY: 0, scaleX: 1 });
        gsap.set([leafBendFrontEl, leafBendBackEl], { opacity: 0 });
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
        leafFrontFaceEl.classList.toggle('is-right-side', isForward);
        leafFrontFaceEl.classList.toggle('is-left-side', !isForward);
        leafBackFaceEl.classList.toggle('is-right-side', isForward);
        leafBackFaceEl.classList.toggle('is-left-side', !isForward);

        let midpointDone = false;
        const state = { rotationY: 0, scaleX: 1 };

        gsap.timeline({
            onComplete: () => {
                onComplete();
                isFlipping = false;
            },
        })
            .to(state, {
                rotationY: targetRotation,
                duration: 1.0,
                ease: 'power1.inOut',
                onUpdate: function () {
                    const progress = this.progress();
                    gsap.set(leafEl, { rotationY: state.rotationY });

                    const bend = Math.sin(progress * Math.PI);
                    gsap.set(leafEl, { scaleX: 1 - bend * 0.06 });
                    gsap.set([leafBendFrontEl, leafBendBackEl], { opacity: bend * 0.55 });

                    if (!midpointDone && progress >= 0.5) {
                        midpointDone = true;
                        onMidpoint();
                    }
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

    const mobilePageEl = document.getElementById('mobile-page');
    const mobileProgressEl = document.getElementById('mobile-progress');
    const mobilePrevBtn = document.getElementById('mobile-prev');
    const mobileNextBtn = document.getElementById('mobile-next');

    const MOBILE_LAST_INDEX = INSIDE_PAGES.length + 1;

    let mobileIndex = 0;

    function renderMobileContent(index) {
        if (index === 0) return renderCover('front');
        if (index === MOBILE_LAST_INDEX) return renderCover('back');
        return renderInsidePage(INSIDE_PAGES[index - 1], index - 1);
    }

    function renderMobile() {
        mobilePageEl.classList.remove('is-entering');
        mobilePageEl.innerHTML = renderMobileContent(mobileIndex);
        void mobilePageEl.offsetWidth;
        mobilePageEl.classList.add('is-entering');

        if (mobileIndex === 0) mobileProgressEl.textContent = 'Closed \u2014 tap to open';
        else if (mobileIndex === MOBILE_LAST_INDEX) mobileProgressEl.textContent = 'Closed \u2014 the end';
        else mobileProgressEl.textContent = `Page ${mobileIndex} / ${INSIDE_PAGES.length}`;
    }

    mobilePrevBtn.addEventListener('click', () => {
        if (mobileIndex <= 0) return;
        mobileIndex -= 1;
        renderMobile();
    });

    mobileNextBtn.addEventListener('click', () => {
        if (mobileIndex >= MOBILE_LAST_INDEX) return;
        mobileIndex += 1;
        renderMobile();
    });

    renderMobile();

}