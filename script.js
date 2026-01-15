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

  // Carousel

  let currentIndex = 0;
        const track = document.getElementById('carouselTrack');
        const items = document.querySelectorAll('.carousel-item-custom');
        const totalItems = items.length;

        function getItemsPerView() {
            if (window.innerWidth <= 576) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }

        function slideCarousel(direction) {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = 0;
            } else if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }
            
            const itemWidth = items[0].offsetWidth;
            const gap = 20;
            const offset = -(currentIndex * (itemWidth + gap));
            
            track.style.transform = `translateX(${offset}px)`;
        }

        window.addEventListener('resize', () => {
            const itemsPerView = getItemsPerView();
            const maxIndex = totalItems - itemsPerView;
            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
                slideCarousel(0);
            }
        });


// Quote Form Validation
    const today = new Date().toISOString().split('T')[0];
        document.getElementById('eventDate').setAttribute('min', today);

        function handleSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            
            console.log('Form submitted with data:', data);
            
            // Show success message
            alert('Thank you for your inquiry! We will contact you shortly to discuss your event details.');
            
            // Reset form
            event.target.reset();
        }