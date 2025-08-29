// ==================== DOM Elements ====================
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
const registrationModal = document.querySelector(".startContainer");
const mainPage = document.querySelector(".main");
let playerXInput = document.querySelector("#playerX");
let playerOInput = document.querySelector("#playerO");
const startBtn = document.querySelector(".gameStartBtn");
let restartBtn = document.querySelector(".restartBtn");
let playAgainBtn = document.querySelector(".playAgainBtn");
const winPName = document.querySelector(".WinPName");
const winnerMsg = document.querySelector(".winnerContainer");
let drawMessage = document.querySelector(".msg");
let turnX = true;

// ==================== Winning Patterns ====================
let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// ==================== Show Modal on Page Load ====================
window.onload = function () {
  registrationModal.style.display = "flex";
};

// ==================== Game Box Click Event ====================
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;

    checkedWinner();
  });
});

// ==================== Check Winner ====================
const checkedWinner = () => {
  let winnerFound = false;

  // Check winner
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;

    if (pos1Value !== "" && pos1Value === pos2Value && pos2Value === pos3Value) {
      winnerFound = true;
      boxes.forEach(function(box) {
        box.disabled = true;
      });
      mainPage.style.display = "none";

      let winnerName;
      if (pos1Value === "X") {
        if (playerXInput.value !== "") {
          winnerName = playerXInput.value;
        } else {
          winnerName = "Player X";
        }
      } else {
        if (playerOInput.value !== "") {
          winnerName = playerOInput.value;
        } else {
          winnerName = "Player O";
        }
      }

      winnerMsg.style.display = "flex";
      winPName.innerText = winnerName;
      drawMessage.innerText = winnerName + " win the game!";
      setTimeout(function () {
        winnerMsg.classList.add("show");
      }, 10);
      return;
    }
  }

// ==================== Draw Condition====================
if (!winnerFound) {
    let allFilled = true;
    boxes.forEach(function(box) {
      if (box.innerText === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      mainPage.style.display = "none";
      winnerMsg.style.display = "flex";
      winPName.innerText = "";
      drawMessage.innerText = "It's a Draw!";
      setTimeout(function () {
        winnerMsg.classList.add("show");
      }, 10);
    }
  }
};

// ==================== Play Again ====================
playAgainBtn.addEventListener("click", () => {
  winnerMsg.classList.remove("show");
  setTimeout(() => (winnerMsg.style.display = "none"), 300);
  mainPage.style.display = "block";
  winPName.innerText = "";
  drawMessage.innerText = "";
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    turnX = true;
  });
  
});

// ==================== Reset Game ====================
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  drawMessage.innerText = "";
  winPName.innerText = "";
  turnX = true;
});

// ==================== Restart Game ====================
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

// ==================== CheckUserInputs ====================
startBtn.addEventListener("click", () => {
  if (playerXInput.value === "") {
    playerXInput.value = "PlayerX";
  }
  if (playerOInput.value === "") {
    playerOInput.value = "PlayerO";
  }
  registrationModal.style.display = "none";
  mainPage.style.display = "block";
});
