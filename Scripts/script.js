// Make the navbar disappear and appear by clicking on the 3-bars button
const threeBarsButton = document.querySelector('.nav-toggle-button');
const navBar = document.querySelector('.nav-bar');
const navAndButtonContainer = document.querySelector('.nav-bar-and-button');
const rightSection = document.querySelector('.right-section');

threeBarsButton.addEventListener('click', function() {
    if (navBar.style.transform === 'translateX(-100%)') {
        navBar.style.transform = 'translateX(0)';
        threeBarsButton.style.transform = 'translateX(0)';
        navAndButtonContainer.style.backgroundColor = '#EDE8E8';
        rightSection.style.width = '70vw';
        navAndButtonContainer.style.width = '20vw';
    } else {
        navBar.style.transform = 'translateX(-100%)';
        threeBarsButton.style.transform = 'translateX(-635%)';
        navAndButtonContainer.style.backgroundColor = '#d2d9dd';
        navAndButtonContainer.style.width = '15vw';
        rightSection.style.width = '70vw';
    }
});

// Function to display today's date on the right section of the web page
function displayCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // January is 0, so we add 1
    var year = currentDate.getFullYear();
    var formattedDate = day + '-' + month + '-' + year;
    document.querySelector('#currentDate').textContent = formattedDate;
}
// Function to display today's time on the right section of the web page
function displayCurrentTime() {
    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const formattedTime = hours + ':' + minutes + ':' + seconds;
    document.querySelector('#currentTime').textContent = formattedTime;
}
// Update the time every second
setInterval(displayCurrentTime, 1000);

//handler on loading DOM for both date and time
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    displayCurrentTime(); // Initial call to display time immediately
});

// Function to make the text decoration of marked to-do to line-through
document.addEventListener('change', function(event) {
const toDoCheckBox = document.querySelectorAll('.circle-checkbox input[type="checkbox"]');
const markedToDos = document.querySelectorAll('.text-to-line');

for (let i = 0; i < toDoCheckBox.length; i++) {
    toDoCheckBox[i].addEventListener('change', function() {
        if (toDoCheckBox[i].checked) {
            markedToDos[i].style.textDecoration = 'line-through';
            markedToDos[i].style.opacity = '0.5';
        } else {
            markedToDos[i].style.textDecoration = 'none';
            markedToDos[i].style.opacity = '1';
        }
    });
    
}
});

