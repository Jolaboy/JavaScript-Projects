// main.js scripts for comparisons type coercion

// Lets see how data can be coverted from one type to another in JavaScript. A term called Type Coercion.
// Type coaercion can occur implicitly or explicitly

// Implicit Type Coarcion
// Implicit Type Coercion Example
// Implicit Type Coercion Example
let num = 10; // Number
let str = "5"; // String
let result = num + str; // Here, the number 10 is coerced to a string

// Display the result
document.getElementById("output").textContent = `The result of implicit type coercion (10 + "5") is: ${result}`;

// Explicit Type Coercion Example
let explicitResult = num + Number(str); // Explicitly convert the string "5" to a number
document.getElementById("explicit").textContent = `The result of explicit type coercion (10 + Number("5")) is: ${explicitResult}`;

// Not a Number NaN()function
function naN_Function() {
    document.getElementById("NaN").innerHTML = 0/0;

    // Using isNaN() method
    document.getElementById("NaN").innerHTML = isNaN('Amadou'); // Test method using string
    
    document.getElementById("NaN").innerHTML = isNaN(500); // Test method using number

    }
    
// Floating points and Infinity
// Display a large number that outputs Positive Infinity
document.getElementById("infinity").textContent = `Large positive number outputs: ${1e309}`;

// Display a large negative number that outputs Negative Infinity
document.getElementById("negativeInfinity").textContent = `Large negative number outputs: ${-1e309}`;

// Double Equal Sign (==)
let nums1 = (10 == 10); // comparing equal values

let nums2 = (10 == 17); // comparing different values

// Lets display the results in HTML
document.getElementById("equalValues").textContent = `comparison 10 == 10 evaluates to: ${nums1}`;
document.getElementById("inequalValues").textContent = `comparison 10 == 10 evaluates to: ${nums2}`;

// Triple Equal Signs
// Same data type and value, this returns true.
let equalVal1 = (8 === 8); // Both are numbers and have the same value
document.getElementById("tripleSign1").textContent = `8 === 8 evaluates to: ${equalVal1}`;

// Different data type and different value, this returns false
let equalVal2 = ("10" === 55); // String "10" and number 55 are neither the same type nor value
document.getElementById("tripleSign2").textContent = `"10" === 55 evaluates to: ${equalVal2}`;

// Different data type but the same value, this returns false
let equalVal3 = ("45" === 45); // String "45" and number 45 have the same value but different types
document.getElementById("tripleSign3").textContent = `"45" === 45 evaluates to: ${equalVal3}`;

// Same data type but different values, this returns false
let equalVal4 = (60 === 80); // Both are numbers but the values are different
document.getElementById("tripleSign4").textContent = `60 === 80 evaluates to: ${equalVal4}`;

// Boolean Logic
// The AND(&&) Operator only return true if both conditions are true
let andOperator1 = (9 > 4 && 6 < 10); // Here both conditions are true
let andOperator2 = (9 > 4 && 6 > 10); // Here only one condition is true

// OR(||) Operator returns true if one condition is true
let orOperator1 = (10 > 5 || 6 > 9);
let orOperator2 = (10 < 5 || 6 > 9);

// Lets display results in HTML
document.getElementById("boolean1").textContent = `Result for andOpeartor1 is: ${andOperator1}`;
document.getElementById("boolean2").textContent = `Result for andOpeartor2 is: ${andOperator2}`;
document.getElementById("boolean3").textContent = `Result for orOpeartor1 is: ${orOperator1}`;
document.getElementById("boolean4").textContent = `Result for ordOpeartor2 is: ${orOperator2}`;

// Not Operator Method 1
function notFunction() {
    document.getElementById("notFalse").innerHTML = !(100 > 10); // This will evaluate to false because 100 is greater than 10
}

function notFunction() {
    document.getElementById("notTrue").innerHTML = !(10 > 100); // This will evalute to true because 10 is not greater than 100 
}

// Not Operator Method 2
// Using the NOT operator to negate true (results in false)
let notTrue = !(100 > 10); // 100 > 10 evaluates to true, so !(true) results in false

// Using the NOT operator to negate false (results in true)
let notFalse = !(10 > 100); // 10 < 100 evaluates to false, so !(false) results in true

// Display the results in the HTML
document.getElementById("not1").textContent = `!(100 > 10) evaluates to: ${notTrue}`;
document.getElementById("not2").textContent = `!(10 > 100) evaluates to: ${notFalse}`;
