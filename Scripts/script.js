//make the navbar disappear and appear clicking on the 3bars-button:
/* */
const threeBarsButton = document.querySelector('.nav-toggle-button');
const navBar = document.querySelector('.nav-bar');
const navAndButtonContainer = document.querySelector('.nav-bar-and-button')

threeBarsButton.addEventListener('click', function() {
  if (navBar.style.transform === 'translateX(-100%)') {
    navBar.style.transform = 'translateX(0)';
    threeBarsButton.style.transform = 'translateX(0)';
    navAndButtonContainer.style.backgroundColor='#EDE8E8'
  } else {
    navBar.style.transform = 'translateX(-100%)';
    threeBarsButton.style.transform = 'translateX(-655%)';
    navAndButtonContainer.style.backgroundColor='white'
  }
});

