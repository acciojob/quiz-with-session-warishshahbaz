document.addEventListener("DOMContentLoaded", function() {
  const questionsContainer = document.getElementById("questions");
  const submitButton = document.getElementById("submit");
  const scoreDisplay = document.getElementById("score");

  // Questions data
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Jupiter"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: "H2O"
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic reticulum"],
      correctAnswer: "Mitochondria"
    }
  ];

  // Initialize quiz
  function initQuiz() {
    let progress = sessionStorage.getItem("progress");
    if (!progress) {
      progress = new Array(questions.length).fill(null);
    } else {
      progress = JSON.parse(progress);
    }
    
    // Display questions
    questionsContainer.innerHTML = "";
    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map((option, i) => `
          <input type="radio" id="q${index}_option${i}" name="q${index}" value="${option}" ${progress[index] === option ? 'checked' : ''}>
          <label for="q${index}_option${i}">${option}</label>
        `).join('')}
      `;
      questionsContainer.appendChild(questionDiv);
    });
  }

  // Handle submit button click
  submitButton.addEventListener("click", function() {
    const selectedOptions = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => input.value);
    const score = selectedOptions.reduce((acc, option, index) => {
      if (option === questions[index].correctAnswer) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    // Display score
    scoreDisplay.textContent = `Your score is ${score} out of ${questions.length}`;

    // Save score in local storage
    localStorage.setItem("score", score);
  });

  // Initialize quiz
  initQuiz();
});
