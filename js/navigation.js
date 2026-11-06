/* Desktop active states and accessible mobile navigation. */
(function () {
  'use strict';
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const layer = document.getElementById('mobile-menu-layer');
  const panel = layer?.querySelector('.mobile-menu-panel');
  const backdrop = layer?.querySelector('.mobile-menu-backdrop');
  const closeButton = layer?.querySelector('.mobile-menu-close');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
  const backToTop = document.getElementById('back-to-top');
  let returnFocus = null;
  let priorBodyOverflow = '';

  function closeMenu() {
    if (!layer || !toggle || !layer.classList.contains('is-open')) return;
    layer.classList.remove('is-open');
    layer.setAttribute('aria-hidden', 'true');
    layer.inert = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = priorBodyOverflow;
    if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
  }

  function openMenu() {
    if (!layer || !toggle) return;
    returnFocus = document.activeElement;
    priorBodyOverflow = document.body.style.overflow;
    layer.inert = false;
    layer.setAttribute('aria-hidden', 'false');
    layer.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButton?.focus());
  }

  toggle?.addEventListener('click', () => {
    if (toggle.getAttribute('aria-expanded') === 'true') closeMenu();
    else openMenu();
  });
  closeButton?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  layer?.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('keydown', (event) => {
    if (!layer?.classList.contains('is-open')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key === 'Tab' && panel) {
      const focusable = Array.from(panel.querySelectorAll('a[href], button:not([disabled])'))
        .filter((el) => el.getAttribute('tabindex') !== '-1');
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }
  });

  const onScroll = () => {
    const scrolled = window.scrollY > 16;
    header?.classList.toggle('is-scrolled', scrolled);
    backToTop?.classList.toggle('is-visible', window.scrollY > 520);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the link whose real section is currently in view.
  const targets = new Map();
  navLinks.forEach((link) => {
    const id = link.dataset.navTarget;
    const target = id && document.getElementById(id);
    if (target) targets.set(target, id);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (!visible.length) return;
      const activeId = targets.get(visible[0].target);
      navLinks.forEach((link) => {
        const active = link.dataset.navTarget === activeId;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-22% 0px -62% 0px', threshold: [0, .1, .25, .5, .75] });
    targets.forEach((_, target) => observer.observe(target));
  }
})();
