// const from DOM
const startButtonEl = document.querySelector("#start-btn");
const questionBody = document.querySelector("#question-body");
const codeInstructionsEl = document.querySelector("#code-instructions");
const questionEl = document.querySelector("#question");
const answer1El = document.querySelector("#answer1");
const answer2El = document.querySelector("#answer2");
const answer3El = document.querySelector("#answer3");
const answer4El = document.querySelector("#answer4");

var currentQuestionIndex = 0;

const deleteEl = function(El) {
    El.remove();
};

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

var addQuestion = function() {
    // add h3 for question
    var question = document.createElement("h3");
    question.className = "question";
    question.innerHTML = questions[0].question;
    questionEl.appendChild(question);
};

var addAnswers = function() {
    // answer 1 button
    var answerEl = document.createElement("button");
    answerEl.className = "answer";
    answerEl.innerHTML = questions[0].answers.a
    answer1El.appendChild(answerEl);

    // answer 2 button
    var answerEl = document.createElement("button");
    answerEl.className = "answer";
    answerEl.innerHTML = questions[0].answers.b
    answer2El.appendChild(answerEl);

    // answer 3 button
    var answerEl = document.createElement("button");
    answerEl.className = "answer";
    answerEl.innerHTML = questions[0].answers.c
    answer3El.appendChild(answerEl);

    // answer 4 button
    var answerEl = document.createElement("button");
    answerEl.className = "answer";
    answerEl.innerHTML = questions[0].answers.d
    answer4El.appendChild(answerEl);
};



const changeTime = function() {
    var timerEl = document.querySelector("#timer");
    var timeLeft = 75;

    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            // subtract `timeLeft` by 1
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            alert('You have run out of time!');
        }
    }, 1000);
};

const startButtonHandler = function() {
    // remove coding quiz text & start button
    deleteEl(codeInstructionsEl);
    // add html elements for question and answer buttons
    addQuestion();
    addAnswers();
    // change the time (and make it count down)
    changeTime();
};

// click start button
startButtonEl.addEventListener("click", startButtonHandler);

// once click answer button
var clickAnswerButton = function() { 
    var answerOb = answers.answer
    answerOb.onclick = function() {
    // skip to next question
    if(answerButtonEl.textContent != "Alerts") {
        // display "Wrong!" notification
        // reduce time by 15 seconds
       console.log("Boo!");
    } else {
        console.log("Yay!");
        // display "Correct!" noitification
    }
}
};

