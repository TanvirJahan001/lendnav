// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                const mobileNavHeader = document.createElement('div');
                mobileNavHeader.className = 'mobile-nav-header';
                
                const logo = document.querySelector('.logo').cloneNode(true);
                const closeBtn = document.createElement('div');
                closeBtn.className = 'close-menu';
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                mobileNavHeader.appendChild(logo);
                mobileNavHeader.appendChild(closeBtn);
                
                const navItems = document.querySelector('nav').cloneNode(true);
                
                mobileNav.appendChild(mobileNavHeader);
                mobileNav.appendChild(navItems);
                
                body.appendChild(mobileNav);
                
                // Close menu event
                closeBtn.addEventListener('click', function() {
                    mobileNav.classList.remove('active');
                });
            }
            
            // Toggle mobile nav
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.classList.add('active');
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function(e) {
            // Only toggle if clicking the question or the toggle button
            if (e.target.classList.contains('faq-toggle') || e.target === question) {
                const isActive = item.classList.contains('active');
                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    if (otherToggle) {
                        otherToggle.textContent = '+';
                        otherToggle.classList.remove('minus');
                    }
                });
                // Open if it was not active
                if (!isActive) {
                    item.classList.add('active');
                    const toggle = item.querySelector('.faq-toggle');
                    if (toggle) {
                        toggle.textContent = '−';
                        toggle.classList.add('minus');
                    }
                }
            }
        });
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process internal links
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileNav = document.querySelector('.mobile-nav');
                    if (mobileNav && mobileNav.classList.contains('active')) {
                        mobileNav.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.solution-card, .process-card, .industry-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.solution-card, .process-card, .industry-card, .testimonial-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});