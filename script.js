
// Letter animation removed - keeping original text

// Logo click to scroll to top
const navLogo = document.querySelector('.nav-logo');
navLogo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized scroll handling - removed heavy parallax animations
let ticking = false;

function updateBackgroundOnScroll() {
    const scrolled = window.pageYOffset;
    
    // Lightweight scroll updates only
    document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
    document.documentElement.style.setProperty('--scroll-ratio', `${Math.min(scrolled / window.innerHeight, 1)}`);
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateBackgroundOnScroll);
        ticking = true;
    }
}

// Throttled scroll event listener
window.addEventListener('scroll', requestTick, { passive: true });

// Removed heavy mouse parallax for better performance

// Removed dynamic background intensity for better performance

// Removed section-based background changes for better performance

// Performance optimization: Reduce animations on mobile
if (window.innerWidth < 768) {
    document.querySelectorAll('.parallax-layer, .animated-bg, .container, .navbar, section').forEach(el => {
        el.style.animation = 'none';
    });
}

// Interactive Custom Cursor System
let cursor = null;
let currentColorIndex = 0;
let isPressed = false;
let currentSound = null;

// Color palette for cursor - only yellow and blue
const cursorColors = [
    { name: 'yellow', class: 'color-yellow' },
    { name: 'blue', class: 'color-blue' }
];

// Comic sound effects
const comicSounds = [
    { name: 'pow', frequencies: [800, 400, 200] },
    { name: 'zap', frequencies: [1000, 600, 300] },
    { name: 'boom', frequencies: [600, 300, 150] },
    { name: 'bang', frequencies: [900, 450, 225] },
    { name: 'pop', frequencies: [1200, 800, 400] }
];

