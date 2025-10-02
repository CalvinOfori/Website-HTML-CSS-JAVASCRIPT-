document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Adjust for sticky header
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                const mobileMenu = document.getElementById('mobile-menu');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const nav = document.querySelector('nav');
    const navHeight = nav.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100; // Add some padding
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formStatus.classList.remove('hidden');
        formStatus.classList.remove('text-red-400');
        formStatus.classList.add('text-green-400');
        formStatus.textContent = 'Message sent successfully! (This is a placeholder)';
        contactForm.reset();
    });
});
