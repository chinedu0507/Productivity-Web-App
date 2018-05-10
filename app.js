// DOM Elements
const showTime = document.querySelector('#time');
const buttons = document.querySelectorAll('[data-time]');
const clearScreen = document.querySelector('#clear');
const addRow = document.querySelector('#row');
const mainUL = document.querySelector('#main-ul')

// Variables
let countInterval;
let rowCounter = 0;

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

// Add row event listener
addRow.addEventListener('click', RowToAdd);

// Function to add row with two elements each containing a checkbox
function RowToAdd(){

  // Create main li element
  var li_main = document.createElement('li');

  // Create inner ul element
  var ul_inner = document.createElement('ul');

  // for loop to create 2 inner li elements with checkboxes
  for(var i = 0; i < 2; i++){
    // Create inner li element
    var li_inner = document.createElement('li');

    // Create checkbox element
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox'); // checkboxes are input types

    // Add class to checkbox
    check.className = 'checks';

    // Checkbox event Listener
    check.addEventListener('change', lightenBackground);

    // Add class to inner li
    li_inner.className = 'list1';

    // Append checkboxes to inner li
    li_inner.appendChild(check);

    // Append inner li to inner ul
    ul_inner.appendChild(li_inner);
  }

    // Append inner ul to main li
    li_main.appendChild(ul_inner);

    // Add class to main li
    li_main.className = 'main-li';

    // Add delete button
    var deleteBtn = document.createElement('button');

    // Add classes to button with font awesome
    deleteBtn.className = 'fas fa-trash-alt fa-sm btn delete';

    // Checkbox event Listener
    deleteBtn.addEventListener('click', deleteRow);

    // Append button to li
    li_main.appendChild(deleteBtn);

    // Append main li to the main ul
    mainUL.appendChild(li_main);



  // relate the rowCounter variable when the delete button is clicked

  // Increment row counter variable
  rowCounter++;

  if(rowCounter != 5){
    addRow.style.visibility = 'visible';
  }
  else{
    // alert and hide button
    alert('You can only create 5 rows');
    addRow.style.visibility = 'hidden';
  }

}

// Function to lighten the background when a checkbox is ticked
function lightenBackground(e){
  if(this.checked){
    this.parentElement.style.background = '#484982';
    this.parentElement.style.opacity = '0.64';
  }
  else{
    // this.style.background = 'red'; // change the background of check element
    this.parentElement.style.background = ''; // this uses the default background
  }
}

// Function to remove row when delete button is clicked
function deleteRow(e){
  if(confirm('Are you sure?')){
    var li = this.parentElement; // the li is the parent element of the button

  // Removing li from main ul
  mainUL.removeChild(li); // li is a child of the main ul

  rowCounter--;

  // Make add row button visible
  addRow.style.visibility = 'visible';
  }
}
