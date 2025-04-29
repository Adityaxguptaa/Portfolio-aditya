// Main JavaScript Functions

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initScrollAnimation();
  initSkillBars();
  initCustomCursor();
  initTypingEffect();
  windowResizeHandler();
  
  // Add window event listeners
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('resize', windowResizeHandler);
});

// Initialize Navigation
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');
  
  // Toggle mobile navigation
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // Close navigation when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    }
  });
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu
      if (navToggle && navToggle.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
      
      // Scroll to section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const targetPosition = targetSection.offsetTop - 80;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add scrolled class to header when scrolling
  if (header) {
    const triggerHeight = 50;
    
    function headerScrollCheck() {
      if (window.scrollY > triggerHeight) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    
    // Initial check
    headerScrollCheck();
    
    // Check on scroll
    window.addEventListener('scroll', headerScrollCheck);
  }
}

// Initialize Scroll Animation
function initScrollAnimation() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-delay, .reveal-delay-2, .reveal-delay-3, .reveal-delay-4');
  
  // Initial check for elements in viewport
  checkRevealElements();
  
  // Add active class to elements in viewport
  function checkRevealElements() {
    const windowHeight = window.innerHeight;
    const triggerPoint = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - triggerPoint) {
        element.classList.add('active');
      }
    });
  }
  
  // Check on scroll
  window.addEventListener('scroll', checkRevealElements);
}

// Initialize Skill Bars
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  function animateSkillBars() {
    skillLevels.forEach(skill => {
      const level = skill.getAttribute('data-level');
      skill.style.width = `${level}%`;
    });
  }
  
  // Initial check
  if (isElementInViewport(document.querySelector('#skills'))) {
    setTimeout(animateSkillBars, 500);
  }
  
  // Animate on scroll
  window.addEventListener('scroll', function() {
    if (isElementInViewport(document.querySelector('#skills'))) {
      setTimeout(animateSkillBars, 500);
    }
  });
}

// Initialize Custom Cursor
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  if (!cursor || !cursorFollower || isMobileDevice()) {
    document.body.classList.add('no-custom-cursor');
    return;
  }
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  });
  
  // Cursor hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-form input, .contact-form textarea');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('active');
      cursorFollower.classList.add('active');
    });
    
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('active');
      cursorFollower.classList.remove('active');
    });
  });
}

// Initialize Typing Effect
function initTypingEffect() {
  const typedElement = document.querySelector('.typed-text');
  
  if (!typedElement) return;
  
  const text = typedElement.getAttribute('data-text');
  
  if (!text) return;
  
  const textArray = text.split(', ');
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = textArray[currentTextIndex];
    
    if (isDeleting) {
      typedElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at the end
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % textArray.length;
      typingSpeed = 500; // Pause before typing new text
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing effect after a delay
  setTimeout(type, 1000);
}

// Scroll Event Handler
function scrollHandler() {
  updateActiveNavLink();
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Window Resize Handler
function windowResizeHandler() {
  adjustHeroHeight();
}

// Adjust hero section height on mobile devices
function adjustHeroHeight() {
  const hero = document.querySelector('.hero');
  
  if (!hero) return;
  
  if (window.innerWidth <= 768) {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
      const totalHeight = heroContent.offsetHeight + heroImage.offsetHeight;
      hero.style.minHeight = `${totalHeight + 100}px`;
    }
  } else {
    hero.style.minHeight = '100vh';
  }
}

// Helper Functions
function isElementInViewport(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}