/**
 * Portfolio Website Logic
 * Fathima Zeba Samir
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Sticky Navigation Header scroll effect
    // ----------------------------------------------------
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once at load in case page starts scrolled

    // ----------------------------------------------------
    // 2. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon between bars and times (close icon)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu when navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // ----------------------------------------------------
    // 3. Hero Section Typing Effect
    // ----------------------------------------------------
    const typingText = document.getElementById('typing-text');
    const words = [
        'Aspiring Software Developer',
        'Computer Science Student',
        'Relational Database Builder',
        'React Application Creator'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeAnimation = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Type characters
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentWord.length) {
            // Word completed typing, pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeAnimation, typingSpeed);
    };

    if (typingText) {
        typeAnimation();
    }

    // ----------------------------------------------------
    // 4. Scroll Spy - Highlighting Nav link based on position
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // adjust offset for header height
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Run once at initialization

    // ----------------------------------------------------
    // 5. Interactive Project Filtering
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active styling on buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all cards
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else if (category === filterValue) {
                    // Show matching cards
                    card.classList.remove('hide');
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // Hide non-matching cards
                    card.classList.add('hide');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 6. Contact Form Validation and Mock Submit
    // ----------------------------------------------------
    const contactForm = document.getElementById('portfolio-contact-form');
    const statusMessage = document.getElementById('form-status-message');
    
    // Form Inputs
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    
    // Form Error Blocks
    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorMessageText = document.getElementById('error-message-text');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            
            // Clear status message
            statusMessage.style.display = 'none';
            statusMessage.className = 'form-status';
            statusMessage.textContent = '';
            
            // Validate Name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }
            
            // Validate Email
            if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }
            
            // Validate Message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }
            
            // Submitting states
            if (isValid) {
                const submitBtn = document.getElementById('form-submit-btn');
                const originalText = submitBtn.innerHTML;
                
                // Show sending state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
                
                // Simulate an API call
                setTimeout(() => {
                    // Reset Button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    
                    // Show success feedback
                    statusMessage.classList.add('success');
                    statusMessage.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHTML(nameInput.value.trim())}</strong>! Your message was received successfully. I will get back to you shortly!`;
                    statusMessage.style.display = 'block';
                    
                    // Reset inputs
                    contactForm.reset();
                    
                    // Remove any remaining invalid classes
                    nameInput.parentElement.classList.remove('invalid');
                    emailInput.parentElement.classList.remove('invalid');
                    messageInput.parentElement.classList.remove('invalid');
                    
                    // Scroll to feedback message
                    statusMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 1500);
            } else {
                // Show generic error status
                statusMessage.classList.add('error');
                statusMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please fix the highlighted fields above.';
                statusMessage.style.display = 'block';
            }
        });
        
        // Remove error states on typing / input change
        const clearErrorOnInput = (input) => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.parentElement.classList.remove('invalid');
                }
            });
        };
        
        clearErrorOnInput(nameInput);
        clearErrorOnInput(messageInput);
        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() && validateEmail(emailInput.value.trim())) {
                emailInput.parentElement.classList.remove('invalid');
            }
        });
    }

    // Helper function to escape html and prevent XSS injection
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
