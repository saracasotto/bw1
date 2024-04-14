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

const startButton = document.getElementById("start-button"); //PRIMA PAGINA
const questionElement = document.getElementById("question"); //SECONDA PAGINA
const answersElement = document.getElementById("answers"); //SECONDA PAGINA
const timerElement = document.getElementById("timer"); //SECONDA PAGINA
const correctElement = document.getElementById("correct"); //TERZA PAGINA
const incorrectElement = document.getElementById("incorrect"); //TERZA PAGINA

//ATTIVAZIONE BOTTONE SOLAMENTE SE SI CLICCA LA CHECKBOX

function checkCheckbox() {
  let checkbox = document.getElementById("checkbox");
  let proceedButton = document.getElementById("start-button");
  if (checkbox.checked) {
    proceedButton.disabled = false;
  } else {
    proceedButton.disabled = true;
  }
}

 //ACCESSO ALLA SECONDA PAGINA TRAMITE IL BOTTONE
function goToTestPage() {
  window.location.href = "test.html";
}

 //ATTIVAZIONE DEL TEST APPENA SI CARICA LA PAGINA
window.addEventListener("load", function () { 
  if (window.location.pathname.endsWith("test.html")) {
    displayQuestion();
  }
});

//ATTIVAZIONE DEL TIMER DI 60 SECONDI 

function startTimer() {
  timer = 30; // Inizializzazione del timer
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
      timer--; // Decremento del timer solo se non Ã¨ ancora zero
      timerElement.textContent = timer;
    }
  }, 1000);
}

 //ATTIVAZIONE DEL TEST APPENA SI CARICA LA PAGINA CON RICHIAMO DI FUNZIONE TIMER
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


//CALCOLO DEL NUMERO DI DOMANDA RICHIAMATO IN FUNZIONE DISPLAYQUESTION
function updateQuestionCount() {
  const currentQuestions = currentQuestionIndex + 1
  questionCountLabel.innerHTML =
    "<span class='question'>" + "Question " + currentQuestions + "</span>" +
    "<span class='divider'>&nbsp/&nbsp</span>" + 
    "<span class='total'>" + totalQuestions + "</span>"

  const questionSpan = questionCountLabel.querySelector('.question')
  const dividerSpan = questionCountLabel.querySelector('.divider')
  const totalSpan = questionCountLabel.querySelector('.total')

  questionSpan.style.color = 'white'
  dividerSpan.style.color = 'white'
  totalSpan.style.color = '#d20094'
}


//PASSAGGIO ALLA DOMANDA SUCCESSIVA CON VERIFICA DEL SUO INDICE
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    displayQuestion();
  }
}

//VERIFICA DELLE DOMANDE E AGGIUNTA AL NUMERO DI DOMANDE CORRETTE O INCORRETTE
function checkAnswer(answer) {
  const currentQuestion = questions[currentQuestionIndex];
  if (answer === currentQuestion.correct_answer) {
    correctAnswers++;
  } else {
    incorrectAnswers++;
  }
  clearInterval(intervalId); // INTERRUZIONE DEL TIMER SE LE DOMANDE SONO FINITE
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

//TERMINE DEL QUIZ E PASSAGGIO ALLA SLIDE 3
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


  const resultsDiv = document.getElementById("results"); 
  // AGGIUNTA DI UN PARAGRAFO AL DIV RESULTS
  resultsDiv.appendChild(resultParagraph);
  generateChart(resultChart);

  //RIMOZIONE DEL NUMERO DI DOMANDE
  let removeQuestionLabel = document.getElementById("questionCountLabel");
  removeQuestionLabel.remove();
 //RIMOZIONE DEL DIV DELLE RISPOSTE 
  let removeAnswersDiv = document.getElementById("answers");
  removeAnswersDiv.remove()

  timerElement.remove()

  rateButton()

}

//CREAZIONE DEL PULSANTE "RATE US"
function rateButton() {
  const rateContainerDiv = document.getElementById("rateContainer");
  let rateButton = document.createElement("button");
  rateButton.innerHTML = "RATE US";
  
  // Definire la funzione per andare alla pagina di valutazione
  function goToRatePage() {
      window.location.href = "rate.html";
  }
  
  // Assegnare la funzione goToRatePage all'evento onclick del pulsante
  rateButton.onclick = goToRatePage;
  
  // Aggiungere il pulsante al rateContainerDiv
  rateContainerDiv.appendChild(rateButton);
}

 //GENERAZIONE DI UN GRAFICO A CIAMBELLA NELLA SLIDE 3
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

//ACCESSO ALLA TERZA PAGINA TRAMITE BOTTONE
