// vroomReviews.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('vroomReviews.html')
    .then(res => res.text())
    .then(html => {
      const placeholder = document.getElementById('vroom-avis-placeholder');
      placeholder.innerHTML = html;

      // Reboot AOS pour les animations sur le contenu injecté
      if (window.AOS) AOS.refreshHard();

      // Initialise Swiper avec autoplay
      const swiper = new Swiper('.avis-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 20,
        grabCursor: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          640:  { slidesPerView: 1 },
          768:  { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });

      let selectedSlide = null;
      let resumeTimeout = null;

      document.querySelectorAll('.avis-swiper .swiper-slide').forEach(slide => {
        // position relative pour overlay + tilt
        slide.style.position = 'relative';
        slide.classList.add('glass-card'); // pour VanillaTilt :contentReference[oaicite:3]{index=3}

        slide.addEventListener('click', () => {
          // 1️⃣ Si on clique sur un slide différent, on enlève l’overlay et clear l’ancien timer
          if (selectedSlide && selectedSlide !== slide) {
            const oldProg = selectedSlide.querySelector('.slide-progress');
            if (oldProg) oldProg.remove();
            clearTimeout(resumeTimeout);
          }

          selectedSlide = slide;

          // 2️⃣ Feedback visuel
          slide.classList.add('animate__animated', 'animate__pulse');
          slide.addEventListener('animationend', () => {
            slide.classList.remove('animate__animated', 'animate__pulse');
          }, { once: true });

          // 3️⃣ Pause autoplay
          swiper.autoplay.stop();

          // 4️⃣ Remove toute ancienne progress si existante
          const existing = slide.querySelector('.slide-progress');
          if (existing) existing.remove();

          // 5️⃣ Création de l’overlay cercle
          const progressEl = document.createElement('div');
          progressEl.className = 'slide-progress';
          progressEl.innerHTML = `
            <svg viewBox="0 0 40 40">
              <circle class="progress-bg" cx="20" cy="20" r="18" stroke-width="4" fill="none"/>
              <circle class="progress-fg" cx="20" cy="20" r="18" stroke-width="4" fill="none"/>
            </svg>`;
          slide.appendChild(progressEl);

          // 6️⃣ Lancement de l’animation du cercle sur 20s
          const fg = progressEl.querySelector('.progress-fg');
          fg.style.animation = 'circleProgress 20s linear forwards';

          // 7️⃣ Relance de l’autoplay au bout de 20s
          resumeTimeout = setTimeout(() => {
            swiper.autoplay.start();
            progressEl.remove();
          }, 20000);
        });
      });
    })
    .catch(err => console.error('Erreur chargement avis Vroom :', err));
});
