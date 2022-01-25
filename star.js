const data = [
    {
      question: "Qué es un Jedi?",
      choices: ["Un guerrero intergaláctico", "Un Defensor de la Paz", "Un Stormtrooper", "Un Planeta"],
      answer: "Un Defensor de la Paz",
    },
    {
      question: "Qué es la Estrella de la muerte?",
      choices: [
        "Una enana roja",
        "Una estación espacial Imperial",
        "Un planeta",
        "El sol",
      ],
      answer: "Una estación espacial Imperial",
    },
    {
      question: "Dónde crece Anakin Skywalker?",
      choices: [
        "Corellia",
        "Coruscant",
        "Geonosis",
        "Tatooine",
      ],
      answer:
        "Tatooine",
    },
    {
      question: "Quién es el Jedi mentor de Anakin Skywalker?",
      choices: ["Obi Wan Kenobi", "Darth Sidious", "Mace Windu", "Yoda"],
      answer: "Obi Wan Kenobi",
    },
    {
      question: " de Qué raza es Chewbacca?",
      choices: ["Canino", "Úrsido", "Wookie", "Hutt"],
      answer: "Wookie",
    },
    {
      question: "Quién es el creador de Star Wars?",
      choices: ["Walt Disney", "George Lucas", "Natalie Portman", "Han Solo"],
      answer: "George Lucas",
    },
    {
      question:
        "Quiénes son los padres de Kylo Ren?",
      choices: [
        "Han Solo & Leia Organa",
        "Mace Windu & Yoda",
        "Anakin Skywalker & Padme Amidala",
        "Darth Sidious & Darth Vader",
      ],
      answer: "Han Solo & Leia Organa",
    },
    {
      question: "De qué planeta son los creadores de los clones de The Clone Wars?",
      choices: ["Naboo", "Jakku", "Kamino", "Endor"],
      answer: "Kamino"
    },
    {
      question: "Qué cualidades dominan el lado oscuro de la Fuerza??",
      choices: ["Ira, Miedo y Odio", "Ira, Avaricia, Gula", "Odio, Venganza y Codicia", "Miedo, Venganza y Odio"],
      answer: "Ira, Miedo y Odio"
    },
    {
        question: "De qué cristal esta hecho el sable de luz?",
        choices: [
          "Cuarzo",
          "Kyber",
          "Amatista",
          "Jade",
        ],
        answer:
          "Kyber",
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