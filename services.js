// services.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) injecte la section depuis services.html
  fetch('services.html')
    .then(res => res.text())
    .then(html => {
      const placeholder = document.getElementById('services-placeholder');
      placeholder.innerHTML = html;

      // 2) ré-init AOS si besoin
      if (window.AOS) AOS.refreshHard();

      // 3) charge et lance ScrollReveal (nouvelle librairie d'animations)
      const srScript = document.createElement('script');
      srScript.src = 'https://unpkg.com/scrollreveal';
      document.head.appendChild(srScript);
      srScript.onload = () => {
        ScrollReveal().reveal('#services [data-sr="title"]', {
          origin: 'top', distance: '30px', duration: 600
        });
        ScrollReveal().reveal('#services [data-sr="card"]', {
          origin: 'bottom', distance: '50px', duration: 600, interval: 150
        });
      };
    })
    .catch(err => console.error('Erreur chargement services :', err));
});
