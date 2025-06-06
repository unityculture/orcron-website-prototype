document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const ctaButton = document.querySelector('.cta-button');
    const contactForm = document.querySelector('.contact-form');

    const hamburgerSpans = document.querySelectorAll('.hamburger span');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            hamburgerSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            hamburgerSpans[1].style.opacity = '0';
            hamburgerSpans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            hamburgerSpans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    ctaButton.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        const offsetTop = aboutSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (!name || !email || !message) {
            alert('請填寫所有必填欄位');
            return;
        }
        
        alert('謝謝您的訊息！我們會盡快回覆您。');
        this.reset();
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .service-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});