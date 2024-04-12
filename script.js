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
let timer = 60;
let intervalId;
const totalQuestions = questions.length;
// VARIABILE PER L'INTERVALLO DEL TIMER
//FA RIPARTIRE IL TIMER QUANDO PASSI ALLA DOMANDA SUCCESSIVA

const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timerElement = document.getElementById("timer");
const correctElement = document.getElementById("correct"); //ULTIMA PAGINA HTML
const incorrectElement = document.getElementById("incorrect"); //ULTIMA PAGINA HTML

function goToNextPage() {
  window.location.href = "test.html";
}


window.addEventListener("load", function () {
  if (window.location.pathname.endsWith("test.html")) {
    displayQuestion();
  }
}); //FUNZIONE PER ATTIVARE IL TEST APPENA SI CARICA LA PAGINA

function checkCheckbox() {
  let checkbox = document.getElementById("checkbox");
  let proceedButton = document.getElementById("start-button");
  if (checkbox.checked) {
    proceedButton.disabled = false;
  } else {
    proceedButton.disabled = true;
  }
}

document.getElementById("checkbox").addEventListener("click", checkCheckbox);

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

function updateQuestionCount() {
  const currentQuestions = currentQuestionIndex + 1;
  questionCountLabel.innerHTML =
    "QUESTION " + currentQuestions + " / "  + totalQuestions ;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    // verifica se l'indice della prossima domanda è minore che la quantità totale
    displayQuestion();
  }
}

function checkAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correct_answer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  clearInterval(intervalId); // INTERRUZIONE DEL TIMER
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionElement.textContent = "Test completed";
  answersElement.innerHTML = "";
  correctElement.textContent = "Right answers: " + correctAnswers;
  incorrectElement.textContent = "Wrong answers: " + incorrectAnswers;
  const totalQuestions = correctAnswers + incorrectAnswers;
  const percentage = (correctAnswers / totalQuestions) * 100;

  const resultParagraph = document.createElement("p");

  if (correctAnswers > 5) {
    questionElement.textContent = "Congratulations Epicoder, test passed!"
    resultParagraph.innerText = "Passed! Correct Answers: " + correctAnswers + "/" + totalQuestions + " (" + percentage + "%)";
  } else {
    questionElement.textContent = "Sorry Epicoder, try again, you'll do better next time!"

    resultParagraph.innerText = "Failed. Correct Answers: " + correctAnswers + "/" + totalQuestions + " (" + percentage + "%)";
  }

  timerElement.remove();

  const resultsDiv = document.getElementById("results"); // a div results so pode aparecer na ultima pagina quando vem o resultado
  // Aggiungi il paragrafo al div dei risultati
  resultsDiv.appendChild(resultParagraph);
  generateChart(resultChart);

  let removeQuestionLabel = document.getElementById("questionCountLabel");
  removeQuestionLabel.remove();

  let removeAnswersDiv = document.getElementById("answers");
  removeAnswersDiv.remove()
}

/* OPPURE SE CORRECT ANSWER < TEST FALLITO
ELSE - TEST SUPERATO */

function startTimer() {
  let timer = 60;
  timerElement.textContent = timer;
}
  /*timerElement.innerHTML = `
  <svg width="140" height="140">
    <circle cx="70" cy="70" r="70" id="background-circle"></circle>
    <circle cx="70" cy="70" r="70" id="progress-circle"></circle>
  </svg>
`;*/


  /*intervalId = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      clearInterval(intervalId);
      incorrectAnswers++;
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  }, 1000);
}*/

function generateChart() {
  const resultChartCanvas = document.getElementById("resultChart"); //.getContext("2d"); //questo e' diverso

  const resultChart = new Chart(resultChartCanvas, {
    type: "doughnut",
    data: {
      datasets: [
        { 
          label: "Points",
          data: [correctAnswers, incorrectAnswers],
          backgroundColor: ["#00ffff", "#d20094"],
        }
      ]
    },
  });
}
// da qui comincia js stelle valutazione

/*let arrayStars = document.querySelectorAll('.star');

arrayStars.forEach((star, index) => { //itera sull'array di stelle, e prende come parametri la stella e l'indice corrispondente nell'array
  star.addEventListener('click', () => {
    arrayStars.forEach((star, selectedIndex) => { //all'interno del listener, quando passiamo il mouse sopra, questo codice itera di nuovo sull'array
      
      index <= selectedIndex ? star.classList.add('active') : star.classList.remove('active');// in sostanza fa sì che se clicco una stella, anche tutte le stelle rpima di lei sia segnate come attive e le altre dopo non attive
      
    })
  })
}) */ //NON FUNZIONA

