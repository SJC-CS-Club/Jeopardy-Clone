const questions = document.querySelectorAll(".question");

// Function to handle clicking a question
questions.forEach((question) => {
  question.addEventListener("click", function (event) {
    event.stopPropagation();

    // To grab the question text
    const questionText = this.getAttribute("data-question");
    this.innerText = questionText;

    this.classList.add("clicked");
    document.querySelectorAll(".question").forEach((q) => {
      q.style.pointerEvents = "none";
    });

    this.style.pointerEvents = "auto";
    document.addEventListener("click", closeQuestion, { once: true });

    // To exit using 'esc' key
    document.addEventListener("keydown", closeOnEscape);

    // To reveal the answer
    document.addEventListener("keydown", revealOnSpace);
  });
});

// Function to close the question when clicking outside
function closeQuestion() {
  const zoomedQuestion = document.querySelector(".question.clicked");

  if (zoomedQuestion) {
    const originalPoints = zoomedQuestion.getAttribute("data-points");
    zoomedQuestion.innerText = originalPoints;
    zoomedQuestion.classList.remove("clicked");

    document.querySelectorAll(".question").forEach((q) => {
      q.style.pointerEvents = "auto";
      document.removeEventListener("keydown", closeOnEscape);
    });
  }
}

// Function to hit the 'ESC' key.
function closeOnEscape(event) {
  if (event.key === "Escape") {
    closeQuestion();
  }
}

// Function to Reveal the answer using the SPACE Key
function revealOnSpace(event) {
  if (event.code == "Space") {
    const zoomedQuestion = document.querySelector(".question.clicked");
    if (zoomedQuestion) {
      const answerText = zoomedQuestion.getAttribute("data-answer");
      zoomedQuestion.innerText = answerText;
    }
  }
}

// ------------------ Button Functionality for clicking ---
let plusButtons = document.querySelectorAll(".plus");
let minusButtons = document.querySelectorAll(".minus");

// Function to increment the counter
function increment(event) {
  const button = event.target.closest("button");
  const counterElement = document.getElementById(`${button.dataset.team}`);
  let currentScore = Number(counterElement.innerText);
  currentScore += 100;
  counterElement.innerHTML = currentScore;
}

// Function to Decrement the counter
function decrement(event) {
  const button = event.target.closest("button");
  const counterElement = document.getElementById(`${button.dataset.team}`);
  let currentScore = Number(counterElement.innerText);
  currentScore -= 100;
  counterElement.innerHTML = currentScore;
}

// Event Listners
plusButtons.forEach((element) => {
  element.addEventListener("click", increment);
});
minusButtons.forEach((element) => {
  element.addEventListener("click", decrement);
});
