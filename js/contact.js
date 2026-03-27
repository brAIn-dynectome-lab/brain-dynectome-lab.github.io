// Grid animation
const grid = document.getElementById('grid');
if (grid) {
  const cols = 20, rows = 15;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.style.left = (col / cols * 100) + '%';
      cell.style.top = (row / rows * 100) + '%';
      grid.appendChild(cell);
    }
  }
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

// Navbar animation
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

// Hero animation
anime.timeline({ easing: 'easeOutExpo' })
  .add({ targets: '.hero-title', opacity: [0, 1], translateY: [60, 0], duration: 1000 })
  .add({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [30, 0], duration: 800 }, '-=500');

// Contact section reveal
setTimeout(() => {
  anime({
    targets: '.contact-section',
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 1000
  }).finished.then(() => {
    // Stagger contact items
    anime({
      targets: '.contact-item',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(200),
      duration: 800
    });
    // Form fields
    anime({
      targets: '.form-group',
      opacity: [0, 1],
      translateX: [-30, 0],
      delay: anime.stagger(150),
      duration: 800
    });
  });
}, 1500);

// Form submission
document.querySelector('.contact-form-inner').addEventListener('submit', function(e) {
  e.preventDefault();
  anime({
    targets: this,
    scale: [1, 0.95, 1],
    duration: 300,
    easing: 'easeOutExpo'
  });
  // Simulate success
  setTimeout(() => {
    alert('Message sent! We\'ll get back to you soon. 🚀');
  }, 500);
});

// AI hover effect (same as landing)
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    const spans = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === ' ') {
        spans.push(' ');
      } else {
        spans.push(`<span style="display: inline-block; transition: all 0.3s ease;">${char}</span>`);
      }
    }
    heroTitle.innerHTML = spans.join('');
    const chars = heroTitle.querySelectorAll('span');
    const aiChars = [chars[2], chars[4]]; // A and I in "Get In Touch"
    
    heroTitle.style.cursor = 'pointer';
    
    const aiTimeline = anime.timeline({ autoplay: false, easing: 'easeOutExpo' });
    aiTimeline
      .add({ targets: aiChars, color: ['#0A3857', '#00D4FF'], scale: [1, 1.1], duration: 400 })
      .add({ targets: aiChars, color: ['#00D4FF', '#FF6B6B'], scale: [1.1, 1.15], duration: 300 })
      .add({ targets: aiChars, color: ['#FF6B6B', '#FFD93D'], scale: [1.15, 1], duration: 400 });
    
    heroTitle.addEventListener('mouseenter', () => aiTimeline.play());
    heroTitle.addEventListener('mouseleave', () => aiTimeline.reverse());
  }
});