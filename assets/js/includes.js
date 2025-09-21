/* eslint-env browser */
(function () {
  'use strict';

  const includes = [
    { id: 'site-header', file: 'partials/header.html' },
    { id: 'site-footer', file: 'partials/footer.html' }
  ];

  const normalizePath = (path) => {
    if (!path) {
      return '';
    }

    let normalized = path.trim();

    if (!normalized) {
      return '';
    }

    if (!normalized.startsWith('/')) {
      normalized = `/${normalized}`;
    }

    normalized = normalized.replace(/\/+$/, '');

    if (!normalized) {
      return '/';
    }

    return normalized.toLowerCase();
  };

  const parseSkipPaths = (value) => {
    return value
      .split(',')
      .map(normalizePath)
      .filter(Boolean);
  };

  const shouldSkipScript = (scriptEl, currentPath) => {
    const skipAttr = scriptEl.getAttribute('data-skip-paths');

    if (!skipAttr) {
      return false;
    }

    const skipPaths = parseSkipPaths(skipAttr);

    if (skipPaths.length === 0) {
      return false;
    }

    return skipPaths.some((path) => {
      if (path === '/') {
        return currentPath === '/';
      }

      return currentPath === path || currentPath.endsWith(path);
    });
  };

  const executeScripts = (container) => {
    const scripts = container.querySelectorAll('script');
    const currentPath = normalizePath(window.location.pathname || '/') || '/';

    scripts.forEach((scriptEl) => {
      if (scriptEl.dataset.includeProcessed === 'true') {
        return;
      }

      if (shouldSkipScript(scriptEl, currentPath)) {
        scriptEl.dataset.includeProcessed = 'true';
        return;
      }

      const includeKey = scriptEl.dataset.includeKey;

      if (includeKey) {
        const existing = document.querySelector(
          `script[data-include-origin="injected"][data-include-key="${includeKey}"]`
        );

        if (existing) {
          scriptEl.dataset.includeProcessed = 'true';
          return;
        }
      } else if (scriptEl.src) {
        const src = scriptEl.src;
        const existingWithSrc = Array.from(document.getElementsByTagName('script')).find(
          (node) => node !== scriptEl && node.src === src
        );

        if (existingWithSrc) {
          scriptEl.dataset.includeProcessed = 'true';
          return;
        }
      }

      const newScript = document.createElement('script');

      Array.from(scriptEl.attributes).forEach(({ name, value }) => {
        if (name === 'data-include-processed') {
          return;
        }

        newScript.setAttribute(name, value);
      });

      newScript.dataset.includeOrigin = 'injected';

      if (scriptEl.textContent) {
        newScript.textContent = scriptEl.textContent;
      }
      document.head.appendChild(newScript);

      scriptEl.dataset.includeProcessed = 'true';

      if (scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    });
  };

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
          executeScripts(container);
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
