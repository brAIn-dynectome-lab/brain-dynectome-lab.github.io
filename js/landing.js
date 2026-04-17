const LabLanding = {
  titleMoved: false,
  titleClone: null,

  init() {
    this.initGrid();
    this.initHeroTitle();
    this.playEntrance();
    this.initHamburger();
    this.initScrollEffect();
  },

  initGrid() {
    const grid = document.getElementById('grid');
    if (!grid) return;
    const isMobile = window.innerWidth < 768;
    const cols = isMobile ? 10 : 20, rows = isMobile ? 8 : 15;
    for (let i = 0; i < (cols * rows); i++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.style.left = `${(i % cols) / cols * 100}%`;
      cell.style.top = `${Math.floor(i / cols) / rows * 100}%`;
      grid.appendChild(cell);
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
  },

  initHeroTitle() {
  const titleEl = document.getElementById('hero-title');
  if (!titleEl) return;
  const words = ["BRAIN", "DYNECTOME", "LAB"];
  titleEl.innerHTML = '';

  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'title-word';
    [...word].forEach((char, cIdx) => {
      const letter = document.createElement('span');
      letter.textContent = char;
      // Define 'A' and 'I' as the special letters
      if (wIdx === 0 && (cIdx === 2 || cIdx === 3)) {
        letter.className = 'ai-letter';
      }
      wordSpan.appendChild(letter);
    });
    titleEl.appendChild(wordSpan);
    if (wIdx < words.length - 1) titleEl.innerHTML += '&nbsp;';
  });

  // Target the specific AI letters for the 3rd color transition
  const aiLetters = titleEl.querySelectorAll('.ai-letter');
  
  titleEl.addEventListener('mouseenter', () => {
    anime({
      targets: aiLetters,
      color: ['#92d4a2', '#f08d8d','#9575cd'], // Color 3: Mint Green Glow
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  });

  titleEl.addEventListener('mouseleave', () => {
    anime({
      targets: aiLetters,
      color: '#0A3857', // Back to Color 1: Dark Blue
      scale: 1,
      duration: 400,
      easing: 'easeOutQuad'
    });
  });
},
  playEntrance() {
    anime.timeline({ easing: 'easeOutExpo' })
      .add({ targets: '#navbar', opacity: [0, 1], translateY: [-50, 0], duration: 800 })
      .add({ targets: '.hero-title', opacity: [0, 1], translateY: [50, 0], duration: 1000 }, '-=400')
      .add({ targets: '.hero-subtitle', opacity: [0, 1], translateY: [20, 0], duration: 800 }, '-=600');
  },

  initScrollEffect() {
    if (window.innerWidth < 768) return;

    const heroTitle = document.getElementById('hero-title');
    const brandWrapper = document.querySelector('.logo-brand-wrapper');
    const layoutSection = document.getElementById('intro-layout');

    if (!heroTitle || !brandWrapper || !layoutSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.titleMoved) {
          this.toggleTitle(true, heroTitle, brandWrapper);
        } else if (!entry.isIntersecting && this.titleMoved) {
          this.toggleTitle(false, heroTitle, brandWrapper);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(layoutSection);
  },

  toggleTitle(toNav, heroTitle, brandWrapper) {
    if (toNav) {
      this.titleMoved = true;
      if (!this.titleClone) {
        this.titleClone = heroTitle.cloneNode(true);
        this.titleClone.id = 'navbar-title-clone';
        this.titleClone.className = 'navbar-title';
        brandWrapper.appendChild(this.titleClone);
      }

      anime({
        targets: heroTitle,
        opacity: 0,
        translateY: -20,
        duration: 400,
        complete: () => heroTitle.style.visibility = 'hidden'
      });

      anime({
        targets: this.titleClone,
        opacity: 1,
        translateX: [20, 0],
        duration: 600,
        easing: 'easeOutExpo'
      });
    } else {
      this.titleMoved = false;
      anime({
        targets: this.titleClone,
        opacity: 0,
        translateX: 20,
        duration: 400,
        complete: () => {
            if(this.titleClone) this.titleClone.remove();
            this.titleClone = null;
        }
      });

      heroTitle.style.visibility = 'visible';
      anime({
        targets: heroTitle,
        opacity: 1,
        translateY: 0,
        duration: 600,
        easing: 'easeOutBack'
      });
    }
  },

  initHamburger() {
    const burger = document.querySelector('.hamburger');
    const menu = document.querySelector('.nav-menu');
    if (burger) {
      burger.addEventListener('click', () => menu.classList.toggle('mobile-active'));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => LabLanding.init());