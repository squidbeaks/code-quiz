const questions = [
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
const quizBody = document.querySelector("#quiz-body");
const codeInstructionsEl = document.querySelector("#code-instructions");
const questionEl = document.createElement("div");
const answerEl = document.createElement("div");
const countDown = document.querySelector("#countdown");
const highScoresEl = document.querySelector("#high-scores");
const timerEl = document.querySelector("#timer");

var timeLeft = 75;
var currentQuestionIndex = 0;
var timeInterval;
var name;
var score;
var notificationEl = document.createElement("div");
notificationEl.id = "notification";

const deleteEl = function(El) {
    El.remove();
};

const addQuestion = function(question) {
    questionEl.id = "question";
    questionEl.className = "question";
    questionEl.innerHTML = `<h3 class='question'>${question}</h3>`;

    quizBody.appendChild(questionEl);
};

const addAnswers = function(answers) {
    answerEl.id= "answer";
    answerEl.innerHTML = `<button onclick="notification('a')">${answers.a}</button>
    <button onclick="notification('b')">${answers.b}</button>
    <button onclick="notification('c')">${answers.c}</button>
    <button onclick="notification('d')">${answers.d}</button>`

    quizBody.appendChild(answerEl);
};

const nextQuestion = function() {
    deleteEl(questionEl);
    deleteEl(answerEl);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        addQuestion(questions[currentQuestionIndex].question);
        addAnswers(questions[currentQuestionIndex].answers);
    }

    if (notificationEl.querySelector("notification") != null) {
        deleteEl(notificationEl);
    }
}

const notification = function(answer) {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        notificationEl.innerHTML = "<p>Correct!</p>"
    } else {
        notificationEl.innerHTML = "<p>Wrong!</p>"
        timeLeft -= 10;
    }

    quizBody.appendChild(notificationEl);

    nextQuestion();
};

const changeTime = function() {
    timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            countDown.textContent = timeLeft;
            if (currentQuestionIndex >= questions.length) {
                endQuiz();
            }
            timeLeft--;
        }
        else {
            timeLeft = 0;
            countDown.textContent = timeLeft;
            endQuiz();
        }
    }, 1000);
};

const startButtonHandler = function() {
    deleteEl(codeInstructionsEl);
    addQuestion(questions[currentQuestionIndex].question);
    addAnswers(questions[currentQuestionIndex].answers);
    changeTime();
};

const endQuiz = function() {
    clearInterval(timeInterval);

    if (timeLeft < 0) {
        timeLeft = 0;
    }

    quizBody.innerHTML = "";

    let allDone = document.createElement("h3");
    allDone.id = "all-done";
    allDone.innerText = "All Done!"

    let finalScore = document.createElement("p");
    finalScore.innerText = `Your final score is ${timeLeft}`;

    let initialsText = document.createElement("p");
    initialsText.innerText = "Enter initials";

    let initialsEl = document.createElement("input");
    initialsEl.id = "initials";

    let submit = document.createElement("button");
    submit.className = "button";
    submit.innerText = "Submit";
    submit.addEventListener('click', saveScore);

    quizBody.appendChild(allDone);
    quizBody.appendChild(finalScore);
    quizBody.appendChild(initialsText);
    quizBody.appendChild(initialsEl);
    quizBody.appendChild(submit);
};

const saveScore = function() {
    initials = document.getElementById("initials").value;
    score = timeLeft;

    localStorage.setItem("initials", initials);
    localStorage.setItem("score", score);

    quizBody.innerHTML = "";
    displayScores();
};

const displayScores = function() {
    deleteEl(highScoresEl);
    deleteEl(timerEl);
    if (localStorage.getItem("score") === null) {
        quizBody.innerHTML =
        `<h2>There is no high score yet! Play the game to claim your title!<h2>`;
    } else {
        quizBody.innerHTML =
        `<h2>` + localStorage.getItem("initials") + " has the high score of " + localStorage.getItem("score") + `</h2>
        <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;
    }
}

const clearScore = function() {
    localStorage.clear();
    resetGame();
}

const resetGame = function() {
    location.reload();
}

const highScoreLink = function () {
    deleteEl(codeInstructionsEl);
    displayScores();
};

startButtonEl.addEventListener("click", startButtonHandler);

highScoresEl.addEventListener("click", highScoreLink);
