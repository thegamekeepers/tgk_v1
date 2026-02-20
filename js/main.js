// Board Games of the World — main.js

// Animate elements into view as they scroll into the viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.game-card, .region-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Contact form toggle
function toggleContact() {
  const form = document.getElementById('contactForm');
  const btn  = document.getElementById('contactBtn');
  const isOpen = form.classList.contains('open');
  form.classList.toggle('open');
  btn.textContent = isOpen ? '✉ Get in Touch' : '✕ Close';
  if (isOpen) {
    // Reset form when closing
    document.getElementById('formSuccess').classList.remove('visible');
    const f = form.querySelector('.contact-form');
    if (f) f.style.display = 'flex';
  }
}

// Contact form submission
function handleSubmit(e) {
  e.preventDefault();
  // Hide the form, show success message
  e.target.style.display = 'none';
  document.getElementById('formSuccess').classList.add('visible');
  document.getElementById('contactBtn').textContent = '✕ Close';
  // NOTE: To actually send emails, sign up for a free service like
  // Formspree (formspree.io) and replace this function with their code snippet.
}
