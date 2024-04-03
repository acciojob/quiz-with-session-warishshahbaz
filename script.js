document.addEventListener("DOMContentLoaded", function() {
  const questionsList = document.getElementById("questions");
  const quizForm = document.getElementById("quizForm");
  const submitBtn = document.getElementById("submitBtn");
  const scoreDisplay = document.getElementById("scoreDisplay");

  // Sample questions data
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Leo Tolstoy"],
      correctAnswer: "William Shakespeare"
    }
    // Add more questions as needed
  ];

  // Function to display questions
  function displayQuestions() {
    questionsList.innerHTML = "";
    questions.forEach((q, index) => {
      const questionItem = document.createElement("li");
      questionItem.textContent = q.question;

      const optionsList = document.createElement("ul");
      q.options.forEach((opt, optIndex) => {
        const optionItem = document.createElement("li");
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "question" + index;
        optionInput.value = opt;
        optionItem.textContent = opt;
        optionItem.prepend(optionInput);
        optionsList.appendChild(optionItem);
      });

      questionItem.appendChild(optionsList);
      questionsList.appendChild(questionItem);
    });
  }

  // Function to handle form submission
  quizForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    let score = 0;

    for (let [key, value] of formData.entries()) {
      const questionIndex = parseInt(key.substr(-1)); // Extract question index from input name
      const correctAnswer = questions[questionIndex].correctAnswer;

      if (value === correctAnswer) {
        score++;
      }
    }

    // Display score
    scoreDisplay.textContent = "Your score is " + score + " out of " + questions.length + ".";
    scoreDisplay.style.display = "block";

    // Save score to local storage
    localStorage.setItem("score", score);
  });

  // Check if there is saved progress in session storage
  const savedProgress = sessionStorage.getItem("progress");
  if (savedProgress) {
    // Restore selected options
    const savedOptions = JSON.parse(savedProgress);
    savedOptions.forEach(opt => {
      const input = document.querySelector(`input[name="${opt.name}"][value="${opt.value}"]`);
      if (input) {
        input.checked = true;
      }
    });
  }

  // Display questions
  displayQuestions();
});
