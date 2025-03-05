const submitButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');
const form_question = document.getElementById('form-question');
//const userName = document.querySelector('#imie');
//const section = document.querySelector('.info');

submitButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    form.remove();
    form_question.textContent = "Dziękuję za wypełnienie ankiety!";
});