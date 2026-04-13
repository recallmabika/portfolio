// Dark Mode Toggle - FIXED
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or system preference
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    document.documentElement.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
}

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('translate-y-20', 'opacity-0');
            backToTopBtn.classList.add('translate-y-0', 'opacity-100');
        } else {
            backToTopBtn.classList.remove('translate-y-0', 'opacity-100');
            backToTopBtn.classList.add('translate-y-20', 'opacity-0');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Typing/Typewriter Effect for Subtitle
const subtitleElement = document.getElementById('subtitle');
if (subtitleElement) {
    const roles = [
        'Cybersecurity Analyst',
        'Ethical Hacker',
        'Network Engineer',
        'Security Researcher'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isWaiting = true;
            setTimeout(() => {
                isDeleting = true;
                isWaiting = false;
                typeEffect();
            }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        if (!isWaiting) {
            setTimeout(typeEffect, isDeleting ? 50 : 100);
        }
    }

    typeEffect();
}

// Counter Animation
const counters = document.querySelectorAll('.counter');
const counterCards = document.querySelectorAll('.counter-card');

const animateCounters = () => {
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let count = 0;
        const increment = target / 50;

        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
};

// Intersection Observer for counters and animations
const observerOptions = { threshold: 0.3, rootMargin: '0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('counter-card')) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
            if (entry.target.id === 'about') {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe counter cards
counterCards.forEach(card => observer.observe(card));

// Observe about section
const aboutSection = document.getElementById('about');
if (aboutSection) observer.observe(aboutSection);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('[id$="Error"]').forEach(el => el.classList.add('hidden'));
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        
        let isValid = true;
        
        // Validate name
        if (!name.value.trim()) {
            document.getElementById('nameError').classList.remove('hidden');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            document.getElementById('emailError').classList.remove('hidden');
            isValid = false;
        }
        
        // Validate subject
        if (!subject.value.trim()) {
            document.getElementById('subjectError').classList.remove('hidden');
            isValid = false;
        }
        
        // Validate message
        if (!message.value.trim()) {
            document.getElementById('messageError').classList.remove('hidden');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Submit form
        try {
            const formData = new FormData(contactForm);
            const response = await fetch('/send-message', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Show success message
                showFlashMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showFlashMessage(result.message || 'Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showFlashMessage('An error occurred. Please try again later.', 'error');
        }
    });
}

// Flash message helper
function showFlashMessage(message, type) {
    const flashContainer = document.createElement('div');
    flashContainer.className = `fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-100 text-green-800 border-l-4 border-green-500 dark:bg-green-900/40 dark:text-green-300' 
            : 'bg-red-100 text-red-800 border-l-4 border-red-500 dark:bg-red-900/40 dark:text-red-300'
    }`;
    flashContainer.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-3 text-lg"></i>
            <span class="font-semibold">${message}</span>
        </div>
    `;
    
    document.body.appendChild(flashContainer);
    
    setTimeout(() => {
        flashContainer.style.opacity = '0';
        flashContainer.style.transform = 'translateX(100%)';
        setTimeout(() => flashContainer.remove(), 300);
    }, 5000);
}

// Set current year in footer
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// YouTube Video Play Functionality
const videoContainer = document.getElementById('videoContainer');
const videoCover = document.getElementById('videoCover');
const youtubeIframe = document.getElementById('youtubeIframe');

if (videoCover && youtubeIframe) {
    videoCover.addEventListener('click', () => {
        videoCover.style.opacity = '0';
        setTimeout(() => {
            videoCover.style.display = 'none';
        }, 500);
        
        // Start playing the video
        const src = youtubeIframe.src;
        youtubeIframe.src = src + '&autoplay=1';
    });
}