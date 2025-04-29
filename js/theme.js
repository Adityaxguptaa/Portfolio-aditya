// Theme Toggle Functionality

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
});

// Initialize Theme Toggle
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use OS preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
  }
  
  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // Toggle theme based on OS preference change
  prefersDarkScheme.addEventListener('change', function(e) {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  });
  
  // Apply theme-specific adjustments
  applyThemeAdjustments();
}

// Toggle Theme Function
function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  
  // Apply theme-specific adjustments
  applyThemeAdjustments();
  
  // Animate theme change
  animateThemeTransition();
}

// Apply Theme-Specific Adjustments
function applyThemeAdjustments() {
  const isDarkTheme = document.body.classList.contains('dark-theme');
  
  // Adjust logo colors
  const logo = document.querySelector('.logo');
  if (logo) {
    if (isDarkTheme) {
      logo.style.backgroundColor = 'white';
      logo.style.color = '#4D7EA8';
    } else {
      logo.style.backgroundColor = '#0A2463';
      logo.style.color = 'white';
    }
  }
  
  // Adjust footer logo colors
  const footerLogo = document.querySelector('.footer-logo .logo');
  if (footerLogo) {
    if (isDarkTheme) {
      footerLogo.style.backgroundColor = 'white';
      footerLogo.style.color = '#4D7EA8';
    } else {
      footerLogo.style.backgroundColor = 'white';
      footerLogo.style.color = '#0A2463';
    }
  }
}

// Animate Theme Transition
function animateThemeTransition() {
  // Create transition overlay
  const overlay = document.createElement('div');
  overlay.classList.add('theme-transition-overlay');
  document.body.appendChild(overlay);
  
  // Animate overlay
  setTimeout(() => {
    overlay.style.opacity = '0.3';
  }, 10);
  
  setTimeout(() => {
    overlay.style.opacity = '0';
  }, 300);
  
  setTimeout(() => {
    overlay.remove();
  }, 600);
}

// Add theme-specific CSS
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .theme-transition-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
      transition: opacity 0.3s ease;
    }
    
    body.dark-theme .theme-transition-overlay {
      background-color: black;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .theme-transition-overlay {
        display: none;
      }
    }
  </style>
`);

// Listen for theme change from other tabs/windows
window.addEventListener('storage', function(e) {
  if (e.key === 'theme') {
    if (e.newValue === 'dark') {
      if (!document.body.classList.contains('dark-theme')) {
        document.body.classList.add('dark-theme');
        applyThemeAdjustments();
      }
    } else {
      if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        applyThemeAdjustments();
      }
    }
  }
});

// Check for system settings
function prefersDarkTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Get current theme
function getCurrentTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    return savedTheme;
  }
  
  return prefersDarkTheme() ? 'dark' : 'light';
}