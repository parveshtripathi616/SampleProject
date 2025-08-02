let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let autoSlideInterval;
let isTransitioning = false;

// Initialize slider
function initSlider() {
    showSlide(0);
    startAutoSlide();
    addTouchSupport();
}

// Show specific slide
function showSlide(index) {
    if (isTransitioning) return;
    
    // Remove active class from all slides and dots
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentSlideIndex = index;
}

// Change slide (next/previous)
function changeSlide(direction) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    
    let newIndex = currentSlideIndex + direction;
    
    // Handle wrap around
    if (newIndex >= totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }
    
    showSlide(newIndex);
    restartAutoSlide();
    
    // Reset transition flag after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

// Go to specific slide
function currentSlide(index) {
    if (isTransitioning) return;
    
    isTransitioning = true;
    showSlide(index - 1); // Convert to 0-based index
    restartAutoSlide();
    
    // Reset transition flag after animation
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

// Auto slide functionality
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Touch/Swipe support for mobile devices
function addTouchSupport() {
    let startX = 0;
    let endX = 0;
    const slider = document.querySelector('.slider-container');
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoSlide();
    });
    
    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    slider.addEventListener('touchend', () => {
        handleSwipe();
        restartAutoSlide();
    });
    
    function handleSwipe() {
        const threshold = 50; // Minimum swipe distance
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swiped left - go to next slide
                changeSlide(1);
            } else {
                // Swiped right - go to previous slide
                changeSlide(-1);
            }
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            changeSlide(-1);
            break;
        case 'ArrowRight':
            changeSlide(1);
            break;
        case ' ': // Spacebar
            e.preventDefault();
            changeSlide(1);
            break;
    }
});

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);

// Handle page visibility change (pause when tab is not active)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        restartAutoSlide();
    }
});

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Handle window resize (optional: adjust slider on screen orientation change)
window.addEventListener('resize', () => {
    // You can add responsive adjustments here if needed
});

// Smooth scroll behavior for dots (accessibility improvement)
dots.forEach((dot, index) => {
    dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            currentSlide(index + 1);
        }
    });
    
    // Make dots focusable for keyboard navigation
    dot.setAttribute('tabindex', '0');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
});

// Add accessibility attributes to navigation buttons
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

prevBtn.setAttribute('aria-label', 'Previous slide');
nextBtn.setAttribute('aria-label', 'Next slide');

// Add ARIA live region for screen readers
const slider = document.querySelector('.slider');
slider.setAttribute('aria-live', 'polite');
slider.setAttribute('aria-label', 'Image slider');