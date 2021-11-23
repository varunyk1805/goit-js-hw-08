const feedbackForm = document.querySelector('.feedback-form');
const email = document.querySelector('.email');
const message = document.querySelector('.message');

const throttle = require('lodash.throttle');

const formSave = throttle((item) => {
    localStorage.setItem("feedback-form-state", JSON.stringify(item));
}, 500);

const feedbackFormSave = event => {
    const {
        elements: { email, message }
    } = event.currentTarget;

    const feedbackFormState = {
        email: email.value,
        password: message.value
    };

    try {
        formSave(feedbackFormState);
    } catch (error) {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // "Unexpected token u in JSON at position 1"
    };
};

const feedbackFormLoad = () => {
    if (localStorage.getItem("feedback-form-state")) {
        try {
            const feedbackFormState = JSON.parse(localStorage.getItem("feedback-form-state"));
            email.value = feedbackFormState.email;
            message.value = feedbackFormState.password;

        } catch (error) {
            console.log(error.name); // "SyntaxError"
            console.log(error.message); // "Unexpected token u in JSON at position 1"
        };
    } else {
        email.value = '';
        message.value = ''; 
    }
};

const feedbackFormSubmit = event => {
    event.preventDefault();
    try {
        const feedback = JSON.parse(localStorage.getItem("feedback-form-state"));
        console.log(feedback);
    } catch {
        console.log(error.name); // "SyntaxError"
        console.log(error.message); // "Unexpected token u in JSON at position 1"
    };

    localStorage.removeItem("feedback-form-state");
    email.value = '';
    message.value = '';
};

feedbackForm.addEventListener('input', feedbackFormSave);

window.addEventListener('load', feedbackFormLoad);

feedbackForm.addEventListener('submit', feedbackFormSubmit);