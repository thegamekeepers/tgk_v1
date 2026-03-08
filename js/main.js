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
    document.getElementById('formSuccess').classList.remove('visible');
    const f = form.querySelector('.contact-form');
    if (f) f.style.display = 'flex';
    const err = document.getElementById('formError');
    if (err) { err.style.display = 'none'; err.textContent = ''; }
  }
}

// Contact form submission
async function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const err = document.getElementById('formError');
  const name    = document.getElementById('contactName').value;
  const email   = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMsg').value;

  btn.textContent = 'Sending...';
  btn.disabled = true;
  err.style.display = 'none';

  try {
    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      e.target.style.display = 'none';
      document.getElementById('formSuccess').classList.add('visible');
      document.getElementById('contactBtn').textContent = '✕ Close';
    } else {
      throw new Error('Server error');
    }
  } catch {
    err.textContent = 'Something went wrong — please try again or email us directly.';
    err.style.display = 'block';
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}
