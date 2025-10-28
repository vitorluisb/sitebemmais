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
    initWhatsAppForm();
    initDateFieldEnhancements();
    initAdvancedParticleEffects();
    initDynamicHoverEffects();
    updateCurrentYear();
});

// Função para inicializar o formulário do WhatsApp
function initWhatsAppForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostra loading
            showLoadingButton();
            
            // Coleta dados do formulário
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                whatsapp: document.getElementById('whatsapp').value.trim(),
                email: document.getElementById('email').value.trim(),
                tipoEvento: document.getElementById('tipo-evento').value,
                data: document.getElementById('data').value,
                cidadeLocal: document.getElementById('cidade-local').value.trim(),
                mensagem: document.getElementById('mensagem').value.trim()
            };
            
            // Valida os dados
            const errors = validateContactForm(formData);
            
            if (errors.length > 0) {
                resetSubmitButton();
                showFeedback('error', errors.join(', '));
                return;
            }
            
            // Simula um pequeno delay para melhor UX
            setTimeout(() => {
                try {
                    // Envia para o WhatsApp
                    const success = sendToWhatsApp(formData);
                    
                    if (success) {
                        resetSubmitButton();
                        showFeedback('success');
                        
                        // Limpa o formulário após sucesso
                        setTimeout(() => {
                            contactForm.reset();
                            showFeedback('hide');
                        }, 3000);
                    }
                } catch (error) {
                    resetSubmitButton();
                    showFeedback('error', 'Erro ao enviar mensagem. Tente novamente.');
                    console.error('Erro ao enviar para WhatsApp:', error);
                }
            }, 1000);
        });
    }
    
    // Adiciona máscara para o campo WhatsApp
    const whatsappInput = document.getElementById('whatsapp');
    if (whatsappInput) {
        whatsappInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
}

