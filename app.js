// Stores the randomly generated game sequence
let gameseq = [];

// Stores the sequence clicked by the user
let userseq = [];

// Stores all previous scores
let score = [];

// Checks whether the game has started
let starter = false;

// Current game level
let level = 0;

// Unused variable (can be removed)
let max;

// Selecting required HTML elements
let h2 = document.querySelector('h2');
let color = ["red", "purple", "aqua", "pink"];
let show = document.querySelector('#highScore');
let button = document.querySelector('button');

// Starts the game when the Start button is clicked
button.addEventListener("click", function () {
    if (starter == false) {
        console.log("Game Started!");
        starter = true;

        // Start the first level
        levelUp();
    }
});

// Checks whether the user's current click matches the game sequence
function checkSeq(idx) {

    // If the current button is correct
    if (userseq[idx] === gameseq[idx]) {

        // If the entire sequence is completed correctly
        if (userseq.length == gameseq.length) {

            // Move to the next level after a short delay
            setTimeout(levelUp, 800);
        }
    } else {

        // Display Game Over message
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b> <br> Press Start to Restart the Game.`;

        // Flash the screen red
        document.querySelector('body').style.backgroundColor = "red";

        // Restore background color
        setTimeout(function () {
            document.querySelector('body').style.backgroundColor = "white";
        }, 200);

        // Update the high score
        highScore();

        // Reset the game
        reset();
    }
}

// Flashes the randomly selected button
function randFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Flashes the button clicked by the user
function userFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Handles user button clicks
function userClickBtn() {

    // Store the clicked button
    let userBtn = this;

    // Flash the clicked button
    userFlash(userBtn);

    // Get the color (id) of the clicked button
    let userColor = userBtn.getAttribute("id");

    // Add the clicked color to the user's sequence
    userseq.push(userColor);

    // Check whether the clicked button is correct
    checkSeq(userseq.length - 1);
}

// Generates the next level
function levelUp() {

    // Clear the user's sequence for the new level
    userseq = [];

    // Increase the level
    level++;

    // Update the level text
    h2.innerText = `Level ${level}`;

    // Generate a random number between 0 and 3
    let randIdx = Math.floor(Math.random() * 4);

    // Get the corresponding color
    let randColor = color[randIdx];

    // Select the button with that color
    let randBtn = document.querySelector(`.${randColor}`);

    // Flash the random button
    randFlash(randBtn);

    // Add the color to the game sequence
    gameseq.push(randColor);

    // Print the game sequence in the console (for debugging)
    console.log(gameseq);
}

// Select all game buttons
let allBtn = document.querySelectorAll('.btn');

// Add click event to each button
for (btns of allBtn) {
    btns.addEventListener("click", userClickBtn);
}

// Resets the game variables
function reset() {
    gameseq = [];
    userseq = [];
    starter = false;
    level = 0;
}

// Calculates and displays the highest score
function highScore() {

    // Store the current score
    score.push(level);

    console.log(score);

    // Assume the first score is the highest
    let max = score[0];

    // Find the maximum score
    for (let i = 1; i < score.length; i++) {
        if (score[i] > max) {
            max = score[i];
        }
    }

    // Display the highest score
    let highScore = max;
    show.innerText = `High Score is ${highScore}`;
    show.style.color = "rgb(59, 149, 60)";
}


