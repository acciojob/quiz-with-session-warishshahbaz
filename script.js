document.addEventListener('DOMContentLoaded', function() {
  const questionsContainer = document.getElementById('questions');
  const submitButton = document.getElementById('submit');
  const scoreDisplay = document.getElementById('score');

  // Define the quiz questions and options
  const quizQuestions = [
    {
      question:'What is the capital of France?',
      options: ['London', 'Paris', 'Berlin', 'Madrid'],
      answer: 'Paris'
    },
    {
      question: 'What is the largest mammal?',
      options: ['Elephant', 'Whale', 'Giraffe', 'Horse'],
      answer: 'Whale'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
      answer: 'Mars'
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      answer: 'Leonardo da Vinci'
    },
    {
      question: 'Which is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
      answer: 'Mount Everest'
    }
  ];

  // Function to render the quiz questions
  function renderQuestions() {
    const savedProgress = JSON.parse(sessionStorage.getItem('progress')) || [];
    questionsContainer.innerHTML = '';
    quizQuestions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');
      questionDiv.innerHTML = `
        <p>${question.question}</p>
        <ul>
          ${question.options.map((option, optionIndex) => `
            <li>
              <input type="radio" id="q${index}-option${optionIndex}" name="q${index}" value="${option}" ${savedProgress[index] === option ? 'checked' : ''}>
              <label for="q${index}-option${optionIndex}">${option}</label>
            </li>
          `).join('')}
        </ul>
      `;
      questionsContainer.appendChild(questionDiv);
    });
  }

  // Function to calculate and display the score
  function calculateScore() {
    const selectedOptions = Array.from(document.querySelectorAll('input[type="radio"]:checked'));
    const score = selectedOptions.reduce((totalScore, option) => {
      const questionIndex = parseInt(option.name.slice(1));
      const selectedAnswer = option.value;
      if (selectedAnswer === quizQuestions[questionIndex].answer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
    scoreDisplay.textContent = `Your score is ${score} out of 5.`;
    localStorage.setItem('score', score);
  }

  // Event listener for submit button
  submitButton.addEventListener('click', function() {
    calculateScore();
  });

  // Event listener for radio button change
  questionsContainer.addEventListener('change', function(event) {
    const target = event.target;
    if (target.tagName === 'INPUT' && target.type === 'radio') {
      const progress = [];
      const radioButtons = document.querySelectorAll('input[type="radio"]:checked');
      radioButtons.forEach(button => {
        progress.push(button.value);
      });
      sessionStorage.setItem('progress', JSON.stringify(progress));
    }
  });

  // Initial rendering of questions
  renderQuestions();
});
