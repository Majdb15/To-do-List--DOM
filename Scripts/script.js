//make the navbar disappear and appear clicking on the 3bars-button:
const threeBarsButton = document.querySelector('.nav-toggle-button');
const navBar = document.querySelector('.nav-bar');
const navAndButtonContainer = document.querySelector('.nav-bar-and-button')
const rightSection = document.querySelector('.right-section')

threeBarsButton.addEventListener('click', function() {
  if (navBar.style.transform === 'translateX(-100%)') {
    navBar.style.transform = 'translateX(0)';
    threeBarsButton.style.transform = 'translateX(0)';
    navAndButtonContainer.style.backgroundColor='#EDE8E8'
    rightSection.style.width='70vw';
    navAndButtonContainer.style.width='20vw'
  } else {
    navBar.style.transform = 'translateX(-100%)';
    threeBarsButton.style.transform = 'translateX(-655%)';
    navAndButtonContainer.style.backgroundColor='#d2d9dd'
    navAndButtonContainer.style.width='15vw'
    rightSection.style.width='81vw';
  }
});

//Function to display today's date on the right section of the web page
//called when loading body everytime
function displayCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // January is 0, so we add 1
    var year = currentDate.getFullYear();
    var formattedDate = day + '-' + month + '-' + year;
    document.querySelector('#currentDate').textContent = formattedDate;
}

//Function to make the text decoration of marked to-do to line-through

const toDoCheckBox = document.querySelectorAll('.circle-checkbox input[type="checkbox"]');
const markedToDos = document.querySelectorAll('.text-to-line');

// Add an event listener to each checkbox to handle the change event
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


//now let's work on adding the task
function togglePopup() { 
  const overlay = document.getElementById('popupOverlay'); 
  overlay.classList.toggle('show');
}

const submitTask = document.querySelector('.btn-submit');
const form = document.querySelector('.form-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const task = {
            taskName: document.querySelector('#taskName').value,
            dueDate: document.querySelector('#dueDate').value,
            assigneeName: document.querySelector('#assigneeName').value,
            taskType: document.querySelector('#taskType').value
        };
        fillTaskList(task);
        form.reset();
    });
      
    function fillTaskList(task){
      console.log(task)
      if(task.taskType=='self'){
        const selfProjects= document.querySelector('.my-projects');
        selfProjects.innerHTML+=`<div class="my-project-add">
        <div class="project-name-icon">
            <label class="circle-checkbox">
                <input type="checkbox">
                <span></span>
            </label>
            <p class="text-to-line">${task.taskName}</p>
            <a href="$"><i class="fa-solid fa-trash-can fa-2x"></i></a>
        </div>
        <div class="my-project-due-date">
            <p class="due-date">${task.dueDate}</p>
            <i class="fa-regular fa-clock"></i>
        </div>
    </div>
    <hr>`
      }
      else if(task.taskType=='team'){
        const teamProjects = document.querySelector('.team-projects');
        teamProjects.innerHTML+=`<div class="my-team-project-add">
        <div class="team-project-name-icon">
            <label class="circle-checkbox">
                <input type="checkbox">
                <span></span>
            </label>
            <p class="text-to-line">"${task.taskName}"</p>
            <a href="$"><i class="fa-solid fa-trash-can fa-2x"></i></a>
        </div>
        <div class="my-team-project-due-date">
            <p class="due-date">"${task.dueDate}"</p>
            <i class="fa-regular fa-clock"></i>
        </div>
    </div>
    <hr>`
      }
    }

