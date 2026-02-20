 // Loader (au chargement de la page)
    window.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
    loader.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => loader.remove(), 700);
}, 1400);
});

 // Scroll horizontal pour le carousel (section projets)
 function scrollToSlide(id) {
     const slide = document.getElementById(id);
     const carousel = slide.closest('.carousel');
     carousel.style.scrollBehavior = 'smooth';
     carousel.scrollTo({
         left: slide.offsetLeft - carousel.offsetLeft,
         behavior: 'smooth'
     });
 }

 // Animation des barres de compétences
 const skillsObserver = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             document.querySelectorAll('.skill-bar').forEach((bar, i) => {
                 setTimeout(() => {
                     bar.style.width = bar.dataset.value + '%';
                 }, i * 150);
             });
             skillsObserver.disconnect();
         }
     });
 }, { threshold: 0.3 });

 const skillsSection = document.getElementById('skills-section');
 if (skillsSection) skillsObserver.observe(skillsSection);

    // Animation des stats : compteur + apparition
    function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1200;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
    current = target;
    clearInterval(timer);
}
    el.textContent = Math.floor(current);
}, step);
}

    const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
    // Apparition en cascade
    document.querySelectorAll('[data-stat]').forEach((card, i) => {
    setTimeout(() => {
    card.classList.remove('opacity-0', 'translate-y-6');
    card.classList.add('opacity-100', 'translate-y-0');
}, i * 120);
});
    // Compteurs
    document.querySelectorAll('.counter').forEach((el, i) => {
    setTimeout(() => animateCounter(el), i * 120 + 200);
});
    statsObserver.disconnect();
}
}, { threshold: 0.4 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) statsObserver.observe(statsSection);

    // Animation d'apparition des sections au scroll
    const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        }
    });
}, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
    fadeObserver.observe(section);
});

    // Forcer le scroll smooth pour les ancres (meme si déjà géré par DaisyUI, au cas où)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});