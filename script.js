document.addEventListener('DOMContentLoaded', function() {
  const questionsContainer = document.getElementById('questions');
  const submitButton = document.getElementById('submit');
  const scoreContainer = document.getElementById('score');

  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 'Paris'
    },
    // Add more questions here...
  ];

  // Initialize quiz
  function initQuiz() {
    let html = '';
    questions.forEach((question, index) => {
      html += `
        <div>
          <p>${index + 1}. ${question.question}</p>
          <select id="select${index}" name="answer">
            ${question.options.map(option => `<option value="${option}">${option}</option>`).join('')}
          </select>
        </div>`;
    });
    questionsContainer.innerHTML = html;
  }

  // Save progress to session storage
  function saveProgress() {
    questions.forEach((question, index) => {
      const selectElement = document.getElementById(`select${index}`);
      const selectedOption = selectElement.value;
      sessionStorage.setItem(`progress${index}`, selectedOption);
    });
  }

  // Calculate and display the score
  function calculateScore() {
    let score = 0;
    questions.forEach((question, index) => {
      const selectedOption = sessionStorage.getItem(`progress${index}`);
      if (selectedOption === question.answer) {
        score++;
      }
    });
    scoreContainer.textContent = `Your score is ${score} out of ${questions.length}`;
    localStorage.setItem('score', score);
  }

  initQuiz();

  submitButton.addEventListener('click', function() {
    saveProgress();
    calculateScore();
  });
});
