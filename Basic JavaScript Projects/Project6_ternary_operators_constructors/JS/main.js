// main.js for Project 6

// Ternary Operators: Creating a function that accept user input and checks eligibity to vote in elections
function voteFunction() {
    let Age, Can_vote;
    Age = document.getElementById("Age").value;
    Can_vote = (Age < 18) ? "You are NOT eligible":"You are eligibible";
    document.getElementById("vote").innerHTML = Can_vote + " to vote.";
}

// A constructor function using Keywords(new and this)
function Vehicle(Make, Model, Year, Color) {
    this.Vehicle_Make = Make;
    this.Vehicle_Model = Model;
    this.Vehicle_year = Year;
    this.Vehicle_Color = Color;
}
let Jack = new Vehicle("Dodge", "Viper", 2020, "Red");
let Emily = new Vehicle("Jeep", "Trail Hawk", 2019, "White and Black");
let Erik = new Vehicle("Ford", "Pinto", 1971, "Mustard");
function myFunction() {
    document.getElementById("Keywords_and_Constructors").innerHTML =
    "Erik drives a " + Erik.Vehicle_Color + "-colored " + Erik.Vehicle_Model +
    " manufactured in " + Erik.Vehicle_year;
}

// Use the "new" keyword to create a current Date and time object
let Date_and_Time = new Date(); // Creates a new object representing the current date and time

// Display the result in the HTML
document.getElementById("date").textContent = `The current date and time is: ${Date_and_Time}`;

// Nested Function
function math_Function() {
    document.getElementById("Nested_Function").innerHTML = Count();
    function Count() {
        let Num1 = 30;
        function Num2() {Num1 += 20;}
        Num2();
        return Num1;
    }
} 