// Define a countdown function
function countdown() {
    let seconds = document.getElementById('seconds').value;

    function tick() {
        seconds = seconds -1;
        timer.innerHTML = seconds;
        let time = setTimeout(tick, 1000);
        if (seconds == -1) {
            alert("Time's up!");
            clearTimeout(time);
            timer.innerHTML = "";

        }    
    }
    tick();
}


// Automatically change the image every 4 seconds
let slideIndex = 0; // set initial slide index
showSlides(); // 

function showSlides() { // function to show slides
  let i; // declare variable i
  let slides = document.getElementsByClassName("mySlides"); // get all elements with class "mySlides"
  for (i = 0; i < slides.length; i++) { // loop through all slides
    slides[i].style.display = "none"; // hide all slides
  }
  slideIndex++; // increment slide index
  if (slideIndex > slides.length) {slideIndex = 1} // reset slide index if it exceeds number of slides
  slides[slideIndex-1].style.display = "block"; // show current slide
  setTimeout(showSlides, 3000); // Change image every 3 seconds
}