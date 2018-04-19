// DOM Elements
const showTime = document.querySelector('#time');
const buttons = document.querySelectorAll('[data-time]');
const clearScreen = document.querySelector('#clear');

// Variables
let countInterval;

// Functions
function timer(seconds){
   // Clear any existing timers
  clearInterval(countInterval);

   // Current time in milliseconds
  const now = Date.now();

  // When timer supposed to end
  const end = now + seconds*1000;

  // Display time before countdown begins
  displayTime(seconds);

  countInterval = setInterval(() => {
  const secondsLeft = Math.round((end - Date.now())/1000);

  // Check to stop interval
  if(secondsLeft < 0){
    clearInterval(countInterval); // need to assign setInterval to a variable in order to use the clearInterval function

    // Change title back to its default
    document.title = 'ProdApp';
    return;
  }
  // Display Time
  displayTime(secondsLeft);

  }, 1000);
}

// Display time function
function displayTime(seconds){
  let minutes = Math.floor(seconds / 60);
  let remainingSecs = seconds % 60;

  minutes = minutes < 10 ? '0' + minutes : minutes;
  remainingSecs = remainingSecs < 10 ? '0' + remainingSecs : remainingSecs;

  let display = `${minutes}:${remainingSecs}`;

   // display time in title of document
  document.title = display;

  // displaying time in main document
  showTime.textContent = display;
}

// Start timer function
function startTimer(){

  // Convert time datasets to integers
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

// Function to clear the countdown screen
function clearTime(){

  // Clear the timer
  clearInterval(countInterval);

  // Display nothing in the timer div
  showTime.textContent = '';

  // Change title back to its default
  document.title = 'ProdApp';
}


// Clear button event listener
clearScreen.addEventListener('click', clearTime);

// Button Event Listeners, startTimer function called when a button is clicked
buttons.forEach(button => button.addEventListener('click', startTimer));


// Timer function is called when user submits number of minutes to countdown
document.form.addEventListener('submit', function(e){
  // Prevent default submit action
  e.preventDefault();

   // retrieve inputted minutes from form
  mins = this.minutes.value;

  // Call timer function
  timer(mins*60);

  // Clear input form
  this.reset();
});
