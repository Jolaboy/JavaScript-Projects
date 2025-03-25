// Define a concatenated function that takes multiple strings and concatenates them

// Define a concatenated Method function
function personal_Details() {
    let name = "Amadou Jarju ";
    let gender = " Male";
    let job_title = " Software Developer "
    let address = " 37 Victoria Road, London.";
    let personal = name.concat(",",gender,",",job_title,",", address); // Concatenates the strings together
    document.getElementById("concat").innerHTML = personal;
}

// Define a slicing Method function
function Slicing() {
    let footballers = "Messi, Ronaldo Nazario, Pele, Maradona, Zico, Zidane";
    let Greatest_of_All_Time = footballers.slice(0, 5); // slices the string from position 0 to 5
    document.getElementById("slice").innerHTML = Greatest_of_All_Time;
}

// Define a toUpperCase Method function
function UpperCase() {
    let footballers = "Messi, Ronaldo Nazario, Pele, Maradona, Zico, Zidane";
    let Greatest_Footballers = footballers.toUpperCase(); // converts the string to uppercase
    document.getElementById("upper").innerHTML = Greatest_Footballers;
}

// Define a search Method function
function Search() {
    let footballers = "Messi, Ronaldo Nazario, Pele, Maradona, Zico, Zidane";
    let Greatest_Striker = footballers.search("Ronaldo Nazario");
    document.getElementById("search").innerHTML = Greatest_Striker; // Returns the position of the string in the text
}

// Define a Number Method(to string) function
function number_Method() {
    let numberValue = 1234; // Number to convert
    let stringValue = numberValue.toString(); // Convert the number to a string
    document.getElementById("to_string").innerHTML = `Converted String: ${stringValue}`; // Display the result in the element with id 'to_string'
}

// Define a Precision Method function
function precision_Method() {
    let x = 1234.56789;
    document.getElementById("precision").innerHTML = x.toPrecision(5); // Returns the number to 5 decimal places
} 

// define a fixed Method function
function fixed_Method() {
    let num = 123.4567;
    let fixedNum = num.toFixed(2); // Converts the number to a string with 2 decimal places
    document.getElementById("fixed").innerHTML = `The number is: ${fixedNum}`;
}

// Define a valueOf Method function
function valueOf_Method() {
    let x = 1234;
    document.getElementById("value_of").innerHTML = x.valueOf(); // Returns the primitive value of the number
}