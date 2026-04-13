import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- Existing Elements ---
  const navbar = document.getElementById('navbar');
  const navLogo = document.getElementById('nav-logo');
  const servicesGrid = document.getElementById('services-grid');
  const serviceRows = document.querySelectorAll('.service-row');
  const anchor = document.getElementById('services-anchor');

  // --- Carousel Elements ---
  const track = document.getElementById('review-track');
  const nextButton = document.getElementById('revNext');
  const prevButton = document.getElementById('revPrev');
  let currentIndex = 0;

  // --- Carousel Logic ---
  if (track && nextButton && prevButton) {
    const updateSlider = () => {
      const cards = track.children;
      if (cards.length === 0) return;

      const cardWidth = cards[0].offsetWidth;
      // Get the gap value from the computed style (handles 'gap-8')
      const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
      
      // Calculate move distance: (Width of one card + the gap) * current index
      const moveDistance = (cardWidth + gap) * currentIndex;
      track.style.transform = `translateX(-${moveDistance}px)`;
    };

    const getVisibleCards = () => {
      if (window.innerWidth >= 1024) return 3; // lg
      if (window.innerWidth >= 768) return 2;  // md
      return 1;                                // sm
    };

    nextButton.addEventListener('click', () => {
      const totalCards = track.children.length;
      const visibleCards = getVisibleCards();
      
      if (currentIndex < totalCards - visibleCards) {
        currentIndex++;
      } else {
        currentIndex = 0; // Loop back to start
      }
      updateSlider();
    });

    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        const totalCards = track.children.length;
        currentIndex = totalCards - getVisibleCards(); // Loop to end
      }
      updateSlider();
    });

    // Recalculate on resize to prevent the slider from getting "stuck" between cards
    window.addEventListener('resize', updateSlider);
  }

  // --- Existing Scroll Logic ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('nav-scrolled');
      navLogo?.classList.add('logo-small');
      navLogo?.classList.remove('logo-large');
    } else {
      navbar?.classList.remove('nav-scrolled');
      navLogo?.classList.add('logo-large');
      navLogo?.classList.remove('logo-small');
    }
  });

  // --- Existing Service Grid Logic ---
  serviceRows.forEach(row => {
    row.addEventListener('click', () => {
      if (row.classList.contains('expanded')) {
        collapseAll();
      } 
      else {
        expandCard(row);
      }
    });

    const closeBtn = row.querySelector('.close-service');
    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation(); 
      collapseAll();
    });
  });

  function expandCard(row) {
    collapseAll();
    row.classList.add('expanded');
    servicesGrid?.classList.add('item-expanded');
    
    const label = row.querySelector('.learn-more-label');
    if (label) label.textContent = 'Show Less';

    setTimeout(() => {
      const yOffset = -100; 
      if (anchor) {
        const targetPos = anchor.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }, 150);
  }

  function collapseAll() {
    serviceRows.forEach(r => {
      r.classList.remove('expanded');
      const label = r.querySelector('.learn-more-label');
      if (label) label.textContent = 'Learn More';
    });
    servicesGrid?.classList.remove('item-expanded');
  }

  // --- Contact Form Logic ---
  const contactForm = document.querySelector('#contact form');

  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    button.disabled = true;

    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        button.textContent = 'Message Sent!';
        button.classList.replace('bg-brand-purple', 'bg-green-600');
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      button.textContent = 'Error! Try again.';
      button.disabled = false;
    }
  });
});