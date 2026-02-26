// ===== CUSTOM CURSOR REMOVED =====
/*
const cursor = document.getElementById("cursor");
...
*/

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ===== TUBELIGHT NAVBAR LOGIC =====
const navItems = document.querySelectorAll(".nav-item");
const lampContainer = document.getElementById("lamp-container");
let isManualScrolling = false;
let lampUpdatePending = false;

function updateLampPosition(activeItem) {
    if (!activeItem || lampUpdatePending) return;
    
    lampUpdatePending = true;
    requestAnimationFrame(() => {
        const leftPosition = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        
        lampContainer.style.width = `${itemWidth}px`;
        lampContainer.style.transform = `translateX(${leftPosition}px)`;
        lampUpdatePending = false;
    });
}

// Initial position
const initialActive = document.querySelector(".nav-item.active");
if (initialActive) {
    // Wait for layout and fonts
    window.addEventListener('load', () => {
        setTimeout(() => updateLampPosition(initialActive), 100);
    });
}

navItems.forEach((item) => {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        
        if (target) {
            isManualScrolling = true;
            
            // Update UI immediately
            navItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");
            updateLampPosition(this);

            lenis.scrollTo(target, {
                offset: -20,
                duration: 1.2, // Slightly faster
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                onComplete: () => {
                    // Re-enable observer after a short delay
                    setTimeout(() => {
                        isManualScrolling = false;
                    }, 50);
                }
            });
        }
    });
});

// Update lamp on resize
window.addEventListener("resize", () => {
    const active = document.querySelector(".nav-item.active");
    if (active) updateLampPosition(active);
});

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealElements = document.querySelectorAll(".reveal-up");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===== FLOATING BUBBLES =====
const bubblesContainer = document.getElementById("bubbles");

function createBubble(size, left, top, duration) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const delay = Math.random() * -duration; // Use negative delay to start animation mid-way

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `${delay}s`;

    bubblesContainer.appendChild(bubble);
}

// Spawn 4 specific bubbles
// Top-Left: 1 Large, 1 Small
createBubble(250, 5, 5, 12);
createBubble(120, 15, 15, 8);

// Bottom-Right: 1 Large, 1 Small
createBubble(280, 75, 65, 15);
createBubble(140, 85, 75, 10);

// ===== NAVBAR SCROLL (Using Lenis for performance) =====
const navbar = document.getElementById("navbar");

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        if (isManualScrolling) return; // Skip if user clicked a link

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navItems.forEach((item) => {
                    if (item.getAttribute("href") === `#${id}`) {
                        navItems.forEach(i => i.classList.remove("active"));
                        item.classList.add("active");
                        updateLampPosition(item);
                    }
                });
            }
        });
    },
    {
        threshold: 0.4,
    }
);

sections.forEach((section) => sectionObserver.observe(section));

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener("load", () => {
    // Trigger hero animations after a brief delay
    setTimeout(() => {
        document.querySelectorAll(".hero .reveal-up").forEach((el) => {
            el.classList.add("revealed");
        });
    }, 200);
});
