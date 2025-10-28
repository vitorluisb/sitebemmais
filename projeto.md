ATUE COMO: Desenvolvedor front-end sênior especialista em UI/UX moderno

OBJETIVO: Gerar um projeto completo de landing page one-page para "Banda Bem +", moderno, performático e interativo, usando HTML semântico, Tailwind CSS e JavaScript vanilla. Pronto para deploy na Vercel. Código limpo, arquitetura organizada e excelente UI/UX nível sênior.

---

REFERÊNCIA VISUAL (DESIGN APENAS)
Use a imagem anexada SOMENTE como inspiração de DESIGN e ESTÉTICA:
- Paleta de cores: fundo dark (roxo escuro/preto #0a0a0f, #1a0a2e), gradientes vibrantes (rosa #f093fb, roxo #667eea, #764ba2, laranja/coral #ff6b6b)
- Estética: moderna, imersiva, com elementos flutuantes (fotos circulares da banda, cards com glassmorphism)
- Tipografia: títulos grandes e bold em branco (#ffffff), subtítulos em cinza claro (#b0b0c0)
- Hero: imagem/vídeo de fundo com overlay escuro gradient, elementos flutuantes (fotos da banda, mini-cards decorativos), texto grande e impactante
- Cards: glassmorphism (backdrop-blur-md, bg-white/10, border border-white/20, sombras suaves)
- Animações: parallax leve, fade-in ao scroll, hover effects suaves (scale, glow)
- Layout: espaçoso, respirável, hierarquia visual clara

IMPORTANTE: Manter TODO o conteúdo, copy, seções e estrutura específicos da Banda Bem + conforme descrito abaixo. A imagem é APENAS referência de estilo visual.

---

INFORMAÇÕES DA MARCA E COPY (USAR EXATAMENTE)

Marca: Banda Bem +
- Slogan principal: "A banda que transforma qualquer evento em um show!"
- Sub-slogan: "O som perfeito para o seu grande momento! 💍"
- Destaque: "Banda baile com repertório inesquecível e muita animação!"
- Estilos musicais (frase de impacto): "MPB | SAMBA | POP | XOTE | FORRÓ (antigas e atuais) | SERTANEJO e muito mais"
- Direção musical: "Produção e direção musical: Rogério Wilker"
- Contato WhatsApp: "(83) 9 9957-8957"
- Link WhatsApp com mensagem: https://wa.me/5583999578957?text=Olá,%20quero%20contratar%20a%20Banda%20Bem%20+%20para%20meu%20evento
- Instagram: @bandabemmais — https://www.instagram.com/bandabemmais/
- CTA principal: "Contrate já para a sua festa"
- Objetivo: conversão de leads para contratação de shows/eventos (casamentos, corporativos, festas)

---

ESTRUTURA DO SITE (ONE-PAGE COM ÂNCORAS - SEM SEÇÃO DE REPERTÓRIO)

1. HEADER (fixo, com blur ao scroll)
   - Logo tipográfica "Banda Bem +" (esquerda, branco)
   - Menu horizontal: Home | Sobre | Agenda | Mídia | Contato
   - Botão CTA destacado: "Contratar agora" (verde #25d366 ou #10b981, link WhatsApp)
   - Responsivo: menu hambúrguer no mobile com animação suave

2. HERO (design inspirado na imagem de referência)
   - Fundo: imagem/vídeo escuro da banda ao vivo com overlay gradient (roxo/rosa/azul transparente)
   - Elementos flutuantes decorativos: 3-4 fotos circulares da banda em posições diferentes com parallax leve
   - Card flutuante estilo glassmorphism (decorativo, pode ter ícone musical ou nome da banda)
   - Texto centralizado ou à esquerda (hierarquia clara):
     - Tag pequena: "PARA TODOS" ou "EVENTOS" (outline, uppercase)
     - Título grande (text-5xl md:text-7xl, bold): "Banda Bem +"
     - Subtítulo (text-2xl md:text-4xl): "A banda que transforma qualquer evento em um show!"
     - Linha secundária (text-xl): "O som perfeito para o seu grande momento! 💍"
     - Destaque (text-lg, cinza claro): "Banda baile com repertório inesquecível e muita animação!"
     - Estilos musicais (text-base, uppercase, espaçado): "MPB | SAMBA | POP | XOTE | FORRÓ | SERTANEJO e muito mais"
   - 2 CTAs grandes:
     - "Contratar agora" (botão sólido verde, ícone WhatsApp)
     - "Ver agenda" (botão outline branco, scroll suave para #agenda)

3. DESTAQUES/PROVAS (seção com 3 cards glassmorphism horizontais)
   - Cards com ícones + texto curto:
     - Ícone microfone/estrela: "Alto impacto ao vivo"
     - Ícone pessoas/coração: "Interação com o público"
     - Ícone música/nota: "Direção musical: Rogério Wilker"
   - Cards com backdrop-blur, bordas sutis, hover effect (scale-105, glow)
   - Layout: grid 3 colunas desktop, 1 coluna mobile

4. SOBRE
   - Título (text-4xl, bold): "Sobre a Banda Bem +"
   - Pitch curto (2 parágrafos, text-lg, cinza claro):
     "A Banda Bem + entrega energia, carisma e um show que não deixa ninguém parado. De casamentos a eventos corporativos, transformamos sua celebração em um espetáculo inesquecível."
   - Destaque visual: "Produção e direção musical: Rogério Wilker" (badge ou texto destacado)
   - Diferenciais em 3 mini-cards ou bullets com ícones:
     - "Setlist versátil para todos os momentos da festa"
     - "Interação com o público e presença de palco"
     - "Experiência em eventos de diversos portes"
   - Foto da banda (placeholder, com efeito parallax ou zoom ao scroll)
   - Layout: texto à esquerda, imagem à direita (ou vice-versa)

5. AGENDA
   - Título (text-4xl, bold): "Próximos Shows"
   - Cards de eventos (glassmorphism, grid 2-3 colunas):
     - Ícone de localização
     - Cidade • Local
     - Data • Horário
     - Botão pequeno "Ver no mapa" ou ícone
   - Se não houver eventos, exibir card único:
     "Em breve novos shows. Contrate já para sua data!"
   - Botão CTA grande: "Quero contratar para minha data" (verde, WhatsApp)
   - Observação pequena (text-sm, cinza): "Datas sob consulta — fale com a produção"

6. MÍDIA
   - Título (text-4xl, bold): "Galeria"
   - Grid responsivo de fotos (3 colunas desktop, 2 tablet, 1 mobile)
   - Fotos com hover effect (scale, overlay com ícone de zoom)
   - Lightbox ao clicar (JS puro):
     - Overlay escuro (bg-black/90)
     - Imagem centralizada
     - Botões prev/next (setas)
     - Botão fechar (X no canto)
     - Fechar com ESC ou click fora
   - Seção de vídeos (1-2 iframes YouTube/Instagram, aspect-ratio 16:9)
   - Link destacado com ícone Instagram: "Veja mais no @bandabemmais"

7. CONTATO
   - Título grande (text-4xl, bold): "Contrate já para a sua festa"
   - Destaque visual grande (text-3xl, verde ou rosa): "+ Informações: (83) 9 9957-8957"
   - Botão WhatsApp grande (verde, ícone, sombra, hover glow)
   - Link Instagram com ícone: "@bandabemmais"
   - Formulário em card glassmorphism (max-w-2xl, centralizado):
     - Campos (todos com labels visíveis, placeholders sutis):
       - Nome (text input)
       - Telefone/WhatsApp (tel input)
       - Email (email input)
       - Tipo de evento (select: Casamento, Corporativo, Aniversário, Bar/Clube, Outro)
       - Cidade/Local (text input)
       - Data (date input)
       - Mensagem (textarea, 4 linhas)
     - Honeypot (campo oculto "website" para anti-spam)
     - Botão "Enviar" com 3 estados:
       - Normal: "Enviar mensagem"
       - Loading: spinner + "Enviando..."
       - Success: checkmark + "Mensagem enviada! Responderemos em breve."
       - Error: "Erro ao enviar. Tente pelo WhatsApp."
     - Validação HTML5 + JS (required, pattern para telefone/email)
     - Função sendForm() preparada (try/catch, preventDefault, fetch para endpoint futuro)
   - Observação pequena (text-sm): "Respondemos rapidamente!"

8. FOOTER
   - Fundo escuro (bg-black ou bg-purple-950)
   - Layout centralizado:
     - Logo/nome: "Banda Bem +"
     - Linha: "Produção e direção musical: Rogério Wilker"
     - Contato: "WhatsApp: (83) 9 9957-8957"
     - Link Instagram com ícone: "@bandabemmais"
     - Copyright: "© 2025 Banda Bem +. Todos os direitos reservados."
   - Links do menu (opcional, pequenos)

---

FUNCIONALIDADES E INTERAÇÕES (JS VANILLA)

- Smooth scroll ao clicar em links do menu (behavior: 'smooth')
- Highlight da seção ativa no menu ao rolar (Intersection Observer, adicionar classe 'active')
- Header com backdrop-blur e sombra ao scroll (addEventListener 'scroll', toggle classe)
- Animações ao scroll (fade-in, slide-up) usando Intersection Observer
- Parallax leve nos elementos flutuantes do Hero (transform translateY baseado em scrollY)
- Lightbox de imagens (JS puro):
  - Criar overlay ao clicar em imagem
  - Navegação prev/next
  - Fechar com ESC, click no overlay ou botão X
  - Prevenir scroll do body quando aberto
- Validação de formulário:
  - Verificar campos obrigatórios
  - Validar formato de email e telefone
  - Feedback visual (bordas vermelhas em erro, verdes em sucesso)
- Estados do botão de envio (disabled durante loading)
- Barra flutuante no mobile (fixed bottom, z-50):
  - 2 botões: WhatsApp (verde) e Agenda (roxo/rosa)
  - Apenas visível em telas < 768px

---

UI/UX E IDENTIDADE VISUAL (baseado na imagem de referência)

Paleta de cores:
- Background principal: #0a0a0f (preto azulado)
- Background secundário: #1a0a2e (roxo muito escuro)
- Gradientes hero/seções: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)
- Texto primário: #ffffff
- Texto secundário: #b0b0c0
- CTA WhatsApp: #25d366 (verde WhatsApp)
- CTA secundário: #f093fb (rosa) ou outline branco
- Accent: #ff6b6b (coral), #4ecdc4 (azul claro)
- Bordas glassmorphism: rgba(255, 255, 255, 0.2)

Tipografia (Google Fonts):
- Fonte: 'Inter' ou 'Poppins'
- Títulos: font-weight 700-900, text-4xl a text-7xl
- Corpo: font-weight 400-500, text-base a text-lg
- Espaçamento de letras em tags/labels: tracking-wider

Efeitos glassmorphism:
```css
backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
```

Hover effects:
- Botões: scale-105, brightness-110, box-shadow glow (0 0 20px cor do botão)
- Cards: scale-105, border-color mais clara
- Imagens: scale-110, overlay com ícone

Transições:
- transition-all duration-300 ease-in-out

Espaçamento:
- Seções: py-20 md:py-32
- Containers: max-w-7xl mx-auto px-6 md:px-12

Acessibilidade:
- Alt descritivo em todas as imagens
- Labels visíveis ou sr-only em inputs
- Foco visível: ring-2 ring-offset-2 ring-pink-500
- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- aria-label em botões de ícone
- role="dialog" no lightbox

---

PERFORMANCE E SEO

HTML semântico:
- <header>, <nav>, <main>, <section id="...">, <footer>
- Headings hierárquicos (h1 único, h2 para títulos de seção, h3 para subtítulos)

Meta tags (no <head>):
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Banda Bem + | A banda que transforma qualquer evento em um show</title>
<meta name="description" content="Contrate a Banda Bem + para casamentos, eventos corporativos e festas. Repertório inesquecível: MPB, Samba, Pop, Xote, Forró, Sertanejo. Direção: Rogério Wilker.">
<meta property="og:title" content="Banda Bem + | A banda que transforma qualquer evento em um show">
<meta property="og:description" content="O som perfeito para o seu grande momento! Banda baile com repertório inesquecível.">
<meta property="og:image" content="URL_DA_IMAGEM_OG">
<meta property="og:url" content="URL_DO_SITE">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="assets/img/favicon.png">
```

Otimizações:
- Imagens: WebP, loading="lazy", width/height definidos
- Tailwind via Play CDN (desenvolvimento) ou build JIT (produção)
- JS: defer ou async, código minificado mentalmente
- Fontes: preconnect para Google Fonts
- Lighthouse score alvo: ≥ 90 em todas as métricas

---

ARQUITETURA E CLEAN CODE

Estrutura de arquivos:
```
/
├── index.html
├── assets/
│   ├── css/
│   │   └── custom.css (keyframes, ajustes mínimos)
│   ├── js/
│   │   └── main.js (código modular, comentado)
│   └── img/
│       ├── hero-bg.jpg (placeholder 1920x1080)
│       ├── band-photo-1.jpg ... band-photo-6.jpg (placeholders 800x800)
│       ├── about-band.jpg (placeholder 1200x800)
│       └── favicon.png
├── README.md (instruções de deploy)
└── vercel.json (opcional)
```

JavaScript (main.js) - estrutura:
```javascript
// IIFE para evitar poluir escopo global
(function() {
  'use strict';
  
  // Smooth scroll
  function initSmoothScroll() { ... }
  
  // Active section highlight
  function initActiveSection() { ... }
  
  // Header ao scroll
  function initHeaderScroll() { ... }
  
  // Animações ao scroll
  function initScrollAnimations() { ... }
  
  // Parallax
  function initParallax() { ... }
  
  // Lightbox
  function initLightbox() { ... }
  
  // Formulário
  function initForm() { ... }
  
  // Mobile floating bar
  function initMobileBar() { ... }
  
  // Init
  document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initActiveSection();
    initHeaderScroll();
    initScrollAnimations();
    initParallax();
    initLightbox();
    initForm();
    initMobileBar();
  });
})();
```

CSS (custom.css) - apenas para:
- @keyframes personalizados (float, glow, etc.)
- Ajustes de glassmorphism se necessário
- Overrides mínimos

---

INSTRUÇÕES DE DEPLOY NA VERCEL (incluir no README.md)

Método 1 - Via Dashboard (mais simples):
1. Acesse vercel.com/new
2. Arraste a pasta do projeto ou conecte repositório GitHub
3. Configure:
   - Framework Preset: Other
   - Build Command: (deixar vazio)
   - Output Directory: . (raiz)
4. Deploy

Método 2 - Via CLI:
1. Instalar: npm i -g vercel
2. Na pasta do projeto: vercel
3. Seguir prompts
4. Deploy automático

Configuração opcional (vercel.json):
```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

Se usar build de Tailwind (produção):
1. npm init -y
2. npm install -D tailwindcss
3. npx tailwindcss init
4. Configurar tailwind.config.js:
```javascript
module.exports = {
  content: ["./index.html"],
  theme: { extend: {} },
  plugins: [],
}
```
5. Criar assets/css/input.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
6. package.json script: "build": "tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify"
7. Build Command na Vercel: npm run build

---

ENTREGÁVEIS

1. **index.html** completo com:
   - Estrutura semântica
   - Todas as seções (Hero, Destaques, Sobre, Agenda, Mídia, Contato)
   - Meta tags completas
   - Links para Tailwind CDN, Google Fonts, main.js
   - Placeholders de imagens com comentários sobre conteúdo sugerido

2. **assets/css/custom.css** com:
   - Keyframes para animações customizadas
   - Ajustes mínimos de glassmorphism

3. **assets/js/main.js** com:
   - Todas as funcionalidades listadas
   - Código modular (funções separadas)
   - Comentários explicativos
   - Tratamento de erros (try/catch)

4. **README.md** com:
   - Descrição do projeto
   - Instruções de deploy na Vercel
   - Lista de placeholders de imagens necessários
   - Créditos

5. **Comentários no código**:
   - Seções principais do HTML
   - Funções do JS
   - Sugestões de conteúdo para placeholders

---

QUALIDADE E REVISÃO

Checklist final:
- [ ] Responsividade testada (320px a 1920px)
- [ ] Navegação por teclado funcional (Tab, Enter, Esc)
- [ ] Lightbox abre, navega e fecha corretamente
- [ ] Formulário valida e exibe estados
- [ ] Smooth scroll funciona em todos os links
- [ ] Header muda ao scroll
- [ ] Animações suaves ao scroll
- [ ] WhatsApp links funcionam (testados em mobile)
- [ ] Contraste de cores adequado (WebAIM)
- [ ] HTML válido (W3C Validator)
- [ ] Sem erros no console
- [ ] Código limpo e indentado
- [ ] Comentários úteis, não excessivos

---

AGORA GERE O PROJETO COMPLETO SEGUINDO TODAS AS DIRETRIZES ACIMA.

LEMBRE-SE:
- Design e estética visual da imagem de referência (cores, glassmorphism, layout moderno)
- Conteúdo, copy e estrutura 100% da Banda Bem + (sem inventar seções ou textos)
- Sem seção de Repertório
- Foco em conversão para contratação de shows
- Código em PT-BR onde aplicável (comentários, textos do site)
- Pronto para deploy na Vercel