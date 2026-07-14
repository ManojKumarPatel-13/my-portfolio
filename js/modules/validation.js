export function initValidation() {

    // Qoutes (placeholder imported from gemini)
    const QUOTES = [
        {
            text: 'One of the fastest learners I\u2019ve worked with \u2014 hands you a problem and he comes back with a cleaner solution than you expected.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
        {
            text: 'Genuinely rare to find someone who cares as much about how the code reads as whether it works.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
        {
            text: 'Calm under pressure, and always the one asking the question that saves everyone an hour of debugging later.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
        {
            text: 'Brings the same care to a README as to the actual architecture \u2014 that attention to detail shows.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
        {
            text: 'The kind of teammate who makes the whole project better just by asking good questions early.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
        {
            text: 'Somehow ships fast and ships clean \u2014 usually you only get one or the other.',
            name: 'EDIT: Name',
            role: 'EDIT: Role, Team / Project',
        },
    ];

    const AUTO_NEXT_MS = 5500;

    const quotesEl = document.getElementById('validation-quotes');
    const dotsEl = document.getElementById('validation-dots');
    const stageEl = document.getElementById('validation-stage');

    let current = 0;
    let timer = null;

    // Building Slides of qoutes
    function renderSlides() {
        QUOTES.forEach((q, i) => {
            const slide = document.createElement('blockquote');
            slide.className = 'quote-slide';
            if (i === 0) slide.classList.add('is-active');

            const text = document.createElement('p');
            text.className = 'quote-slide__text';
            text.textContent = `\u201C${q.text}\u201D`;

            const footer = document.createElement('footer');

            const name = document.createElement('div');
            name.className = 'quote-slide__name';
            name.textContent = q.name;

            const role = document.createElement('div');
            role.className = 'quote-slide__role';
            role.textContent = q.role;

            footer.appendChild(name);
            footer.appendChild(role);

            slide.appendChild(text);
            slide.appendChild(footer);

            quotesEl.appendChild(slide);
        });
    }

    // Build the navigation dots
    function renderDots() {
        QUOTES.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'validation__dot';
            dot.type = 'button';
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Show slide ${i + 1}`);
            if (i === 0) dot.classList.add('is-active');

            dot.addEventListener('click', () => {
                goTo(i);
                restartTimer();
            });

            dotsEl.appendChild(dot);
        });
    }

    // Navigation dunction
    function goTo(index) {
        const slides = quotesEl.querySelectorAll('.quote-slide')
        const dots = dotsEl.querySelectorAll('.validation__dot')

        slides[current].classList.remove('is-active')
        dots[current].classList.remove('is-active')

        current = index;

        slides[current].classList.add('is-active')
        dots[current].classList.add('is-active')
    }

    function next() {
        goTo((current + 1) % QUOTES.length)
    }

    function startTimer() {
        timer = setInterval(next, AUTO_NEXT_MS); // call next in every 3000ms
    }

    function stopTimer() {
        clearInterval(timer)
    }

    function restartTimer() {
        stopTimer();
        startTimer();
    }

    renderSlides();
    renderDots();
    startTimer();

    // Pause auto-next while the cursor is on stage
    stageEl.addEventListener('mouseenter', stopTimer);
    stageEl.addEventListener('mouseleave', startTimer);
}