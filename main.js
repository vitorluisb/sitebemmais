// Banda Bem + - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initSmoothScroll();
    initHeaderScroll();
    initLightbox();
    initFormValidation();
    initMobileMenu();
    initAnimations();
});

// Smooth Scroll para navegação
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}

// Header com efeito de scroll
function initHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        // Esconder/mostrar header baseado na direção do scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Sistema de Lightbox para mídia
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const mediaItems = document.querySelectorAll('[data-lightbox]');
    let previousFocus = null;
    
    mediaItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const src = this.getAttribute('href') || this.getAttribute('data-src');
            const alt = this.getAttribute('alt') || 'Imagem da galeria';
            
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            
            lightbox.classList.remove('hidden');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Salvar foco anterior e focar no botão fechar
            previousFocus = document.activeElement;
            lightboxClose.focus();
        });
    });
    
    // Fechar lightbox
    function closeLightbox() {
        lightbox.classList.add('hidden');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        
        // Retornar foco para elemento anterior
        if (previousFocus) {
            previousFocus.focus();
            previousFocus = null;
        }
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
}

// Validação e envio do formulário
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Verificar honeypot
        const honeypot = document.getElementById('honeypot');
        if (honeypot && honeypot.value !== '') {
            showError('Erro de segurança detectado.');
            return;
        }
        
        // Validar campos
        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showError(errors.join('<br>'));
            return;
        }
        
        // Simular envio (substituir por integração real)
        submitForm(formData);
    });
    
    function validateForm(formData) {
        const errors = [];
        
        // Nome obrigatório
        if (!formData.get('nome') || formData.get('nome').trim().length < 2) {
            errors.push('Nome deve ter pelo menos 2 caracteres.');
        }
        
        // Email obrigatório e válido
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.push('Email deve ser válido.');
        }
        
        // WhatsApp obrigatório
        const whatsapp = formData.get('whatsapp');
        if (!whatsapp || whatsapp.trim().length < 10) {
            errors.push('WhatsApp deve ter pelo menos 10 dígitos.');
        }
        
        // Tipo de evento obrigatório
        if (!formData.get('tipo-evento')) {
            errors.push('Selecione o tipo de evento.');
        }
        
        // Cidade obrigatória
        if (!formData.get('cidade') || formData.get('cidade').trim().length < 2) {
            errors.push('Cidade/Local é obrigatório.');
        }
        
        // Mensagem obrigatória
        if (!formData.get('mensagem') || formData.get('mensagem').trim().length < 10) {
            errors.push('Mensagem deve ter pelo menos 10 caracteres.');
        }
        
        return errors;
    }
    
    function submitForm(formData) {
        // Mostrar loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Enviando...';
        
        // Simular delay de envio
        setTimeout(() => {
            // Aqui você integraria com um serviço real (Formspree, Netlify Forms, etc.)
            console.log('Dados do formulário:', Object.fromEntries(formData));
            
            // Resetar formulário
            form.reset();
            
            // Mostrar sucesso
            showSuccess('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            
            // Resetar botão
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Enviar Mensagem';
        }, 2000);
    }
    
    function showSuccess(message) {
        hideMessages();
        successMessage.innerHTML = message;
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function showError(message) {
        hideMessages();
        errorMessage.innerHTML = message;
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
}

// Menu mobile
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.innerHTML = '✕';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        
        // Focar no primeiro link do menu
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    } else {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = 'auto';
        
        // Retornar foco para o botão
        mobileMenuBtn.focus();
    }
}

// Animações de entrada
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.card, .hero-content, .section-title');
    animatedElements.forEach(el => observer.observe(el));
}

// Utilitários
function formatWhatsApp(input) {
    // Formatar número de WhatsApp automaticamente
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');
    }
    
    input.value = value;
}

// Aplicar formatação ao campo WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function() {
            formatWhatsApp(this);
        });
    }
});

// Função para scroll suave para seção específica (uso externo)
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para abrir WhatsApp com mensagem pré-definida
function openWhatsApp(message = '') {
    const phoneNumber = '5511999999999'; // Substituir pelo número real
    const encodedMessage = encodeURIComponent(message || 'Olá! Gostaria de saber mais sobre a Banda Bem +');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Exportar funções para uso global
window.scrollToSection = scrollToSection;
window.openWhatsApp = openWhatsApp;