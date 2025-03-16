// main.js scripts for Project4_dictionaries

// Creating a dictionary using event handler to execute function
//function myDictionary() {
    let Car = {
        Brand: "Nissan",
        Model: "Qashqai",
        Family: "SUV",
        Year: 2025,
        Transmission: "Automatic"
    };
    document.getElementById("Dictionary").innerHTML = Car.Brand;
//}

// Craete a function using delete operator to delete a key 
function myDictionary() {
    let Car = {
        Brand: "Nissan",
        Model: "Qashqai",
        Family: "SUV",
        Year: 2025,
        Transmission: "Automatic"
    };
    delete Car.Brand; // This will delete our KVP Transmission and return undefined
    document.getElementById("Dictionary").innerHTML = Car.Brand;
}