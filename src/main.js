import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

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

  const carousel = document.getElementById('carousel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let index = 0;

  function updateCarousel() {
    if(!carousel) return;
    carousel.style.transform = `translateX(-${index * 100}%)`;
  }

  if(nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % 5;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + 5) % 5;
      updateCarousel();
    });

    setInterval(() => {
      index = (index + 1) % 5;
      updateCarousel();
    }, 5000);
  }

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