// Efeitos avançados de partículas com conexões
function initAdvancedParticleEffects() {
    // Criar canvas para efeitos de conexão
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-connections';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.6';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mousePos = { x: 0, y: 0 };

    // Configurar canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Classe Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.baseSize = Math.random() * 3 + 1;
            this.size = this.baseSize;
            this.maxSize = this.baseSize * 2.5;
            this.minSize = this.baseSize * 0.3;
            this.baseOpacity = Math.random() * 0.8 + 0.2;
            this.opacity = this.baseOpacity;
            this.color = this.getRandomColor();
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.brightnessPhase = Math.random() * Math.PI * 2;
            this.brightnessSpeed = Math.random() * 0.015 + 0.005;
            this.sizePhase = Math.random() * Math.PI * 2;
            this.sizeSpeed = Math.random() * 0.01 + 0.005;
            this.energy = Math.random() * 0.5 + 0.5; // Energia da partícula
        }

        getRandomColor() {
            const colors = [
                'rgba(255, 255, 255, ',
                'rgba(100, 200, 255, ',
                'rgba(255, 150, 255, ',
                'rgba(150, 255, 150, ',
                'rgba(255, 200, 100, ',
                'rgba(200, 150, 255, '
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx * this.energy;
            this.y += this.vy * this.energy;

            // Bounce off edges with energy loss
            if (this.x < 0 || this.x > canvas.width) {
                this.vx *= -0.8;
                this.energy *= 0.95;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy *= -0.8;
                this.energy *= 0.95;
            }

            // Keep within bounds
            this.x = Math.max(0, Math.min(canvas.width, this.x));
            this.y = Math.max(0, Math.min(canvas.height, this.y));

            // Dynamic size variation
            this.sizePhase += this.sizeSpeed;
            const sizeVariation = Math.sin(this.sizePhase) * 0.5 + 0.5; // 0 to 1
            this.size = this.minSize + (this.maxSize - this.minSize) * sizeVariation * this.energy;

            // Dynamic brightness variation
            this.brightnessPhase += this.brightnessSpeed;
            const brightnessVariation = Math.sin(this.brightnessPhase) * 0.3 + 0.7; // 0.4 to 1
            this.opacity = this.baseOpacity * brightnessVariation * this.energy;

            // Pulse effect
            this.pulsePhase += this.pulseSpeed;
            this.currentSize = this.size + Math.sin(this.pulsePhase) * (this.size * 0.2);

            // Regenerate energy slowly
            this.energy = Math.min(1, this.energy + 0.001);
        }

        draw() {
            const pulseOpacity = this.opacity + Math.sin(this.pulsePhase) * 0.1;
            
            // Main particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.max(0, Math.min(1, pulseOpacity)) + ')';
            ctx.fill();

            // Inner bright core
            if (this.energy > 0.7) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentSize * 0.4, 0, Math.PI * 2);
                ctx.fillStyle = this.color + Math.max(0, Math.min(1, pulseOpacity * 1.5)) + ')';
                ctx.fill();
            }

            // Outer glow effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.currentSize * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.max(0, Math.min(1, pulseOpacity * 0.2)) + ')';
            ctx.fill();

            // Extra glow for high energy particles
            if (this.energy > 0.8) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.currentSize * 4, 0, Math.PI * 2);
                ctx.fillStyle = this.color + Math.max(0, Math.min(1, pulseOpacity * 0.1)) + ')';
                ctx.fill();
            }
        }
    }

    // Criar partículas
    function createParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();

    // Desenhar conexões entre partículas
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Efeito de mouse
    function drawMouseConnections() {
        particles.forEach(particle => {
            const dx = mousePos.x - particle.x;
            const dy = mousePos.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (150 - distance) / 150 * 0.5;
                const energyBoost = (150 - distance) / 150 * 0.3;
                
                // Conexão visual
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mousePos.x, mousePos.y);
                ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                ctx.lineWidth = 1 + energyBoost;
                ctx.stroke();

                // Atrair partícula para o mouse
                const force = 0.02;
                particle.vx += dx * force / distance;
                particle.vy += dy * force / distance;
                
                // Aumentar energia da partícula próxima ao mouse
                particle.energy = Math.min(1, particle.energy + energyBoost * 0.1);
                
                // Efeito de brilho extra próximo ao mouse
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.currentSize * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(100, 200, 255, ${opacity * 0.3})`;
                    ctx.fill();
                }
            }
        });
    }

    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        drawConnections();
        drawMouseConnections();

        requestAnimationFrame(animate);
    }

    // Rastrear mouse
    document.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    });

    // Redimensionar ao mudar tamanho da janela
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });

    animate();
}

// Efeitos de hover dinâmicos
function initDynamicHoverEffects() {
    // Adicionar efeito de brilho dinâmico aos elementos interativos
    const interactiveElements = document.querySelectorAll('button, a, .card, .btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            // Criar efeito de ondas ao redor do elemento
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.1)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-hover 0.6s linear';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '1000';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Adicionar CSS para efeitos de hover
const hoverStyles = document.createElement('style');
hoverStyles.textContent = `
    @keyframes ripple-hover {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .particle-glow {
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        transition: box-shadow 0.3s ease;
    }
    
    .particle-glow:hover {
        box-shadow: 0 0 30px rgba(100, 200, 255, 0.3);
    }
`;
document.head.appendChild(hoverStyles);

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

// 4. Lightbox para imagens com navegação e gestos mobile
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxImageContainer = document.getElementById('lightbox-image-container');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    // Verificar se todos os elementos existem
    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext || !lightboxCurrent || !lightboxTotal) {
        console.error('Lightbox: Elementos necessários não encontrados');
        return;
    }
    
    let currentIndex = 0;
    const totalImages = galleryItems.length;
    
    // Variáveis para gestos de swipe
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let isDragging = false;
    let startTime = 0;
    
    // Atualizar total de imagens
    if (totalImages > 0) {
        lightboxTotal.textContent = totalImages;
        console.log(`Lightbox inicializado com ${totalImages} imagens`);
    } else {
        console.warn('Nenhuma imagem encontrada para o lightbox');
        return;
    }
    
    // Função para criar botão X dinamicamente
    function createCloseButton() {
        // Remover botão existente se houver
        const existingBtn = document.getElementById('dynamic-close-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // Obter o container da imagem
        const imageContainer = document.getElementById('lightbox-image-container');
        if (!imageContainer) {
            console.error('Container da imagem não encontrado');
            return;
        }
        
        // Criar novo botão X
        const closeBtn = document.createElement('button');
        closeBtn.id = 'dynamic-close-btn';
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute !important;
            top: 10px !important;
            right: 10px !important;
            z-index: 99999 !important;
            width: 35px !important;
            height: 35px !important;
            background: rgba(0, 0, 0, 0.8) !important;
            border: 2px solid rgba(255, 255, 255, 0.9) !important;
            border-radius: 50% !important;
            color: white !important;
            font-size: 16px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            backdrop-filter: blur(15px) !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5) !important;
        `;
        
        // Adicionar eventos
        closeBtn.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 0, 0, 0.8)';
            this.style.transform = 'scale(1.1)';
            this.style.borderColor = 'rgba(255, 255, 255, 1)';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(0, 0, 0, 0.8)';
            this.style.transform = 'scale(1)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.9)';
        });
        
        // Inserir no container da imagem (posição relativa à foto)
        imageContainer.appendChild(closeBtn);
        console.log('Botão X dinâmico criado e inserido no container da imagem');
        
        return closeBtn;
    }

    // Função para abrir lightbox com animação suave
    function openLightbox(index) {
        currentIndex = index;
        const img = galleryItems[index].querySelector('img');
        
        if (!img) {
            console.error(`Imagem não encontrada no índice ${index}`);
            return;
        }
        
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || `Imagem ${index + 1}`;
        lightboxCurrent.textContent = index + 1;
        
        lightbox.classList.remove('hidden');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Criar botão X dinâmico
        createCloseButton();
        
        // Garantir que TODOS os botões estejam sempre visíveis
        if (lightboxPrev) {
            lightboxPrev.style.display = 'flex';
            lightboxPrev.style.visibility = 'visible';
            lightboxPrev.style.opacity = '0.9';
        }
        
        if (lightboxNext) {
            lightboxNext.style.display = 'flex';
            lightboxNext.style.visibility = 'visible';
            lightboxNext.style.opacity = '0.9';
        }
        
        if (lightboxClose) {
            // FORÇAR VISIBILIDADE TOTAL DO BOTÃO X
            lightboxClose.style.display = 'flex';
            lightboxClose.style.visibility = 'visible';
            lightboxClose.style.opacity = '1';
            lightboxClose.style.position = 'fixed';
            lightboxClose.style.top = '1rem';
            lightboxClose.style.right = '1rem';
            lightboxClose.style.zIndex = '9999';
            lightboxClose.style.width = '3rem';
            lightboxClose.style.height = '3rem';
            lightboxClose.style.background = 'rgba(255, 255, 255, 0.1)';
            lightboxClose.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            lightboxClose.style.borderRadius = '50%';
            lightboxClose.style.color = 'white';
            console.log('Botão X configurado com força total');
        }
        
        // Apenas ocultar setas se houver apenas 1 imagem
        if (totalImages <= 1) {
            if (lightboxPrev) lightboxPrev.style.display = 'none';
            if (lightboxNext) lightboxNext.style.display = 'none';
        }
        
        console.log(`Botões configurados - Prev: ${lightboxPrev ? 'OK' : 'ERRO'}, Next: ${lightboxNext ? 'OK' : 'ERRO'}, Close: ${lightboxClose ? 'OK' : 'ERRO'}`);
        
        // Animação de entrada suave
        setTimeout(() => {
            lightbox.style.opacity = '1';
            lightboxImage.style.transform = 'scale(1)';
        }, 10);
        
        // Preload próxima e anterior
        preloadImage(index - 1);
        preloadImage(index + 1);
        
        console.log(`Lightbox aberto - Imagem ${index + 1} de ${totalImages}`);
    }
    
    // Função para fechar lightbox com animação
    function closeLightbox() {
        console.log('Fechando lightbox');
        
        // Remover botão X dinâmico
        const dynamicBtn = document.getElementById('dynamic-close-btn');
        if (dynamicBtn) {
            dynamicBtn.remove();
            console.log('Botão X dinâmico removido');
        }
        
        lightbox.style.opacity = '0';
        lightboxImage.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            lightbox.classList.add('hidden');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Reset da imagem
            lightboxImage.src = '';
            lightboxImage.alt = '';
            lightboxImage.style.transform = '';
            lightboxImage.style.opacity = '';
        }, 200);
    }
    
    // Função para navegar com animação
    function navigateLightbox(direction) {
        // Animação de saída
        lightboxImage.style.transform = `translateX(${direction > 0 ? '-20px' : '20px'}) scale(0.95)`;
        lightboxImage.style.opacity = '0.7';
        
        setTimeout(() => {
            currentIndex += direction;
            
            // Loop circular
            if (currentIndex < 0) {
                currentIndex = totalImages - 1;
            } else if (currentIndex >= totalImages) {
                currentIndex = 0;
            }
            
            // Atualizar imagem
            const img = galleryItems[currentIndex].querySelector('img');
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightboxCurrent.textContent = currentIndex + 1;
            
            // Animação de entrada
            lightboxImage.style.transform = `translateX(${direction > 0 ? '20px' : '-20px'}) scale(0.95)`;
            
            setTimeout(() => {
                lightboxImage.style.transform = 'translateX(0) scale(1)';
                lightboxImage.style.opacity = '1';
            }, 50);
            
            // Preload próxima e anterior
            preloadImage(currentIndex - 1);
            preloadImage(currentIndex + 1);
        }, 150);
    }
    
    // Função para preload de imagens
    function preloadImage(index) {
        if (index >= 0 && index < totalImages) {
            const img = new Image();
            img.src = galleryItems[index].querySelector('img').src;
        }
    }
    
    // Funções para gestos de swipe
    function handleTouchStart(e) {
        if (lightbox.classList.contains('hidden')) return;
        
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        currentX = startX;
        currentY = startY;
        isDragging = true;
        startTime = Date.now();
        
        lightboxImage.style.transition = 'none';
    }
    
    function handleTouchMove(e) {
        if (!isDragging || lightbox.classList.contains('hidden')) return;
        
        e.preventDefault();
        const touch = e.touches[0];
        currentX = touch.clientX;
        currentY = touch.clientY;
        
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // Só permitir swipe horizontal se o movimento for mais horizontal que vertical
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            const opacity = Math.max(0.5, 1 - Math.abs(deltaX) / 300);
            const scale = Math.max(0.9, 1 - Math.abs(deltaX) / 1000);
            
            lightboxImage.style.transform = `translateX(${deltaX}px) scale(${scale})`;
            lightboxImage.style.opacity = opacity;
        }
    }
    
    function handleTouchEnd(e) {
        if (!isDragging || lightbox.classList.contains('hidden')) return;
        
        isDragging = false;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        const deltaTime = Date.now() - startTime;
        const velocity = Math.abs(deltaX) / deltaTime;
        
        lightboxImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Determinar se deve navegar baseado na distância e velocidade
        const shouldNavigate = Math.abs(deltaX) > 100 || velocity > 0.5;
        
        if (shouldNavigate && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                navigateLightbox(-1); // Swipe direita = imagem anterior
            } else {
                navigateLightbox(1);  // Swipe esquerda = próxima imagem
            }
        } else {
            // Voltar à posição original
            lightboxImage.style.transform = 'translateX(0) scale(1)';
            lightboxImage.style.opacity = '1';
        }
    }
    
    // Event listeners para abrir lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Clique na imagem ${index + 1}`);
            openLightbox(index);
        });
        
        // Adicionar cursor pointer para indicar que é clicável
        item.style.cursor = 'pointer';
    });
    
    // Event listeners para fechar
    if (lightboxClose) {
        lightboxClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clique no botão fechar');
            closeLightbox();
        });
    }
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxImageContainer) {
            console.log('Clique no fundo do lightbox');
            closeLightbox();
        }
    });
    
    // Event listeners para navegação por botões
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clique na seta anterior');
            navigateLightbox(-1);
        });
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Clique na seta próxima');
            navigateLightbox(1);
        });
    }
    
    // Event listeners para gestos de toque
    lightboxImageContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    lightboxImageContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    lightboxImageContainer.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            console.log(`Tecla pressionada: ${e.key}`);
            
            if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                navigateLightbox(1);
            } else if (e.key === 'Enter' || e.key === ' ') {
                // Se o foco estiver no botão fechar, fechar o lightbox
                if (document.activeElement === lightboxClose) {
                    e.preventDefault();
                    closeLightbox();
                }
            }
        }
    });
    
    // Garantir que o lightbox seja inicializado corretamente
    console.log('Lightbox inicializado com sucesso!');
    
    // Adicionar um listener global para debug
    window.debugLightbox = function() {
        console.log('=== DEBUG LIGHTBOX ===');
        console.log('Total de imagens:', totalImages);
        console.log('Índice atual:', currentIndex);
        console.log('Lightbox visível:', !lightbox.classList.contains('hidden'));
        console.log('Elementos encontrados:', {
            lightbox: !!lightbox,
            lightboxImage: !!lightboxImage,
            lightboxClose: !!lightboxClose,
            lightboxPrev: !!lightboxPrev,
            lightboxNext: !!lightboxNext
        });
    };
    
    // Inicializar estilos CSS para animações
    lightbox.style.transition = 'opacity 0.2s ease-out';
    lightboxImage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
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
        particle.className = 'absolute w-1 h-1 bg-blue-500/20 rounded-full animate-pulse-glow';
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

