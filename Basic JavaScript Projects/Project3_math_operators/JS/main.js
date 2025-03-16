// main.js scripts for Project3_math_operators folder

    //  A function to execute math operation
    function finalMark() {
        const theory = 45;
        const practical = 50;
        const result = theory + practical;
        alert(`You score ${theory} in the Theory and ${practical} in the Practical and your Final Mark is ${result}!`);
    }
  
    // Creating subtraction function in JavaScript
    function minusFunction() { // This is our fuction
        let minus = 5 -2; // initalised a variable called minus
        document.getElementById("Minus").innerHTML = "5 - 2 = " + minus;
    }

    // Creating division function in JavaScript
    function divisionFunction() {
        let basic_Math = 98 / 7;
        document.getElementById("Divide").innerHTML = "98 / 7 = " + basic_Math;
    } 

    // Creating multiplication function in JavaScript
    function multiplicationFunction() {
        let basic_Math = 12 * 9;
        document.getElementById("Multiply").innerHTML = "12 * 9 = " + basic_Math;
    }

    // Creating a function that performs multiple operations
    function multipleOperation() {
        // initialised two variables num1 and num2
        let num1 = 80;
        let num2 = 10;

    // A function that Performs arithmetic operations
        let add = num1 + num2;         // Addition
        let subtract = num1 - num2;  // Subtraction
        let multiply = num1 * num2;     // Multiplication
        let divide = num1 / num2;    // Division

    // Display results
        document.getElementById("Results").innerHTML = `
        <strong>Results:</strong><br>
        Add: ${add}<br>
        Subtraction: ${subtract}<br>
        Multiplication: ${multiply}<br>
        Division: ${divide}
    `;
    }
    // Another function performing multiple operations
    function Arithmetic() {
        let basic_Math = (5 + 5) * 10/2 - 10;
        document.getElementById("basic_Math").innerHTML = "5 plus 5, multiplied by 10, divided by 2 subtracted by 10 equals " + basic_Math;
    }

    // A function performing Modulus operation. Modulus is the remainder of dividend and divisor
    function remainder() {
        let modulus = 10 / 3;
        document.getElementById("Modulus").innerHTML = "When you divide 10 by 3, you get a remainder of: " + modulus;
    }

    // A function that performs unary Operation
    function unaryOperation() {
        let x_Num = 33;
        document.getElementById("Unary").innerHTML = -x_Num;
    }

    // Incremental and Decremental operators
    function increment() {
        let X = 4;
        X++;
        document.getElementById("Increment").innerHTML = "Increment of X  which hold a value of 4 using (++) operator is: " + X;
    }

    function decrement() {
        let X = 4;
        X--;
        document.getElementById("Decrement").innerHTML = "Decrement of X  which hold a value of 4 using (--) operator is: " + X;
    }

    // Generating random numbers
    window.alert(Math.random()); // Generate number between 0 to 1

    window.alert(Math.random() * 200); // Generate random number between 0 to 200

    // Using Math Object Methods()

    // Using the Math method()
    const num = 45;
    const squareRoot = Math.sqrt(num); // This will calculate the square root of 45

    // Display the result in the HTML
    document.getElementById("Object").textContent = `The square root of ${num} is ${squareRoot}.`;

    // This will generate a random number and round it
    const randomNum = Math.random() * 150; // Random number between 0 and 150
    const roundedNum = Math.round(randomNum); // Round to the nearest integer

    // This will display the result in the HTML
    document.getElementById("Object").textContent = `The random number is: ${roundedNum}`;

