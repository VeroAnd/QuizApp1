const data = [
  {
    question: "Cuál no es una nota musical?",
    choices: ["Fa", "Sol", "La", "Luna"],
    answer: "Luna",
  },
  {
    question: "Cuál es el valor de una Corchea?",
    choices: [
      "1/2 de una redonda",
      "1/4 de una redonda",
      "1/6 de una redonda",
      "1/8 de una redonda",
    ],
    answer: "1/8 de una redonda",
  },
  {
    question: "Cuál es el album más vendido de la historia?",
    choices: [
      "Let it be, The Beatles",
      "Thriller, Michael Jackson",
      "Spice, Spice Girls",
      "Queen II, Queen",
    ],
    answer: "Thriller, Michael Jackson",
  },
  {
    question: "Qué es una Rapsodia?",
    choices: [
      "Una pieza musical compuesta por diferentes partes temáticas unidas libremente y sin relación alguna entre ellas",
      "Una pieza musical compuesta por diferentes partes temáticas unidas libremente y con relación entre ellas",
      "Una pieza musical compuesta por similares partes temáticas unidas libremente y sin relación alguna entre ellas",
      "Una pieza musical descompuesta por diferentes partes temáticas unidas libremente y sin relación alguna entre ellas",
    ],
    answer:
      "Una pieza musical compuesta por diferentes partes temáticas unidas libremente y sin relación alguna entre ellas",
  },
  {
    question: "Cuál de estos instrumentos es de viento?",
    choices: ["Violin", "Guitarra", "Laud", "Clarinete"],
    answer: "Clarinete",
  },
  {
    question: "Quién es el Rey del Pop?",
    choices: ["Bruno Mars", "Michael Jackson", "Elton John", "Luis Miguel"],
    answer: "Michael Jackson",
  },
  {
    question: "Quién es la Reina del Pop?",
    choices: ["Thalia", "Britney Spears", "Madonna", "Cher"],
    answer: "Madonna",
  },
  {
    question:
      "Cual  de estas es una de las canciones que -en este momento- viaja en el espacio en la Sonda Voyager?",
    choices: [
      "Chuk Berry: Johnny B Goode",
      "The Beatles: Across the universe",
      "Israel Kamakawiwo: Somewhere over the rainbow",
      "Thalia: Regresa a mí",
    ],
    answer: "Chuk Berry: Johnny B Goode",
  },
  {
    question: "En qué año nacio Ludwig Beethoven?",
    choices: ["1870", "1770", "1670", "1570"],
    answer: "1770",
  },
  {
    question: "Cómo se llama la canción principal de Titanic?",
    choices: ["My heart will go on", "Under the sea", "Tiritando", "Yellow Submarine"],
    answer: "My heart will go on",
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
