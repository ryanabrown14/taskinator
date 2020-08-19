var buttonEL = document.querySelector("#save-task");
var tasksToDoEL = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEL =document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "this is a new task.";
    tasksToDoEL.appendChild(listItemEL);

}

buttonEL.addEventListener("click", createTaskHandler);

