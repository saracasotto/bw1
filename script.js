
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
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
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
// VARIABILE PER L'INTERVALLO DEL TIMER
//FA RIPARTIRE IL TIMER QUANDO PASSI ALLA DOMANDA SUCCESSIVA


const startButton = document.getElementById('start-button');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const timerElement = document.getElementById('timer');
const correctElement = document.getElementById('correct');  //ULTIMA PAGINA HTML
const incorrectElement = document.getElementById('incorrect'); //ULTIMA PAGINA HTML

function goToNextPage() {
  window.location.href = "test.html"; 
}

window.addEventListener('load', function() {
  if (window.location.pathname.endsWith('test.html')) {
    displayQuestion();
  }
});  //FUNZIONE PER ATTIVARE IL TEST APPENA SI CARICA LA PAGINA

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
  const currentQuestion = questions[currentQuestionIndex]; //CICLA ARRAY E MOSTRA DOMANDE
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = ''; // PULISCE RISPOSTE PRECEDENTI

  const answers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);
  //DA UN'ORDINE CASUALE ALLE RISPOSTE
  answers.sort(() => Math.random() - 0.5);


  answers.forEach(answer => {
    //CREA UN BOTTONE PER OGNI RISPOSTA
    const answerButton = document.createElement('button');
    answerButton.textContent = answer;
    answerButton.addEventListener('click', () => checkAnswer(answer));
    answersElement.appendChild(answerButton);
  });
  startTimer(); // Avvia il timer quando viene visualizzata una nuova domanda
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
  questionElement.textContent = 'Test completed';
  answersElement.innerHTML = '';
  timerElement.textContent = 'Time finished';
  correctElement.textContent = 'Right answers: ' + correctAnswers;
  incorrectElement.textContent = 'Wrong answers: ' + incorrectAnswers;

  const totalQuestions = correctAnswers + incorrectAnswers;
  const percentage = (correctAnswers / totalQuestions) * 100;

  const resultParagraph = document.createElement("p");


  if (correctAnswers > 5) {
    resultParagraph.innerText = "Passed! Correct Answers: " + correctAnswers + "/" + totalQuestions + " (" + percentage + "%)";
  } else {
    resultParagraph.innerText = "Failed. Correct Answers: " + correctAnswers + "/" + totalQuestions + " (" + percentage + "%)";
  }

  const resultsDiv = document.getElementById('results');
  // Aggiungi il paragrafo al div dei risultati
  resultsDiv.appendChild(resultParagraph);
}




/* OPPURE SE CORRECT ANSWER < TEST FALLITO
ELSE - TEST SUPERATO */

function startTimer() {
  let timer = 60;
  timerElement.textContent = timer;
  intervalId = setInterval(() => {
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
}


/*

Generazione random delle domande (oggetto di questions - sono 10)
se correct answer maggiori di 5, il test è passato.
else, bocciato

Funzione richiamata al click sulla risposta corretta: +1 punto
Funzione richiamata al click sulla risposta sbagliata: -1 punto
Funzione set timeout + non ha selezionato niente - se scade il tempo, si passa alla domanda successiva e -1 punto
//CHIEDERE A ALFREDO TEMA CLICK DOMANDE


Al click sull'ultima risposta si accede alla pagina 3 e si genera il punteggio attiva display risultato


*/
