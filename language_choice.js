const languages = document.querySelectorAll('.language_choice>img');

const hello = ['std::cout << "Witaj użytkowniku!";', "console.log('Witaj użytkowniku!');", 'printf("%s", "Witaj użytkowniku!");', 'echo("Witaj użytkowniku!");']

let index = 0;

const right_arrow = document.querySelector('.right_arrow');

const print_element = document.querySelector('.print_element');

right_arrow.addEventListener("click", function() {
    languages[index].style.display = 'none';
    index = index > languages.length-2 ? 0 : index + 1;
    languages[index].style.display = 'block';
    languages[index].style.animation = 'animation .8s linear';
    print_element.textContent = hello[index];
});