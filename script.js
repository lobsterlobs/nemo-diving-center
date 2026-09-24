const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

const closeMenu = () => {
  nav.classList.remove('open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('menu-open', isOpen);
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  const hero = document.querySelector('.hero-media');
  if (window.scrollY < window.innerHeight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    hero.style.transform = `scale(1.05) translateY(${window.scrollY * 0.13}px)`;
  }
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const reviews = [...document.querySelectorAll('.review-slider blockquote')];
const reviewCount = document.getElementById('review-count');
let activeReview = 0;

function showReview(index) {
  activeReview = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) => review.classList.toggle('active', i === activeReview));
  reviewCount.textContent = `${String(activeReview + 1).padStart(2, '0')} / ${String(reviews.length).padStart(2, '0')}`;
}

document.getElementById('review-prev').addEventListener('click', () => showReview(activeReview - 1));
document.getElementById('review-next').addEventListener('click', () => showReview(activeReview + 1));

const bookingForm = document.getElementById('booking-form');
bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const message = [
    'Здравейте, NEMO Diving Center Bulgaria!',
    '',
    `Име: ${data.get('name')}`,
    `Желана дата: ${data.get('date')}`,
    `Ниво: ${data.get('level')}`,
    `Услуга: ${data.get('service')}`,
    `Съобщение: ${data.get('message') || '—'}`
  ].join('\n');

  document.getElementById('form-status').textContent = 'Отваряме WhatsApp с подготвеното запитване.';
  window.open(`https://wa.me/359893360387?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
