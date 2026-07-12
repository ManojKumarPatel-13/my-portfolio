const form = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const feedback = document.getElementById('form-feedback');

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

Object.keys(fields).forEach((key) => {
    fields[key].el.addEventListener('blur', () => validateField(key));
})