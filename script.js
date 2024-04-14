const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let timer;
let intervalId;
const totalQuestions = questions.length;

const startButton = document.getElementById("start-button"); //home.html
const questionElement = document.getElementById("question"); //test.html
const answersElement = document.getElementById("answers"); //test.html
const timerElement = document.getElementById("timer"); //test.html
const correctElement = document.getElementById("correct"); //test.html - result page
const incorrectElement = document.getElementById("incorrect"); //test.html - result page


// The proceed button is enabled once the checkbox is clicked
function checkCheckbox() {
  let checkbox = document.getElementById("checkbox");
  let proceedButton = document.getElementById("start-button");
  if (checkbox.checked) {
    proceedButton.disabled = false;
  } else {
    proceedButton.disabled = true;
  }
}

// Access to test.html through the proceed button
function goToTestPage() {
  window.location.href = "test.html";
}
// Questions are displayed as the page loads
window.addEventListener("load", function () {
  if (window.location.pathname.endsWith("test.html")) {
    displayQuestion();
  }
});

// The timer starts
function startTimer() {
  timer = 30;
  timerElement.textContent = timer;
  intervalId = setInterval(() => {
    if (timer === 0) {
      clearInterval(intervalId);
      incorrectAnswers++;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    } else {
      timer--; // Decrementing the timer only if it is not already zero.
      timerElement.textContent = timer;
    }
  }, 1000);
}

// Questions are displayed and the startTimer function invoked
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  const answers = currentQuestion.incorrect_answers.concat(
    currentQuestion.correct_answer
  );
  answers.sort(() => Math.random() - 0.5);

  answers.forEach((answer) => {
    const answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.addEventListener("click", () => checkAnswer(answer));
    answersElement.appendChild(answerButton);
  });

  startTimer();
  updateQuestionCount();
}
// Calculates the n. of questions. Invoked in the displayQuestion function 
function updateQuestionCount() {
  const currentQuestions = currentQuestionIndex + 1
  questionCountLabel.innerHTML =
    "<span class='question'>" + "QUESTION " + currentQuestions + "</span>" +
    "<span class='divider'>&nbsp/&nbsp</span>" +
    "<span class='total'>" + totalQuestions + "</span>"

  const questionSpan = questionCountLabel.querySelector('.question')
  const dividerSpan = questionCountLabel.querySelector('.divider')
  const totalSpan = questionCountLabel.querySelector('.total')

  questionSpan.style.color = 'white'
  dividerSpan.style.color = '#d20094'
  totalSpan.style.color = '#d20094'
}
// transition to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    displayQuestion();
  }
}
// Verification of questions and addition to the count of correct/incorrect questions.
function checkAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correct_answer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  clearInterval(intervalId); // Stops timer if there are no more questions and invokes endQuiz
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

// End of the quiz and transition to slide 3 of results
function endQuiz() {
  const totalQuestions = correctAnswers + incorrectAnswers;
  const percentageC = (correctAnswers / totalQuestions) * 100;
  const percentageW = (incorrectAnswers / totalQuestions) * 100;

  correctElement.innerHTML = "<span class='rightwrong'>Right</span>" +
    "<br><span class='percentage'>" +
    percentageC + "%</span>" +
    "<br><span class='totalQ'>" +
    correctAnswers + "/" + totalQuestions + " questions" + "</span>";

  incorrectElement.innerHTML = "<span class='rightwrong'>Wrong</span>" +
    "<br><span class='percentage'>" +
    percentageW + "%</span>" +
    "<br><span class='totalQ'>" +
    incorrectAnswers + "/" + totalQuestions + " questions" + "</span>";

  if (correctAnswers > 5) {
    questionElement.innerHTML =
      "<p class='yourResults'>Results</p>: <br><p class='yourMessage'>Congratulations Epicoder, test passed!</p>"
  } else {
    questionElement.innerHTML =
      "<p class='yourResults'>Results</p> <br><p class='yourMessage'>Sorry Epicoder, try again, you'll do better next time!</p>"
  }

  generateChart(resultChart);

  // removal of the number of questions (questionCountLabel)
  let removeQuestionLabel = document.getElementById("questionCountLabel");
  removeQuestionLabel.remove();

  // removal of answers div
  let removeAnswersDiv = document.getElementById("answers");
  removeAnswersDiv.remove()

  // removal of timer div
  timerElement.remove()

  rateButton()

}

// creation of the rating button
function rateButton() {
  const rateContainerDiv = document.getElementById("rateContainer");
  let rateButton = document.createElement("button");
  rateButton.innerHTML = "RATE US";

  // transition to last page function creation
  function goToRatePage() {
    window.location.href = "rate.html";
  }

  // goToRatePage invoked through onclick event
  rateButton.onclick = goToRatePage;

  // addition of a button to rateContainerDiv
  rateContainerDiv.appendChild(rateButton);
}


// Chart generation. Invoked in endQuiz function
function generateChart() {
  const resultChartCanvas = document.getElementById("resultChart");
  const resultChart = new Chart(resultChartCanvas, {
    type: "doughnut",
    data: {
      datasets: [
        {
          label: "Points",
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ["#d20094", "#00ffff"],
        }
      ]
    },
  });
}