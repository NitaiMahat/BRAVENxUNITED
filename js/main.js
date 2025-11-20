/**
 * BRAVENxUNITED: Wings of Opportunity
 * Main JavaScript File
 * 
 * Handles scroll animations, smooth scrolling navigation,
 * form interactions, and mobile menu.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initSmoothScrolling();
    initFormHandling();
    initMobileMenu();
});

/**
 * Initialize scroll-triggered fade-in animations
 * Uses Intersection Observer API for performance
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Initialize smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle same-page anchors
            if (href.startsWith('#') && window.location.pathname === '/index.html' || window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu) {
                        mobileMenu.classList.add('hidden');
                    }
                }
            }
        });
    });
}

/**
 * Handle form submission (prototype - no backend)
 */
function initFormHandling() {
    const form = document.getElementById('interest-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const studentName = formData.get('student-name');
            const parentName = formData.get('parent-name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const grade = formData.get('grade');
            const transportation = formData.get('transportation');
            
            // Simple validation feedback
            if (studentName && parentName && email && phone && grade) {
                alert(`Thank you for your interest, ${studentName}!\n\nThis is a prototype form. Your information has not been saved.\n\nIn the production version, after submitting this form, you would be asked to complete a questionnaire about your experience exploring the website. This helps us understand what you learned and how we can improve the program.\n\nAfter submission, this would:\n- Send a confirmation email\n- Add you to the waitlist\n- Provide next steps for registration`);
                
                // Optional: Reset form
                // form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking on a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}