// Função para enviar formulário via WhatsApp
function sendToWhatsApp(formData) {
    const phoneNumber = '5583999578957';
    
    // Formatação da mensagem
    let message = `🎵 *SOLICITAÇÃO DE ORÇAMENTO - BANDA BEM +* 🎵\n\n`;
    message += `👤 *Nome:* ${formData.nome}\n`;
    message += `📱 *WhatsApp:* ${formData.whatsapp}\n`;
    
    if (formData.email) {
        message += `📧 *Email:* ${formData.email}\n`;
    }
    
    message += `🎉 *Tipo de Evento:* ${formData.tipoEvento}\n`;
    
    if (formData.data) {
        const dataFormatada = new Date(formData.data).toLocaleDateString('pt-BR');
        message += `📅 *Data do Evento:* ${dataFormatada}\n`;
    }
    
    message += `📍 *Local:* ${formData.cidadeLocal}\n`;
    
    if (formData.mensagem) {
        message += `💬 *Mensagem:*\n${formData.mensagem}\n`;
    }
    
    message += `\n✨ _Enviado através do site da Banda Bem +_`;
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');
    
    return true;
}

// Função para validar formulário
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.nome || formData.nome.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.whatsapp || formData.whatsapp.trim().length < 10) {
        errors.push('WhatsApp deve ter pelo menos 10 dígitos');
    }
    
    if (formData.email && formData.email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.push('Email deve ter um formato válido');
        }
    }
    
    if (!formData.tipoEvento) {
        errors.push('Selecione o tipo de evento');
    }
    
    if (!formData.cidadeLocal || formData.cidadeLocal.trim().length < 3) {
        errors.push('Cidade/Local deve ter pelo menos 3 caracteres');
    }
    
    return errors;
}

