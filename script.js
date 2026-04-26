/* ============================================================
   ACE ROOFING — script.js
   ------------------------------------------------------------
   TABLE OF CONTENTS
   1. Hamburger menu toggle
   2. Active nav link highlighting on scroll
   3. Contact form validation + success message
   4. Show More / Show Less projects button
============================================================ */


/* ── 1. HAMBURGER MENU ──────────────────────────────────────
   Clicking the hamburger toggles the "open" class on both
   the button and the nav panel. CSS handles the animation.
   Clicking any nav link also closes the menu.

   NOTE: The nav panel variable is called "navPanel" here —
   section 2 uses "navLinkEls" for the same links.
   This avoids a "already been declared" JS error that would
   break the entire script.
----------------------------------------------------------- */

const hamburger = document.getElementById('hamburger');
const navPanel  = document.getElementById('nav-links');

if (hamburger && navPanel) {

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('open');
    navPanel.classList.toggle('open');
  });

  // Close the menu when any link inside it is clicked
  navPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      hamburger.classList.remove('open');
      navPanel.classList.remove('open');
    });
  });
}


/* ── 2. ACTIVE NAV LINK ON SCROLL ──────────────────────────
   Watches which section is on screen and highlights the
   matching nav link by adding the "act" class to it.
----------------------------------------------------------- */

const sections   = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => link.classList.remove('act'));
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('act');
    }
  });
}, { threshold: 0.3 });

sections.forEach(section => observer.observe(section));


/* ── 3. CONTACT FORM — VALIDATION & SUCCESS MESSAGE ────────
   Validates fields before allowing Formspree to submit.
   e.preventDefault() is only called if validation fails —
   if everything is valid, the form submits normally to Formspree.
----------------------------------------------------------- */

const form       = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', function (e) {

    const fname   = document.getElementById('fname').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fname) {
      e.preventDefault();
      alert('Please enter your first name.');
      document.getElementById('fname').focus();
      return;
    }
    if (!email) {
      e.preventDefault();
      alert('Please enter your email address.');
      document.getElementById('email').focus();
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      document.getElementById('email').focus();
      return;
    }
    if (!message) {
      e.preventDefault();
      alert('Please leave us a message.');
      document.getElementById('message').focus();
      return;
    }

    // All valid — show success message, let Formspree handle the rest
    form.querySelector('button[type="submit"]').style.display = 'none';
    successMsg.style.display = 'block';
  });
}


/* ── 4. SHOW MORE / SHOW LESS PROJECTS ─────────────────────
   Uses a boolean to track state — avoids the bug where
   style.display returns "" when hidden by CSS, not "none".
----------------------------------------------------------- */

const projToggle  = document.getElementById('proj-toggle');
const hiddenCards = document.querySelectorAll('.proj-hidden');

if (projToggle && hiddenCards.length > 0) {

  let isExpanded = false;

  projToggle.addEventListener('click', function () {

    if (!isExpanded) {
      hiddenCards.forEach(card => card.style.display = 'block');
      projToggle.textContent = 'Show Less ↑';
      isExpanded = true;

    } else {
      hiddenCards.forEach(card => card.style.display = 'none');
      projToggle.textContent = 'See More Projects ↓';
      isExpanded = false;
      document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

/* ── 5. SERVICE CARD TAP ON MOBILE ─────────────────────────
   On real touchscreens :hover doesn't work reliably.
   This detects a tap and toggles an "active" class instead.
   CSS then uses .active the same way it uses :hover.
----------------------------------------------------------- */

const svcCards = document.querySelectorAll('.svc-card');

svcCards.forEach(card => {
  card.addEventListener('click', function () {
    // Close any other open cards first
    svcCards.forEach(c => {
      if (c !== card) c.classList.remove('active');
    });
    // Toggle this card
    card.classList.toggle('active');
  });
});