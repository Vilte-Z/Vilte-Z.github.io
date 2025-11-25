document.addEventListener('DOMContentLoaded', function() {
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

    // Initialize event listeners
    function init() {
        setupRealTimeValidation();
        
        // Check form validity on any input
        contactForm.addEventListener('input', checkFormValidity);
        
        // Form submission
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Initial form check
        checkFormValidity();
    }

    // Start the application
    init();
});