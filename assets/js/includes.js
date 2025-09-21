/* eslint-env browser */
(function () {
  'use strict';

  const includes = [
    { id: 'site-header', file: 'partials/header.html' },
    { id: 'site-footer', file: 'partials/footer.html' }
  ];

  const getCandidateUrls = (file) => {
    const urls = new Set();
    const scriptEl = document.currentScript || document.querySelector('script[data-include-script]');

    if (scriptEl && scriptEl.src) {
      const scriptUrl = new URL(scriptEl.src, window.location.href);
      const scriptBase = scriptUrl.href.replace(/assets\/js\/[^/?#]+(?:[?#].*)?$/, '');
      urls.add(new URL(file, scriptBase).href);
    }

    const docBase = window.location.href.replace(/[^/]*([?#].*)?$/, '');
    urls.add(new URL(file, docBase).href);
    urls.add(new URL(file, window.location.origin + '/').href);
    urls.add(file);
    urls.add(`/${file.replace(/^\//, '')}`);

    return Array.from(urls);
  };

  const loadPartial = async (id, file) => {
    const container = document.getElementById(id);

    if (!container) {
      return;
    }

    const candidateUrls = getCandidateUrls(file);

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const markup = await response.text();
          container.innerHTML = markup;
          return;
        }
      } catch {
        // Ignore fetch errors and try next candidate
      }
    }

    console.warn(`Could not load include: ${file}`);
  };

  const loadIncludes = () => {
    includes.forEach(({ id, file }) => {
      void loadPartial(id, file);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIncludes);
  } else {
    loadIncludes();
  }
})();
