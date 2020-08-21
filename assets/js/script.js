var pageContentEL = document.querySelector("#page-content");
var taskIdCounter= 0;
var formEl =document.querySelector ("#task-form");
var tasksToDoEL = document.querySelector("#tasks-to-do");
var tasksInProgressEL = document.querySelector("#tasks-in-progress");
var tasksCompletedEL = document.querySelector("#tasks-completed");



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
    var isEdit = formEl.hasAttribute("data-task-id");
    
    //package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    //send it as an argument to createtaskEL
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = {
            name:taskNameInput,
            type:taskTypeInput
        };
        createTaskEL(taskDataObj);
    }



}
var completeEditTask = function( taskName, taskType, taskId){
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

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

var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
  
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    } 
    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      deleteTask(taskId);
    }
  };
var taskStatusChangeHandler = function(event){
//get the task items id
var taskId = event.target.getAttribute("data-task-id");
// get the curent;y selected options value and convert to lowercase
var statusValue = event.target.value.toLowerCase();

//find the parent task item element based on the id
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

if (statusValue === "to do"){
    tasksToDoEL.appendChild(taskSelected);
}
else if (statusValue === "in progress"){
    tasksInProgressEL.appendChild(taskSelected);
}
else if (statusValue === "completed") {
    tasksCompletedEL.appendChild(taskSelected);
}

};
var editTask = function(taskId){
    console.log("editing task #" + taskId);
    //get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")
    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};
var deleteTask =function(taskId){
var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
taskSelected.remove();
};
pageContentEL.addEventListener("click", taskButtonHandler);

pageContentEL.addEventListener("change", taskStatusChangeHandler);

