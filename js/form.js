// Contact Form Handling

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initContactForm();
});

// Initialize Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.querySelector('.form-status');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    // Validate form data
    if (!validateForm(formData, formStatus)) return;
    
    // Simulate form submission
    showSubmitting(formStatus);
    
    // In a real application, you would send this data to a server
    // Here we're just simulating a successful submission after a delay
    setTimeout(() => {
      showSuccess(formStatus);
      contactForm.reset();
    }, 2000);
  });
  
  // Add input validation
  addInputValidation();
}

// Validate Form
function validateForm(formData, formStatus) {
  // Check for empty fields
  for (const field in formData) {
    if (formData[field] === '') {
      showError(formStatus, `Please enter your ${field}`);
      highlightField(field);
      return false;
    }
  }
  
  // Validate email format
  if (!isValidEmail(formData.email)) {
    showError(formStatus, 'Please enter a valid email address');
    highlightField('email');
    return false;
  }
  
  // Validate message length
  if (formData.message.length < 10) {
    showError(formStatus, 'Message must be at least 10 characters long');
    highlightField('message');
    return false;
  }
  
  return true;
}

// Validate Email
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Show Error Message
function showError(element, message) {
  element.textContent = message;
  element.className = 'form-status error';
  
  // Clear error after 5 seconds
  setTimeout(() => {
    element.textContent = '';
    element.className = 'form-status';
  }, 5000);
}

// Show Success Message
function showSuccess(element) {
  element.textContent = 'Your message has been sent successfully!';
  element.className = 'form-status success';
  
  // Clear success message after 5 seconds
  setTimeout(() => {
    element.textContent = '';
    element.className = 'form-status';
  }, 5000);
}

// Show Submitting Message
function showSubmitting(element) {
  element.textContent = 'Sending message...';
  element.className = 'form-status';
}

// Highlight Invalid Field
function highlightField(fieldId) {
  const field = document.getElementById(fieldId);
  
  if (!field) return;
  
  field.classList.add('invalid');
  
  field.addEventListener('input', function removeHighlight() {
    field.classList.remove('invalid');
    field.removeEventListener('input', removeHighlight);
  });
}

// Add Input Validation
function addInputValidation() {
  // Name validation
  const nameInput = document.getElementById('name');
  if (nameInput) {
    nameInput.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        highlightField('name');
      }
    });
  }
  
  // Email validation
  const emailInput = document.getElementById('email');
  if (emailInput) {
    emailInput.addEventListener('blur', function() {
      if (!isValidEmail(this.value.trim()) && this.value.trim() !== '') {
        highlightField('email');
      }
    });
  }
  
  // Subject validation
  const subjectInput = document.getElementById('subject');
  if (subjectInput) {
    subjectInput.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        highlightField('subject');
      }
    });
  }
  
  // Message validation
  const messageInput = document.getElementById('message');
  if (messageInput) {
    messageInput.addEventListener('blur', function() {
      if (this.value.trim().length < 10 && this.value.trim() !== '') {
        highlightField('message');
      }
    });
  }
}

// Add custom styles for form validation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .invalid {
      border-color: var(--error-color) !important;
      box-shadow: 0 0 0 2px rgba(231, 111, 81, 0.2) !important;
    }
    
    .form-status.error {
      color: var(--error-color);
    }
    
    .form-status.success {
      color: var(--success-color);
    }
    
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
    
    .invalid {
      animation: shake 0.5s ease-in-out;
    }
  </style>
`);