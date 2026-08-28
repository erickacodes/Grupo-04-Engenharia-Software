/* ══════════════════════════════════════════════════════════════════════
   Eletrotech Marechal — JavaScript
   Dependências: Lucide CDN (carregado no index.html antes deste script)
   ──────────────────────────────────────────────────────────────────────
   ÍNDICE
   1. Inicialização
   2. Navegação entre Páginas (SPA)
   3. Menu Mobile (Hamburger)
   4. Troca de Idioma (PT / ES)
   5. FAQ Accordion
══════════════════════════════════════════════════════════════════════ */


/* ────────────────────────────────────────
   1. INICIALIZAÇÃO
   ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', function () {
  // Renderiza os ícones Lucide no DOM
  lucide.createIcons();

  // Exibe o ano atual no footer
  var anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Fecha o menu mobile ao clicar fora dele
  document.addEventListener('click', function (e) {
    var menu = document.getElementById('menu-mobile');
    var hamburger = document.querySelector('.hamburger');
    if (menu && menu.classList.contains('aberto')) {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        fecharMenu();
      }
    }
  });

  // Fecha menu mobile com tecla ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      fecharMenu();
    }
  });
});


/* ────────────────────────────────────────
   2. NAVEGAÇÃO ENTRE PÁGINAS (SPA)
   ──────────────────────────────────────── */

function ir(pagina) {
  // Oculta todas as páginas
  document.querySelectorAll('.pagina').forEach(function (p) {
    p.classList.remove('ativa');
  });

  // Mostra a página alvo
  var alvo = document.getElementById('pg-' + pagina);
  if (alvo) {
    alvo.classList.add('ativa');
  }

  // Atualiza botão ativo no nav (desktop)
  document.querySelectorAll('.nav-btn').forEach(function (b) {
    b.classList.remove('ativo');
  });
  var btn = document.querySelector('.nav-btn[data-page="' + pagina + '"]');
  if (btn) btn.classList.add('ativo');

  // Atualiza botão ativo no menu mobile
  document.querySelectorAll('.menu-mobile button').forEach(function (b) {
    b.classList.remove('ativo');
  });
  var btnMob = document.querySelector('.menu-mobile button[data-page="' + pagina + '"]');
  if (btnMob) btnMob.classList.add('ativo');

  // Fecha menu mobile e volta ao topo suavemente
  fecharMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Recria ícones Lucide para garantir renderização perfeita
  lucide.createIcons();
}


/* ────────────────────────────────────────
   3. MENU MOBILE (HAMBURGER)
   ──────────────────────────────────────── */

function toggleMenu() {
  var menu = document.getElementById('menu-mobile');
  if (!menu) return;

  var aberto = menu.classList.toggle('aberto');
  var hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    hamburger.classList.toggle('ativo', aberto);
    var icon = hamburger.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', aberto ? 'x' : 'menu');
      lucide.createIcons();
    }
  }
}

function fecharMenu() {
  var menu = document.getElementById('menu-mobile');
  if (menu && menu.classList.contains('aberto')) {
    menu.classList.remove('aberto');
    var hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.classList.remove('ativo');
      var icon = hamburger.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    }
  }
}


/* ────────────────────────────────────────
   4. TROCA DE IDIOMA (PT / ES)
   ──────────────────────────────────────── */

function setLang(lang) {
  // Aplica classe ao body para ativar as regras CSS de idioma
  document.body.className = 'lang-' + lang;

  // Atualiza visual dos botões PT / ES
  document.querySelectorAll('.lang-btn').forEach(function (b) {
    b.classList.toggle('ativo', b.dataset.lang === lang);
  });

  // Reinicializa ícones Lucide
  lucide.createIcons();
}


/* ────────────────────────────────────────
   5. FAQ ACCORDION
   ──────────────────────────────────────── */

function toggleFaq(botao) {
  var item = botao.parentElement;
  var jaAberto = item.classList.contains('aberto');

  // Fecha todos os itens abertos
  document.querySelectorAll('.faq-item').forEach(function (i) {
    i.classList.remove('aberto');
  });

  // Abre o clicado (se não estava aberto)
  if (!jaAberto) {
    item.classList.add('aberto');
  }
}
