// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update toggle icon based on current theme
const updateToggleIcon = () => {
    const icon = themeToggle.querySelector('i');
    if (body.getAttribute('data-theme') === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
};

// Initialize icon
updateToggleIcon();

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
});

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

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
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
                    <div class="project-page-placeholder">
                        <i class="${projectData.icon}"></i>
                    </div>
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
                        <a href="#" class="btn btn-primary">View Live Demo</a>
                        <a href="#" class="btn btn-secondary">View Code</a>
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
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            align-items: start;
        }
        
        .project-page-image {
            display: flex;
            justify-content: center;
            align-items: center;
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
    }, 10);
    
    // Close functionality
    const closeBtn = projectPage.querySelector('.close-project');
    closeBtn.addEventListener('click', () => {
        projectPage.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(projectPage);
        }, 300);
    });
    
    // Close on overlay click
    projectPage.addEventListener('click', (e) => {
        if (e.target === projectPage) {
            projectPage.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(projectPage);
            }, 300);
        }
    });
};

// Project data
const projects = {
    'mobile-app': {
        title: 'Mobile App Design',
        subtitle: 'User-centered mobile application',
        icon: 'fas fa-mobile-alt',
        description: 'A comprehensive mobile application designed with user experience at its core. This project focused on creating an intuitive interface that guides users through complex workflows while maintaining simplicity and elegance.',
        tags: ['Mobile', 'UX/UI', 'Prototyping', 'Figma', 'User Research'],
        features: [
            'Intuitive navigation system',
            'Accessibility-first design approach',
            'Cross-platform compatibility',
            'Real-time data synchronization',
            'Offline functionality'
        ]
    },
    'web-platform': {
        title: 'Web Platform Design',
        subtitle: 'Responsive web platform',
        icon: 'fas fa-laptop',
        description: 'A modern web platform that adapts seamlessly across all devices. The design emphasizes clean aesthetics while ensuring optimal performance and accessibility for all users.',
        tags: ['Web', 'Responsive', 'Accessibility', 'React', 'CSS3'],
        features: [
            'Fully responsive design',
            'Advanced accessibility features',
            'Performance optimization',
            'Modern CSS animations',
            'SEO-friendly structure'
        ]
    },
    'product-prototype': {
        title: 'Product Prototyping',
        subtitle: 'Physical product design',
        icon: 'fas fa-cube',
        description: 'An innovative physical product prototype that combines ergonomic design with cutting-edge technology. This project demonstrates the intersection of form and function in industrial design.',
        tags: ['Physical', 'Prototyping', 'Ergonomics', '3D Modeling', 'CAD'],
        features: [
            'Ergonomic design principles',
            '3D printed prototypes',
            'User testing integration',
            'Material optimization',
            'Manufacturing considerations'
        ]
    }
};

// Add click handlers to project cards
document.querySelectorAll('.portfolio-item, .project-card').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const title = item.querySelector('h3').textContent.toLowerCase();
        let projectKey = '';
        
        if (title.includes('mobile')) projectKey = 'mobile-app';
        else if (title.includes('web')) projectKey = 'web-platform';
        else if (title.includes('prototype')) projectKey = 'product-prototype';
        
        if (projectKey && projects[projectKey]) {
            createProjectPage(projects[projectKey]);
        }
    });
});

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item, .art-item, .project-card').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.cursor = 'pointer';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
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

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

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