// Create comic sound using Web Audio API
function playComicSound(soundType = 'pow') {
    // Stop any existing sound
    if (currentSound) {
        currentSound.stop();
    }
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sound = comicSounds.find(s => s.name === soundType) || comicSounds[0];
    
    // Create a comic sound with multiple frequencies
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Comic sound parameters
    oscillator.frequency.setValueAtTime(sound.frequencies[0], audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(sound.frequencies[1], audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(sound.frequencies[2], audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.type = 'sine';
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
    
    currentSound = oscillator;
}

// Initialize custom cursor - optimized
function initCustomCursor() {
    cursor = document.getElementById('custom-cursor');
    if (!cursor) return;
    
    // Set initial color
    updateCursorColor();
    
    // Make cursor visible immediately
    cursor.style.display = 'block';
    cursor.style.opacity = '1';
    cursor.style.position = 'fixed';
    cursor.style.zIndex = '99999';
    
    // Mouse move tracking - throttled for performance
    let mouseMoveThrottle = false;
    document.addEventListener('mousemove', function(e) {
        if (mouseMoveThrottle) return;
        mouseMoveThrottle = true;
        
        requestAnimationFrame(() => {
            if (cursor) {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }
            mouseMoveThrottle = false;
        });
    });
    
    // Mouse down - just visual feedback, no color change or sound
    document.addEventListener('mousedown', function(e) {
        if (e.button !== 0) return; // Only left click
        
        isPressed = true;
        cursor.classList.add('pressed');
        
        // No color change, no sound - just visual feedback
    });
    
    // Mouse up - remove pressed state
    document.addEventListener('mouseup', function(e) {
        if (e.button !== 0) return; // Only left click
        
        isPressed = false;
        cursor.classList.remove('pressed');
    });
    
    // Hover effects
    document.addEventListener('mouseenter', function() {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.classList.remove('active');
    });
}

// Update cursor color
function updateCursorColor() {
    if (!cursor) return;
    
    // Remove all color classes
    cursorColors.forEach(color => {
        cursor.classList.remove(color.class);
    });
    
    // Add current color class
    const currentColor = cursorColors[currentColorIndex];
    cursor.classList.add(currentColor.class);
}


// Day/Night Mode System
let isNightMode = false;

// Apply day/night mode to the website
function toggleDayNightMode() {
    isNightMode = !isNightMode;
    
    if (isNightMode) {
        document.body.classList.add('night-mode');
        document.body.classList.remove('day-mode');
        rotateEarth('night');
    } else {
        document.body.classList.add('day-mode');
        document.body.classList.remove('night-mode');
        rotateEarth('day');
    }
}

// Change Earth to night/day version
function rotateEarth(mode) {
    const earthGif = document.querySelector('.hero-gif');
    if (earthGif) {
        if (mode === 'night') {
            // Night Earth - darker, bluer tint
            earthGif.style.filter = 'brightness(0.4) contrast(1.2) hue-rotate(200deg) saturate(1.5)';
            earthGif.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.4)';
        } else {
            // Day Earth - normal appearance
            earthGif.style.filter = 'brightness(1) contrast(1) hue-rotate(0deg) saturate(1)';
            earthGif.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
        }
        
        // Add smooth transition
        earthGif.style.transition = 'filter 1s ease-in-out, box-shadow 1s ease-in-out';
    }
}

// Show mode change indicator
function showModeIndicator(mode) {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${isNightMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
        color: ${isNightMode ? 'white' : 'black'};
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 24px;
        font-weight: bold;
        z-index: 10000;
        pointer-events: none;
        animation: modeFade 2s ease-out;
        box-shadow: ${isNightMode ? '0 0 30px rgba(255, 255, 255, 0.3)' : '0 0 30px rgba(0, 0, 0, 0.3)'};
        border: 2px solid ${isNightMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
    `;
    indicator.textContent = mode;
    
    // Add fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modeFade {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8) rotateY(90deg); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1) rotateY(0deg); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotateY(0deg); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9) rotateY(-90deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(indicator);
    
    // Remove indicator after animation
    setTimeout(() => {
        if (indicator.parentNode) {
            indicator.parentNode.removeChild(indicator);
        }
        if (style.parentNode) {
            style.parentNode.removeChild(style);
        }
    }, 2000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    
    // Add click handler to Earth GIF for day/night toggle
    const earthGif = document.querySelector('.hero-gif');
    if (earthGif) {
        earthGif.addEventListener('click', function() {
            toggleDayNightMode();
        });
        
        // Initialize with day mode
        document.body.classList.add('day-mode');
    }
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomCursor);
} else {
    initCustomCursor();
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Get form data for validation
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            e.preventDefault();
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Handle form submission with fetch
        e.preventDefault();
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Network response was not ok');
                });
            }
        })
        .catch(error => {
            alert('There was a problem sending your message. Please try again or contact me directly at harounsa654@gmail.com');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(38, 101, 191, 0.98)';
        navbar.style.boxShadow = '0 10px 25px rgba(38, 101, 191, 0.3)';
    } else {
        navbar.style.background = 'rgba(38, 101, 191, 0.9)';
        navbar.style.boxShadow = '0 2px 8px rgba(38, 101, 191, 0.1)';
    }
});

// Project page functionality
const createProjectPage = (projectData) => {
    const projectPage = document.createElement('div');
    projectPage.className = 'project-page-overlay';
    projectPage.innerHTML = `
        <div class="project-page-content">
            <button class="close-project" aria-label="Close project">×</button>
            <div class="project-page-header">
                <h1 class="sketch-title">${projectData.title}</h1>
                <p class="sketch-subtitle">${projectData.subtitle}</p>
            </div>
            <div class="project-page-body">
                <div class="project-page-image">
                    ${projectData.images ? `
                        <div class="project-image-gallery">
                            ${projectData.images.map((image, index) => `
                                <div class="project-image-item ${index === 0 ? 'active' : ''}">
                                    <img src="${image}" alt="${projectData.title} - Image ${index + 1}" class="project-gallery-image">
                                </div>
                            `).join('')}
                        </div>
                        <div class="project-image-nav">
                            ${projectData.images.map((_, index) => `
                                <button class="image-nav-btn ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                            `).join('')}
                        </div>
                    ` : `
                    <div class="project-page-placeholder">
                        <i class="${projectData.icon}"></i>
                    </div>
                    `}
                </div>
                <div class="project-page-details">
                    <h3 class="sketch-text">Project Overview</h3>
                    <p>${projectData.description}</p>
                    <h3 class="sketch-text">Technologies Used</h3>
                    <div class="project-tags">
                        ${projectData.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <h3 class="sketch-text">Key Features</h3>
                    <ul>
                        ${projectData.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <div class="project-page-actions">
                        <!-- View Code button removed -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles for project page
    const projectPageStyles = `
        .project-page-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .project-page-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .project-page-content {
            background: var(--white);
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            border: 3px solid var(--accent-yellow);
            box-shadow: var(--sketch-shadow);
        }
        
        .close-project {
            position: absolute;
            top: 15px;
            right: 20px;
            background: var(--accent-yellow);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--primary-blue);
            transition: all 0.3s ease;
        }
        
        .close-project:hover {
            transform: scale(1.1);
            background: var(--secondary-yellow);
        }
        
        .project-page-header {
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .project-page-body {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            align-items: center;
        }
        
        .project-page-image {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .project-image-gallery {
            position: relative;
            width: 100%;
            max-width: 600px;
            min-height: 400px;
            max-height: 500px;
            overflow: hidden;
            border-radius: 15px;
            box-shadow: var(--sketch-shadow);
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--off-white);
            border: 2px solid var(--accent-yellow);
        }
        
        .project-image-item {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .project-image-item.active {
            opacity: 1;
        }
        
        .project-gallery-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 15px;
            background: var(--off-white);
            padding: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .project-image-nav {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-top: 15px;
        }
        
        .image-nav-btn {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid var(--primary-blue);
            background: var(--light-blue);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .image-nav-btn.active {
            background: var(--accent-yellow);
            transform: scale(1.2);
        }
        
        .image-nav-btn:hover {
            background: var(--primary-blue);
        }
        
        .project-page-placeholder {
            width: 200px;
            height: 200px;
            background: var(--light-blue);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            color: var(--primary-blue);
            box-shadow: var(--sketch-shadow);
        }
        
        .project-page-details h3 {
            margin: 1.5rem 0 0.5rem 0;
            color: var(--primary-blue);
        }
        
        .project-page-details p {
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .project-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .project-page-details ul {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }
        
        .project-page-details li {
            margin-bottom: 0.5rem;
        }
        
        .project-page-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
            .project-page-body {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.getElementById('project-page-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'project-page-styles';
        styleSheet.textContent = projectPageStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(projectPage);
    
    // Show project page
    setTimeout(() => {
        projectPage.classList.add('active');
        
        // Force blue color for headings in dark mode
        if (document.body.classList.contains('night-mode')) {
            // Wait a bit more for the popup to fully render
            setTimeout(() => {
                const headings = projectPage.querySelectorAll('.sketch-title, .sketch-subtitle, .sketch-text, h1, h2, h3, p');
                headings.forEach(heading => {
                    // Check if it's a subtitle or title
                    if (heading.classList.contains('sketch-subtitle') || 
                        heading.classList.contains('sketch-title') ||
                        heading.classList.contains('sketch-text') ||
                        heading.tagName === 'H1' ||
                        heading.tagName === 'H2' ||
                        heading.tagName === 'H3') {
                        heading.style.setProperty('color', '#007BFF', 'important');
                        heading.style.setProperty('text-shadow', 'none', 'important');
                    }
                });
            }, 100);
        }
    }, 10);
    
    // Close functionality
    const closeBtn = projectPage.querySelector('.close-project');
    closeBtn.addEventListener('click', () => {
        projectPage.classList.remove('active');
        // Remove keyboard event listener if it exists
        if (projectPage._keyboardHandler) {
            document.removeEventListener('keydown', projectPage._keyboardHandler);
        }
        setTimeout(() => {
            document.body.removeChild(projectPage);
        }, 300);
    });
    
    // Close on overlay click
    projectPage.addEventListener('click', (e) => {
        if (e.target === projectPage) {
            projectPage.classList.remove('active');
            // Remove keyboard event listener if it exists
            if (projectPage._keyboardHandler) {
                document.removeEventListener('keydown', projectPage._keyboardHandler);
            }
            setTimeout(() => {
                document.body.removeChild(projectPage);
            }, 300);
        }
    });
    
    // Image navigation functionality
    if (projectData.images && projectData.images.length > 1) {
        const imageItems = projectPage.querySelectorAll('.project-image-item');
        const navButtons = projectPage.querySelectorAll('.image-nav-btn');
        let currentIndex = 0;
        
        const showImage = (index) => {
            // Remove active class from all items and buttons
            imageItems.forEach(item => item.classList.remove('active'));
            navButtons.forEach(button => button.classList.remove('active'));
            
            // Add active class to selected item and button
            imageItems[index].classList.add('active');
            navButtons[index].classList.add('active');
            currentIndex = index;
        };
        
        navButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => showImage(index));
        });
        
        // Keyboard navigation
        const handleKeyPress = (e) => {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                showImage(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < projectData.images.length - 1) {
                showImage(currentIndex + 1);
            }
        };
        
        // Add keyboard event listener
        document.addEventListener('keydown', handleKeyPress);
        
        // Store the handler for cleanup
        projectPage._keyboardHandler = handleKeyPress;
    }
};

// Project data
const projects = {
    'mobile-app': {
        title: 'Yale Trivia App',
        subtitle: 'Interactive trivia application for Yale community',
        icon: 'fas fa-mobile-alt',
        description: 'A comprehensive mobile trivia application designed for the Yale community. This project focused on creating an engaging and educational platform that brings together students, faculty, and alumni through interactive trivia games about Yale history, traditions, and campus life.',
        tags: ['Mobile', 'UX/UI', 'Trivia', 'Yale', 'Community'],
        features: [
            'Interactive trivia questions about Yale history',
            'User-friendly interface for all skill levels',
            'Real-time scoring and leaderboards',
            'Community engagement features',
            'Educational content about Yale traditions'
        ],
        images: [
            'images/bulldogtriviafirst.png',
            'images/bulldogtrivia-about.png',
            'images/bulldogtrivia-test.png',
            'images/bulldogtrivia-final.png'
        ]
    },
    'web-platform': {
        title: 'JALI — Prototype Fashion Brand',
        subtitle: 'African Heritage Meets Future Tech',
        icon: 'fas fa-laptop',
        description: 'JALI reimagines African fashion through the lens of futuristic technology. Rooted in traditional patterns, textiles, and cultural storytelling, the brand merges bold heritage aesthetics with forward-thinking design, creating a new space where past and future meet.',
        tags: ['Web', 'Fashion', 'Afrofuturism', 'E-commerce', 'Brand Design'],
        features: [
            'Heritage: Inspired by African prints, silhouettes, and craftsmanship',
            'Innovation: Infused with futuristic cuts, smart fabrics, and digital-age styling',
            'Identity: A statement of cultural pride that speaks to global fashion with a tech edge',
            'Visual Direction: Rich earthy palettes blended with metallics and neon accents',
            'Sustainability: Bridging ancestral wisdom with contemporary eco-solutions'
        ],
        details: {
            'Brand Concept': 'JALI reimagines African fashion through the lens of futuristic technology. Rooted in traditional patterns, textiles, and cultural storytelling, the brand merges bold heritage aesthetics with forward-thinking design, creating a new space where past and future meet.',
            'Design Philosophy': 'Heritage meets Innovation - Inspired by African prints, silhouettes, and craftsmanship, infused with futuristic cuts, smart fabrics, and digital-age styling. A statement of cultural pride that speaks to global fashion with a tech edge.',
            'Visual Direction': 'Rich earthy palettes blended with metallics and neon accents. Afro-futuristic motifs integrated with minimalist, tech-driven layouts. Typography and branding that bridges cultural depth and modern clarity.',
            'Key Features': 'Collections that mix traditional African textiles with modern tailoring. Conceptual designs incorporating future-tech materials and finishes. Digital-first presentation with virtual try-on prototypes, interactive lookbooks, and responsive e-commerce platform.'
        },
        images: [
            'images/jali-cover-first.png',
            'images/jali-homepage.png',
            'images/jali-collection.png', 
            'images/jali-vision.png',
            'images/jali-lookbook.png'
        ]
    },
    'art-lending': {
        title: 'Art Lending Platform',
        subtitle: 'Digital platform connecting art collectors with emerging artists',
        icon: 'fas fa-palette',
        description: 'A comprehensive digital platform that revolutionizes how art is shared and discovered. The Art Lending Platform connects established art collectors with emerging artists through a curated lending system, creating opportunities for both parties while democratizing access to art.',
        tags: ['Web Platform', 'Art', 'Community', 'UX/UI', 'Digital Design'],
        features: [
            'Curated art lending system connecting collectors and artists',
            'User-friendly interface for browsing and managing art collections',
            'Secure transaction and lending management system',
            'Artist portfolio and discovery features',
            'Community engagement and networking tools',
            'Mobile-responsive design for accessibility'
        ],
        images: [
            'images/artlending-first.png',
            'images/artlending-second.png',
            'images/artlending-third.png'
        ]
    }
};

// Art projects data
const artProjects = {
    'abstract-expression': {
        title: 'Traditional Painting',
        subtitle: 'Classical and contemporary traditional artwork',
        icon: 'fas fa-palette',
        description: 'A collection of traditional paintings that showcase classical techniques and contemporary approaches to traditional art forms. These works demonstrate traditional painting methods while exploring personal artistic expression and cultural themes.',
        tags: ['Oil', 'Acrylic', 'Traditional', 'Classical', 'Canvas'],
        features: [
            'Classical painting techniques',
            'Traditional color theory application',
            'Mastery of brushwork and composition',
            'Cultural and personal expression',
            'Contemporary interpretation of traditional methods'
        ],
        images: [
            'images/traditional_painting1-optimized.jpg',
            'images/traditional_painting2-optimized.jpg',
            'images/traditional_painting3-optimized.jpg',
            'images/traditional_painting4-optimized.jpg',
            'images/traditional_painting5-optimized.jpg'
        ]
    },
    'digital-art': {
        title: 'Digital Art',
        subtitle: 'Modern digital illustrations',
        icon: 'fas fa-brush',
        description: 'Modern digital illustrations that blend traditional artistic techniques with cutting-edge technology. These pieces showcase the versatility of digital media while maintaining the soul of traditional art.',
        tags: ['Digital', 'Illustration', 'Technology', 'Modern', 'Creative'],
        features: [
            'Digital painting techniques',
            'Traditional art principles',
            'Modern technology integration',
            'Versatile creative expression',
            'High-resolution output'
        ],
        images: [
            'images/digital_art1-optimized.jpg',
            'images/digital_art2-optimized.jpg',
            'images/digital_art3-optimized.jpg',
            'images/digital_art4-optimized.jpg',
            'images/digital_art5-optimized.jpg'
        ]
    }
};

// Additional projects data
const additionalProjects = {
    'innovation-workshop': {
        title: 'BSC Shirt Design',
        subtitle: 'Official T-shirts for Black Student Conference',
        icon: 'fas fa-tshirt',
        description: 'I designed official T-shirts for the Black Student Conference (Sep 2024 – present), creating merchandise that captured the spirit of the event while serving as a unifying visual identity for participants. The design process balanced aesthetics with meaning, incorporating themes that highlight the conference\'s mission of addressing issues within the African Diaspora. Beyond producing wearable art, the T-shirts also functioned as a branding tool, helping to build recognition for the conference and create a sense of community among attendees.',
        tags: ['Graphic Design', 'Branding', 'Merchandise', 'Community', 'Visual Identity'],
        features: [
            'Concept Development: Translated the conference\'s mission into a visual design that resonated with attendees',
            'Graphic Design Execution: Designed artwork for screen printing, optimizing for clarity, style, and durability on fabric',
            'Branding & Identity: Established a consistent visual language across merchandise, reinforcing the conference\'s message',
            'Community Impact: Created wearable pieces that served as keepsakes, promoting pride and connection beyond the event'
        ],
        images: [
            'images/innovation-workshop-1-optimized.jpg',
            'images/innovation-workshop-2-optimized.jpg',
            'images/innovation-workshop-3-optimized.jpg',
            'images/innovation-workshop-4-optimized.jpg',
            'images/innovation-workshop-5-optimized.jpg'
        ]
    },
    'community-art-project': {
        title: 'Community Mural Project',
        subtitle: 'Collaborative mural with local sandwich shop',
        icon: 'fas fa-users',
        description: 'A collaborative mural project that brought together local artists and community members to create a large-scale public artwork for a local sandwich shop. This project focused on community engagement, artistic collaboration, and supporting local businesses through public art.',
        tags: ['Community', 'Mural', 'Collaboration', 'Public Art', 'Local Business'],
        features: [
            'Community engagement strategies with local sandwich shop',
            'Large-scale mural design and execution',
            'Artist collaboration coordination',
            'Public art planning and implementation',
            'Community involvement facilitation',
            'Supporting local business through artistic partnership'
        ],
        images: [
            'images/muralcoverfirst-optimized.jpg',
            'images/muralsecond-optimized.jpg',
            'images/muralthird-optimized.jpg',
            'images/murallast-optimized.jpg'
        ]
    },
    'architecture-project': {
        title: 'Architecture Project',
        subtitle: 'Innovative architectural design and spatial planning using Rhino',
        icon: 'fas fa-building',
        description: 'A comprehensive architectural design project showcasing innovative approaches to spatial planning and design. This project demonstrates creative problem-solving in architectural design using Rhino 3D modeling software, focusing on functionality, aesthetics, and sustainable practices.',
        tags: ['Architecture', 'Design', 'Rhino', '3D Modeling', 'Spatial Planning', 'Innovation'],
        features: [
            'Innovative spatial planning and design using Rhino',
            'Creative architectural problem-solving',
            'Sustainable design principles',
            'Aesthetic and functional balance',
            'Technical drawing and 3D visualization in Rhino'
        ],
        images: [
            'images/architecture-cover.png',
            'images/architecture-page1.png',
            'images/architecture-page2.png',
            'images/architecture-final.png'
        ]
    }
};

// Add click handlers to project cards and art items - wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Setting up click handlers...');
    const items = document.querySelectorAll('.portfolio-item, .project-card, .art-item');
    console.log('Found', items.length, 'clickable items');
    
    items.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Card clicked:', index);
            const title = item.querySelector('h3').textContent.toLowerCase();
            console.log('Title:', title);
            let projectKey = '';
            
            if (title.includes('mobile') || title.includes('yale') || title.includes('trivia')) projectKey = 'mobile-app';
            else if (title.includes('web') || title.includes('jali')) projectKey = 'web-platform';
            else if (title.includes('art') && title.includes('lending')) projectKey = 'art-lending';
            else if (title.includes('traditional') || title.includes('abstract')) projectKey = 'abstract-expression';
            else if (title.includes('digital')) projectKey = 'digital-art';
            else if (title.includes('bsc') || title.includes('shirt') || title.includes('innovation')) projectKey = 'innovation-workshop';
            else if (title.includes('community')) projectKey = 'community-art-project';
            else if (title.includes('architecture')) projectKey = 'architecture-project';
            
            console.log('Project key:', projectKey);
            
            if (projectKey) {
                let projectData = null;
                if (projects[projectKey]) {
                    projectData = projects[projectKey];
                    console.log('Found in projects:', projectKey);
                } else if (artProjects[projectKey]) {
                    projectData = artProjects[projectKey];
                    console.log('Found in artProjects:', projectKey);
                } else if (additionalProjects[projectKey]) {
                    projectData = additionalProjects[projectKey];
                    console.log('Found in additionalProjects:', projectKey);
                }
                
                if (projectData) {
                    console.log('Creating project page for:', projectData.title);
                    createProjectPage(projectData);
                } else {
                    console.log('No project data found for:', projectKey);
                }
            } else {
                console.log('No project key matched for title:', title);
            }
        });
    });
});

// Portfolio item hover effects - also wrapped in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.portfolio-item, .art-item, .project-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.cursor = 'pointer';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-tag {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Removed typing effect - letters will float immediately

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-blue);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'translateY(-3px)';
    backToTopBtn.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'translateY(0)';
    backToTopBtn.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
});
