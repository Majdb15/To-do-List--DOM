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
    navAndButtonContainer.style.backgroundColor='white'
    navAndButtonContainer.style.width='1vw'
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