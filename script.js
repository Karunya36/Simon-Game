// Array to hold the four button colors used in the game
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the generated game pattern and the user's clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Track whether the game has started
var started = false;

// Track the current game level
var level = 1;

// Start the game when any key is pressed
$(document).keypress(function() {
  if (!started) {
    nextSequence(); 
    started = true; 
  }
});

// Detect user button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); 
  userClickedPattern.push(userChosenColour); 

  playSound(userChosenColour); 
  animatePress(userChosenColour); 


  checkAnswer(userClickedPattern.length - 1);
});

// Function to check if user's last input matches the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
  
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); 
  }
}

// Function to generate the next color in the sequence
function nextSequence() {

  userClickedPattern = []; 
  $("#level-title").text("Level " + level); 
  level++; 
  var randomNumber = Math.floor(Math.random() * 4); 
  var randomChosenColour = buttonColours[randomNumber]; 
  gamePattern.push(randomChosenColour); 

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); 
}

// Function to animate button when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to play sound for a given color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset game variables after game over
function startOver() {
  level = 1;
  gamePattern = [];
  started = false;
}
