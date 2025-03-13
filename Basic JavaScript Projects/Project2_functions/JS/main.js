// main.js

// creating function with two variables
function student_info() {
    // Assigned two variables
    var studentName = "Amadou Jarju"; // created first variable
    var course = "JavaScript" // created second variable
    document.getElementById("student").innerHTML=studentName + " " + course; // invoke documet.getElementId() and concatenate the variables
}

// concatenating two strings using the += operator
function myFunction() {
    var sentence = "I will start playing football"; // created first variable
    sentence += " again in the summer."; //used += operator to add to the variable
    document.getElementById("Concatenate").innerHTML = sentence; // used document.getElementId()
}
