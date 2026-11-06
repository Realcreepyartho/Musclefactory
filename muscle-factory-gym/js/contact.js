/* WhatsApp, click-to-call and directions links. No backend is required. */
(function () {
  'use strict';
  const config = window.MF_GYM_CONFIG;
  if (!config) return;

  const encode = (message) => encodeURIComponent(message);
  const baseWhatsApp = (message) => `https://wa.me/${config.whatsappNumber}?text=${encode(message)}`;

  document.querySelectorAll('a[data-whatsapp]').forEach((link) => {
    const kind = link.dataset.whatsapp;
    let message = config.defaultWhatsAppMessage;
    if (kind === 'trial') message = config.trialWhatsAppMessage;
    if (kind === 'plan' && config.membershipPlans[link.dataset.plan]) {
      message = config.membershipPlans[link.dataset.plan].whatsappMessage;
    }
    link.href = baseWhatsApp(message);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-phone-link]').forEach((link) => {
    link.href = `tel:${config.phoneDial}`;
  });
  document.querySelectorAll('[data-directions-link]').forEach((link) => {
    link.href = config.mapsDirectionsUrl;
  });
  document.querySelectorAll('iframe[data-map-embed]').forEach((frame) => {
    frame.src = config.mapsEmbedUrl;
  });
})();
