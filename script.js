// Banda Bem + - JavaScript Funcionalidades
// Baseado nas especificações do projeto.md - Universal Music inspired

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initSmoothScroll();
    initHeaderEffects();
    initAnimationsOnScroll();
    initLightbox();
    initFormValidation();
    initMobileMenu();
    initFloatingElements();
    initParallaxEffects();
    initMicroInteractions();
});

// 1. Smooth Scroll para navegação
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 2. Efeitos do Header (transparência e blur)
function initHeaderEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('backdrop-blur-md', 'bg-black/20');
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            header.classList.remove('backdrop-blur-md', 'bg-black/20');
            header.style.borderBottom = 'none';
        }
    });
}

// 3. Animações on scroll (Intersection Observer)
function initAnimationsOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animação específica para cards e elementos scroll-reveal
                if (entry.target.classList.contains('feature-card') || entry.target.classList.contains('scroll-reveal')) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.opacity = '1';
                    }, 100);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.feature-card, .animate-on-scroll, .scroll-reveal');
    elementsToAnimate.forEach((el, index) => {
        el.style.transform = 'translateY(30px)';
        el.style.opacity = '0';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Adicionar delay escalonado para elementos em containers stagger-children
        if (el.closest('.stagger-children')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        
        observer.observe(el);
    });
}

// 4. Lightbox para imagens com navegação
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    
    // Atualizar total de imagens
    lightboxTotal.textContent = totalImages;
    
    // Função para abrir lightbox
    function openLightbox(index) {
        currentIndex = index;
        const img = galleryItems[index].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCurrent.textContent = index + 1;
        
        lightbox.classList.remove('hidden');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Preload próxima e anterior
        preloadImage(index - 1);
        preloadImage(index + 1);
    }
    
    // Função para fechar lightbox
    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    
    // Função para navegar
    function navigateLightbox(direction) {
        currentIndex += direction;
        
        // Loop circular
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        } else if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        
        openLightbox(currentIndex);
    }
    
    // Função para preload de imagens
    function preloadImage(index) {
        if (index >= 0 && index < totalImages) {
            const img = new Image();
            img.src = galleryItems[index].querySelector('img').src;
        }
    }
    
    // Event listeners para abrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });
    
    // Event listeners para fechar
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Event listeners para navegação
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
}

// 5. Validação de formulário
function initFormValidation() {
    const form = document.querySelector('#contact-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearErrors);
    });
    
    form.addEventListener('submit', handleFormSubmit);
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    clearFieldError(field);
    
    if (!value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (fieldName === 'email' && !isValidEmail(value)) {
        showFieldError(field, 'Por favor, insira um email válido');
        return false;
    }
    
    if (fieldName === 'telefone' && !isValidPhone(value)) {
        showFieldError(field, 'Por favor, insira um telefone válido');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    return phoneRegex.test(phone);
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'text-red-400 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('border-red-500');
    const errorDiv = field.parentNode.querySelector('.text-red-400');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearErrors(e) {
    clearFieldError(e.target);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Simular envio do formulário
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Mensagem enviada com sucesso!');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// 6. Menu Mobile
function initMobileMenu() {
    const menuToggle = document.querySelector('#mobile-menu-btn');
    const mobileMenu = document.querySelector('#mobile-menu');
    const navLinks = mobileMenu?.querySelectorAll('.nav-link');

    if (menuToggle && mobileMenu) {
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = mobileMenu.classList.contains('open');
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        // Close menu when clicking on links
        navLinks?.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
                closeMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('open');
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('nav-open');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
        
        // Add hidden class after animation completes
        setTimeout(() => {
            if (!mobileMenu.classList.contains('open')) {
                mobileMenu.classList.add('hidden');
            }
        }, 300);
    }
}

// 7. Elementos Flutuantes (Universal Music inspired)
function initFloatingElements() {
    // Criar partículas de fundo
    createBackgroundParticles();
    
    // Animar elementos flutuantes existentes
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'fixed inset-0 pointer-events-none z-0';
    particleContainer.id = 'particles-bg';
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-pink-500/20 rounded-full animate-pulse-glow';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// 8. Efeitos Parallax
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// 9. Micro-interações
function initMicroInteractions() {
    // Hover effects para botões
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Click effects
    const clickableElements = document.querySelectorAll('button, .btn, .card');
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'absolute bg-white/20 rounded-full pointer-events-none';
            ripple.style.width = ripple.style.height = '100px';
            ripple.style.left = (e.clientX - this.offsetLeft - 50) + 'px';
            ripple.style.top = (e.clientY - this.offsetTop - 50) + 'px';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// CSS para animação ripple
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos eventos de scroll
window.addEventListener('scroll', debounce(function() {
    // Scroll events já otimizados
}, 16)); // ~60fps