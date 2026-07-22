export function initintroAndHero() {

    const themeToggleBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') document.body.classList.add('light-theme');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });

    const dragStage = document.getElementById('drag-stage');
    const portraitWrapper = document.getElementById('portrait-wrapper');
    const portrait = document.getElementById('portrait');
    const lensTech = document.getElementById('lens-tech');
    const lensBook = document.getElementById('lens-book');
    const cornerLeft = document.getElementById('corner-left');
    const cornerRight = document.getElementById('corner-right');
    const heroText = document.getElementById('hero-text');
    const navbar = document.getElementById('navbar');
    const anchorCenter = document.getElementById('anchor-center');
    const anchorHero = document.getElementById('anchor-hero');

    const baseImg = portrait.querySelector('.portrait__image-wrap img');

    function readVar(name, fallback) {
        const val = getComputedStyle(portrait).getPropertyValue(name).trim();
        const num = parseFloat(val);
        return Number.isNaN(num) ? fallback : num;
    }

    function maskExpandPx() {
        return { x: window.innerWidth, y: window.innerHeight };
    }

    function setLensMask(lensEl, viewportX, viewportY, radiusPx, featherAmt) {
        const portraitRect = portrait.getBoundingClientRect();
        const expand = maskExpandPx();

        // Convert global viewport coordinates to mask-local coordinates
        const localX = viewportX - (portraitRect.left - expand.x);
        const localY = viewportY - (portraitRect.top - expand.y);

        const featherStopPct = Math.max(0, Math.min(1, featherAmt)) * 100;
        const gradient = `radial-gradient(circle ${radiusPx}px at ${localX}px ${localY}px, black 0%, black ${100 - featherStopPct}%, transparent 100%)`;

        lensEl.style.maskImage = gradient;
        lensEl.style.webkitMaskImage = gradient;
    }

    const lens = {
        tech: { el: lensTech, x: 0, y: 0, restX: 0, restY: 0, radius: 0 },
        book: { el: lensBook, x: 0, y: 0, restX: 0, restY: 0, radius: 0 },
    };

    let feather = 0.55;
    let isDragging = false;
    let activeLensKey = null;
    let dragEnabled = true;

    function runEntrance() {
        gsap.set(portraitWrapper, { xPercent: -50, yPercent: -50, y: 0, x: 0 });

        const frameRect = portrait.getBoundingClientRect();
        const imageRect = baseImg.getBoundingClientRect();
        const topPadPx = imageRect.top - frameRect.top;
        const imgWidth = imageRect.width;
        const imgHeight = imageRect.height;

        // Read CSS tuning variables
        const radiusFrac = readVar('--lens-radius', 0.11);
        const radiusExtra = readVar('--lens-radius-extra', 0);
        const techXFrac = readVar('--tech-lens-x', 0.5);
        const techXOffset = readVar('--tech-lens-x-offset', 0);
        const techYFrac = readVar('--tech-lens-y', 0.4);
        const techYScale = readVar('--tech-lens-y-scale', 250);
        const bookXFrac = readVar('--book-lens-x', 0.59);
        const bookYFrac = readVar('--book-lens-y', 0.56);
        feather = readVar('--lens-feather', 0.55);

        const radius = imgWidth * radiusFrac + radiusExtra;
        lens.tech.radius = radius;
        lens.book.radius = radius;

        // Viewport-absolute resting coordinates
        lens.tech.restX = frameRect.left + imgWidth * techXFrac + techXOffset;
        lens.tech.restY = frameRect.top + topPadPx + techYScale * techYFrac;
        lens.book.restX = frameRect.left + imgWidth * bookXFrac;
        lens.book.restY = frameRect.top + topPadPx + imgHeight * bookYFrac;

        // Start off-screen
        lens.tech.x = frameRect.left - radius * 1.6;
        lens.tech.y = lens.tech.restY;
        lens.book.x = frameRect.right + radius * 1.6;
        lens.book.y = lens.book.restY;

        setLensMask(lensTech, lens.tech.x, lens.tech.y, radius, feather);
        setLensMask(lensBook, lens.book.x, lens.book.y, radius, feather);

        // 2. NOW apply the entrance starting state (pushed down and invisible)
        gsap.set(portraitWrapper, { y: 130, opacity: 0 });
        gsap.set([cornerLeft, cornerRight], { opacity: 0 });

        const tl = gsap.timeline({ delay: 0.15 });

        // Pop up wrapper
        tl.to(portraitWrapper, { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out' });

        // Fly in lenses
        tl.to(lens.tech, {
            x: lens.tech.restX,
            duration: 0.45,
            ease: 'power3.out',
            onUpdate: () => setLensMask(lensTech, lens.tech.x, lens.tech.y, lens.tech.radius, feather),
        }, '-=0.15')
            .to(lens.book, {
                x: lens.book.restX,
                duration: 0.45,
                ease: 'power3.out',
                onUpdate: () => setLensMask(lensBook, lens.book.x, lens.book.y, lens.book.radius, feather),
            }, '<')
            .call(() => {
                initDragInteraction();
                initHeroSequence();
            });

        // Fade in corners
        tl.to([cornerLeft, cornerRight], { opacity: 1, duration: 0.6, ease: 'power1.out' }, '-=0.1');
    }

    function initDragInteraction() {
        let dragOffsetX = 0;
        let dragOffsetY = 0;

        function hitTest(vx, vy) {
            for (const key of ['tech', 'book']) {
                const l = lens[key];
                const dx = vx - l.x;
                const dy = vy - l.y;
                if (Math.sqrt(dx * dx + dy * dy) <= l.radius) return key;
            }
            return null;
        }

        function updateHoverCursor(e) {
            if (isDragging || !dragEnabled) return;
            const hit = hitTest(e.clientX, e.clientY);
            portraitWrapper.classList.toggle('is-hovering-lens', Boolean(hit));
        }

        function onPointerDown(e) {
            if (!dragEnabled) return;
            const hit = hitTest(e.clientX, e.clientY);
            if (!hit) return;

            isDragging = true;
            activeLensKey = hit;
            const active = lens[hit];
            const other = lens[hit === 'tech' ? 'book' : 'tech'];

            dragOffsetX = e.clientX - active.x;
            dragOffsetY = e.clientY - active.y;

            active.el.classList.add('is-active-drag');
            portraitWrapper.classList.add('is-dragging-lens');
            portraitWrapper.classList.remove('is-hovering-lens');

            // Bind capture to the stage so it tracks everywhere safely
            dragStage.setPointerCapture(e.pointerId);

            gsap.to(other.el, { opacity: 0, duration: 0.25, ease: 'power1.out' });
        }

        function onPointerMove(e) {
            updateHoverCursor(e);
            if (!isDragging || !activeLensKey) return;

            const active = lens[activeLensKey];
            active.x = e.clientX - dragOffsetX;
            active.y = e.clientY - dragOffsetY;
            setLensMask(active.el, active.x, active.y, active.radius, feather);
        }

        function onPointerUp() {
            if (!isDragging || !activeLensKey) return;
            isDragging = false;
            portraitWrapper.classList.remove('is-dragging-lens');

            const active = lens[activeLensKey];
            const other = lens[activeLensKey === 'tech' ? 'book' : 'tech'];
            active.el.classList.remove('is-active-drag');

            gsap.to(active, {
                x: active.restX,
                y: active.restY,
                duration: 0.55,
                ease: 'back.out(1.6)',
                onUpdate: () => setLensMask(active.el, active.x, active.y, active.radius, feather),
                onComplete: () => {
                    gsap.to(other.el, { opacity: 1, duration: 0.35, ease: 'power1.out' });
                },
            });

            activeLensKey = null;
        }

        // Attach events to the full-viewport stage, not just the portrait
        dragStage.addEventListener('pointerdown', onPointerDown);
        dragStage.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp); // Window is safest for releasing drag
        window.addEventListener('pointercancel', onPointerUp);
    }

    function initHeroSequence() {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 901px)', () => {
            function getDelta() {
                const c = anchorCenter.getBoundingClientRect();
                const h = anchorHero.getBoundingClientRect();
                return { x: h.left - c.left, y: h.top - c.top };
            }
            let delta = getDelta();

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '#intro',
                    start: 'top top',
                    end: '+=2600',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onRefresh: () => { delta = getDelta(); },
                    onUpdate: (self) => {
                        // Add a small 2% buffer before disabling drag to prevent trackpad stutters
                        dragEnabled = self.progress < 0.02;

                        if (self.progress > 0) portraitWrapper.classList.remove('is-hovering-lens');

                        // Toggle Hero UI styling
                        if (self.progress > 0.15) portraitWrapper.classList.add('is-hero-card');
                        else portraitWrapper.classList.remove('is-hero-card');

                        navbar.classList.toggle('is-visible', self.progress > 0.42);
                    },
                },
            });

            tl.to({}, { duration: 12 })
                .addLabel('transition', 12)
                .to([lensTech, lensBook], { opacity: 0, duration: 10, ease: 'power1.out' }, 'transition')
                .to([cornerLeft, cornerRight], { opacity: 0, duration: 10 }, 'transition')

                // Animate the wrapper now, moving it right and scaling it slightly down to form a card
                .to(portraitWrapper, {
                    x: () => delta.x,
                    y: () => delta.y,
                    scale: 0.88,
                    duration: 55,
                    ease: 'power2.inOut',
                }, 'transition+=5')

                .to(heroText, { opacity: 1, x: 0, duration: 45, ease: 'power2.out' }, 'transition+=15');

            return () => { };
        });

        ScrollTrigger.create({
            trigger: '.placeholder-next',
            start: 'top bottom',
            onEnter: () => navbar.classList.add('is-pill'),
            onLeaveBack: () => navbar.classList.remove('is-pill'),
        });

        // Mobile fallback
        mm.add('(max-width: 900px)', () => {
            ScrollTrigger.create({
                trigger: '#intro',
                start: 'bottom bottom',
                onEnter: () => {
                    gsap.to([lensTech, lensBook], { opacity: 0, duration: 0.3 });
                    gsap.to(heroText, { opacity: 1, x: 0, duration: 0.5 });
                    navbar.classList.add('is-visible', 'is-pill');
                    portraitWrapper.classList.add('is-hero-card');
                },
                onLeaveBack: () => {
                    gsap.to([lensTech, lensBook], { opacity: 1, duration: 0.3 });
                    gsap.to(heroText, { opacity: 0, duration: 0.3 });
                    navbar.classList.remove('is-visible');
                    portraitWrapper.classList.remove('is-hero-card');
                },
            });
            return () => { };
        });
    }

    // Ensure images are fully loaded so getBoundingClientRect is accurate
    if (baseImg.complete) {
        runEntrance();
    } else {
        baseImg.addEventListener('load', runEntrance, { once: true });
    }
}