var formEl =document.querySelector ("#task-form");
var tasksToDoEL = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.log(taskTypeInput);

    var listItemEL =document.createElement("li");
    listItemEL.className = "task-item";
    //create div to hold task info and add to list item
    var taskInfoEL = document.createElement("div");
    //give it a class name
    taskInfoEL.className = "task-info";
    //add html content to div
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    
    listItemEL.appendChild(taskInfoEL);
    
    // add entire list item to list
    tasksToDoEL.appendChild(listItemEL);

}

formEl.addEventListener("submit", createTaskHandler);

