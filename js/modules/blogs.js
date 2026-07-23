export function initBlogs() {
    const POSTS = [
        {
            callNumber: 'LOG.01',
            title: 'Failures and Learnings: The Cost of Aiming High',
            preview: '[Status: Drafting] — Exploring the early rejections and high-pressure sprints that reshaped my engineering approach. Publishing late July.',
            readTime: '6 min',
        },
        // {
        //     callNumber: 'CODE.02',
        //     title: 'The Bug That Took Three Days and Taught Me More Than a Month of Tutorials',
        //     preview: 'EDIT: A 2-line preview of the post \u2014 what it\u2019s actually about, written like the opening of the real thing.',
        //     readTime: '4 min',
        // },
        // {
        //     callNumber: 'READ.11',
        //     title: 'What a 19th-Century Novel Taught Me About Naming Variables',
        //     preview: 'EDIT: A 2-line preview of the post \u2014 what it\u2019s actually about, written like the opening of the real thing.',
        //     readTime: '5 min',
        // },
        // {
        //     callNumber: 'SYS.07',
        //     title: 'Notes on Architecting StudentOS: What I\u2019d Do Differently',
        //     preview: 'EDIT: A 2-line preview of the post \u2014 what it\u2019s actually about, written like the opening of the real thing.',
        //     readTime: '8 min',
        // },
        // {
        //     callNumber: 'READ.03',
        //     title: 'A Reading List for People Who Think They Don\u2019t Have Time to Read',
        //     preview: 'EDIT: A 2-line preview of the post \u2014 what it\u2019s actually about, written like the opening of the real thing.',
        //     readTime: '3 min',
        // },
    ];

    const FAN_ANGLES = [-2];

    // Build Cards
    function buildCardHTML(post) {
        return `
            <span class="blogs-card__stamp">${post.callNumber}</span>
            <h3 class="blogs-card__title">${post.title}</h3>
            <p class="blogs-card__preview">${post.preview}</p>
            <span class="blogs-card__cta">Read \u2192</span>
            <span class="blogs-card__readtime">${post.readTime}</span>
        `;
    }

    const fanEl = document.getElementById('blogs-fan');
    const scrollEl = document.getElementById('blogs-scroll');

    // Render Cards
    POSTS.forEach((post, i) => {
        const fanCard = document.createElement('article');
        fanCard.className = 'blogs-card';
        fanCard.tabIndex = 0;
        fanCard.style.transform = `rotate(${FAN_ANGLES[i] ?? 0}deg)`;
        fanCard.style.zIndex = i;
        fanCard.innerHTML = buildCardHTML(post);
        fanEl.appendChild(fanCard);

        // Mobile
        const scrollCard = document.createElement('article');
        scrollCard.className = 'blogs-card';
        scrollCard.tabIndex = 0;
        scrollCard.innerHTML = buildCardHTML(post);
        scrollEl.appendChild(scrollCard);
    });
}