(() => {
  // Preserve links to sections in the previous single-page homepage.
  if (/\/(?:index\.html)?$/.test(location.pathname)) {
    const legacySections = {
      '#research': 'research.html',
      '#publications': 'research.html#publications',
      '#education': 'about.html#education-title',
      '#contact': 'about.html#contact-title'
    };
    if (legacySections[location.hash]) {
      location.replace(legacySections[location.hash]);
      return;
    }
  }
  const dialog = document.querySelector('.figure-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const image = dialog.querySelector('.dialog-image');
  const viewport = dialog.querySelector('.figure-viewport');
  const size = dialog.querySelector('[data-size]');
  let opener;
  document.querySelectorAll('[data-zoom]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.querySelector('#figure-dialog-title').textContent = link.dataset.title;
      viewport.classList.remove('is-full');
      size.textContent = 'View full size';
      size.setAttribute('aria-pressed', 'false');
      document.body.classList.add('dialog-open');
      dialog.showModal();
      viewport.scrollTo(0, 0);
      dialog.querySelector('[data-close]').focus();
    });
  });
  size.addEventListener('click', () => {
    const full = viewport.classList.toggle('is-full');
    size.textContent = full ? 'Fit to screen' : 'View full size';
    size.setAttribute('aria-pressed', String(full));
    viewport.scrollTo(0, 0);
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
    opener?.focus();
  });
})();
