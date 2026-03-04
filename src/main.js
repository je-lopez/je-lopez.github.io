import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // --- Navbar Scroll Logic ---
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('nav-logo');
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
      navbar.classList.remove('nav-transparent', 'text-white');
      navbar.classList.add('text-black');
      logo.classList.add('logo-small');
      logo.classList.remove('logo-large');
    } else {
      navbar.classList.add('nav-transparent', 'text-white');
      navbar.classList.remove('nav-scrolled', 'text-black');
      logo.classList.add('logo-large');
      logo.classList.remove('logo-small');
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("nav-link-active");
      if (link.getAttribute("href").includes(current) && current !== "") {
        link.classList.add("nav-link-active");
      }
    });
  });

  // --- Service Expansion Logic ---
  document.querySelectorAll('.service-row').forEach(row => {
    row.addEventListener('click', () => {
      const isExpanded = row.classList.toggle('expanded');
      const label = row.querySelector('.learn-more-label');
      label.textContent = isExpanded ? 'Show Less' : 'Learn More';
      
      if(isExpanded) {
        // Wait slightly for transition to start, then scroll with offset
        setTimeout(() => {
          const yOffset = -120; // Keeps the heading/nav visible
          const y = row.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }, 50);
      }
    });
  });

  // --- Review Carousel Logic ---
  const track = document.getElementById('review-track');
  const revPrev = document.getElementById('revPrev');
  const revNext = document.getElementById('revNext');
  let revIndex = 0;

  function updateReviewCarousel() {
    if (!track) return;
    const gap = 32;
    const cards = track.querySelectorAll('a, div');
    if (cards.length === 0) return;
    const cardWidth = cards[0].offsetWidth;
    track.style.transform = `translateX(-${revIndex * (cardWidth + gap)}px)`;
  }

  if (revNext && revPrev) {
    revNext.addEventListener('click', () => {
      const cardsInView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
      const totalCards = track.children.length;
      revIndex = (revIndex >= totalCards - cardsInView) ? 0 : revIndex + 1;
      updateReviewCarousel();
    });

    revPrev.addEventListener('click', () => {
      const cardsInView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
      const totalCards = track.children.length;
      revIndex = (revIndex <= 0) ? totalCards - cardsInView : revIndex - 1;
      updateReviewCarousel();
    });

    window.addEventListener('resize', updateReviewCarousel);
  }

  // --- About Carousel ---
  const aboutCarousel = document.getElementById('carousel');
  const aboutPrev = document.getElementById('prevBtn');
  const aboutNext = document.getElementById('nextBtn');
  let aboutIdx = 0;

  if(aboutNext && aboutPrev) {
    aboutNext.addEventListener('click', () => {
      aboutIdx = (aboutIdx + 1) % 5;
      aboutCarousel.style.transform = `translateX(-${aboutIdx * 100}%)`;
    });
    aboutPrev.addEventListener('click', () => {
      aboutIdx = (aboutIdx - 1 + 5) % 5;
      aboutCarousel.style.transform = `translateX(-${aboutIdx * 100}%)`;
    });
  }

  // --- Reveal Observer ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});