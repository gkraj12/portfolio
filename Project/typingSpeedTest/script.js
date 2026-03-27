
const paragraphText = "JavaScript is a powerful programming language used for web development.";
const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

let timeLeft = 60;
let timer = null;
let started = false;

paragraph.innerText = paragraphText;

input.addEventListener("input", () => {
  if (!started) {
    startTimer();
    started = true;
  }

  const text = input.value;

  // WPM Calculation
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wpm = words.length;
  wpmDisplay.innerText = wpm;

  // Accuracy Calculation
  let correctChars = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === paragraphText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / paragraphText.length) * 100);
  accuracyDisplay.innerText = accuracy;
});

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      input.disabled = true;
    }
  }, 1000);
}

restartBtn.addEventListener("click", () => {
  location.reload();
});