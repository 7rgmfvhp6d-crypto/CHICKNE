/* ===================================
   HARRY PAN'S PERSONAL WEBSITE
   Interactive JavaScript Functions
   =================================== */

// Function 1: Smooth scroll to a specific section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Function 2: Trigger the jumpscare effect
function triggerJumpscare() {
    const jumpscareContainer = document.getElementById('jumpscare-container');
    
    // Show the jumpscare
    jumpscareContainer.classList.remove('jumpscare-hidden');
    jumpscareContainer.style.display = 'block';
    
    // Play a sound effect (optional - uses browser beep)
    playJumpscareSounds();
    
    // Make it shake
    shakeScreen();
}

// Function 3: Close the jumpscare
function closeJumpscare() {
    const jumpscareContainer = document.getElementById('jumpscare-container');
    jumpscareContainer.classList.add('jumpscare-hidden');
    jumpscareContainer.style.display = 'none';
}

// Function 4: Make screen shake when jumpscare appears
function shakeScreen() {
    const html = document.documentElement;
    let shakeCount = 0;
    const maxShakes = 10;
    const shakeIntensity = 10;
    
    const shake = setInterval(() => {
        if (shakeCount >= maxShakes) {
            clearInterval(shake);
            html.style.transform = 'translate(0, 0)';
            return;
        }
        
        const randomX = (Math.random() - 0.5) * shakeIntensity;
        const randomY = (Math.random() - 0.5) * shakeIntensity;
        html.style.transform = `translate(${randomX}px, ${randomY}px)`;
        shakeCount++;
    }, 50);
}

// Function 5: Play jumpscare sounds
function playJumpscareSounds() {
    // Create audio context for web audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Play a scary beep sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 150; // Low scary frequency
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // If audio fails, just alert the user
        console.log('Audio not supported or blocked');
    }
}

// Function 6: Handle fake merch purchases
function fakePurchase(merchName) {
    const funnyMessages = [
        `❌ ERROR 404: ${merchName} not found in this dimension!`,
        `❌ Your wallet said NO WAY! This is a FAKE shop! 😂`,
        `❌ System overload! Can't process imaginary currency! 🚀`,
        `❌ Harry said: "LOL you really tried to buy this?" 😂`,
        `❌ BLOCKED! This item exists in the gaming realm only! 🎮`,
        `❌ Your parents just blocked this purchase! (jk) 💸`,
    ];
    
    const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    alert(randomMessage);
}

// Function 7: Add scroll animation to cards (cards fade in as you scroll)
function animateOnScroll() {
    const cards = document.querySelectorAll('.interest-card, .project-card, .merch-card, .journal-entry');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Function 8: Close jumpscare when pressing ESC key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeJumpscare();
    }
});

// Function 9: Add click anywhere to close jumpscare (except on the content)
document.addEventListener('click', (event) => {
    const jumpscareContainer = document.getElementById('jumpscare-container');
    const jumpscareContent = document.querySelector('.jumpscare-content');
    
    if (jumpscareContainer && !jumpscareContainer.classList.contains('jumpscare-hidden')) {
        // If clicking on overlay (not the content), close it
        if (event.target === jumpscareContainer.querySelector('.jumpscare-overlay')) {
            closeJumpscare();
        }
    }
});

// Function 10: Add active state to navbar links based on scroll position
function updateNavbar() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.style.color = '#00ffff';
            link.style.textShadow = '0 0 10px #00ffff';
        } else {
            link.style.color = '#ffffff';
            link.style.textShadow = 'none';
        }
    });
}

// Function 11: Initialize all animations and effects on page load
window.addEventListener('load', () => {
    animateOnScroll();
    console.log('🎮 Welcome to Harry Pan\'s Personal Website!');
    console.log('🏆 Thanks for visiting!');
});

// Function 12: Update navbar on scroll
window.addEventListener('scroll', () => {
    updateNavbar();
});

// Function 13: Fun Easter Egg - konami code for special message
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (event) => {
    konamiCode.push(event.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('').toLowerCase() === 'arrowuparrowuparrowdownarrowdownarrowleftarrowarrowarrowleftarrowrightba') {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    alert('🎉 EASTER EGG FOUND! 🎉\n\n🏆 You\'re an official Harry Pan fan!\n\n🎮 Gaming skill level: LEGENDARY\n🏈 Football skill: INCREDIBLE  \n🏀 Basketball skill: UNSTOPPABLE\n\nKeep being awesome! 😎');
}

/* ===================================
   ANIMATION HELPER FUNCTIONS
   =================================== */

// Function to add glow effect to text elements
function addGlowEffect(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.textShadow = '0 0 20px rgba(255, 0, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.5)';
        });
        element.addEventListener('mouseout', () => {
            element.style.textShadow = 'none';
        });
    });
}

// Initialize glow effects on load
window.addEventListener('load', () => {
    addGlowEffect('.section-title');
});

console.log('✅ All JavaScript loaded and ready!');
console.log('🎮 Try the Konami code: Up, Up, Down, Down, Left, Right, Left, Right, B, A');
