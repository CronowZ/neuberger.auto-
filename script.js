// script.js

// ===== Preloader fade-out & removal =====
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  preloader.style.transition = 'opacity .3s ease';
  preloader.style.opacity = '0';
  setTimeout(() => preloader.remove(), 300);
});

document.addEventListener('DOMContentLoaded', () => {
  // ===== Lottie pour le preloader =====
  lottie.loadAnimation({
    container: document.getElementById('preloader-lottie'),
    path: 'https://assets5.lottiefiles.com/packages/lf20_usmfx6bp.json',
    renderer: 'svg',
    loop: true,
    autoplay: true,
  });

  // ===== Feather Icons =====
  feather.replace();

  // ===== Lenis Smooth Scroll =====
  const lenis = new Lenis({
    duration: 1.2,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });
  function raf(time) {
    lenis.raf(time);
    AOS.refresh();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ===== AOS & Splitting.js =====
  AOS.init({
    duration: 800,
    once: false,
    mirror: true
  });
  Splitting();

  // ===== Vanta.js Animated Background =====
  VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    minHeight: 200,
    minWidth: 200,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0xFBBF24,
    backgroundColor: 0x111827,
    points: 12.0,
    spacing: 18.0
  });

  // ===== Vanilla-Tilt on Cards =====
  VanillaTilt.init(document.querySelectorAll('.glass-card'), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
  });

  // ===== Swiper Testimonials (si présent) =====
  const swiperEl = document.querySelector('.swiper-container');
  if (swiperEl && typeof Swiper !== 'undefined') {
    new Swiper(swiperEl, {
      loop: true,
      slidesPerView: 1,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
    });
  }

  // ===== noUiSlider Price Filter (if present) =====
  const priceSlider = document.getElementById('price-slider');
  if (priceSlider && typeof noUiSlider !== 'undefined'){
    noUiSlider.create(priceSlider, {
      start: [750, 1350],
      connect: true,
      range: { 'min': 500, 'max': 1500 },
      tooltips: [wNumb({ decimals: 0, prefix: '€' }), wNumb({ decimals: 0, prefix: '€' })]
    });
    const priceRange = document.getElementById('price-range');
    priceSlider.noUiSlider.on('update', (values) => {
      priceRange.textContent = `${values[0]} - ${values[1]} €`;
    });
  }

  // ===== Menu mobile burger =====
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ===== Back to Top Button & Scroll Progress (synchronisé Lenis + fallback) =====
  const backBtn = document.getElementById('backToTop');
  const scrollCircle = document.querySelector('#scrollProgress circle');
  function onLenisScroll() {
    // ScrollY avec compatibilité si jamais Lenis n'a pas encore d'instance
    let scrollY = 0;
    if (lenis && lenis.scroll && lenis.scroll.instance && lenis.scroll.instance.scroll) {
      scrollY = lenis.scroll.instance.scroll.y;
    } else {
      scrollY = window.scrollY;
    }
    if (scrollY > window.innerHeight) backBtn.classList.remove('hidden');
    else backBtn.classList.add('hidden');
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const dashOffset = 302 - (302 * scrollY) / docHeight;
    scrollCircle.style.strokeDashoffset = dashOffset;
  }
  if (lenis && typeof lenis.on === 'function') {
    lenis.on('scroll', onLenisScroll);
  }
  window.addEventListener('scroll', onLenisScroll); // Fallback si jamais
  backBtn.addEventListener('click', () => lenis.scrollTo(0));
  onLenisScroll();

  // ===== Cookie Consent =====
  const cookieBanner = document.getElementById('cookieConsent');
  const acceptBtn    = document.getElementById('acceptCookies');
  acceptBtn.addEventListener('click', () => {
    cookieBanner.classList.add('fade-out');
    setTimeout(() => {
      cookieBanner.remove();
    }, 300); // ← même durée qu'en CSS (0.3s)
  });

  // ===== Newsletter Subscription =====
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg  = document.getElementById('newsletterMsg');
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    newsletterMsg.classList.add('show');
    setTimeout(() => newsletterMsg.classList.remove('show'), 5000);
    newsletterForm.reset();
  });
});
