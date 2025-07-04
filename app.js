const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    answer: "Jupiter",
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    options: ["Brazil", "Germany", "France", "Argentina"],
    answer: "France",
  },
  {
    question: "What is the tallest mountain in the world?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
    answer: "Mount Everest",
  },
  {
    question: "Which is the largest ocean on Earth?",
    options: [
      "Pacific Ocean",
      "Indian Ocean",
      "Atlantic Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Cu", "Fe"],
    answer: "Au",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Mercury", "Uranus"],
    answer: "Mars",
  },
  {
    question: "What is the largest species of shark?",
    options: [
      "Great White Shark",
      "Whale Shark",
      "Tiger Shark",
      "Hammerhead Shark",
    ],
    answer: "Whale Shark",
  },
  {
    question: "Which animal is known as the King of the Jungle?",
    options: ["Lion", "Tiger", "Elephant", "Giraffe"],
    answer: "Lion",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    answer: "Tokyo",
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Oxygen", "Hydrogen", "Carbon"],
    answer: "Hydrogen",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Leo Tolstoy",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"],
    answer: "Vatican City",
  },
  {
    question: "Which planet is known for its rings?",
    options: ["Venus", "Saturn", "Jupiter", "Neptune"],
    answer: "Saturn",
  },
  {
    question: "Who discovered penicillin?",
    options: [
      "Marie Curie",
      "Alexander Fleming",
      "Louis Pasteur",
      "Isaac Newton",
    ],
    answer: "Alexander Fleming",
  },
  {
    question: "Which continent is the Sahara Desert located on?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    answer: "Africa",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "South Korea", "Thailand", "Japan"],
    answer: "Japan",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const progressText = document.getElementById("progress");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  quizContainer.innerHTML = "";
  resultContainer.innerHTML = "";

  progressText.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `${currentQuestion + 1}. ${questionData.question}`;

  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    option.appendChild(radio);
    option.appendChild(document.createTextNode(shuffledOptions[i]));
    optionsElement.appendChild(option);
  }

  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (!selectedOption) return;

  const answer = selectedOption.value;
  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(option => {
    const input = option.querySelector("input");
    input.disabled = true;

    if (input.value === quizData[currentQuestion].answer) {
      option.classList.add("correct");
    } else if (input.checked && input.value !== quizData[currentQuestion].answer) {
      option.classList.add("incorrect");
    }
  });

  if (answer === quizData[currentQuestion].answer) {
    score++;
  } else {
    incorrectAnswers.push({
      question: quizData[currentQuestion].question,
      incorrectAnswer: answer,
      correctAnswer: quizData[currentQuestion].answer,
    });
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }, 1000);
}

function displayResult() {
  quizContainer.style.display = "none";
  progressText.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "inline-block";
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  progressText.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  progressText.style.display = "none";
  submitButton.style.display = "none";
  showAnswerButton.style.display = "none";
  retryButton.style.display = "inline-block";

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    ${incorrectAnswers.length ? "<p>Incorrect Answers:</p>" + incorrectAnswersHtml : "<p>Perfect score! 🎉</p>"}
  `;
}

// Event Listeners
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// Start Quiz
displayQuestion();
