(function () {
  var root = document.documentElement;
  var savedLanguage;
  try {
    savedLanguage = window.localStorage.getItem('flowmova-language');
  } catch (_) {
    savedLanguage = null;
  }

  var browserLanguage = (navigator.language || 'en').toLowerCase().startsWith('fr') ? 'fr' : 'en';
  var language = savedLanguage === 'fr' || savedLanguage === 'en' ? savedLanguage : browserLanguage;

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    root.dataset.lang = language;
    root.lang = language;
    document.querySelectorAll('[data-set-language]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
    });
    document.querySelectorAll('[data-title-fr]').forEach(function (element) {
      document.title = language === 'fr' ? element.dataset.titleFr : element.dataset.titleEn;
    });
    try {
      window.localStorage.setItem('flowmova-language', language);
    } catch (_) {
      // Language selection still works when browser storage is unavailable.
    }
  }

  document.querySelectorAll('[data-set-language]').forEach(function (button) {
    button.addEventListener('click', function () {
      applyLanguage(button.dataset.setLanguage);
    });
  });

  document.querySelectorAll('[data-current-year]').forEach(function (element) {
    element.textContent = String(new Date().getFullYear());
  });

  applyLanguage(language);
})();
