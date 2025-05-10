// Scripts for pizza ordering
function getRecipe() {
    // This initialises our string so it can get passed from
    // function to function, growing line by line into a full recipe
    var text1 = "<h3>Order Summary:</h3>";
    var runningTotal = 0;
    var sizeArray = document.getElementsByClassName("size"); // Get the size of the pizza
    for (var i = 0; i < sizeArray.length; i++) {  // Loop through the size array
        if (sizeArray[i].checked) {               // Checks if the size is checked
            var selectedSize = sizeArray[i].value; // Get the value of the selected size
            // Assign price to the size
            if (selectedSize === "Personal Pizza") {
                sizeTotal = 7;
            } else if (selectedSize === "Small Pizza") {
                sizeTotal = 9;
            } else if (selectedSize === "Medium Pizza") {
                sizeTotal = 11;
            } else if (selectedSize === "Large Pizza") {
                sizeTotal = 15;
            } else if (selectedSize === "Extra Large Pizza") {
                sizeTotal = 17;
            }
            text1 = text1 + selectedSize + " (£" + sizeTotal + ".50)<br>"; // Add the size to the text1 string
        }  
    }
    runningTotal = sizeTotal;      // Assign the size to running total
    console.log(selectedSize + " = £" + sizeTotal + ".50");   // Log the size and price
    console.log("size text1: " + text1);   // Log the size text1
    console.log("subtotal: £" + runningTotal + ".50");  // Log the subtotal
    getTopping(runningTotal, text1); // This function gets the toppings 
};

function getTopping(runningTotal, text1) {   // This function gets the toppings
    var toppingTotal = 0;  // Initialise the topping total
    var selectedTopping = [];  // Initialise the selected topping array
    var toppingArray = document.getElementsByClassName("toppings");  // Get the topping array
    for (var j = 0; j < toppingArray.length; j++) {  // Loop through the topping array
        if (toppingArray[j].checked) {  // Checks if the topping is checked
            selectedTopping.push(toppingArray[j].value);  // Push the selected topping to the array
            console.log("selected topping item: (" + toppingArray[j].value + ")");  // Log the selected topping
            text1 = text1 + toppingArray[j].value + "<br>";  // Add the selected topping to the text1 string
        }
    }
    var toppingCount = selectedTopping.length;   // Get the length of the selected topping array
    if (toppingCount > 1) {
        toppingTotal = (toppingCount - 1); // £1.00 for each additional topping
    } else {
        toppingTotal = 0; // no extra charge for one topping
    }
    runningTotal = (runningTotal + toppingTotal); // add toppings to the running total
    console.log("total selected topping items:" + toppingCount);  // Log the total selected topping items
    console.log(toppingCount + " topping - 1 free topping = " + "£" + toppingTotal + ".50");  // Log the topping total
    console.log("topping text1: "+ text1);  // Log the topping text1
    console.log("purchase total: "+ "£" + runningTotal + ".50");   // Log the purchase total
    document.getElementById("showText").innerHTML = text1;    // Show the text1 string in the HTML element with id showText
    document.getElementById("totalPrice").innerHTML = "<h3>Total: <strong>£"+  // Show the total price in the HTML element with id totalPrice
        runningTotal+".50"+"</strong></h3>";
};