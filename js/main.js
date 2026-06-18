/* ============================================================
   ORY'S BARBERSHOP — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---- NAV: scroll effect ---- */
  const nav = document.getElementById('nav');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  /* ---- NAV: mobile burger ---- */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- GOLD RULE ANIMATION ---- */
  const ruleLines = document.querySelectorAll('[data-reveal-line]');
  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          lineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  ruleLines.forEach(line => lineObserver.observe(line));

  /* ---- FLOATING CTA ---- */
  const floatingCta = document.getElementById('floatingCta');
  const heroSection = document.getElementById('hero');
  function handleFloatingCta() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      floatingCta.classList.add('visible');
    } else {
      floatingCta.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', handleFloatingCta, { passive: true });

  /* ---- BOOKING FORM ---- */
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  /* Set min date to today */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  /* Disable Sundays and Mondays in date picker */
  if (dateInput) {
    dateInput.addEventListener('input', () => {
      const selected = new Date(dateInput.value);
      const day = selected.getDay(); /* 0=Sun, 1=Mon */
      if (day === 0 || day === 1) {
        dateInput.setCustomValidity('We are closed on Sundays and Mondays. Please choose another day.');
        dateInput.reportValidity();
      } else {
        dateInput.setCustomValidity('');
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;

      if (!name || !phone || !service || !date || !time) {
        showFormError('Please fill in all required fields.');
        return;
      }

      /* Simulate submission */
      const submitBtn = bookingForm.querySelector('[type="submit"]');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        bookingForm.style.display = 'none';
        bookingSuccess.classList.add('show');
        bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1200);
    });
  }

  function showFormError(msg) {
    let errEl = document.getElementById('formError');
    if (!errEl) {
      errEl = document.createElement('p');
      errEl.id = 'formError';
      errEl.style.cssText = 'color:#e55;font-size:0.82rem;margin-bottom:1rem;padding:0.75rem 1rem;background:rgba(220,50,50,0.08);border:1px solid rgba(220,50,50,0.25);border-radius:4px;';
      bookingForm.insertBefore(errEl, bookingForm.querySelector('[type="submit"]'));
    }
    errEl.textContent = msg;
    setTimeout(() => { if (errEl) errEl.remove(); }, 4000);
  }

  /* ---- SMOOTH ACTIVE NAV ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${id}`) {
              link.style.color = 'var(--gold)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---- PARALLAX HERO (subtle) ---- */
  const heroContent = document.querySelector('.hero__content');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight && heroContent) {
      heroContent.style.transform = `translateY(${y * 0.15}px)`;
      heroContent.style.opacity = 1 - (y / (window.innerHeight * 0.85));
    }
  }, { passive: true });

  /* ---- STAGGER REVEAL for service cards ---- */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });

})();
