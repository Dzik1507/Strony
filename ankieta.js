const submitButton = document.querySelector('[type="submit"]');
const form = document.querySelector('form');
const form_question = document.getElementById('form-question');
submitButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    const ai_question = document.querySelector('[name=ai]:checked').value;
    const age_checkbox = document.getElementById('age').checked;
    form.remove();
    form_question.innerHTML = "Dziękuję za wypełnienie ankiety!<br>";
    form_question.innerHTML+=age_checkbox?ai_question==="nie"?`Cieszę się że masz optymistyczne poglądy ;)`:`To smutne, nieprawdaż?`:'Niestety nie możemy zaakceptować ankiety od osoby poniżej 18 lat :P';
});