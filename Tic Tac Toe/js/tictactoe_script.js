// This variable keeps track of whose turn it is
let activePlayer = 'X'; // X goes first
// This array stores an array of moves. Used to determine win conditions
let selectedSquares = [];

// This function is for placing an X or O in a square
function placeXOrO(squareNumber) {
    // This condition ensures a square hasn't been selected already
    // The .some() method is used to check if the square number is already in the array
    // to see if it contains the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the HTML element that was clicked on
        let select = document.getElementById(squareNumber);
        // This condition checks whose turn it is.
        if (activePlayer === 'X')  {
            // If active player is equal to 'X', the x.png is placed in HTML
            select.style.backgroundImage = 'url("images/x.png")'; 
            // Active player may only be 'X' or 'O'. So, if not 'X', it must be 'O'
            select.style.backgroundSize = "contain";  // Ensures the image fits within the square
            select.style.backgroundPosition = "center";
        } else {
            // If active player is equal to 'O', the o.png is placed in HTML
            select.style.backgroundImage = 'url("images/o.png")';
            select.style.backgroundSize = "contain";  // Ensures the image fits within the square
            select.style.backgroundPosition = "center";
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any win conditions.
        checkWinConditions();
        // This condition is for changing the active player. If active player is 'X' change it to 'O'.
        // Otherwise change it to 'X'
        if (activePlayer === 'X') {
            // If active player is 'X' change it to 'O'.
            activePlayer = 'O';
            //if active player is anything other than 'X'
        } else {
            // Change active player to 'X'
            activePlayer = 'X';
        }

        // This function plays placement sound
        audio("./media/play.mp3");
        // This condition checks to see if it is the computers turn.
        if (activePlayer === 'O') {
            // This function disables clicking for computers turn.
            disableClick();
            // This function waits 1 second before the computer places an image and enables click.
            setTimeout(function() { computersTurn();}, 1000);
        }
        //Returning true is  needed for our computersTurn() function to work.
        return true;
    }
    // This function results in a random square being selected by the computer.
    function computersTurn() {
        //  This boolean is needed for our while loop to work.
        let success = false;
        // This variable stores a random number between 0 and 8.
        let pickASquare;
        // This condition allows our while loop to keep trying if a square is selected already.
        while(!success) {
            // A random number is selected between 0 and 8.
            pickASquare = String(Math.floor(Math.random() * 9));
            // If the random number evaluated to true, the square has not been selected yet.
            if (placeXOrO(pickASquare)) {
                // This line calls the function.
                placeXOrO(pickASquare);
                // This changes our boolean and ends the loop.
                success = true;
            };    
        }    
    }
}

//This function parses the selectedSquares array to search for win conditions.
//drawline() function is called to draw a line on the screen if the condition is met.
function checkWinConditions() {
    if (arrayIncludes('0X', '1X', '2X')) {drawWinLine(50, 100, 558, 100)}
    else if (arrayIncludes('3X', '4X', '5X')) {drawWinLine(50, 304, 558, 304)}
    else if (arrayIncludes('6X', '7X', '8X')) {drawWinLine(50, 508, 558, 508)}
    else if (arrayIncludes('0X', '3X', '6X')) {drawWinLine(100, 50, 100, 558)} 
    else if (arrayIncludes('1X', '4X', '7X')) {drawWinLine(304, 50, 304, 558)} 
    else if (arrayIncludes('2X', '5X', '8X')) {drawWinLine(508, 50, 508, 558)} 
    else if (arrayIncludes('6X', '4X', '2X')) {drawWinLine(100, 508, 510, 90)} 
    else if (arrayIncludes('0X', '4X', '8X')) {drawWinLine(100, 100, 520, 520)} 
    else if (arrayIncludes('0O', '1O', '2O')) {drawWinLine(50, 100, 558, 100)} 
    else if (arrayIncludes('3O', '4O', '5O')) {drawWinLine(50, 304, 558, 304)}  
    else if (arrayIncludes('6O', '7O', '8O')) {drawWinLine(50, 508, 558, 508)} 
    else if (arrayIncludes('0O', '3O', '6O')) {drawWinLine(100, 50, 100, 558)} 
    else if (arrayIncludes('1O', '4O', '7O')) {drawWinLine(304, 50, 304, 558)} 
    else if (arrayIncludes('2O', '5O', '8O')) {drawWinLine(508, 50, 508, 558)} 
    else if (arrayIncludes('6O', '4O', '2O')) {drawWinLine(100, 508, 510, 90)} 
    else if (arrayIncludes('0O', '4O', '8O')) {drawWinLine(100, 100, 520, 520)}
    //Checks for a tie - if no win conditions are met and 9 squares have been selected.
    else if (selectedSquares.length >= 9) {
        // This function plays the tie game sound.
        audio("./media/tie.mp3");
        // This function sets a .3 second timer before the resetGame is called.
        setTimeout(function() {resetGame(); }, 500);
    } 
    // This function checks for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        // If the 3 variables we pass are all included in our array then true is returned.
        if (a === true && b === true && c === true) {return true;}
    }
}
// Clears the board and the array to restart the game
function resetGame() {
    // This for loop iterates through each HTML square element and removes the background image.
    for (let i = 0; i < 9; i++) {
        // This variable accesses the HTML element id that was clicked on.
        let square = document.getElementById(String(i));
        // This line removes the background image from the square.
        square.style.backgroundImage = '';
    }
    // This resets the array so it is empty and we can start over.
    selectedSquares = [];
}
          
