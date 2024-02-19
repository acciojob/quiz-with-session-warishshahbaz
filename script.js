document.addEventListener('DOMContentLoaded', function() {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "CH4"],
      answer: "H2O"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
      answer: "William Shakespeare"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      options: ["China", "India", "Japan", "Australia"],
      answer: "Japan"
    }
  ];

  const quizContainer = document.getElementById('quiz');
  const submitButton = document.getElementById('submit');

  // Load saved progress from session storage
  const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || {};

  // Display questions
  questions.forEach((question, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${question.question}</h3>
      ${question.options.map(option => `
        <input type="radio" id="q${index}_option" name="q${index}" value="${option}" ${savedProgress[index] === option ? 'checked' : ''}>
        <label for="q${index}_option">${option}</label><br>
      `).join('')}
    `;
    quizContainer.appendChild(div);
  });

  // Event listener for submit button
  submitButton.addEventListener('click', function() {
    const selectedOptions = Array.from(document.querySelectorAll('input[type="radio"]:checked'))
      .reduce((acc, input) => {
        const index = parseInt(input.name.slice(1));
        const option = input.value;
        acc[index] = option;
        return acc;
      }, {});

    // Save progress in session storage
    sessionStorage.setItem('progress', JSON.stringify(selectedOptions));

    // Calculate score
    const score = Object.values(selectedOptions).reduce((acc, option, index) => {
      if (option === questions[index].answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Display score
    alert(`Your score is ${score} out of ${questions.length}.`);

    // Store score in local storage
    localStorage.setItem('score', score);
  });
});