// ===== CUSTOM CURSOR REMOVED =====
/*
const cursor = document.getElementById("cursor");
...
*/

// ===== TUBELIGHT NAVBAR LOGIC =====
const navItems = document.querySelectorAll(".nav-item");
const lampContainer = document.getElementById("lamp-container");

function updateLampPosition(activeItem) {
    if (!activeItem) return;
    const rect = activeItem.getBoundingClientRect();
    const navRect = activeItem.parentElement.getBoundingClientRect();
    
    // Calculate position relative to the wrapper
    const leftPosition = activeItem.offsetLeft;
    const itemWidth = activeItem.offsetWidth;
    
    lampContainer.style.width = `${itemWidth}px`;
    lampContainer.style.transform = `translateX(${leftPosition}px)`;
}

// Initial position
const initialActive = document.querySelector(".nav-item.active");
if (initialActive) {
    // Wait for layout
    setTimeout(() => updateLampPosition(initialActive), 100);
}

navItems.forEach((item) => {
    item.addEventListener("click", function() {
        navItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
        updateLampPosition(this);
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

// ===== NAVBAR SCROLL (simplified for new design) =====
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// ===== SMOOTH SCROLL =====
navItems.forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navItems.forEach((item) => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${id}`) {
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
