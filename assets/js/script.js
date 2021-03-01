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
var timeLeft = 75;
var currentQuestionIndex = 0;
var questionEl = document.createElement("div");
var answerEl = document.createElement("div");


const deleteEl = function(El) {
    El.remove();
};

var addQuestion = function() {
    for (var i=0; i < questions.length; i++) {
        questionEl.id = "question";
        // add h3 for question
        questionEl.className = "question";
        questionEl.innerHTML = `<h3 class='question'>${questions[currentQuestionIndex].question}</h3>`;
        questionBody.appendChild(questionEl);
    };
};

var addAnswers = function() {
    answerEl.id= "answer";
    // answer buttons
    answerEl.innerHTML = `<button class='answer' onclick="notification('a')">${questions[currentQuestionIndex].answers.a}</button><button class='answer' onclick="notification('b')">${questions[currentQuestionIndex].answers.b}</button><button class='answer' onclick="notification('c')">${questions[currentQuestionIndex].answers.c}</button><button class='answer' onclick="notification('d')">${questions[currentQuestionIndex].answers.d}</button>`
    questionBody.appendChild(answerEl);
};

function notification(answer) {
    var p = document.createElement("p");
    if (answer === questions[currentQuestionIndex].correctAnswer) {
        p.innerHTML = "Correct!"
    } else {
        p.innerHTML = "Wrong!"
        timeLeft -= 10;
    }
    questionBody.appendChild(p);

    deleteEl(questionEl);
    deleteEl(answerEl);
    currentQuestionIndex++;
    addQuestion();
    addAnswers();
}

const changeTime = function() {
    var timerEl = document.querySelector("#timer");

    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            // subtract `timeLeft` by 1
            timeLeft--;
        } else {
        //  timerEl.textContent = '';
          //  clearInterval(timeInterval);
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

const endQuiz = function() {
    // when questions are out
    // stop clock
    if (questions.currentQuestionIndex > questions.length) {
        clearInterval(changeTime);
    }
    // display "<h3>All Done!</h3>"
    // display "<p> Your final score is ${timeLeft}"
    // display "Enter initials form and input with submit button"
   // questionBody.innerHTML = "";
   // var newTextField = document.createElement("input");
   // newTextField.id = "initials";
    // var submit = document.createElement("button");
   // submit.addEventListener('click', saveScore);
   // questionBody.appendChild(newTextField);
  //  questionBody.appendChild(submit);
};

const saveScore = function() {
    //var name = document.getElementById("initials").value;
    //var leaderBoard = JSON.parse(localStorage.getItem('leaderBoard'));

    //leaderBoard = [name, score];

   // localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
};

// click start button
startButtonEl.addEventListener("click", startButtonHandler);
