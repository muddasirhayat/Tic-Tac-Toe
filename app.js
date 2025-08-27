let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetBtn");
const registrationModal = document.querySelector(".startCountainer");
const mainPage = document.querySelector(".main");
let turnX = true;

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

window.onload = function() {
  registrationModal.style.display = "flex";

};



boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "o";
      turnX = true;
    }
    box.disabled = true;

    checkedWinner();
  });
});

const checkedWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Value = boxes[pattern[0]].innerText;
    let pos2Value = boxes[pattern[1]].innerText;
    let pos3Value = boxes[pattern[2]].innerText;
    if (pos1Value != "" && pos1Value === pos2Value && pos2Value === pos3Value) {
    }
  }
};
resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turnX = true;
});
