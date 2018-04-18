// DOM Elements
const showTime = document.querySelector('#time');
const buttons = document.querySelectorAll('[data-time]')

// Variables
let countInterval;

// Functions
function timer(seconds){
  clearInterval(countInterval); // clear any existing timers
  const now = Date.now(); // current time in milliseconds
  const end = now + seconds*1000; // when timer supposed to end
  displayTime(seconds);

  countInterval = setInterval(() => {
  const secondsLeft = Math.round((end - Date.now())/1000);

  // Check to stop interval
  if(secondsLeft < 0){
    clearInterval(countInterval); // need to assign setInterval to a variable in order to use the clearInterval function
    return;
  }

  // Display Time
  displayTime(secondsLeft);

  }, 1000);
}

function displayTime(seconds){
  let minutes = Math.floor(seconds / 60);
  let remainingSecs = seconds % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  remainingSecs = remainingSecs < 10 ? '0' + remainingSecs : remainingSecs;

  let display = `${minutes}:${remainingSecs}`;

  document.title = display; // display time in title of document
  showTime.textContent = display; // displaying time in main document
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.form.addEventListener('submit', function(e){
  e.preventDefault();

  mins = this.minutes.value; // retrieve inputted minutes from form
  timer(mins*60);
  this.reset(); // to clear out the form
});
