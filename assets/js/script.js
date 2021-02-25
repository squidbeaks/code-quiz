var startButtonEl = document.querySelector("#start-btn");
var codeInstructionsEl = document.querySelector("#code-instructions");

var deleteEl = function(El) {
    El.remove();
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var addQandA = function() {
    // add h3 for question
    var questionsAndAnswersEl = document.createElement("div");
    questionsAndAnswersEl.className = "questions-and-answers";
    questionsAndAnswersEl.innerHTML = "<h3 class='question'>Commonly used data types DO NOT include:</h3>"
    //.appendChild(questionAndAnswersEl);
    // add 4 buttons with different answers to questions
};

var changeTime = function() {

};

var startButtonHandler = function() {
    // remove coding quiz text & start button
    deleteEl(codeInstructionsEl);
    // add html elements for question and answer buttons
    addQandA();
    // change the time (and make it count down)
    changeTime();
};

// click start button
startButtonEl.addEventListener("click", startButtonHandler);

