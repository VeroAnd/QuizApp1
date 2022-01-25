// @ts-check
/* arreglo con la info de las preguntas y respuestas*/
const data = [
  {
    question: "Para qué se usa el Teorema de Pitágoras?",
    choices: [
      "Calcular la base de un cuadrado",
      "Calcular la hipotenusa o los catetos de un triangulo",
      "Calcular el radio de un circulo",
      "Calcular el area de un triangulo escaleno",
    ],
    answer: "Calcular la hipotenusa o los catetos de un triangulo",
  },
  {
    question: "Cómo se calcula el area de un cuadrado?",
    choices: [
      "Base x Altura",
      "Base + Altura",
      "Altura x Ancho",
      "Base x Base",
    ],
    answer: "Base x Altura",
  },
  {
    question: "Cual es el numero mas cercano a 0?",
    choices: ["-100", "-1", "-10", "-1000"],
    answer: "-1",
  },

  {
    question: "Cuál es el valor mas aproximado de Pi?",
    choices: ["3.14", "3.15", "3.16", "3.17"],
    answer: "3.14",
  },
  {
    question: "Cuál de las siguientes No es una regla de factoreo?",
    choices: [
      "Cuadrado del trinomio",
      "Factor comun",
      "Diferencia de cuadrados",
      "Trinomio cuadrado perfecto",
    ],
    answer: "Cuadrado del trinomio",
  },
  {
    question: "Cuál de las siguientes No es una rama de las matematicas?",
    choices: ["Aritmetica", "Algebra", "Cartografia", "Geometria"],
    answer: "Cartografia",
  },
  {
    question: "Cuál es el resultado de (25/5)+(125/5) ?",
    choices: ["15", "25", "35", "30"],
    answer: "30",
  },
  {
    question:
      "A qué famoso científico se lo llamó El Principe de las Matemáticas?",
    choices: ["Carl Sagan", "Carl Gauss", "Charles Darwin", "René Descartes"],
    answer: "Carl Gauss",
  },
  {
    question: "Quién es considerado el padre de las matemáticas?",
    choices: ["Sócrates", "Platón", "Pitágoras", "Heráclito"],
    answer: "Pitágoras",
  },
  {
    question: "Cómo se calcula el perímetro de un triángulo?",
    choices: [
      "Base + Altura",
      "Lado x Lado",
      "Lado + Lado + Lado",
      "Altura x 3",
    ],
    answer: "Lado + Lado + Lado",
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
