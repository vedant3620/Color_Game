var numSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  //mode buttons
  setupModeButtons();
  setupSquares();
  reset();
}
function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      for (var j = 0; j < modeButtons.length; j++) {
        modeButtons[j].classList.remove("selected");
      }
      this.classList.add("selected");
      //figure out how many squares to show
      if (this.textContent == "Easy") {
        numSquares = 3;
      } else if (this.textContent == "Normal") {
        numSquares = 6;
      } else {
        numSquares = 9;
      }
      //pick new colors
      reset();
      //pick a new pickedColor
      //update page to reflect changes
    });
  }
}
function setupSquares() {
  for (var i = 0; i < squares.length; i++) {
    //add initial colors
    squares[i].style.background = colors[i];
    //add click listeners
    squares[i].addEventListener("click", function () {
      //grab color of clicked squaure
      var clickedColor = this.style.background;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        changeColours(clickedColor);
        h1.style.background = pickedColor;
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Try Again";
      }
      //compare color to picked color
    });
  }
}

function reset() {
  //generate all new colors
  colors = generateRandomColors(numSquares);
  //pick a new random color from array
  pickedColor = pickColor();
  //change colorDisplay to match picked color
  colorDisplay.textContent = pickedColor;
  //change colors of squares
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.background = colors[i];
      squares[i].style.display = "block";
    } else {
      squares[i].style.display = "none";
    }
  }
  resetButton.textContent = "New Colors";
  h1.style.background = "steelblue";
  messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function () {
  reset();
});

function changeColours(color) {
  //loop through all colors
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.background = color;
  }
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  //make an array
  var arr = [];
  //add num random colors to array
  for (var i = 0; i < num; i++) {
    //get Random Color and push into array
    arr.push(randomColor());
  }
  //return array
  return arr;
}

function randomColor() {
  //pick a "red" from 0 to 255
  var r = Math.floor(Math.random() * 256);
  //pick a "green" from 0 to 255
  var g = Math.floor(Math.random() * 256);
  //pick a "blue" from 0 to 255
  var b = Math.floor(Math.random() * 256);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}
