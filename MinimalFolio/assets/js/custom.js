document.addEventListener('DOMContentLoaded', function() {
    // ===== Contact Form JavaScript =====
    // Form elements
    const contactForm = document.getElementById('contact-form');
    const formResults = document.getElementById('form-results');
    const submitBtn = document.getElementById('submit-btn');

    // Input fields
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const ratingInputs = [
        document.getElementById('rating1'),
        document.getElementById('rating2'),
        document.getElementById('rating3')
    ];

    // Validation patterns
    const patterns = {
        name: /^[A-Za-zÀ-ÿ\s']+$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        address: /^[A-Za-zÀ-ÿ0-9\s,'-./]+$/
    };

    // Real-time validation
    function setupRealTimeValidation() {
        // Name validation
        nameInput.addEventListener('input', function() {
            validateField(this, patterns.name, 'Name can only contain letters');
        });

        // Surname validation
        surnameInput.addEventListener('input', function() {
            validateField(this, patterns.name, 'Surname can only contain letters');
        });

        // Email validation
        emailInput.addEventListener('input', function() {
            validateField(this, patterns.email, 'Please enter a valid email address');
        });

        // Address validation
        addressInput.addEventListener('input', function() {
            validateField(this, patterns.address, 'Please enter a valid address');
        });

        // Phone masking
        phoneInput.addEventListener('input', function(e) {
            formatPhoneNumber(e);
            validatePhoneNumber(this);
        });

        // Rating validation
        ratingInputs.forEach((input, index) => {
            input.addEventListener('input', function() {
                validateRating(this, index);
            });
        });
    }

    // Field validation function
    function validateField(field, pattern, errorMessage) {
        const errorElement = document.getElementById(field.id + '-error');
        const value = field.value.trim();

        if (!value) {
            showError(field, errorElement, 'This field is required');
            return false;
        }

        if (!pattern.test(value)) {
            showError(field, errorElement, errorMessage);
            return false;
        }

        showSuccess(field, errorElement);
        return true;
    }

    // Phone number formatting and validation
    function formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.startsWith('370')) {
            value = value.substring(3);
        }
        
        if (value.length > 0) {
            value = '+370 ' + value;
        }
        
        if (value.length > 7) {
            value = value.substring(0, 7) + ' ' + value.substring(7);
        }
        
        if (value.length > 11) {
            value = value.substring(0, 11) + ' ' + value.substring(11, 15);
        }
        
        e.target.value = value;
    }

    function validatePhoneNumber(field) {
        const errorElement = document.getElementById('phone-error');
        const value = field.value.replace(/\D/g, '');
        
        if (!field.value.trim()) {
            showError(field, errorElement, 'Phone number is required');
            return false;
        }

        if (value.length < 8 || value.length > 11) {
            showError(field, errorElement, 'Please enter a valid Lithuanian phone number');
            return false;
        }

        showSuccess(field, errorElement);
        return true;
    }

    // Rating validation
    function validateRating(field, index) {
        const errorElement = document.getElementById(`rating${index + 1}-error`);
        const value = parseInt(field.value);

        if (!field.value.trim()) {
            showError(field, errorElement, 'Rating is required');
            return false;
        }

        if (isNaN(value) || value < 1 || value > 10) {
            showError(field, errorElement, 'Rating must be between 1 and 10');
            return false;
        }

        showSuccess(field, errorElement);
        return true;
    }

    // Show error state
    function showError(field, errorElement, message) {
        field.classList.remove('valid');
        field.classList.add('error');
        errorElement.textContent = message;
    }

    // Show success state
    function showSuccess(field, errorElement) {
        field.classList.remove('error');
        field.classList.add('valid');
        errorElement.textContent = '';
    }

    // Check form validity
    function checkFormValidity() {
        const isNameValid = validateField(nameInput, patterns.name, 'Name can only contain letters');
        const isSurnameValid = validateField(surnameInput, patterns.name, 'Surname can only contain letters');
        const isEmailValid = validateField(emailInput, patterns.email, 'Please enter a valid email address');
        const isPhoneValid = validatePhoneNumber(phoneInput);
        const isAddressValid = validateField(addressInput, patterns.address, 'Please enter a valid address');
        
        const areRatingsValid = ratingInputs.every((input, index) => {
            return validateRating(input, index);
        });

        submitBtn.disabled = !(isNameValid && isSurnameValid && isEmailValid && isPhoneValid && 
                              isAddressValid && areRatingsValid);
    }

    // Form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        if (!submitBtn.disabled) {
            // Collect form data
            const formData = {
                name: nameInput.value.trim(),
                surname: surnameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                address: addressInput.value.trim(),
                ratings: ratingInputs.map(input => parseInt(input.value))
            };

            // Calculate average rating
            const averageRating = formData.ratings.reduce((sum, rating) => sum + rating, 0) / formData.ratings.length;

            // Print to console
            console.log('Form Data:', formData);
            console.log('Average Rating:', averageRating);

            // Display results
            displayFormResults(formData, averageRating);

            // Show success popup
            showSuccessPopup();

            // Reset form
            contactForm.reset();
            submitBtn.disabled = true;
            
            // Remove validation classes
            document.querySelectorAll('.form-input').forEach(input => {
                input.classList.remove('valid', 'error');
            });
        }
    }

    // Display form results
    function displayFormResults(data, average) {
        const resultsHTML = `
            <div class="result-item">
                <span class="result-label">Name:</span>
                <span class="result-value">${data.name}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Surname:</span>
                <span class="result-value">${data.surname}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Email:</span>
                <span class="result-value">${data.email}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Phone Number:</span>
                <span class="result-value">${data.phone}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Address:</span>
                <span class="result-value">${data.address}</span>
            </div>
            <div class="average-rating ${getRatingColorClass(average)}">
                ${data.name} ${data.surname}: ${average.toFixed(1)}
            </div>
        `;

        formResults.innerHTML = resultsHTML;
        formResults.style.display = 'block';
    }

    // Get color class based on rating
    function getRatingColorClass(rating) {
        if (rating >= 0 && rating < 4) return 'rating-red';
        if (rating >= 4 && rating < 7) return 'rating-orange';
        if (rating >= 7 && rating <= 10) return 'rating-green';
        return '';
    }

    // Show success popup
    function showSuccessPopup() {
        const popup = document.createElement('div');
        popup.className = 'success-popup-overlay';
        popup.innerHTML = `
            <div class="success-popup">
                <h3>Success!</h3>
                <p>Form submitted successfully!</p>
                <button class="btn" onclick="this.closest('.success-popup-overlay').remove()">OK</button>
            </div>
        `;
        
        document.body.appendChild(popup);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 5000);
    }

    // Initialize contact form event listeners
    function initContactForm() {
        setupRealTimeValidation();
        
        // Check form validity on any input
        contactForm.addEventListener('input', checkFormValidity);
        
        // Form submission
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Initial form check
        checkFormValidity();
    }

    // ===== Memory Game JavaScript =====
    // Game variables
    let gameStarted = false;
    let moves = 0;
    let matches = 0;
    let totalPairs = 0;
    let timerInterval = null;
    let seconds = 0;
    let flippedCards = [];
    let canFlip = true;
    
    // Game elements
    const difficultySelect = document.getElementById('difficulty');
    const startButton = document.getElementById('start-game');
    const restartButton = document.getElementById('restart-game');
    const playAgainButton = document.getElementById('play-again');
    const cardGrid = document.getElementById('card-grid');
    const moveCount = document.getElementById('move-count');
    const matchCount = document.getElementById('match-count');
    const timerDisplay = document.getElementById('timer');
    const winMessage = document.getElementById('win-message');
    const finalMoves = document.getElementById('final-moves');
    const finalTime = document.getElementById('final-time');
    
    // Card data - at least 6 unique items (using Font Awesome icons)
    const cardData = [
        { icon: 'bi bi-star-fill', name: 'star' },
        { icon: 'bi bi-heart-fill', name: 'heart' },
        { icon: 'bi bi-moon-fill', name: 'moon' },
        { icon: 'bi bi-sun-fill', name: 'sun' },
        { icon: 'bi bi-cloud-fill', name: 'cloud' },
        { icon: 'bi bi-lightning-fill', name: 'lightning' },
        { icon: 'bi bi-flower1', name: 'flower' },
        { icon: 'bi bi-tree-fill', name: 'tree' },
        { icon: 'bi bi-droplet-fill', name: 'droplet' },
        { icon: 'bi bi-gem', name: 'gem' },
        { icon: 'bi bi-rocket-takeoff-fill', name: 'rocket' },
        { icon: 'bi bi-cup-hot-fill', name: 'cup' }
    ];
    
    // Difficulty configurations
    const difficultyConfigs = {
        easy: { rows: 3, cols: 4, pairs: 6 },    // 4×3 grid (6 pairs from first 6 icons)
        hard: { rows: 4, cols: 6, pairs: 12 }    // 6×4 grid (12 pairs - all icons)
    };
    
    // Initialize game
    function initGame() {
        const difficulty = difficultySelect.value;
        const config = difficultyConfigs[difficulty];
        
        // Clear the board
        cardGrid.innerHTML = '';
        cardGrid.className = 'card-grid ' + difficulty;
        
        // Reset game state
        gameStarted = false;
        moves = 0;
        matches = 0;
        totalPairs = config.pairs;
        seconds = 0;
        flippedCards = [];
        canFlip = true;
        
        // Update UI
        updateStats();
        winMessage.style.display = 'none';
        
        // Stop timer if running
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        // Create card pairs
        const selectedIcons = cardData.slice(0, config.pairs);
        const cards = [...selectedIcons, ...selectedIcons]; // Duplicate for pairs
        
        // Shuffle cards
        shuffleArray(cards);
        
        // Create card elements
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.index = index;
            cardElement.dataset.name = card.name;
            
            cardElement.innerHTML = `
                <div class="card-front">
                    <i class="${card.icon}"></i>
                </div>
                <div class="card-back">
                    <i class="bi bi-question-lg"></i>
                </div>
            `;
            
            cardElement.addEventListener('click', () => flipCard(cardElement));
            cardGrid.appendChild(cardElement);
        });
        
        // Update button states
        startButton.disabled = false;
        restartButton.disabled = true;
    }
    
    // Shuffle array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Start the game
    function startGame() {
        if (gameStarted) return;
        
        gameStarted = true;
        moves = 0;
        matches = 0;
        seconds = 0;
        flippedCards = [];
        canFlip = true;
        
        // Start timer
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            seconds++;
            timerDisplay.textContent = seconds + 's';
        }, 1000);
        
        // Update UI
        updateStats();
        startButton.disabled = true;
        restartButton.disabled = false;
        
        // Briefly show all cards then flip back
        showAllCardsBriefly();
    }
    
    // Show all cards briefly at game start
    function showAllCardsBriefly() {
        const allCards = document.querySelectorAll('.memory-card');
        allCards.forEach(card => card.classList.add('flipped'));
        
        setTimeout(() => {
            allCards.forEach(card => card.classList.remove('flipped'));
        }, 2000); // Show for 2 seconds
    }
    
    // Flip a card
    function flipCard(card) {
        if (!gameStarted || !canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        // Flip the card
        card.classList.add('flipped');
        flippedCards.push(card);

        // Check if two cards are flipped
        if (flippedCards.length === 2) {
            moves++;
            updateStats();

            // Check for match
            const [card1, card2] = flippedCards;
            if (card1.dataset.name === card2.dataset.name) {
                // Match found - keep cards flipped and mark as matched
                matches++;

                // Add both 'flipped' and 'matched' classes to keep them showing the icon
                card1.classList.add('matched');
                card2.classList.add('matched');

                // Make sure they stay flipped
                card1.classList.add('flipped');
                card2.classList.add('flipped');

                flippedCards = [];

                // Check for win
                if (matches === totalPairs) {
                    endGame();
                }
            } else {
                // No match - flip back after delay
                canFlip = false;
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    // Update game statistics
    function updateStats() {
        moveCount.textContent = moves;
        matchCount.textContent = matches;
        timerDisplay.textContent = seconds + 's';
    }
    
    // End the game (win)
    function endGame() {
        clearInterval(timerInterval);
        
        // Show win message
        finalMoves.textContent = moves;
        finalTime.textContent = seconds;
        winMessage.style.display = 'block';
        
        // Scroll to win message
        winMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Restart game
    function restartGame() {
        initGame();
        startGame();
    }
    
    // Initialize memory game event listeners
    function initMemoryGame() {
        startButton.addEventListener('click', startGame);
        restartButton.addEventListener('click', restartGame);
        playAgainButton.addEventListener('click', restartGame);
        difficultySelect.addEventListener('change', initGame);
        
        // Initialize game on page load
        initGame();
    }
    
    // ===== Initialize Both Applications =====
    initContactForm();
    initMemoryGame();
    
    // Add event listener for mobile menu toggle if it exists
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            const navbarNav = document.querySelector('.navbar-nav');
            navbarNav.classList.toggle('nav-active');
            
            // Create overlay
            let overlay = document.querySelector('.nav-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'nav-overlay';
                document.body.appendChild(overlay);
            }
            overlay.classList.toggle('active');
            
            // Close menu when clicking overlay
            overlay.addEventListener('click', function() {
                navbarNav.classList.remove('nav-active');
                overlay.classList.remove('active');
            });
        });
    }
});