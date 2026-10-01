document.addEventListener('DOMContentLoaded', () => {
    // 0. Navbar Scroll Animation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 1. Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });

    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in-up').forEach(element => {
            element.classList.add('visible');
        });
    }, 100);

    // 2. Rotating Text in Hero
    const rotatingTextEl = document.getElementById('rotating-text');
    if (rotatingTextEl) {
        const words = ['child-friendly', 'safe', 'nurturing', 'engaging'];
        let wordIndex = 0;
        setInterval(() => {
            rotatingTextEl.classList.add('text-out');
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingTextEl.textContent = words[wordIndex];
                rotatingTextEl.classList.remove('text-out');
                rotatingTextEl.classList.add('text-in');
                setTimeout(() => rotatingTextEl.classList.remove('text-in'), 300);
            }, 300);
        }, 3000);
    }


    // 4. Modals Logic (Tool Login & Contact)
    const toolModal = document.getElementById('toolLoginModal');
    const contactModal = document.getElementById('contactModal');
    
    const openToolBtn = document.getElementById('openToolBtn');
    const openContactBtns = document.querySelectorAll('.open-contact-btn');
    
    const toolCloseBtn = document.querySelector('.tool-close-btn');
    const contactCloseBtn = document.querySelector('.contact-close-btn');

    if (openToolBtn) {
        openToolBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(toolModal) {
                toolModal.classList.add('active');
                document.getElementById('toolPassword').focus();
            }
        });
    }
    if (toolCloseBtn) toolCloseBtn.addEventListener('click', () => toolModal.classList.remove('active'));

    openContactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(contactModal) contactModal.classList.add('active');
        });
    });
    if (contactCloseBtn) contactCloseBtn.addEventListener('click', () => contactModal.classList.remove('active'));

    window.addEventListener('click', (e) => {
        if (e.target === toolModal) toolModal.classList.remove('active');
        if (e.target === contactModal) contactModal.classList.remove('active');
    });

    // 5. Tool Authentication Logic
    const submitBtn = document.getElementById('submitPassword');
    const passwordInput = document.getElementById('toolPassword');
    const errorMsg = document.getElementById('loginError');
    const SECRET_CODE = "0000";

    const handleLogin = () => {
        if (!passwordInput) return;
        if (passwordInput.value === SECRET_CODE || passwordInput.value.toLowerCase() === "admin") {
            window.location.href = 'tool.html';
        } else {
            if(errorMsg) errorMsg.style.display = 'block';
            passwordInput.classList.add('error');
            setTimeout(() => passwordInput.classList.remove('error'), 500);
        }
    };

    if (submitBtn) submitBtn.addEventListener('click', handleLogin);
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    }

    // 6. Mobile Menu Logic for Index
    const mainMobileMenuBtn = document.getElementById('mainMobileMenuBtn');
    const mainNavLinks = document.getElementById('mainNavLinks');
    
    if (mainMobileMenuBtn && mainNavLinks) {
        mainMobileMenuBtn.addEventListener('click', () => {
            mainNavLinks.classList.toggle('open');
        });
    }
});
