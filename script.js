(() => {
  const whatsappNumber = '7973010037';

  function toWhatsAppUrl(numberDigits, text) {
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${numberDigits}?text=${encoded}`;
  }

  function smoothScrollToId(id) {
    const el = document.querySelector(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setYear() {
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initQuoteAndApplyScroll() {
    const quoteBtn = document.getElementById('quoteBtn');
    if (quoteBtn) {
      quoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToId('#contact');
      });
    }

    document.querySelectorAll('.js-apply').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollToId('#contact');
      });
    });
  }

  function getFormValues(form) {
    const fd = new FormData(form);
    const name = (fd.get('name') || '').toString();
    const email = (fd.get('email') || '').toString();
    const message = (fd.get('message') || '').toString();
    return { name, email, message };
  }

  function buildWhatsAppMessage({ name, email, message }) {
    // Matches the React version’s intent
    return `Hi Nexora Digital!\nName: ${name || '-'}\nEmail: ${email || '-'}\nMessage: ${message || '-'}\n`;
  }

  function initContactWhatsApp() {
    const form = document.getElementById('contactForm');
    const prefills = document.getElementById('waPrefillLink');
    if (!form || !prefills) return;

    const updatePrefillHref = () => {
      const values = getFormValues(form);
      const text = buildWhatsAppMessage(values);
      prefills.href = toWhatsAppUrl(whatsappNumber, text);
    };

    // Initialize on load
    updatePrefillHref();

    // Update as user types
    form.addEventListener('input', () => updatePrefillHref());

    // Submit => open WhatsApp
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const values = getFormValues(form);
      const text = buildWhatsAppMessage(values);
      const waUrl = toWhatsAppUrl(whatsappNumber, text);
      window.open(waUrl, '_blank', 'noreferrer');
    });
  }

  function initFloatingWhatsApp() {
    const fab = document.querySelector('.waFab');
    if (!fab) return;

    const message = 'Hi Nexora Digital! I want help with a website/business solution.';
    fab.href = toWhatsAppUrl(whatsappNumber, message);
  }

  // Init
  setYear();
  initNavbarScroll();
  initQuoteAndApplyScroll();
  initContactWhatsApp();
  initFloatingWhatsApp();
})();

