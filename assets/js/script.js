var formEl =document.querySelector ("#task-form");
var tasksToDoEL = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    formEl.reset();
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    //send it as an argument to createtaskEL
    createTaskEL(taskDataObj);


}
var createTaskEL = function(taskDataObj) {
    var listItemEL =document.createElement("li");
    listItemEL.className = "task-item";
    //create div to hold task info and add to list item
    var taskInfoEL = document.createElement("div");
    //give it a class name
    taskInfoEL.className = "task-info";
    //add html content to div
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEL.appendChild(taskInfoEL);
    
    // add entire list item to list
    tasksToDoEL.appendChild(listItemEL);
}

formEl.addEventListener("submit", taskFormHandler);

