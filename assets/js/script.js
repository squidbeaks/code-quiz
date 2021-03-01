var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers"
            },
        correctAnswer: "c",
    },
    {
        question: "The condition in an if / else statement is enclosed with ____________.",
        answers: {
            a: "quotes",
            b: "curly brackets",
            c: "paranthesis",
            d: "square brackets"
            },
        correctAnswer: "c",
    },
    {
        question: "Arrays in Javascript can be used to store __________.",
        answers: {
            a: "numbers and strings",
            b: "other arrays",
            c: "booleans",
            d: "all of the above"
            },
        correctAnswer: "d",
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: {
            a: "commas",
            b: "curly brackets",
            c: "quotes",
            d: "paranthesis"
            },
        correctAnswer: "c",
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: {
            a: "JavaScript",
            b: "terminal/bash",
            c: "for loops",
            d: "console.log"
            },
        correctAnswer: "d"
    }
];

const startButtonEl = document.querySelector("#start-btn");
const questionBody = document.querySelector("#question-body");
const codeInstructionsEl = document.querySelector("#code-instructions");
var timeLeft = 5;
var currentQuestionIndex = 0;
var questionEl = document.createElement("div");
var answerEl = document.createElement("div");
var timerEl = document.querySelector("#timer");
var highScoresEl = document.querySelector("#high-scores");
var timeEl = document.querySelector("#time");
var timeInterval;
var name;
var score;

const deleteEl = function(El) {
    El.remove();
};

var addQuestion = function(question) {
    questionEl.id = "question";
    // add h3 for question
    questionEl.className = "question";
    questionEl.innerHTML = `<h3 class='question'>${question}</h3>`;
    questionBody.appendChild(questionEl);
};

var addAnswers = function(answers) {
    answerEl.id= "answer";
    // answer buttons
    answerEl.innerHTML = `<button class='answer' onclick="notification('a')">${answers.a}</button><button class='answer' onclick="notification('b')">${answers.b}</button><button class='answer' onclick="notification('c')">${answers.c}</button><button class='answer' onclick="notification('d')">${answers.d}</button>`
    questionBody.appendChild(answerEl);
};

function notification(answer) {
    var p = document.createElement("div");
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        p.innerHTML = "<p>Correct!</p>"
    } else {
        p.innerHTML = "<p>Wrong!</p>"
        timeLeft -= 10;
    }
    questionBody.appendChild(p);

    deleteEl(questionEl);
    deleteEl(answerEl);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        addQuestion(questions[currentQuestionIndex].question);
        addAnswers(questions[currentQuestionIndex].answers);
    }
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
    }
};

const changeTime = function() {
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            timeLeft--;
        }
        else {
            timerEl.textContent = timeLeft;
            endQuiz();
        }
    }, 1000);

    if (timeLeft < 0) {
        timeLeft = 0
    }
};

const startButtonHandler = function() {
    // remove coding quiz text & start button
    deleteEl(codeInstructionsEl);
    // add html elements for question and answer buttons
    addQuestion(questions[currentQuestionIndex].question);
    addAnswers(questions[currentQuestionIndex].answers);
    // change the time (and make it count down)
    changeTime();
};

// click start button
startButtonEl.addEventListener("click", startButtonHandler);

const endQuiz = function() {
    // when questions are out
    // stop clock
    clearInterval(timeInterval);
    // clear questionBody
    questionBody.innerHTML = "";
    // display "<h3>All Done!</h3>"
    const allDone = document.createElement("h3");
    allDone.innerText = "All Done!"
    questionBody.appendChild(allDone);
    // display "<p> Your final score is ${timeLeft}"
    const finalScore = document.createElement("p");
    finalScore.innerText = `Your final score is ${timeLeft}`;
    questionBody.appendChild(finalScore);
    // display "Enter initials form and input with submit button"
    const initialsText = document.createElement("p");
    initialsText.innerText = "Enter initials";
    questionBody.appendChild(initialsText);

    const initialsEl = document.createElement("input");
    initialsEl.id = "initials";
    questionBody.appendChild(initialsEl);

    var submit = document.createElement("button");
    submit.innerText = "Submit";
    submit.addEventListener('click', saveScore);
    questionBody.appendChild(submit);
};




const saveScore = function() {
    //leaderBoard = [name, score];
    name = document.getElementById("initials").value;
    score = timeLeft;
    if (score < 0) {
        score = 0;
    }
    localStorage.setItem("name", name);
    localStorage.setItem("score", score);

    //localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
    //var leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));

    questionBody.innerHTML = "";
    deleteEl(highScoresEl);
    deleteEl(timeEl);
    displayScores();
};

const displayScores = function() {
    questionBody.innerHTML =
    `
    <h2>` + localStorage.getItem("name") + "has the high score of " + localStorage.getItem("score") + `</h2>
    <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
    `;
}

const clearScore = function() {
    localStorage.clear();

    resetGame();
}

const resetGame = function() {
    location.reload();
}

//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score