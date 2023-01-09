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
let leaderboards = []


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
    questionEl.classList.remove('hide');
    // grab question and options
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

// pull quiz questions/options
function pullQuestion() {
    // grab current question object from array
    if (currentQuestionIndex === quizQuestions.length) {
        endQuiz()
        return
    }
    // fill in current question
    let currentQuestion = quizQuestions[currentQuestionIndex];
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
            checkAnswer(userAnswer);
        })
        // make created options appear on page
        optionsEl.appendChild(optionNode);
    }
}

function checkAnswer(answer) {
    // checks if answer is correct/incorrect
    if (answer === quizQuestions[currentQuestionIndex].answer) {        
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
        // deducts 10 seconds from clock as penalty for wrong answer
        time -= 10;
        // progresses quiz to next question
        currentQuestionIndex++;
        pullQuestion()
        // displays when incorrect answer is chosen
        responseEl.textContent = "Incorrect!";
        // sets style for correct answer
        responseEl.setAttribute('class', 'response-wrong');
        // hides response after it appears for one second
        setTimeout(function () {
            responseEl.setAttribute('class', 'response-wrong hide');
        }, 1000)
    }
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
   endPageEl.classList.remove('hide');
   // hide questions page
   questionEl.setAttribute('class', 'hide');
   // add score to end page
   let scoreEl = document.getElementById('score');
   scoreEl.textContent = time;
}

function findScores () {
    // Grabs all previous scores from local storage
    let allLeaderboards = JSON.parse(localStorage.getItem('leaderboards'))
    // fill leaderboards array with scores if found in local storage
    if (allLeaderboards !== null) {
        leaderboards = allLeaderboards;
    }
}

function saveScore () {
    // grabs initials from text box
    let initials = initialsEl.value.toUpperCase().trim()
    // makes sure there is text in the text box
    if(initials === '') {
        return
    } else {
        // add local storage scores
        findScores();
        // player data to be added to leaderboards
        let userScore = {
            score: time,
            initials: initials
        };
        // add latest score to leaderboards array that includes previous scores
        leaderboards.push(userScore);
        // save to local storage
        localStorage.setItem('leaderboards', JSON.stringify(leaderboards))
        // redirect to leaderboards page
        location.href = 'leaderboards.html';
    }
}

function pressEnter(event) {
    // initials will be submitted if user presses enter on keyboard
    if (event.key === 'Enter') {
        saveScore();
    }
}

// start quiz when start button is clicked
startBtn.addEventListener("click", startQuiz);

// submit final score to leaderboards after clicking submit button
submitBtn.addEventListener('click', saveScore)

// also add scores to leaderboards if enter is pressed on keyboard
initialsEl.onkeyup = pressEnter;