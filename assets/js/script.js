var taskIdCounter= 0;
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

    //add task id as a custom attribute
    listItemEL.setAttribute("data-task-id", taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoEL = document.createElement("div");
    //give it a class name
    taskInfoEL.className = "task-info";
    //add html content to div
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    listItemEL.appendChild(taskInfoEL);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEL.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEL.appendChild(listItemEL);

    //increase task counter for next unique id
    taskIdCounter++;
}
var createTaskActions = function(taskId){
    var actionContainerEL = document.createElement("div");
    actionContainerEL.className ="task-actions";

    //create edit button
    var editButtonEL = document.createElement("button");
    editButtonEL.textContent = "Edit";
    editButtonEL.className = "btn edit-btn";
    editButtonEL.setAttribute("data-task-id", taskId);

    actionContainerEL.appendChild(editButtonEL);

    //create delete button
    var deleteButtonEL = document.createElement("button");
    deleteButtonEL.textContent ="Delete";
    deleteButtonEL.className = "btn delete-btn";
    deleteButtonEL.setAttribute("data-task-id", taskId);

    actionContainerEL.appendChild(deleteButtonEL);

    //drop down
    var statusSelectEL = document.createElement("select");
    statusSelectEL.className = "select-status";
    statusSelectEL.setAttribute("name", "status-change")
    statusSelectEL.setAttribute("data-task-id", taskId);

    actionContainerEL.appendChild(statusSelectEL);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++){
        //create option element
        var statusOptionEL = document.createElement("option");
        statusOptionEL.textContent = statusChoices[i];
        statusOptionEL.setAttribute("value", statusChoices[i]);
        //append to select
        statusSelectEL.appendChild(statusOptionEL);

    }

    return actionContainerEL;
};

formEl.addEventListener("submit", taskFormHandler);

