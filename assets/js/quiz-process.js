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
    // begin clock
    timerCountdown();
    // show full clock time
    clockEl.textContent = time;
    // hide the start page
    let startPageEl = document.getElementById('start-page');
    startPageEl.setAttribute('class', 'hide');
    // show the question
    questionEl.removeAttribute('class');
    
    
    // start the clock countdown
    // time = setInterval(timerCountdown, 1000);
    
    pullQuestion();
    
}

// starting timer
function timerCountdown() {
    timer = setInterval(function() {
        time--;
        clockEl.textContent = time;
        if (time <= 0) {
            // call function that handles end of quiz when created
            endQuiz();
        }
    }, 1000)
}

function pullQuestion() {
    
    // grab current question object from array
    let currentQuestion = quizQuestions[currentQuestionIndex];
    if (currentQuestionIndex === quizQuestions.length) {
        endQuiz()
    }
    

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
        optionNode.textContent = option

        optionNode.addEventListener('click', () => {
            const userAnswer = this.event.target.value;
            // console.log(userAnswer);
            checkAnswer(userAnswer);
        })
        // make created options appear on page
        optionsEl.appendChild(optionNode);
        // console.log(quizQuestions[currentQuestionIndex].options[i]);
        
    }

    // do nothing if user clicks on elements other than listed buttons
}

function checkAnswer(answer) {
    console.log(answer);

//    let buttonEl = event.target
//     if (!buttonEl.matches('.option')) {
//         return;
//     }

    if (answer === quizQuestions[currentQuestionIndex].answer) {
        // console.log(quizQuestions[currentQuestionIndex].answer);
        
        // progresses quiz to next question
        currentQuestionIndex++
        pullQuestion()

        // displays when correct answer is chosen
        responseEl.textContent = "Correct!"

        // sets style for correct answer
        responseEl.setAttribute('class', 'response-right')

        // hides response after it appears for one second
        setTimeout(function () {
            responseEl.setAttribute('class', 'response-right hide')
        }, 1000)

    } else {
        // progresses quiz to next question
        currentQuestionIndex++;
        pullQuestion()
        
        // deducts 10 seconds from clock as penalty for wrong answer
        time -= 10;

        // stops quiz if time is less than 0
        // if (time < 0) {
        //     time == 0;
        //     endQuiz();
        // }

        // displays when incorrect answer is chosen
        responseEl.textContent = "Incorrect!";
        
        // sets style for correct answer
        responseEl.setAttribute('class', 'response-wrong');

        // hides response after it appears for one second
    setTimeout(function () {
        responseEl.setAttribute('class', 'response-wrong hide');
    }, 1000)

    }

    // show correct or incorrect for one second
    // responseEl.setAttribute('class', 'response')
    // setTimeout(function () {
    //     responseEl.setAttribute('class', 'response hide')
    // }, 1000)
    
}

function endQuiz() {
    // stop clock
    clearInterval(timer);
   // update clock to 0 if ending time is negative
    if (time < 0) {
        time = 0;
    }
    clockEl.textContent = time;
    // show end page to submit score
   let endPageEl = document.getElementById('end-page');
   endPageEl.removeAttribute('class');
    // hide questions page
   questionEl.setAttribute('class', 'hide');
    // add score to end page
    let scoreEl = document.getElementById('score');
    scoreEl.textContent = time;
}

// startQuiz ();

// start quiz when start button is clicked
startBtn.addEventListener("click", startQuiz);

// progress quiz when user selects an option
// optionsEl.addEventListener('click', () => {
//     const userAnswer = this.event.target.value;
//     // console.log(userAnswer);
//     checkAnswer(userAnswer);
//     // if (!userAnswer.matches('.option')) {
//     //     return;
//     // }
// })

// optionsEl.addEventListener('click', checkAnswer)
