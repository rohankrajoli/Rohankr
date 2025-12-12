// Smooth scroll animations on load
document.addEventListener('DOMContentLoaded', function() {
    // Optimized scroll reveal animation with per-element delay (no accumulation)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('revealed')) {
                // Use data attribute for individual delay, no global accumulation
                const delay = parseInt(entry.target.dataset.revealDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal sections with individual delays
    const scrollRevealSections = document.querySelectorAll('.scroll-reveal');
    scrollRevealSections.forEach((section, index) => {
        section.dataset.revealDelay = Math.min(index * 100, 400); // Cap at 400ms
        observer.observe(section);
    });

    // Simplified parallax (less intensive, only on larger screens)
    if (window.innerWidth > 768) {
        const geometricShapes = document.querySelectorAll('.corner-shape');
        let ticking = false;
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            geometricShapes.forEach((shape, index) => {
                const speed = index === 0 ? 0.1 : -0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        };
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Add ripple effect to logo
    const logo = document.querySelector('.logo-icon');
    if (logo) {
        logo.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }


    // Social links click animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-social');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 400);
        });
    });

    // Welcome heading is already animated via CSS



});

// Add CSS for ripple effects dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .ripple-social {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.2);
        transform: scale(0);
        animation: ripple-social-animation 0.4s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-social-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
