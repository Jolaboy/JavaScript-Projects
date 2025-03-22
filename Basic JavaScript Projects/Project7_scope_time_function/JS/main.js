// Declaring a Global Variable
var X = 50; // variable X assigned outside of function
function Add_Nums_1() {
    document.write(20 + X + "<br>");
}
function Add_Nums_2() {
    document.write(X + 80 +"<br>");
}
Add_Nums_1(); // This line will return 70(value of X + Nums_1)
Add_Nums_2(); // This line will return 130(value of X + Nums_2)

// Declaring Local variable 
function Add_Numbers1() {
    var num = 10;
    document.write(num + 40);
}
function Add_Numbers2() {
    // Didn't reference num here since it's not accessible 
    document.write(" Cannot access num here" + "<br>");
}
Add_Numbers1(); // This will return 50(value of num + 10)
Add_Numbers2(); // This will return return nothing because the num was defined inside Add_Numbers1

// Debug code 
function Debug_Numbers1() {
    var num = 10;
    console.log(20 + num);
}
function Debug_Numbers2(){
    // Added error handling for undefined variable
    try {
        console.log(num + 10);
    } catch(e) {
        console.log("num is not accessible here");
    }
}
Debug_Numbers1();
Debug_Numbers2();

// If Statements
if (10 < 100) {
    document.write("The on the left 10 is smaller compare to number on the right 100");
}

// If Statement
// This function will display a message based on the time of the day
function get_Date() {
    if (new Date().getHours() < 18) {
        document.getElementById("Time").innerHTML = "How is your day?";
    }
}

// An If Else Greeting functionality
function displayGreeting() {
    const currentHour = new Date().getHours();
    let greetingMessage;
    
    if (currentHour < 12) {
        greetingMessage = "Good Morning!";
    } else if (currentHour < 18) {
        greetingMessage = "Good Afternoon!";
    } else {
        greetingMessage = "Good Evening!";
    }
    
    document.getElementById("Message").textContent = greetingMessage;
}

// Contract function with an If Statement
// This function will display a message based on the age entered
function contract_Function() {
    let Age = document.getElementById("Age").value;
    let Sign;
    if (Age >= 18) {
        Sign = "You are old enough to sign professional contract.";
    } else {
        Sign = "You are NOT old enough to sign professional contract.";
    }
    document.getElementById("contract").innerHTML = Sign;
}

// Time_Function with condition Statements If Else
// This function will display a message based on the time of the day
function Time_Function() {
    var Time = new Date().getHours();
    var Display;
    if (Time < 12 && Time > 0) {
        Display = "We are in the morning people";
    }
    else if (Time >= 12 && Time < 18) {
        Display = "We are in the afternoon people";
    }
    else {
        Display = "We are in the evening people";
    }
    document.getElementById("if_else").innerHTML = Display;
}