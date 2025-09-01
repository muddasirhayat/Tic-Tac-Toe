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
let botBtn = document.querySelector(".PVC");
let turn = document.querySelector("#turn");
let turnX = true;
let aiEnabled = false;
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
      box.style.backgroundColor = "#EBA105";
      box.style.color = "#400CB9";
      box.innerText = "X";
      turn.innerText = " " + "O" + " ";
      turnX = false;
      box.disabled = true;
      checkedWinner();

      if (aiEnabled) {
        setTimeout(aiMove, 500);
      }
    } else if (!aiEnabled) {
      box.style.backgroundColor = "#400CB9";
      box.style.color = "#EBA105";
      box.innerText = "O";
      turn.innerText = " " + "X" + " ";
      turnX = true;
      box.disabled = true;
      checkedWinner();
    }
  });
});

// ==================== Check Winner ====================
const checkedWinner = () => {
  let winnerFound = false;
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;
    if (
      pos1Value !== "" &&
      pos1Value === pos2Value &&
      pos2Value === pos3Value
    ) {
      winnerFound = true;
      boxes.forEach(function (box) {
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
    boxes.forEach(function (box) {
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
    box.style.backgroundColor = "white";
    box.style.color = "#EBA105";
    box.innerText = "";
    turn.innerText = " " + "X" + " ";
    box.disabled = false;
    turnX = true;
  });
});

// ==================== Reset Game ====================
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.style.backgroundColor = "white";
    box.style.color = "#EBA105";
    box.innerText = "";
    box.disabled = false;
  });
  turn.innerText = " " + "X" + " ";
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
    playerXInput.value = "Player X";
  }
  if (playerOInput.value === "") {
    playerOInput.value = "Player O";
  }
  registrationModal.style.display = "none";
  mainPage.style.display = "block";
});

// ==================== Minimax AI Functions ====================
function isMovesLeft(board) {
  return board.includes("");
}

function evaluateBoard(board) {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      return board[a] === "O" ? +10 : -10;
    }
  }
  return 0;
}

function minimax(board, depth, isMaximizing) {
  let score = evaluateBoard(board);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (!isMovesLeft(board)) return 0;

  if (isMaximizing) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = "";
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = "";
      }
    }
    return best;
  }
}

function findBestMove(board) {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let moveVal = minimax(board, 0, false);
      board[i] = "";
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
}

function aiMove() {
  let board = Array.from(boxes).map((box) => box.innerText);
  let bestMove = findBestMove(board);
  if (bestMove !== -1) {
    let box = boxes[bestMove];
    box.style.backgroundColor = "#400CB9";
    box.style.color = "#EBA105";
    box.innerText = "O";
    box.disabled = true;
    turn.innerText = " " + "X" + " ";
    turnX = true;
    checkedWinner();
  }
}

// ==================== AI Play Button ================
botBtn.addEventListener("click", () => {
  if (playerXInput.value.trim() === "") {
    playerXInput.value = "Player X";
  }
  aiEnabled = true;
  registrationModal.style.display = "none";
  mainPage.style.display = "block";
});
