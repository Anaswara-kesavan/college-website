// ================= PRELOADER =================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// ================= MOBILE MENU =================
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Show Menu
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide Menu
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Remove Menu Mobile on Link Click
const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// ================= STICKY HEADER =================
function scrollHeader(){
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

// ================= ACTIVE LINK HIGHLIGHT =================
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// ================= BACK TO TOP =================
function scrollTop(){
    const backToTop = document.getElementById('back-to-top');
    if(this.scrollY >= 500) backToTop.classList.add('show-scroll'); 
    else backToTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

// ================= SCROLL REVEAL ANIMATIONS =================
function reveal() {
    var reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll('.counter');
const speed = 200; // Lower is faster
let started = false;

function startCounters() {
    const section = document.getElementById('counter-section');
    if (!section) return;
    
    const sectionTop = section.getBoundingClientRect().top;
    
    if (sectionTop < window.innerHeight && !started) {
        started = true;
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }
}
window.addEventListener('scroll', startCounters);

// ================= GALLERY LIGHTBOX =================
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img').src;
        lightboxImg.src = img;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ================= TESTIMONIAL SLIDER =================
const wrapper = document.getElementById('testimonial-wrapper');
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalSlides = slides.length;

function updateSlider() {
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
}

if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
    });
});

// Auto slide
let sliderInterval = setInterval(nextSlide, 5000);

// Pause on hover
const testimonialContainer = document.querySelector('.testimonial-container');
if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', () => {
        clearInterval(sliderInterval);
    });
    
    testimonialContainer.addEventListener('mouseleave', () => {
        sliderInterval = setInterval(nextSlide, 5000);
    });
}

// ================= ADMISSION FORM & MODAL =================
const admissionForm = document.getElementById('admissionForm');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');
const countdownSpan = document.getElementById('countdown');

if (admissionForm) {
    admissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form Validation (HTML5 already does most of it, but we can ensure it's valid)
        if (this.checkValidity()) {
            // Show Success Modal
            successModal.classList.add('active');
            
            // Start Countdown and Redirect
            let timeLeft = 3;
            countdownSpan.innerText = timeLeft;
            
            const countdownInterval = setInterval(() => {
                timeLeft--;
                countdownSpan.innerText = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(countdownInterval);
                    window.location.href = 'index.html';
                }
            }, 1000);
            
            // Store interval ID to clear it if user closes manually
            successModal.setAttribute('data-interval', countdownInterval);
        }
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        // Clear interval if closed manually
        const intervalId = successModal.getAttribute('data-interval');
        if (intervalId) {
            clearInterval(parseInt(intervalId));
        }
        
        // Hide Modal
        successModal.classList.remove('active');
        
        // Clear Form
        if (admissionForm) {
            admissionForm.reset();
        }
        
        // Redirect immediately
        window.location.href = 'index.html';
    });
}

// ================= CONTACT FORM WHATSAPP =================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const msg = document.getElementById('contactMessage').value;
            
            const text = `*New Contact Enquiry!*\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${msg}`;
            const whatsappUrl = `https://wa.me/919846669829?text=${encodeURIComponent(text)}`;
            
            // Redirect to WhatsApp
            window.location.href = whatsappUrl;
            
            this.reset();
        }
    });
}
