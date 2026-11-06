/* Shared page initialization: owner config hydration and lightweight card interactions. */
(function () {
  'use strict';
  const config = window.MF_GYM_CONFIG;
  if (!config) return;

  const getPath = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);
  document.querySelectorAll('[data-config]').forEach((element) => {
    const value = getPath(config, element.dataset.config);
    if (value !== undefined && value !== null) element.textContent = value;
  });

  document.querySelectorAll('[data-gym-name]').forEach((element) => {
    const words = String(config.gymName || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;
    const first = document.createTextNode(`${words.shift()} `);
    const accent = document.createElement('span');
    if (element.classList.contains('hero-title')) accent.className = 'gold-accent';
    accent.textContent = words.shift() || '';
    element.replaceChildren(first, accent);
    if (words.length) element.append(document.createTextNode(` ${words.join(' ')}`));
  });

  document.querySelectorAll('[data-plan-name]').forEach((element) => {
    const plan = config.membershipPlans[element.dataset.planName];
    if (plan?.name) element.textContent = plan.name;
  });
  document.querySelectorAll('[data-plan-offer]').forEach((element) => {
    const plan = config.membershipPlans[element.dataset.planOffer];
    if (plan?.offerPrice) element.textContent = plan.offerPrice;
  });
  document.querySelectorAll('[data-plan-regular]').forEach((element) => {
    const plan = config.membershipPlans[element.dataset.planRegular];
    if (plan?.regularPrice) element.textContent = plan.regularPrice;
  });
  document.querySelectorAll('[data-plan-rate-text]').forEach((element) => {
    const plan = config.membershipPlans[element.dataset.planRateText];
    if (plan?.rateText) element.textContent = plan.rateText;
  });
  document.querySelectorAll('[data-plan-label]').forEach((element) => {
    const plan = config.membershipPlans[element.dataset.planLabel];
    if (plan?.offerLabel) element.textContent = plan.offerLabel;
  });
  document.title = `${config.gymName} | ${config.clubType} — Dindoli, Surat`;

  // Preserve the original tilt-card interaction, but keep it mouse-only and inexpensive.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReducedMotion.matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      const glare = card.querySelector('.card-glare');
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rx = ((y - rect.height / 2) / (rect.height / 2)) * -3.5;
        const ry = ((x - rect.width / 2) / (rect.width / 2)) * 3.5;
        card.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
        if (glare) glare.style.background = `radial-gradient(circle at ${(x / rect.width * 100).toFixed(1)}% ${(y / rect.height * 100).toFixed(1)}%, rgba(200,164,93,.17), transparent 62%)`;
      }, { passive: true });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; }, { passive: true });
    });
  }
})();