// Function to toggle popup
function togglePopup() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
}

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    let i = 0;
    const form = document.querySelector('.form-container');

    // Load tasks from local storage
    loadTasksFromLocalStorage();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        console.log(document.querySelector('#dueTime').value)
        const task = {
            taskID: 'to-doo' + (i++),
            taskName: document.querySelector('#taskName').value,
            dueDate: document.querySelector('#dueDate').value,
            dueTime: document.querySelector('#dueTime').value,
            assigneeName: document.querySelector('#assigneeName').value,
            taskType: document.querySelector('#taskType').value
        };
        fillTaskList(task);
        savetoDos(task);
        checkOverdueTasks();
        form.reset();
    });

    function fillTaskList(task) {
        console.log(task);
        let taskHTML = `
            <div class="task-container" id="container-${task.taskID}">
                <div class="${task.taskType === 'self' ? 'my-project-add' : 'my-team-project-add'}" id="${task.taskID}">
                    <div class="project-name-icon">
                        <label class="circle-checkbox">
                            <input type="checkbox">
                            <span></span>
                        </label>
                        <p class="text-to-line">${task.taskName}</p>
                        <a class="trash-task"><i class="fa-solid fa-trash-can fa-2x"></i></a>
                    </div>
                    <div class="my-project-due-date">
                        <p class="due-date">${task.dueDate}</p>
                        <i class="fa-solid fa-calendar-day fa"></i>
                        <p class="due-time">${task.dueTime} PM</p>
                        <i class="fa-regular fa-clock"></i>
                    </div>
                </div>
                <hr>
            </div>`;
        
        if (task.taskType === 'self') {
            const selfProjects = document.querySelector('.my-projects');
            selfProjects.innerHTML += taskHTML;
        } else if (task.taskType === 'team') {
            const teamProjects = document.querySelector('.team-projects');
            teamProjects.innerHTML += taskHTML;
        }

        // Add event listener for newly added trash can icon
        document.querySelectorAll('.trash-task').forEach(trashIcon => {
            trashIcon.addEventListener('click', function() {
                const containerId = this.closest('.task-container').id;
                deleteTask(containerId);
            });
        });
        //checkOverdueTasks();
    }

    function deleteTask(containerID) {
        if (confirm("Are you sure to delete?")) {
            document.getElementById(containerID).remove();
            deleteToDos(containerID.replace('container-', ''));
        }
    }

    function checkOverdueTasks() {
        const currentDateTime = new Date();
    
        // Check team projects
        const teamTaskContainers = document.querySelectorAll('.my-team-project-due-date');
        for (let i = 0; i < teamTaskContainers.length; i++) {
            const container = teamTaskContainers[i];
            const dueDateElement = container.querySelector('.due-date');
            const dueTimeElement = container.querySelector('.due-time');
    
            if (dueDateElement && dueTimeElement) {
                const dueDateText = dueDateElement.textContent;
                const dueTimeText = dueTimeElement.textContent;
    
                // Extract date and time components
                const [dateYear, dateMonth, dateDay] = dueDateText.split('-');
                const [timeHours, timeMinutes] = dueTimeText.match(/\d+/g);
    
                // Create a new Date object
                const dueDateTime = new Date(dateYear, dateMonth - 1, dateDay, timeHours, timeMinutes);
    
                // Compare current time with due time
                if (currentDateTime.getTime() > dueDateTime.getTime()) {
                    dueDateElement.style.color = 'red';
                    dueTimeElement.style.color = 'red';
                } else {
                    dueDateElement.style.color = ''; // Reset color if not overdue
                    dueTimeElement.style.color = '';
                }
            } else {
                console.error('Error: Missing due-date or due-time element in team task container');
            }
        }
    
        // Check self projects
        const selfTaskContainers = document.querySelectorAll('.my-project-due-date');
        for (let i = 0; i < selfTaskContainers.length; i++) {
            const container = selfTaskContainers[i];
            const dueDateElement = container.querySelector('.due-date');
            const dueTimeElement = container.querySelector('.due-time');
    
            if (dueDateElement && dueTimeElement) {
                const dueDateText = dueDateElement.textContent;
                const dueTimeText = dueTimeElement.textContent;
    
                // Extract date and time components
                const [dateYear, dateMonth, dateDay] = dueDateText.split('-');
                const [timeHours, timeMinutes] = dueTimeText.match(/\d+/g);
    
                // Create a new Date object
                const dueDateTime = new Date(dateYear, dateMonth - 1, dateDay, timeHours, timeMinutes);
    
                // Compare current time with due time
                if (currentDateTime.getTime() > dueDateTime.getTime()) {
                    dueDateElement.style.color = 'red';
                    dueTimeElement.style.color = 'red';
                } else {
                    dueDateElement.style.color = ''; // Reset color if not overdue
                    dueTimeElement.style.color = '';
                }
            } else {
                console.error('Error: Missing due-date or due-time element in self task container');
            }
        }
    }
    
    // Run checkOverdueTasks initially and every minute
    checkOverdueTasks();
    setInterval(checkOverdueTasks, 60000);

    //LOCAL STORAGE
    function loadTasksFromLocalStorage() {
        const tasks = getToDos();
        tasks.forEach(task => fillTaskList(task));
    }

    function savetoDos(taskObject) {
        const tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks.push(taskObject);
        localStorage.setItem('todos', JSON.stringify(tasks));
    }

    function getToDos() {
        const todos = localStorage.getItem('todos') || "[]";
        return JSON.parse(todos);
    }

    function deleteToDos(taskId) {
        let tasks = JSON.parse(localStorage.getItem('todos')) || [];
        tasks = tasks.filter(task => task.taskID !== taskId);
        localStorage.setItem('todos', JSON.stringify(tasks));
    }
});
