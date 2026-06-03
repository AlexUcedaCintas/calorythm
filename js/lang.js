/* lang.js — EN/ES language toggle for all pages */
(function () {
  /* Default to the language declared in <html data-lang|lang> so a fresh visitor
     (and Googlebot, which has no localStorage) sees the page in its own language:
     EN pages render English by default, ES pages Spanish. A stored user
     preference still wins on later visits. */
  var docEl = document.documentElement;
  var docLang = (docEl.getAttribute('data-lang') === 'en' || docEl.getAttribute('lang') === 'en') ? 'en' : 'es';
  var lang = localStorage.getItem('lang') || docLang;

  function apply(l) {
    lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.setAttribute('lang', l);

    /* data-en elements: swap innerHTML */
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.hasAttribute('data-es')) el.setAttribute('data-es', el.innerHTML);
      el.innerHTML = l === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-es');
    });

    /* .lang-es / .lang-en blocks: show/hide */
    document.querySelectorAll('.lang-es').forEach(function (el) {
      el.style.display = l === 'en' ? 'none' : '';
    });
    document.querySelectorAll('.lang-en').forEach(function (el) {
      el.style.display = l !== 'en' ? 'none' : '';
    });

    /* toggle button label: shows the ACTIVE language */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.textContent = l === 'en' ? 'EN' : 'ES';
      btn.setAttribute('aria-label', l === 'en' ? 'Cambiar a español' : 'Switch to English');
    });
  }

  window.toggleLang = function () { apply(lang === 'en' ? 'es' : 'en'); };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-en').forEach(function (el) { el.style.display = 'none'; });
    if (lang === 'en') apply('en');
  });
})();
