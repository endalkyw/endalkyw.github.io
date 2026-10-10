(() => {
  const sectionLinks = [...document.querySelectorAll('.section-rail a')];
  const sections = sectionLinks.map(link => document.querySelector(link.hash));
  let scrollUpdatePending = false;

  function updateCurrentSection() {
    const marker = Math.min(window.innerHeight * 0.28, 180);
    let current = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= marker) current = index;
    });
    // The last section may be too short to reach the top of a tall viewport.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }
    sectionLinks.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scrollUpdatePending = false;
  }
  function scheduleSectionUpdate() {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    requestAnimationFrame(updateCurrentSection);
  }
  window.addEventListener('scroll', scheduleSectionUpdate, { passive: true });
  window.addEventListener('resize', scheduleSectionUpdate);
  window.addEventListener('hashchange', scheduleSectionUpdate);
  window.addEventListener('pageshow', scheduleSectionUpdate);
  updateCurrentSection();

  const dialog = document.querySelector('#figure-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('#figure-image');
  const title = dialog.querySelector('#figure-title');
  const caption = dialog.querySelector('#figure-caption');
  let trigger;
  let backdropPress = false;

  document.querySelectorAll('[data-figure]').forEach(preview => {
    preview.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      trigger = preview;
      title.textContent = preview.closest('.project').querySelector('h3').textContent;
      image.src = preview.href;
      image.alt = preview.querySelector('img').alt;
      caption.textContent = preview.dataset.caption || '';
      dialog.showModal();
      document.documentElement.classList.add('figure-open');
    });
  });

  const closeButton = dialog.querySelector('.dialog-close');
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    // Close is the viewer's only interactive control; keep Tab inside it.
    if (event.key === 'Tab') {
      event.preventDefault();
      closeButton.focus();
    }
  });
  const outside = event => {
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  dialog.addEventListener('pointerdown', event => { backdropPress = outside(event); });
  dialog.addEventListener('click', event => {
    if (event.target === dialog && backdropPress && outside(event)) dialog.close();
    backdropPress = false;
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('figure-open');
    trigger?.focus({ preventScroll: true });
  });
})();
