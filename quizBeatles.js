const data = [
  {
    question: "Cuántos LP conformaban el Album Blanco?",
    choices: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    question: "Cuál es el nombre completo de Ringo Starr?",
    choices: [
      "Ringo Johnson",
      "Richard StarLord",
      "Richard Starkey",
      "Richard Starsun",
    ],
    answer: "Richard Starkey",
  },
  {
    question: "En la terraza de cuál discografica dieron su última presentacion?",
    choices: [
      "Universal Records",
      "Apple Records",
      "Parlophone Records",
      "EMI",
    ],
    answer:
      "Apple Records",
  },
  {
    question: "Cuál instrumento tocaba George Harrison?",
    choices: ["Violin", "Guitarra", "Laud", "Clarinete"],
    answer: "Guitarra",
  },
  {
    question: "De dónde son originarios los integrantes de The Beatles?",
    choices: ["Bristol", "Oxford", "Manchester", "Liverpool"],
    answer: "Liverpool",
  },
  {
    question: "Cuál es el hogar simbolico de The Beatles?",
    choices: ["Cavern Club", "Music Club", "Beatle Club", "Fab Four Club"],
    answer: "Cavern Club",
  },
  {
    question:
      "Cual es el quinto album de estudio?",
    choices: [
      "Rubber Soul",
      "Help",
      "Beatles for sale",
      "Love me do",
    ],
    answer: "Help",
  },
  {
    question: "Cuál fué la primer película de The Beatles?",
    choices: ["A hard days night", "Yellow Submarine", "Help", "Sgt Peppers"],
    answer: "A hard days night",
  },
  {
    question: "Cuál fué el ultimo LP?",
    choices: ["Abbey Road", "Let It Be", "White Album", "Sgt Peppers"],
    answer: "Let It Be",
  },
  {
    question: "Cuál es la canción mas famosa de George Harrison?",
    choices: ["Here comes the sun", "Something", "Taxman", "My sweet lord"],
    answer: "Here comes the sun",
  },
];

class Question {
  /**
   *
   * @param {string} text  este es el texto de la pregunta
   * @param {string []} choices  estas son las opciones de la pregunta
   * @param {string} answer  esta es la respuesta correcta
   */

  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  /**
   *
   * @param {string} choice  texto de las respuestas
   * @returns  {boolean} retorna si la respuesta es correcta o no
   */
  correctAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = data.map(
  (question) =>
    new Question(question.question, question.choices, question.answer)
);

class Quiz {
  questionIndex = 0;
  score = 0;

  /**
   *
   * @param {Question[]} questions
   */

  constructor(questions) {
    this.questions = questions;
  }
  /**
   *
   * @returns  {Question}
   */

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  isEnded() {
    return this.questions.length === this.questionIndex;
  }

  guess(answer) {
    if (this.getQuestionIndex().correctAnswer(answer)) {
      this.score++;
    }

    this.questionIndex++;
  }
}

class UI {
  constructor() {}

  showQuestion(text) {
    const questionTitle = document.getElementById("question");
    questionTitle.innerText = text;
  }

  showChoices(choices, callback) {
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
      const button = document.createElement("button");
      button.innerText = choices[i];
      button.className = "button";
      button.addEventListener("click", () => callback(choices[i]));
      choicesContainer.append(button);
    }
  }

  showScores(score) {
    const quizEndHTML = `
            <h2> Gracias por jugar conmigo!  </h2> <br>
            <h3> Haz logrado ${score}  puntos</h3>
            `;

    const element = document.getElementById("quiz");
    element.innerHTML = quizEndHTML;
  }

  showProgress(currentIndex, total) {
    const element = document.getElementById("progress");
    element.innerHTML = `Question ${currentIndex} of ${total}`;
  }
}

/* funcionamiento*/
const renderPage = (quiz, ui) => {
  if (quiz.isEnded()) {
    ui.showScores(quiz.score);
  } else {
    ui.showQuestion(quiz.getQuestionIndex().text);
    ui.showChoices(quiz.getQuestionIndex().choices, (currentChoice) => {
      quiz.guess(currentChoice);
      renderPage(quiz, ui);
    });
    ui.showProgress(quiz.questionIndex + 1, quiz.questions.length);
  }
};

function main() {
  const quiz = new Quiz(questions);
  const ui = new UI();

  renderPage(quiz, ui);
}

main();
