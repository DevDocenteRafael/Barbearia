// Busca o botão que alterna entre os temas claro e escuro.
const themeButton = document.querySelector('.theme-toggle');
// Busca a meta tag usada para colorir a barra do navegador em dispositivos móveis.
const themeMeta = document.querySelector('meta[name="theme-color"]');
// Recupera do armazenamento local a última preferência de tema do visitante.
const savedTheme = localStorage.getItem('dev-barber-theme');

// Aplica o tema recebido e atualiza os textos e estados acessíveis do botão.
function applyTheme(theme) {
  // Verifica se o tema escolhido é o claro.
  const isLight = theme === 'light';
  // Define o tema na raiz do documento para ativar as regras CSS correspondentes.
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  // Informa leitores de tela se o modo claro está ativado.
  themeButton.setAttribute('aria-pressed', String(isLight));
  // Nomeia a ação que o botão executará quando for acionado.
  themeButton.setAttribute('aria-label', isLight ? 'Ativar modo escuro' : 'Ativar modo claro');
  // Atualiza o texto visível do botão de acordo com a próxima ação.
  themeButton.querySelector('span').textContent = isLight ? 'Modo escuro' : 'Modo claro';
  // Troca o ícone de sol pelo de lua, ou o contrário.
  themeButton.querySelector('i').className = isLight ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  // Atualiza a cor sugerida para a barra do navegador, se a meta tag existir.
  themeMeta?.setAttribute('content', isLight ? '#ffffff' : '#06121e');
  // Troca os logotipos para manter contraste nos dois temas.
  document.querySelectorAll('.header-logo img, .footer img').forEach((logo) => {
    logo.src = isLight ? 'assets/logo-black.svg' : 'assets/logo.svg';
  });
}

// Restaura o tema salvo; na primeira visita, começa no modo escuro.
applyTheme(savedTheme || 'dark');
// Escuta os cliques no botão de alternância de tema.
themeButton.addEventListener('click', () => {
  // Escolhe o tema oposto ao que está ativo no momento.
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  // Atualiza a aparência e o estado acessível da página.
  applyTheme(nextTheme);
  // Salva a escolha para as próximas visitas no mesmo navegador.
  localStorage.setItem('dev-barber-theme', nextTheme);
});

// Busca o botão flutuante e o painel com as opções de acessibilidade.
const accessibilityWidget = document.querySelector('.accessibility-widget');
const accessibilityTrigger = document.querySelector('.accessibility-trigger');
const accessibilityPanel = document.querySelector('#accessibility-panel');
// Guarda o estado do arraste para diferenciar um movimento de um clique.
let dragState = null;
let wasDragged = false;

// Restaura a posição salva ou coloca o atalho ao lado de Agendar horário.
const savedWidgetPosition = JSON.parse(localStorage.getItem('dev-barber-accessibility-position-v2') || 'null');
const scheduleButton = document.querySelector('.header-button');
if (savedWidgetPosition) {
  // Reaplica a posição definida anteriormente pela pessoa visitante.
  accessibilityWidget.style.left = `${savedWidgetPosition.left}px`;
  accessibilityWidget.style.top = `${savedWidgetPosition.top}px`;
} else if (scheduleButton && scheduleButton.getBoundingClientRect().width > 0) {
  // Lê a posição do botão de agendamento quando ele está visível.
  const scheduleBounds = scheduleButton.getBoundingClientRect();
  // Coloca o botÃ£o redondo Ã  direita do agendamento, com espaÃ§amento semelhante ao da referÃªncia.
  const initialLeft = Math.min(scheduleBounds.right + 28, window.innerWidth - accessibilityWidget.offsetWidth - 8);
  const initialTop = Math.max(8, Math.min(scheduleBounds.top + (scheduleBounds.height - accessibilityWidget.offsetHeight) / 2, window.innerHeight - accessibilityWidget.offsetHeight - 8));
  accessibilityWidget.style.left = `${initialLeft}px`;
  accessibilityWidget.style.top = `${initialTop}px`;
} else {
  // Em telas sem o botão de agendamento, posiciona o atalho próximo ao centro.
  accessibilityWidget.style.left = `${Math.max(8, window.innerWidth / 2 - accessibilityWidget.offsetWidth / 2)}px`;
  accessibilityWidget.style.top = `${Math.max(8, window.innerHeight / 2 - accessibilityWidget.offsetHeight / 2)}px`;
}

