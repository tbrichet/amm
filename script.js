// Toggler
  (function(){
    const body = document.body;
    const btn = document.querySelector('.toggler');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sb-overlay');
    const closeButtons = document.querySelectorAll('[data-close]');
    let lastFocus = null;

    const focusablesSelector = [
      'a[href]','button:not([disabled])','input:not([disabled])',
      'select:not([disabled])','textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function open() {
      lastFocus = document.activeElement;
      body.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      sidebar.removeAttribute('aria-hidden');

      // Move focus to first focusable in sidebar
      requestAnimationFrame(() => {
        const first = sidebar.querySelector(focusablesSelector);
        (first || sidebar).focus();
      });
    }

    function close() {
      body.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
      // Return focus to the toggler
      if (lastFocus) lastFocus.focus();
    }

    // Toggle handlers
    btn.addEventListener('click', () => {
      if (body.classList.contains('is-open')) close(); else open();
    });
    overlay.addEventListener('click', close);
    closeButtons.forEach(b => b.addEventListener('click', close));

    // Esc to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('is-open')) {
        e.preventDefault();
        close();
      }
      // Focus trap
      if (e.key === 'Tab' && body.classList.contains('is-open')) {
        const nodes = sidebar.querySelectorAll(focusablesSelector);
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;

        if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Close if a link inside sidebar is clicked (optional, remove if you prefer stay-open)
    sidebar.addEventListener('click', (e) => {
      const a = e.target.closest('a[href]');
      if (a) close();
    });
  })();