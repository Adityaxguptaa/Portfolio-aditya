// Animation Functions

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  initParallaxEffect();
  initProjectCardEffects();
  initLogoAnimation();
  initScrollIndicator();
});

// Initialize Parallax Effect
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('.hero, .about-image, .project-image');
  
  if (isMobileDevice()) return;
  
  window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    parallaxElements.forEach(element => {
      const strength = element.classList.contains('hero') ? 30 : 15;
      const offsetX = (mouseX - 0.5) * strength;
      const offsetY = (mouseY - 0.5) * strength;
      
      element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  });
  
  // Reset transforms when mouse leaves window
  document.addEventListener('mouseleave', function() {
    parallaxElements.forEach(element => {
      element.style.transform = 'translate(0, 0)';
    });
  });
}

// Initialize Project Card Effects
function initProjectCardEffects() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.querySelector('.project-image img').style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.querySelector('.project-image img').style.transform = 'scale(1)';
    });
  });
}

// Initialize Logo Animation
function initLogoAnimation() {
  const logo = document.querySelector('.logo');
  
  if (!logo) return;
  
  logo.addEventListener('mouseenter', function() {
    this.classList.add('animated');
    
    setTimeout(() => {
      this.classList.remove('animated');
    }, 600);
  });
  
  // Logo click animation
  logo.addEventListener('click', function(e) {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.classList.add('logo-ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Initialize Scroll Indicator
function initScrollIndicator() {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  
  if (!scrollIndicator) return;
  
  // Hide scroll indicator when scrolling down
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      scrollIndicator.style.opacity = '0';
    } else {
      scrollIndicator.style.opacity = '1';
    }
  });
  
  // Scroll down when clicking the scroll indicator
  scrollIndicator.addEventListener('click', function() {
    const aboutSection = document.querySelector('#about');
    
    if (aboutSection) {
      const targetPosition = aboutSection.offsetTop - 80;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// Initialize Card Tilt Effect (3D hover)
function initCardTiltEffect() {
  const cards = document.querySelectorAll('.skill-item, .project-card');
  
  if (isMobileDevice()) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = x / rect.width;
      const yPercent = y / rect.height;
      
      const xRotation = (yPercent - 0.5) * -10;
      const yRotation = (xPercent - 0.5) * 10;
      
      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
      this.style.transition = 'none';
      
      // Add highlight effect
      const glare = this.querySelector('.card-glare') || document.createElement('div');
      if (!this.querySelector('.card-glare')) {
        glare.classList.add('card-glare');
        this.appendChild(glare);
      }
      
      glare.style.opacity = '0.15';
      glare.style.transform = `translate(${xPercent * 100}%, ${yPercent * 100}%)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      this.style.transition = 'transform 0.5s ease';
      
      const glare = this.querySelector('.card-glare');
      if (glare) {
        glare.style.opacity = '0';
      }
    });
  });
}

// Button hover effect
function initButtonHoverEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const circle = document.createElement('span');
      circle.classList.add('btn-circle');
      
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      
      this.appendChild(circle);
      
      setTimeout(() => {
        circle.remove();
      }, 500);
    });
  });
}

// Scroll progress indicator
function initScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (windowScroll / height) * 100;
    
    progressBar.style.width = `${scrolled}%`;
  });
}

// Helper function
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}