// Posiciona o painel para que ele abra dentro da janela do navegador.
function placeAccessibilityPanel() {
  const bounds = accessibilityWidget.getBoundingClientRect();
  const openToLeft = bounds.left + bounds.width / 2 > window.innerWidth / 2;
  accessibilityPanel.style.left = openToLeft ? 'auto' : '0';
  accessibilityPanel.style.right = openToLeft ? '0' : 'auto';
  accessibilityPanel.style.bottom = bounds.top < 280 ? 'auto' : 'calc(100% + 12px)';
  accessibilityPanel.style.top = bounds.top < 280 ? 'calc(100% + 12px)' : 'auto';
}

// Ajusta a posição do painel ao carregar a posição salva.
placeAccessibilityPanel();
// Abre ou fecha o painel quando o botão redondo é clicado.
accessibilityTrigger.addEventListener('click', () => {
  // Ignora o clique sintético que o navegador gera ao terminar um arraste.
  if (wasDragged) {
    wasDragged = false;
    return;
  }
  // Inverte a visibilidade do painel de configurações.
  const isOpening = accessibilityPanel.hidden;
  accessibilityPanel.hidden = !isOpening;
  // Informa leitores de tela se o painel está aberto.
  accessibilityTrigger.setAttribute('aria-expanded', String(isOpening));
  // Atualiza o nome acessível do botão conforme sua ação.
  accessibilityTrigger.setAttribute('aria-label', isOpening ? 'Fechar opções de acessibilidade' : 'Abrir opções de acessibilidade');
});

// Inicia o movimento do atalho ao pressionar o botão redondo.
accessibilityTrigger.addEventListener('pointerdown', (event) => {
  // Usa somente o botão principal do mouse; toque e caneta também são aceitos.
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  // Mede a posição inicial para manter o cursor no mesmo ponto do botão.
  const bounds = accessibilityWidget.getBoundingClientRect();
  dragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    left: bounds.left,
    top: bounds.top,
    moved: false,
  };
  // Mantém os eventos do ponteiro associados ao botão durante o arraste.
  accessibilityTrigger.setPointerCapture(event.pointerId);
});

// Atualiza a posição do botão enquanto ele estiver sendo arrastado.
accessibilityTrigger.addEventListener('pointermove', (event) => {
  // Ignora movimentos que não pertencem ao arraste iniciado no botão.
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  // Calcula a nova posição usando a distância percorrida pelo ponteiro.
  const nextLeft = dragState.left + event.clientX - dragState.startX;
  const nextTop = dragState.top + event.clientY - dragState.startY;
  // Limita o botão aos limites visíveis da janela.
  const maxLeft = window.innerWidth - accessibilityWidget.offsetWidth;
  const maxTop = window.innerHeight - accessibilityWidget.offsetHeight;
  const left = Math.max(0, Math.min(nextLeft, maxLeft));
  const top = Math.max(0, Math.min(nextTop, maxTop));
  // Só considera arraste quando o botão saiu alguns pixels do lugar inicial.
  if (Math.abs(event.clientX - dragState.startX) + Math.abs(event.clientY - dragState.startY) > 6) {
    dragState.moved = true;
  }
  // Aplica as coordenadas calculadas ao botão flutuante.
  accessibilityWidget.style.left = `${left}px`;
  accessibilityWidget.style.top = `${top}px`;
  // Reposiciona o painel para mantê-lo dentro da tela.
  placeAccessibilityPanel();
  // Salva a posição para mantê-la após recarregar a página.
  localStorage.setItem('dev-barber-accessibility-position-v2', JSON.stringify({ left, top }));
});

// Finaliza o arraste quando o ponteiro é solto.
accessibilityTrigger.addEventListener('pointerup', (event) => {
  // Confirma que o ponteiro solto iniciou o arraste atual.
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  // Registra se houve movimento para evitar abrir o painel após arrastar.
  wasDragged = dragState.moved;
  // Limpa o estado de arraste agora que o botão foi solto.
  dragState = null;
});

