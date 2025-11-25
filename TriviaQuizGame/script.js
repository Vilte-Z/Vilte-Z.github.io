// Quiz questions data
const quizQuestions = [
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Maldives", "Vatican City", "San Marino"],
        correctAnswer: 2
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "Java", "JavaScript", "C++"],
        correctAnswer: 2
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctAnswer: 2
    },
    {
        question: "How many bones are in the human body?",
        options: ["196", "206", "216", "226"],
        correctAnswer: 1
    },
    {
        question: "Which year did World War II end?",
        options: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1
    },
    {
        question: "What is the most abundant gas in Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2
    }
];

// DOM elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQuestionEl = document.getElementById('current-question');
const progressBar = document.getElementById('progress-bar');
const finalScoreEl = document.getElementById('final-score');
const performanceMessage = document.getElementById('performance-message');
const feedbackEl = document.getElementById('feedback');

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// Initialize the quiz
function initQuiz() {
    startBtn.addEventListener('click', startQuiz);
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
}

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    displayQuestion();
}

// Display the current question
function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    questionText.textContent = question.question;
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    
    // Update progress bar
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Create option elements
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        // If user has already selected this option, mark it
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Clear feedback
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
    
    // If it's the last question, change button text
    nextBtn.textContent = currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Handle option selection
function selectOption(optionIndex) {
    // If already answered this question, don't allow changing
    if (userAnswers[currentQuestionIndex] !== null) return;
    
    // Mark selected option
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Check if answer is correct
    const isCorrect = optionIndex === quizQuestions[currentQuestionIndex].correctAnswer;
    
    // Provide feedback
    if (isCorrect) {
        feedbackEl.textContent = 'Correct! Well done.';
        feedbackEl.classList.add('correct-feedback');
        score++;
    } else {
        feedbackEl.textContent = `Incorrect. The correct answer is: ${quizQuestions[currentQuestionIndex].options[quizQuestions[currentQuestionIndex].correctAnswer]}`;
        feedbackEl.classList.add('wrong-feedback');
    }
}

// Show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Show next question or finish quiz
function showNextQuestion() {
    // If user hasn't answered current question, don't proceed
    if (userAnswers[currentQuestionIndex] === null) {
        feedbackEl.textContent = 'Please select an answer before proceeding.';
        feedbackEl.className = 'feedback wrong-feedback';
        return;
    }
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        // Show results screen
        showResults();
    }
}

// Show quiz results
function showResults() {
    questionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    finalScoreEl.textContent = score;
    
    // Performance message based on score
    if (score >= 9) {
        performanceMessage.textContent = "Outstanding! You're a trivia master!";
    } else if (score >= 7) {
        performanceMessage.textContent = "Great job! You know your stuff!";
    } else if (score >= 5) {
        performanceMessage.textContent = "Good effort! Keep learning!";
    } else {
        performanceMessage.textContent = "Don't worry, practice makes perfect!";
    }
}

// Restart the quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    resultsScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    
    displayQuestion();
}

// Initialize the quiz when the page loads
window.addEventListener('DOMContentLoaded', initQuiz);