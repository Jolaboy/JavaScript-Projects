// scripts for project 10

// creating a while loop
function Call_whileLoop() {    // function to call while loop
    // while loop to display numbers 1-9
    let Digit = "";    // variable to hold the numbers
    let X = 1;   // variable to hold the starting number
    while (X < 10) {    // while loop to check if X is less than 10
        Digit += "</br>" + X;  
        X++;   // increment X by 1
    }
    document.getElementById("whileLoop").innerHTML = Digit; // display the numbers in the HTML element with id "whileLoop"
}

// Creating a for loop 
let Footballers = ["Messi", "Ronaldo Nazario", "Pele", "Maradona", "Rivaldo", "Zidane", "Jarju", "Kaka"];
    let Content = "";
    let Y;
function Call_forLoop() {
    for (Y = 0; Y < Footballers.length; Y++) {
        Content += Footballers[Y] + "</br>"; // concatenate the names of the footballers
    }
    document.getElementById("forloop").innerHTML = Content; // display the names in the HTML element 
}

// Creating an array function
function Call_arrayFunction() {
    let footballer_Ranking = []; // create an empty array
    footballer_Ranking[0] = "Messi"; // assign values to the array
    footballer_Ranking[1] = "Ronaldo Nazario";
    footballer_Ranking[2] = "Pele";
    footballer_Ranking[3] = "Maradona";
    footballer_Ranking[4] = "Zidane";
    document.getElementById("Array").innerHTML = "The winner of the 1999 Ballon d'Or is " + footballer_Ranking[4] + ".";
}

// Craeting a constant
function constant_Function() {
    const premier_League = {Country:"England", League:"Premier League", number_of_Teams: 20, Continent:"Europe"};
    premier_League.Established = 1992; // adding a new property to the constant
    premier_League.number_of_Teams = 18; // changing the value of the constant
    document.getElementById("Constant").innerHTML = "The " + premier_League.League + " is a football league in " + 
    premier_League.Country + ". It was established in " + premier_League.Established + " and has " + 
    premier_League.number_of_Teams + " teams."; 
}

// Creating an Objects
let Employee = { // 
    Name: "Oscar Bobb",
    Age: 22,
    Country: "England",
    Position: "Attacker",
    Team: "Manchester City",
    Salary: 100000,
    skills: ["Dribbling", "Passing", "Shooting"],
    Experience: function() {
        return this.Name + " plays as an " + this.Position + " for " + this.Team + 
        " and earned " + this.Salary + " a week.";
    }
};
document.getElementById("Objects").innerHTML = Employee.Experience(); // display the object in the HTML element with id "Objects"



// Creating a break statement with error handling
let jump_out = "";
for (let num = 0; num < 10; num++) {
  if (num === 6) { break; } // break the loop when num is 6
}
  jump_out += "Index position " + num + "<br>"; 
document.getElementById("break").innerHTML = jump_out;


// Creating a continue statement
let jump_over = "";
for (let num = 0; num < 10; num++) {
  if (num === 5) { continue; } // skip the number 5
  jump_over += "Index position " + num + "<br>"; 
}
document.getElementById("continue").innerHTML = jump_over;