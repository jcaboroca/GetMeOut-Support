// Language management
function setLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('getmeout-lang', lang);
    document.querySelectorAll('[data-es]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    
    // Toggle active state on buttons
    document.getElementById('btn-es').classList.toggle('active', lang === 'es');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
}

// Background Parallax & Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Language
    const saved = localStorage.getItem('getmeout-lang');
    const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
    setLang(saved || browserLang);

    // 2. Liquid Background Mouse Follower
    const blobs = document.querySelectorAll('.blob');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        
        blobs.forEach((blob, i) => {
            const factor = (i + 1) * 30;
            blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
    });

    // 3. Scroll Intersection Observer for Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Subtle staggered children animation if needed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass, .app-icon, h1, .tagline, section h2').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 0, 0, 1)";
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
