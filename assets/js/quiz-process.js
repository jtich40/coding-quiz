// declare variables by time, counter id, question index,
//declare DOM global
//function to start quiz
//inside that you hide start page to show questions
//declare
//create functions every time user interacts with quiz

// variables for progress in quiz
let currentQuestionIndex = 0;
let time = quizQuestions.length * 10;
let timer;

// global DOM variables
let startBtn = document.getElementById('start');
let clockEl = document.getElementById('clock');
let questionEl = document.getElementById('questions');
let optionsEl = document.getElementById('options');
let responseEl = document.getElementById('response');
let submitBtn = document.getElementById('submit');
let initialsEl = document.getElementById('initials');

// initiate beginning of quiz
function startQuiz () {

    // hiding the start page
    let startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');

    // show the question
    questionEl.removeAttribute('class');

    // show the options
    optionsEl.removeAttribute('class');

    // show full clock time
    clockEl.textContent = time;

    // start the clock countdown
    time = setInterval(timerCountdown, 1000);

    pullQuestion();

}

function pullQuestion() {
    
    // grab current question object from array
    let currentQuestion = quizQuestions[currentQuestionIndex];

    // fill in current question
    let questionTextEl = document.getElementById('question-text');
    questionTextEl.textContent = currentQuestion.text;

    // remove options from previous question
    optionsEl.innerHTML = '';

    // loop through all available options
    for (let i = 0; i < currentQuestion.options.length; i++) {
        // make new button appear for each option
        const option = currentQuestion.options[i];
        const optionNode = document.createElement('button');
        optionNode.setAttribute("class", "option");
        optionNode.setAttribute("value", option);

        // make created options appear on page
        optionsEl.appendChild(optionNode)
    }
}



function timerCountdown() {
    time--;
    clockEl.textContent = time;
}

startQuiz ();