// Permite mover o botão com as setas do teclado quando ele recebe foco.
accessibilityTrigger.addEventListener('keydown', (event) => {
  const movement = event.shiftKey ? 30 : 10;
  const directions = { ArrowLeft: [-movement, 0], ArrowRight: [movement, 0], ArrowUp: [0, -movement], ArrowDown: [0, movement] };
  const direction = directions[event.key];
  if (!direction) return;
  event.preventDefault();
  const bounds = accessibilityWidget.getBoundingClientRect();
  const left = Math.max(0, Math.min(bounds.left + direction[0], window.innerWidth - bounds.width));
  const top = Math.max(0, Math.min(bounds.top + direction[1], window.innerHeight - bounds.height));
  accessibilityWidget.style.left = `${left}px`;
  accessibilityWidget.style.top = `${top}px`;
  // Reposiciona o painel para mantê-lo dentro da tela.
  placeAccessibilityPanel();
  localStorage.setItem('dev-barber-accessibility-position-v2', JSON.stringify({ left, top }));
  placeAccessibilityPanel();
});

// Permite fechar o painel com a tecla Escape.
document.addEventListener('keydown', (event) => {
  // Fecha o painel apenas quando ele está aberto e Escape foi pressionado.
  if (event.key === 'Escape' && !accessibilityPanel.hidden) {
    accessibilityPanel.hidden = true;
    accessibilityTrigger.setAttribute('aria-expanded', 'false');
    accessibilityTrigger.setAttribute('aria-label', 'Abrir opções de acessibilidade');
    accessibilityTrigger.focus();
  }
});
// Seleciona todos os controles que alteram o tamanho da fonte.
const fontButtons = document.querySelectorAll('[data-font-action]');
// Busca a região que anuncia o tamanho escolhido aos leitores de tela.
const fontStatus = document.querySelector('#font-status');
// Lê o tamanho de fonte salvo ou usa o tamanho padrão de 100 por cento.
let fontScale = Number(localStorage.getItem('dev-barber-font-scale')) || 1;
// Guarda os tamanhos originais dos elementos textuais antes de aplicar a escala.
const textElements = document.querySelectorAll('h1, h2, p, a, button, strong, span');
const originalFontSizes = new Map();

// Registra o tamanho inicial de cada texto para que a escala não se acumule.
textElements.forEach((element) => {
  originalFontSizes.set(element, Number.parseFloat(getComputedStyle(element).fontSize));
});

// Aplica a escala nos textos e anuncia a porcentagem atual para tecnologias assistivas.
function applyFontScale() {
  // Multiplica cada tamanho original pelo fator de escala escolhido.
  textElements.forEach((element) => {
    const originalSize = originalFontSizes.get(element);
    element.style.fontSize = `${originalSize * fontScale}px`;
  });
  // Informa visualmente aos leitores de tela o tamanho aplicado.
  if (fontStatus) {
    fontStatus.textContent = `Tamanho da fonte: ${Math.round(fontScale * 100)} por cento.`;
  }
  // Mantém a preferência para a próxima visita.
  localStorage.setItem('dev-barber-font-scale', String(fontScale));
}

// Restaura o tamanho salvo assim que a página é carregada.
applyFontScale();
// Associa cada botão à ação de aumentar, diminuir ou restaurar o texto.
fontButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Lê a ação indicada no atributo data-font-action do botão acionado.
    const action = button.dataset.fontAction;
    // Aumenta o texto em dez por cento, até o limite de 150 por cento.
    if (action === 'increase') fontScale = Math.min(1.5, fontScale + 0.1);
    // Diminui o texto em dez por cento, até o limite mínimo de 80 por cento.
    if (action === 'decrease') fontScale = Math.max(0.8, fontScale - 0.1);
    // Restaura o texto ao tamanho original.
    if (action === 'reset') fontScale = 1;
    // Atualiza os tamanhos visíveis após a ação escolhida.
    applyFontScale();
  });
});

// Inicializa as animações apenas quando a biblioteca AOS foi carregada.
if (window.AOS) {
  // Desativa animações quando o sistema operacional pede movimento reduzido.
  AOS.init({ disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
}
