export function initContactFaqAndFooter() {
    const form = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');
    const feedback = document.getElementById('form-feedback');
    const btnText = sendBtn.querySelector('.send-btn__text');

    const fields = {
        name: { el: document.getElementById('name'), errorEl: document.getElementById('name-error') },
        email: { el: document.getElementById('email'), errorEl: document.getElementById('email-error') },
        message: { el: document.getElementById('message'), errorEl: document.getElementById('message-error') },
    };

    // Form Validation
    function validateField(key) {
        const { el, errorEl } = fields[key];
        const value = el.value.trim();
        let message = '';

        if (!value) {
            message = "This field is required.";
        } else if (key === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) message = "Enter a valid email address.";
        } else if (key === 'message' && value.length < 15) {
            message = "Give me a bit more to go on (15+ characters).";
        }

        errorEl.textContent = message;
        el.closest('.field').classList.toggle('has-error', Boolean(message));
        return !message;
    }

    let hasAttemptedSubmit = false;

    Object.keys(fields).forEach((key) => {
        fields[key].el.addEventListener('blur', () => {
            if (hasAttemptedSubmit) validateField(key)
        });
    })

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hasAttemptedSubmit = true;

        const validations = Object.keys(fields).map(validateField);
        const isValid = validations.every(Boolean);
        if (!isValid) {
            feedback.textContent = 'Please fix the highlighted fields.';
            feedback.className = 'form-feedback error';
            return;
        }

        sendBtn.disabled = true
        const originalText = btnText.textContent;
        btnText.textContent = "Sending..."
        feedback.textContent = '';

        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })

            const result = await response.json()

            if (result.success) {
                feedback.textContent = 'Message Sent Successfully!';
                feedback.className = 'form-feedback success';
                form.reset();
            } else {
                throw new Error();
            }
        } catch (error) {
            feedback.textContent = 'Something went wrong. Please try again.';
            feedback.className = 'form-feedback error';
        } finally {
            sendBtn.disabled = false;
            btnText.textContent = originalText;
        }
    })

    // FAQ
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
        const summary = item.querySelector('summary');

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            const isOpen = item.hasAttribute('open');

            faqItems.forEach((other) => {
                if (other !== item && other.hasAttribute('open')) {
                    closeItem(other);
                }
            });

            if (isOpen) {
                closeItem(item);
            } else {
                openItem(item);
            }
        });
    });

    function openItem(item) {
        item.setAttribute('open', '');
        const answer = item.querySelector('.faq-item__answer');
        const height = answer.scrollHeight;
        answer.style.height = '0px';
        requestAnimationFrame(() => {
            answer.style.transition = 'height 0.28s ease';
            answer.style.height = height + 'px';
        });
        answer.addEventListener('transitionend', function handler() {
            answer.style.height = '';
            answer.removeEventListener('transitionend', handler);
        });
    }

    function closeItem(item) {
        const answer = item.querySelector('.faq-item__answer');
        const height = answer.scrollHeight;
        answer.style.height = height + 'px';
        requestAnimationFrame(() => {
            answer.style.transition = 'height 0.28s ease';
            answer.style.height = '0px';
        });
        answer.addEventListener('transitionend', function handler() {
            item.removeAttribute('open');
            answer.style.height = '';
            answer.removeEventListener('transitionend', handler);
        });
    }

    // Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })
}