// 1. GRID (always works)
const grid = document.getElementById('grid');
if (grid) {
  // Reduce density for mobile
  const isMobile = window.innerWidth < 768;
  const cols = isMobile ? 10 : 20; 
  const rows = isMobile ? 8 : 15;
  // const cols = 20, rows = 15;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.style.left = (col / cols * 100) + '%';
      cell.style.top = (row / rows * 100) + '%';
      grid.appendChild(cell);
    }
  }
  
  // Grid animation
  anime({
    targets: '.grid-cell',
    opacity: [0, 0.08],
    scale: [0.8, 1],
    delay: anime.stagger(25),
    duration: 1500,
    loop: true,
    direction: 'alternate'
  });
}

// 2. NAVBAR (simple)
anime({
  targets: '#navbar',
  opacity: [0, 1],
  translateY: [-100, 0],
  duration: 800,
  easing: 'easeOutExpo'
}).finished.then(() => {
  anime({
    targets: '.logo-img',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 500
  });
  anime({
    targets: '.nav-link',
    opacity: [0, 1],
    translateY: [-10, 0],
    delay: anime.stagger(60),
    duration: 400
  });
});

// 3. HERO - SIMPLE VERSION (NO SPLITTEXT)
anime.timeline({ easing: 'easeOutExpo' })
  .add({ targets: '.hero-title', opacity: [0, 1], translateY: [60, 0], duration: 1000 })
  .add({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800
  }, '-=500')
  .add({
    targets: '.btn',
    opacity: [0, 1],
    translateY: [30, 0],
    delay: anime.stagger(100),
    duration: 700
  }, '-=600');

// 4. LAYOUT SECTION
setTimeout(() => {
  anime({
    targets: '.layout-section',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 1000
  });
}, 2000);

// 5. CARDS INTERACTION
const layoutContainer = document.querySelector('.layout-container');
if (layoutContainer) {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      layoutContainer.classList.toggle('compact');
    });
  });
}

// 6. AI HOVER EFFECT - FIXED SPACES + CORRECT INDICES
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.getElementById('hero-title');
  
  if (heroTitle) {
    // Split text but preserve spaces properly
    const text = heroTitle.textContent;
    const spans = [];
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        // Preserve regular space
        spans.push(' ');
      } else {
        // Wrap non-space characters in spans
        spans.push(`<span style="display: inline-block; transition: all 0.3s ease;">${char}</span>`);
      }
    }
    
    heroTitle.innerHTML = spans.join('');
    const chars = heroTitle.querySelectorAll('span');
    
    // Map character positions accounting for spaces
    // "brAIn Dynectome Lab" character indices: b=0,r=1, ,=2,A=3,I=5,n=6
    const aiChars = [chars[2], chars[3]]; // A (index 3), I (index 5)
    
    heroTitle.style.cursor = 'pointer';
    
    // Hover animation for AI letters only
    const aiTimeline = anime.timeline({
      autoplay: false,
      easing: 'easeOutExpo'
    });
    
    aiTimeline
      .add({
        targets: aiChars,
        color: ['#0A3857', '#92d4a2'], // Dark blue to mint green
        scale: [1, 1.1],
        duration: 400
      })
      .add({
        targets: aiChars,
        color: ['#92d4a2', '#f08d8d'], // Neon blue to coral
        scale: [1.1, 1.15],
        duration: 300
      })
      .add({
        targets: aiChars,
        color: ['#f08d8d', '#7157a9'], // Coral to gold
        scale: [1.15, 1],
        duration: 400
      });
    
    // Mouse enter - play forward
    heroTitle.addEventListener('mouseenter', () => {
      aiTimeline.play();
    });
    
    // Mouse leave - reverse to original
    heroTitle.addEventListener('mouseleave', () => {
      aiTimeline.reverse();
    });
  }
});

// Hamburger functionality for mobile
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      // Optional: Animate hamburger to X
      hamburger.classList.toggle('is-active');
    });
  }
});

// ========== NEW: SCROLL-TRIGGERED TITLE ANIMATION ==========
let titleMoved = false;
let titleClone = null;

function initTitleScrollEffect() {
  if (window.innerWidth < 768) {
    console.log("Mobile detected: Skipping title scroll effect for performance.");
    return; 
  }
  const heroWrapper = document.getElementById('hero-title-wrapper');
  const heroTitle = document.getElementById('hero-title');
  const navbar = document.getElementById('navbar');
  const navContainer = navbar.querySelector('.nav-container');
  const layoutSection = document.getElementById('intro-layout');
  
  if (!heroWrapper || !heroTitle || !layoutSection) return;
  
  // Intersection Observer for scroll trigger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !titleMoved) {
        moveTitleToNavbar(heroTitle, navbar, navContainer);
      } else if (!entry.isIntersecting && titleMoved) {
        returnTitleToHero(heroTitle, navContainer);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-20% 0px -20% 0px'
  });
  
  observer.observe(layoutSection);
}

function moveTitleToNavbar(heroTitle, navbar, navContainer) {
  titleMoved = true;
  
  // Clone title (preserve spans for AI effect)
  titleClone = heroTitle.cloneNode(true);
  titleClone.classList.add('navbar-title');
  navbar.appendChild(titleClone);
  
  // Animate original title out
  anime({
    targets: heroTitle,
    translateY: '-120%',
    opacity: 0,
    scale: 0.8,
    duration: 800,
    easing: 'easeOutExpo',
    complete: () => {
      heroTitle.style.display = 'none';
    }
  });
  
  // Animate clone in
  anime({
    targets: '.navbar-title',
    opacity: [0, 1],
    translateY: ['20px', '0px'],
    scale: [0.9, 1],
    rotateX: [-10, 0],
    duration: 800,
    easing: 'easeOutExpo'
  });
  
  // Navbar expansion
  anime({
    targets: navContainer,
    paddingLeft: '+=120px',
    duration: 800,
    easing: 'easeOutExpo'
  });
}

function returnTitleToHero(heroTitle, navContainer) {
  titleMoved = false;
  
  // Animate clone out
  if (titleClone) {
    anime({
      targets: titleClone,
      opacity: 0,
      translateY: '-20px',
      scale: 0.9,
      duration: 600,
      easing: 'easeOutExpo',
      complete: () => {
        if (titleClone && titleClone.parentNode) {
          titleClone.parentNode.removeChild(titleClone);
          titleClone = null;
        }
      }
    });
  }
  
  // Animate original back
  heroTitle.style.display = 'block';
  anime({
    targets: heroTitle,
    translateY: ['-120%', '0%'],
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 800,
    easing: 'easeOutBack'
  });
  
  // Shrink navbar
  anime({
    targets: navContainer,
    paddingLeft: '-=120px',
    duration: 600,
    easing: 'easeOutExpo'
  });
}

// Initialize scroll effect after DOM loads
document.addEventListener('DOMContentLoaded', initTitleScrollEffect);