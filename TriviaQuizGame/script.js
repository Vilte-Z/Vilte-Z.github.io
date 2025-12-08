const gifPopup = document.getElementById('gifPopup');
const closeGifBtn = document.getElementById('closeGif');
const resultGif = document.getElementById('resultGif');
const gifTitle = document.getElementById('gifTitle');
const gifMessage = document.getElementById('gifMessage');

const gifsByScore = {
  perfect: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXRlNW56YTM3NzZwb3o3OXQybHhodG55bzJwcWdkdDJ4d25pNXYzYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/i79P9wUfnmPyo/giphy.gif',
  good: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXRlNW56YTM3NzZwb3o3OXQybHhodG55bzJwcWdkdDJ4d25pNXYzYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/G1vplGMypxBcp7kx32/giphy.gif',
  average: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXRlNW56YTM3NzZwb3o3OXQybHhodG55bzJwcWdkdDJ4d25pNXYzYiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/yBwcx562kZ2FWlYb2A/giphy.gif',
  poor: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NWc4YWZiZTJodm53c25jOGJpdXRyYmhsNGN2YWthZW82bHVwbzdhbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/ljtfkyTD3PIUZaKWRi/giphy.gif',
  default: 'https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3NWc4YWZiZTJodm53c25jOGJpdXRyYmhsNGN2YWthZW82bHVwbzdhbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/D8xNev92dfqdG9FPx4/giphy.gif'
};
// Messages based on score
const messagesByScore = {
  perfect: "Perfect score! You're a genius!",
  good: "Excellent work! You really know your stuff!",
  average: "Good effort! Keep learning and improving!",
  poor: "Don't worry! Practice makes perfect!"
};

