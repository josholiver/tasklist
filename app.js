// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All event Listeners
loadEventListeners();

function loadEventListeners(){
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);

    // Add task Event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click',removeTask);
    // Clear tasks
    clearBtn.addEventListener('click',clearTasks);
    // Filter task event
    filter.addEventListener('keyup',filterTasks);
}

// Get Tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(task));
    //Create a new link element
    const link = document.createElement('a');
    //Add Class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);
    });
}

// add Task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a Task');
    } 

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create a new link element
    const link = document.createElement('a');
    //Add Class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //Append the li to ul
    taskList.appendChild(li);

    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = "";

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; // if nothing is there set it to an empty array.
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }// if there is something set it to whatever is there

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains
        ('delete-item')){
            if(confirm('Are you Sure?')){
            e.target.parentElement.parentElement.remove();
            // Removed from the <-- DOM at this point -->
            
            // Removing from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }

        }
} 


function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []; // if nothing is there set it to an empty array.
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }// if there is something set it to whatever is there

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(){
    // taskList.innerHTML = "";

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    // Clear from Local Storage
    clearTasksFromLocalStorage();

}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}

