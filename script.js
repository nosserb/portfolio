/**
 * Portfolio Statique - Script Principal
 * Version: 2.0.0
 * Description: Gère l'initialisation et les interactions du portfolio
 */

/**
 * Initialise l'application au chargement du DOM
 */
function initializeApp() {
  console.log('✅ Portfolio statique chargé avec succès');
  setupEventListeners();
  animateProgressBars();
  animateScrollElements();
}

/**
 * Configure les écouteurs d'événements
 */
function setupEventListeners() {
  // Navigation smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSection = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) {
        currentSection = section.getAttribute('id');
      }
    });
  });
}

/**
 * Anime les barres de progression quand elles apparaissent
 */
function animateProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('progress-fill')) {
        const fill = entry.target;
        const width = fill.style.width;
        fill.style.width = '0';
        setTimeout(() => {
          fill.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.progress-fill').forEach(fill => {
    observer.observe(fill);
  });
}

/**
 * Anime les éléments au scroll
 */
function animateScrollElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.stat-item, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/**
 * Lance l'initialisation quand le DOM est chargé
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // Le DOM est déjà chargé
  initializeApp();
}