// Function to create confetti effect
function createConfetti() {
  const colors = ['#C1121F', '#5A0D23', '#FFC4C4', '#38A169'];
  
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Random position and size
    const size = Math.random() * 10 + 5;
    const left = Math.random() * 100;
    const animationDuration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.left = `${left}vw`;
    confetti.style.top = '-20px';
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confetti ${animationDuration}s ease-out ${delay}s forwards`;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, (animationDuration + delay) * 1000);
  }
}

// Function to show GIF popup based on score
// Add this to your JavaScript near the showGifPopup function
function showGifPopup(score, totalQuestions) {
  const percentage = (score / totalQuestions) * 100;
  let gifCategory;
  
  if (percentage === 100) {
    gifCategory = 'perfect';
    gifTitle.textContent = "Perfect Score!";
  } else if (percentage >= 80) {
    gifCategory = 'good';
    gifTitle.textContent = "Excellent!";
  } else if (percentage >= 50) {
    gifCategory = 'average';
    gifTitle.textContent = "Good Job!";
  } else {
    gifCategory = 'poor';
    gifTitle.textContent = "Keep Trying!";
  }
  
  // Set GIF and message
  const gifUrl = gifsByScore[gifCategory];
  resultGif.src = gifUrl;
  gifMessage.textContent = messagesByScore[gifCategory];
  
  // Add error handling in case GIF fails to load
  resultGif.onerror = function() {
    console.log("GIF failed to load, using fallback");
    resultGif.src = gifsByScore['default'];
  };
  
  // Show popup
  gifPopup.style.display = 'flex';
  
  // Add confetti for good scores
  if (percentage >= 80) {
    createConfetti();
  }
  
  // Prevent scrolling when popup is open
  document.body.style.overflow = 'hidden';
}

// Function to close GIF popup
function closeGifPopup() {
  gifPopup.style.display = 'none';
  document.body.style.overflow = 'auto';
  
  // Remove any remaining confetti
  document.querySelectorAll('.confetti').forEach(confetti => {
    confetti.remove();
  });
}

// Event listeners
closeGifBtn.addEventListener('click', closeGifPopup);

// Close popup when clicking outside the content
gifPopup.addEventListener('click', function(e) {
  if (e.target === gifPopup) {
    closeGifPopup();
  }
});

// Close with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && gifPopup.style.display === 'flex') {
    closeGifPopup();
  }
});

// Quiz data - questions for each subject and difficulty
const quizData = {
    math: {
        easy: [
            {
                question: "What is 15 + 27?",
                answers: ["40", "42", "32", "38"],
                correct: 1
            },
            {
                question: "What is 8 × 7?",
                answers: ["54", "56", "64", "48"],
                correct: 1
            },
            {
                question: "What is 144 ÷ 12?",
                answers: ["10", "11", "12", "13"],
                correct: 2
            },
            {
                question: "What is the square root of 64?",
                answers: ["6", "7", "8", "9"],
                correct: 2
            },
            {
                question: "What is 3² + 4²?",
                answers: ["7", "12", "25", "5"],
                correct: 2
            },
            {
                question: "What is 5! (5 factorial)?",
                answers: ["60", "100", "120", "150"],
                correct: 2
            },
            {
                question: "What is 30% of 200?",
                answers: ["30", "60", "90", "120"],
                correct: 1
            },
            {
                question: "What is the next prime number after 7?",
                answers: ["8", "9", "10", "11"],
                correct: 3
            },
            {
                question: "What is 3/4 as a percentage?",
                answers: ["25%", "50%", "75%", "100%"],
                correct: 2
            },
            {
                question: "Solve for x: 2x + 5 = 15",
                answers: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
                correct: 0
            }
        ],
        difficult: [
            {
                question: "What is the derivative of x³?",
                answers: ["2x²", "3x²", "3x", "x²"],
                correct: 1
            },
            {
                question: "What is the value of π to 5 decimal places?",
                answers: ["3.14159", "3.14160", "3.14285", "3.14195"],
                correct: 0
            },
            {
                question: "What is the integral of 2x dx?",
                answers: ["x²", "x² + C", "2x²", "x"],
                correct: 1
            },
            {
                question: "What is the Pythagorean theorem?",
                answers: ["a² + b² = c", "a + b = c", "a² + b² = c²", "a² - b² = c²"],
                correct: 2
            },
            {
                question: "What is the value of sin(90°)?",
                answers: ["0", "0.5", "1", "√2/2"],
                correct: 2
            },
            {
                question: "What is the area of a circle with radius 5?",
                answers: ["10π", "25π", "50π", "100π"],
                correct: 1
            },
            {
                question: "What is the slope of a vertical line?",
                answers: ["0", "1", "Undefined", "-1"],
                correct: 2
            },
            {
                question: "What is the sum of interior angles in a triangle?",
                answers: ["90°", "180°", "270°", "360°"],
                correct: 1
            },
            {
                question: "What is log₁₀(100)?",
                answers: ["1", "2", "10", "100"],
                correct: 1
            },
            {
                question: "What is the quadratic formula?",
                answers: ["-b ± √(b² - 4ac)/2a", "-b ± √(b² + 4ac)/2a", "b ± √(b² - 4ac)/2a", "b ± √(b² + 4ac)/2a"],
                correct: 0
            }
        ]
    },
    history: {
        easy: [
            {
                question: "Who was the first President of the United States?",
                answers: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
                correct: 2
            },
            {
                question: "In which year did World War II end?",
                answers: ["1943", "1944", "1945", "1946"],
                correct: 2
            },
            {
                question: "Which ancient civilization built the pyramids?",
                answers: ["Greeks", "Romans", "Egyptians", "Mayans"],
                correct: 2
            },
            {
                question: "Who discovered America?",
                answers: ["Christopher Columbus", "Vasco da Gama", "Ferdinand Magellan", "Marco Polo"],
                correct: 0
            },
            {
                question: "Which empire was ruled by Julius Caesar?",
                answers: ["Greek", "Roman", "Persian", "Ottoman"],
                correct: 1
            },
            {
                question: "Who wrote the Declaration of Independence?",
                answers: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
                correct: 2
            },
            {
                question: "Which war was fought between the North and South in the United States?",
                answers: ["World War I", "Revolutionary War", "Civil War", "War of 1812"],
                correct: 2
            },
            {
                question: "Who was the first man to walk on the moon?",
                answers: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
                correct: 1
            },
            {
                question: "Which year did the Titanic sink?",
                answers: ["1905", "1912", "1918", "1923"],
                correct: 1
            },
            {
                question: "Who painted the Mona Lisa?",
                answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
                correct: 2
            }
        ],
        difficult: [
            {
                question: "Which treaty ended World War I?",
                answers: ["Treaty of Versailles", "Treaty of Paris", "Treaty of Berlin", "Treaty of London"],
                correct: 0
            },
            {
                question: "Who was the last Tsar of Russia?",
                answers: ["Alexander II", "Nicholas I", "Nicholas II", "Peter the Great"],
                correct: 2
            },
            {
                question: "What year did the Berlin Wall fall?",
                answers: ["1987", "1989", "1991", "1993"],
                correct: 1
            },
            {
                question: "Who was the first female Prime Minister of the United Kingdom?",
                answers: ["Theresa May", "Margaret Thatcher", "Angela Merkel", "Indira Gandhi"],
                correct: 1
            },
            {
                question: "Which ancient city was destroyed by Mount Vesuvius?",
                answers: ["Athens", "Rome", "Pompeii", "Sparta"],
                correct: 2
            },
            {
                question: "Who was the leader of the Soviet Union during World War II?",
                answers: ["Vladimir Lenin", "Joseph Stalin", "Leon Trotsky", "Nikita Khrushchev"],
                correct: 1
            },
            {
                question: "Which civilization invented paper?",
                answers: ["Greek", "Roman", "Chinese", "Egyptian"],
                correct: 2
            },
            {
                question: "Who was the Pharaoh during the Exodus?",
                answers: ["Ramses II", "Tutankhamun", "Cleopatra", "Akhenaten"],
                correct: 0
            },
            {
                question: "What year did the French Revolution begin?",
                answers: ["1776", "1789", "1799", "1812"],
                correct: 1
            },
            {
                question: "Which empire was ruled by Genghis Khan?",
                answers: ["Ottoman", "Mongol", "Persian", "Roman"],
                correct: 1
            }
        ]
    },
    geography: {
        easy: [
            {
                question: "What is the largest continent?",
                answers: ["Africa", "Asia", "North America", "Europe"],
                correct: 1
            },
            {
                question: "Which river is the longest in the world?",
                answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
                correct: 1
            },
            {
                question: "What is the capital of France?",
                answers: ["Berlin", "Madrid", "Paris", "Rome"],
                correct: 2
            },
            {
                question: "Which country is both a continent and a country?",
                answers: ["New Zealand", "Australia", "Greenland", "South Africa"],
                correct: 1
            },
            {
                question: "What is the largest ocean?",
                answers: ["Atlantic", "Indian", "Arctic", "Pacific"],
                correct: 3
            },
            {
                question: "Which desert is the largest in the world?",
                answers: ["Sahara", "Arabian", "Gobi", "Kalahari"],
                correct: 0
            },
            {
                question: "What is the capital of Japan?",
                answers: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
                correct: 2
            },
            {
                question: "Which mountain is the highest in the world?",
                answers: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
                correct: 1
            },
            {
                question: "Which country has the most population?",
                answers: ["India", "United States", "China", "Indonesia"],
                correct: 2
            },
            {
                question: "What is the smallest country in the world?",
                answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
                correct: 2
            }
        ],
        difficult: [
            {
                question: "What is the capital of Bhutan?",
                answers: ["Kathmandu", "Thimphu", "Dhaka", "Colombo"],
                correct: 1
            },
            {
                question: "Which country has the most time zones?",
                answers: ["United States", "China", "Russia", "Canada"],
                correct: 2
            },
            {
                question: "What is the deepest point in the ocean?",
                answers: ["Puerto Rico Trench", "Java Trench", "Mariana Trench", "Tonga Trench"],
                correct: 2
            },
            {
                question: "Which African country was never colonized?",
                answers: ["Ethiopia", "Nigeria", "Kenya", "South Africa"],
                correct: 0
            },
            {
                question: "What is the largest island in the world?",
                answers: ["Borneo", "Madagascar", "Greenland", "New Guinea"],
                correct: 2
            },
            {
                question: "Which country has the most official languages?",
                answers: ["India", "South Africa", "Switzerland", "Bolivia"],
                correct: 1
            },
            {
                question: "What is the driest desert in the world?",
                answers: ["Sahara", "Atacama", "Gobi", "Mojave"],
                correct: 1
            },
            {
                question: "Which river runs through Baghdad?",
                answers: ["Euphrates", "Nile", "Tigris", "Jordan"],
                correct: 2
            },
            {
                question: "What is the smallest US state by area?",
                answers: ["Delaware", "Rhode Island", "Connecticut", "Hawaii"],
                correct: 1
            },
            {
                question: "Which country is known as the 'Land of the Rising Sun'?",
                answers: ["China", "South Korea", "Japan", "Thailand"],
                correct: 2
            }
        ]
    },
    music: {
        easy: [
            {
                question: "Who is known as the 'King of Pop'?",
                answers: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
                correct: 1
            },
            {
                question: "Which British band is known as the 'Fab Four'?",
                answers: ["The Rolling Stones", "The Who", "The Beatles", "Queen"],
                correct: 2
            },
            {
                question: "What instrument does Yo-Yo Ma play?",
                answers: ["Violin", "Cello", "Piano", "Flute"],
                correct: 1
            },
            {
                question: "Which composer wrote 'Moonlight Sonata'?",
                answers: ["Mozart", "Bach", "Beethoven", "Chopin"],
                correct: 2
            },
            {
                question: "What genre of music is Bob Dylan known for?",
                answers: ["Rock", "Folk", "Jazz", "Blues"],
                correct: 1
            },
            {
                question: "Who sang 'Like a Virgin'?",
                answers: ["Cyndi Lauper", "Madonna", "Whitney Houston", "Cher"],
                correct: 1
            },
            {
                question: "Which instrument has black and white keys?",
                answers: ["Guitar", "Violin", "Piano", "Trumpet"],
                correct: 2
            },
            {
                question: "Who composed 'The Four Seasons'?",
                answers: ["Vivaldi", "Mozart", "Handel", "Bach"],
                correct: 0
            },
            {
                question: "What is the highest female singing voice?",
                answers: ["Alto", "Mezzo-soprano", "Soprano", "Contralto"],
                correct: 2
            },
            {
                question: "Which band wrote 'Bohemian Rhapsody'?",
                answers: ["The Beatles", "Led Zeppelin", "Queen", "Pink Floyd"],
                correct: 2
            }
        ],
        difficult: [
            {
                question: "Who composed the opera 'The Magic Flute'?",
                answers: ["Verdi", "Wagner", "Mozart", "Puccini"],
                correct: 2
            },
            {
                question: "Which instrument is played by blowing across a hole?",
                answers: ["Clarinet", "Flute", "Trumpet", "Oboe"],
                correct: 1
            },
            {
                question: "What is the term for a gradual increase in loudness?",
                answers: ["Crescendo", "Decrescendo", "Forte", "Piano"],
                correct: 0
            },
            {
                question: "Who wrote 'Rhapsody in Blue'?",
                answers: ["George Gershwin", "Leonard Bernstein", "Aaron Copland", "Scott Joplin"],
                correct: 0
            },
            {
                question: "Which composer was deaf in his later years?",
                answers: ["Mozart", "Bach", "Beethoven", "Handel"],
                correct: 2
            },
            {
                question: "What is the Italian term for very fast tempo?",
                answers: ["Adagio", "Andante", "Allegro", "Presto"],
                correct: 3
            },
            {
                question: "Which music key has no sharps or flats?",
                answers: ["C major", "G major", "F major", "D major"],
                correct: 0
            },
            {
                question: "Who wrote the ballet 'Swan Lake'?",
                answers: ["Tchaikovsky", "Stravinsky", "Prokofiev", "Shostakovich"],
                correct: 0
            },
            {
                question: "What is the term for playing notes smoothly and connected?",
                answers: ["Staccato", "Legato", "Marcato", "Pizzicato"],
                correct: 1
            },
            {
                question: "Which composer wrote 'The Planets' suite?",
                answers: ["Gustav Holst", "Richard Strauss", "Claude Debussy", "Maurice Ravel"],
                correct: 0
            }
        ]
    }
};

// Game state variables
let currentScreen = 'start';
let playerName = '';
let selectedSubject = '';
let selectedDifficulty = '';
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer = 60;
let timerInterval = null;
let questions = [];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const playerNameInput = document.getElementById('player-name');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const newQuizBtn = document.getElementById('new-quiz-btn');

const subjectOptions = document.querySelectorAll('.subject-options .option-btn');
const difficultyOptions = document.querySelectorAll('.difficulty-options .option-btn');

const currentPlayerElement = document.getElementById('current-player');
const currentSubjectElement = document.getElementById('current-subject');
const currentDifficultyElement = document.getElementById('current-difficulty');
const currentScoreElement = document.getElementById('current-score');
const questionCounterElement = document.getElementById('question-counter');
const progressFillElement = document.getElementById('progress-fill');
const timerElement = document.getElementById('timer');
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');

const resultPlayerElement = document.getElementById('result-player');
const finalScoreElement = document.getElementById('final-score');
const resultMessageElement = document.getElementById('result-message');
const bestSubjectElement = document.getElementById('best-subject');
const bestDifficultyElement = document.getElementById('best-difficulty');
const bestScoreElement = document.getElementById('best-score');

// Initialize the game
function initGame() {
    // Load player name from localStorage if available
    const savedName = localStorage.getItem('triviaPlayerName');
    if (savedName) {
        playerNameInput.value = savedName;
    }
    
    // Set up event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    playAgainBtn.addEventListener('click', restartQuiz);
    newQuizBtn.addEventListener('click', newQuiz);
    
    // Subject selection
    subjectOptions.forEach(option => {
        option.addEventListener('click', () => {
            subjectOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedSubject = option.getAttribute('data-subject');
        });
    });
    
    // Difficulty selection
    difficultyOptions.forEach(option => {
        option.addEventListener('click', () => {
            difficultyOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedDifficulty = option.getAttribute('data-difficulty');
        });
    });
    
    // Set default selections
    subjectOptions[0].click();
    difficultyOptions[0].click();
}

// Start the quiz
function startQuiz() {
    playerName = playerNameInput.value.trim();
    
    if (!playerName) {
        alert('Please enter your name to start the quiz.');
        return;
    }
    
    if (!selectedSubject || !selectedDifficulty) {
        alert('Please select both a subject and difficulty level.');
        return;
    }
    
    // Save player name to localStorage
    localStorage.setItem('triviaPlayerName', playerName);
    
    // Get questions for selected subject and difficulty
    questions = quizData[selectedSubject][selectedDifficulty];
    
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    timer = 60;
    
    // Update UI elements
    currentPlayerElement.textContent = playerName;
    currentSubjectElement.textContent = getSubjectName(selectedSubject);
    currentDifficultyElement.textContent = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    currentDifficultyElement.innerHTML = `<span class="difficulty-badge ${selectedDifficulty}">${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}</span>`;
    updateScore();
    
    // Switch to quiz screen
    switchScreen('quiz');
    
    // Load first question
    loadQuestion();
    
    // Start timer
    startTimer();
}

// Load the current question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Update question counter and progress bar
    questionCounterElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressFillElement.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    
    // Update question text
    questionTextElement.textContent = question.question;
    
    // Clear previous answer options
    answerOptionsElement.innerHTML = '';
    
    // Add answer options
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.textContent = answer;
        answerBtn.setAttribute('data-index', index);
        answerBtn.addEventListener('click', () => selectAnswer(index, answerBtn));
        answerOptionsElement.appendChild(answerBtn);
    });
    
    // Reset selected answer
    selectedAnswer = null;
    nextBtn.disabled = true;
}

// Select an answer
function selectAnswer(index, button) {
    // If an answer is already selected, do nothing
    if (selectedAnswer !== null) return;
    
    // Mark the selected answer
    selectedAnswer = index;
    const question = questions[currentQuestionIndex];
    
    // Highlight selected answer
    const allAnswerBtns = document.querySelectorAll('.answer-btn');
    allAnswerBtns.forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    
    // Check if answer is correct
    if (index === question.correct) {
        score++;
        updateScore();
        button.classList.add('correct');
    } else {
        button.classList.add('incorrect');
        // Also highlight the correct answer
        allAnswerBtns[question.correct].classList.add('correct');
    }
    
    // Enable next button
    nextBtn.disabled = false;
    
    // Stop the timer for this question
    clearInterval(timerInterval);
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        // Reset timer for next question
        timer = 60;
        timerElement.textContent = `Time: ${timer}s`;
        startTimer();
        
        // Load next question
        loadQuestion();
    } else {
        // Quiz is finished
        finishQuiz();
    }
}

// Finish the quiz and show results
// Finish the quiz and show results
function finishQuiz() {
    // Stop timer
    clearInterval(timerInterval);
    
    // Update UI elements
    resultPlayerElement.textContent = playerName;
    finalScoreElement.textContent = `${score}/${questions.length}`;
    
    // Get and update best score
    const bestScoreKey = `bestScore_${playerName}_${selectedSubject}_${selectedDifficulty}`;
    const currentBestScore = localStorage.getItem(bestScoreKey) || 0;
    
    if (score > currentBestScore) {
        localStorage.setItem(bestScoreKey, score);
        resultMessageElement.textContent = `Congratulations! You set a new high score!`;
        finalScoreElement.classList.add('pulse');
    } else {
        resultMessageElement.textContent = getResultMessage(score, questions.length);
    }
    
    // Update best score display
    bestSubjectElement.textContent = getSubjectName(selectedSubject);
    bestDifficultyElement.textContent = selectedDifficulty;
    bestScoreElement.textContent = `${Math.max(score, currentBestScore)}/${questions.length}`;
    
    // Switch to results screen
    switchScreen('results');
    
    // ADD THIS LINE: Show the GIF popup after a short delay
    setTimeout(() => {
        showGifPopup(score, questions.length);
    }, 300); // 0.3 second delay so results screen loads first
}

// Restart the quiz with same settings
function restartQuiz() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    timer = 60;
    
    // Switch to quiz screen
    switchScreen('quiz');
    
    // Load first question
    loadQuestion();
    
    // Start timer
    startTimer();
    
    // Update score display
    updateScore();
}

// Start a new quiz (go back to start screen)
function newQuiz() {
    switchScreen('start');
}

// Switch between screens
function switchScreen(screen) {
    // Hide all screens
    startScreen.classList.remove('active-screen');
    quizScreen.classList.remove('active-screen');
    resultsScreen.classList.remove('active-screen');
    
    // Show the requested screen
    if (screen === 'start') {
        startScreen.classList.add('active-screen');
    } else if (screen === 'quiz') {
        quizScreen.classList.add('active-screen');
    } else if (screen === 'results') {
        resultsScreen.classList.add('active-screen');
    }
    
    currentScreen = screen;
}

// Update the score display
function updateScore() {
    currentScoreElement.textContent = `${score}/${questions.length}`;
}

// Start the timer for the current question
function startTimer() {
    clearInterval(timerInterval);
    timer = 60;
    timerElement.textContent = `Time: ${timer}s`;
    
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = `Time: ${timer}s`;
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            // Automatically move to next question if no answer selected
            if (selectedAnswer === null) {
                nextQuestion();
            }
        }
    }, 1000);
}

// Get subject name for display
function getSubjectName(subject) {
    const subjectNames = {
        math: 'Mathematics',
        history: 'History',
        geography: 'Geography',
        music: 'Music'
    };
    return subjectNames[subject];
}

// Get result message based on score
function getResultMessage(score, total) {
    const percentage = (score / total) * 100;
    
    if (percentage >= 90) {
        return 'Outstanding! You are a trivia master!';
    } else if (percentage >= 70) {
        return 'Great job! You know your stuff!';
    } else if (percentage >= 50) {
        return 'Good effort! Keep learning!';
    } else {
        return 'Keep practicing! You can do better next time!';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);