// This function takes a string parameter and plays the audio file.
// placement sound('./media/place.mp3')
function audio(audioURL) {
    // This variable is created to create a new audio object and passes the string parameter to it.
    let audio = new Audio(audioURL);
    // play() method plays the audio file.
    audio.play();
}

// This function utilises HTML canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line accesses the HTML canvas element and stores it in a variable.
    const canvas = document.getElementById('win-lines');
    // This line gives us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    // This line indicates where the start of a line x axis is.
    let x1 = coordX1,
        // This line indicates where the start of a line y axis is.
        y1 = coordY1,
        // This line indicates where the end of a line x axis is.
        x2 = coordX2,
        // This line indicates where the end of a line y axis is.
        y2 = coordY2,
        // These 2 variables store temporary x and y axis data we updated in our animation loop.
        x = x1,
        y = y1;
    //This function interates with the canvas.
    function animateLineDrawing() {
        // This variable creates a loop.
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        // This line clears the content from the last loop iteration.
    c.clearRect(0, 0, 608, 608);
    // This method starts a new path.
    c.beginPath();
    // This method moves us to a starting point in the line.
    c.moveTo(x1, y1);
    // This method indicates the end point in the line.
    c.lineTo(x, y);
    // This method sets the width of the line.
    c.lineWidth = 10;
    // This method sets the color of the line.
    c.strokeStyle = 'rgba(70, 255, 33, 1)';
    // This method draws everything we have put on the canvas.
    c.stroke();
    // This condition checks if we've reached the endpoints.
    if (x1 <= x2 && y1 <= y2) {
        // This condition adds 10 to the previous end x endpoint.
        if (x < x2) { x += 10;}
        // This condition adds to 10 to the previous end y endpoint.
        if (y < y2) { y += 10;}
        // This condition is similar to the one above.
        // This is necessay for the 6, 4, 2 win condition.
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop);}
        }
    // This condition is similar to the one above.
    // This is necessary for the 6, 4, 2 win condition.
    else if (x1 <= x2 && y1 >= y2) {
        if (x < x2) { x += 10;}
        if (y > y2) { y -= 10;}
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop);}           
        }
    }
    // This function clears the canvas after the win line is drawn.
    function clear() {
        // This line clears the content from the last loop iteration.
        const animationLoop = requestAnimationFrame(clear);
        // This line clears the canvas after the win line is drawn.
        c.clearRect(0, 0, 608, 608);
        // This cancels the animation loop.
        cancelAnimationFrame(animationLoop);
    }
    // Disable clicking while the win sound is playing
disableClick();
// Play the win sound immediately
let winSound = new Audio('./media/winTune.mp3');
winSound.play();
// Stop the sound after 7 seconds
setTimeout(function() {
    winSound.pause();
    winSound.currentTime = 0;  // Reset the audio playback position
}, 2000);  // 2 seconds (2000 milliseconds)

// Call the main animation loop
animateLineDrawing();

// Wait 1 second, then clear canvas, reset game, and allow clicking again
setTimeout(function() {
    clear();
    resetGame();
}, 1000);
}
// Disables click during the computer's turn
function disableClick() {
    // This makes it impossible to click on the body element while we wait for the computer to play.
    document.body.style.pointerEvents = 'none';
    // This makes it possible to click on the body element again after 1 second.
    setTimeout(function() {document.body.style.pointerEvents = 'auto';}, 1000);
} 
