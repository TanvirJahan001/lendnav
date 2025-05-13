// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuIcon = document.querySelector('.mobile-menu'); // Hamburger icon
    const mobileNavPanel = document.querySelector('.mobile-nav');   // The slide-in panel
    const closeMenuIcon = document.querySelector('.close-menu');    // Close icon inside the panel

    if (mobileMenuIcon && mobileNavPanel) {
        mobileMenuIcon.addEventListener('click', function () {
            mobileNavPanel.classList.add('active'); // Show the panel
        });
    }

    if (closeMenuIcon && mobileNavPanel) {
        closeMenuIcon.addEventListener('click', function () {
            mobileNavPanel.classList.remove('active'); // Hide the panel
        });
    }

    // Close panel when clicking on a nav link inside it
    if (mobileNavPanel) {
        const mobileNavLinks = mobileNavPanel.querySelectorAll('nav a'); 
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) { // Only close for anchor links
                    mobileNavPanel.classList.remove('active');
                }
            });
        });
    }

    // Close panel when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNavPanel && mobileNavPanel.classList.contains('active')) {
            const isClickOnMenuIcon = mobileMenuIcon ? mobileMenuIcon.contains(event.target) : false;
            if (!mobileNavPanel.contains(event.target) && !isClickOnMenuIcon) {
                mobileNavPanel.classList.remove('active');
            }
        }
    });

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
    const allNavLinks = document.querySelectorAll('nav a'); // This targets desktop nav and mobile nav if structured as <div class="mobile-nav"><nav><a>...

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100, // Adjust offset as needed
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (mobileNavPanel && mobileNavPanel.classList.contains('active')) {
                        mobileNavPanel.classList.remove('active');
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