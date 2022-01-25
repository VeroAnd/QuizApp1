const data = [
  {
    question: "Qué Trópico atraviesa a la Argentina ?",
    choices: [
      "Trópico de Cáncer",
      "Trópico de Libra",
      "Trópico de Capricornio",
      "Trópico de Leo",
    ],
    answer: "Trópico de Capricornio",
  },
  {
    question: "Cuál es la altura del Aconcagua?",
    choices: [
      "6961mts",
      "9691mts",
      "6196mts",
      "9166mts",
    ],
    answer: "6961mts",
  },
  {
    question: "Cuál es la profundidad máxima de la Fosa de las Marianas?",
    choices: ["-100.000mts", "-10994mts", "-1050mts", "-1000mts"],
    answer: "-10994mts",
  },

  {
    question: "Qué es el meridiano de Greenwich?",
    choices: ["Es el meridiano 0", "Es el meridiano 160", "Es el meridiano 360", "Es el meridiano 50"],
    answer: "Es el meridiano 0",
  },
  {
    question: "Dónde está ubicado el desierto de Nitria?",
    choices: [
      "Argentina",
      "Congo",
      "Egipto",
      "Irán",
    ],
    answer: "Egipto",
  },
  {
    question: "Cuál es el río más largo del mundo?",
    choices: ["Nilo", "Amazonas", "Rin", "Colorado"],
    answer: "Amazonas",
  },
  {
    question: "Qué estudia la Geodesia?",
    choices: ["Forma y dimensiones de la tierra", "Composicion de la corteza terrestre", "Influencia de las mareas", "Asteroides próximos a la tierra"],
    answer: "Forma y dimensiones de la tierra",
  },
  {
    question:
      "Cuántas provincias tiene Argentina?",
    choices: ["21", "22", "23", "24"],
    answer: "24",
  },
  {
    question: "Cuál es el continente mas grande?",
    choices: ["Americano", "Africano", "Asiático", "Oceánico"],
    answer: "Asiático",
  },
  {
    question: "Cuál es el continente mas poblado?",
    choices: ["Americano", "Africano", "Asiático", "Oceánico"],
    answer: "Asiático",
  },
];

/* -----*/

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
