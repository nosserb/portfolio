
function initializeApp() {
  setupEventListeners();
  animateProgressBars();
  animateScrollElements();
}

function setupEventListeners() {
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {

  initializeApp();
}

console.clear();
const featuresEl = document.querySelector(".features");
const featureEls = document.querySelectorAll(".feature");

if (featuresEl && featureEls.length > 0) {
  featuresEl.addEventListener("pointermove", (ev) => {
    featureEls.forEach((featureEl) => {
      const rect = featureEl.getBoundingClientRect();
      featureEl.style.setProperty("--x", ev.clientX - rect.left);
      featureEl.style.setProperty("--y", ev.clientY - rect.top);
    });
  });
}
