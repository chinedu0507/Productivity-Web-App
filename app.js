// Document variables
var minutes = document.getElementById('mins').value;
var seconds = document.getElementById('secs').value;
var form = document.getElementById('timer');
var tmins = document.getElementById('timer_mins');
var tsecs = document.getElementById('timer_secs');

// Event listeners
form.addEventListener('submit', display);



function display(e){
      console.log(minutes);
  e.preventDefault();
  // if((minutes >= 0 && minutes < 60) && (seconds >= 0 && seconds < 60)){
  //   if(minutes < 10){
  //     minutes = "0" + minutes;
  //   }
  //   if(seconds < 10){
  //     seconds = "0" + seconds;
  //   }
    tmins.innerHTML = minutes;
    tsecs.innerHTML = seconds;
  // } else console.log('Enter valid time'); //alert('Enter valid time');
}