// Função para mostrar mensagens de feedback
function showFeedback(type, message = null) {
    const successDiv = document.getElementById('form-success');
    const errorDiv = document.getElementById('form-error');
    
    if (type === 'hide') {
        // Esconde ambas as mensagens
        if (successDiv) successDiv.classList.add('hidden');
        if (errorDiv) errorDiv.classList.add('hidden');
        return;
    }
    
    // Esconde ambas as mensagens primeiro
    if (successDiv) successDiv.classList.add('hidden');
    if (errorDiv) errorDiv.classList.add('hidden');
    
    if (type === 'success' && successDiv) {
        successDiv.classList.remove('hidden');
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (type === 'error' && errorDiv) {
        if (message) {
            const errorText = errorDiv.querySelector('p:last-child');
            if (errorText) {
                errorText.textContent = message;
            }
        }
        errorDiv.classList.remove('hidden');
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Função para resetar o botão de envio
function resetSubmitButton() {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingText = document.getElementById('loading-text');
    
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    loadingText.classList.add('hidden');
}

// Função para mostrar loading no botão
function showLoadingButton() {
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const loadingText = document.getElementById('loading-text');
    
    submitBtn.disabled = true;
    submitText.classList.add('hidden');
    loadingText.classList.remove('hidden');
}

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

// Função para melhorar o comportamento do campo de data
function initDateFieldEnhancements() {
    const dateField = document.getElementById('data');
    
    if (dateField) {
        // Fazer o calendário aparecer ao clicar em qualquer parte do campo
        dateField.addEventListener('click', function(e) {
            // Se não clicou no ícone do calendário, simula um clique no ícone
            if (e.target === this) {
                this.showPicker();
            }
        });
        
        // Melhorar a experiência com foco
        dateField.addEventListener('focus', function() {
            // Pequeno delay para garantir que o picker apareça
            setTimeout(() => {
                this.showPicker();
            }, 100);
        });
        
        // Adicionar suporte para Enter
        dateField.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.showPicker();
            }
        });
    }
}

// Função para atualizar o ano automaticamente no footer
function updateCurrentYear() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
}