(() => {
  const sectionLinks = [...document.querySelectorAll('.section-rail a')];
  const sections = sectionLinks.map(link => document.querySelector(link.hash));
  let scrollUpdatePending = false;
  let preferredSection = window.location.hash || '#main';

  function updateCurrentSection() {
    const marker = Math.min(window.innerHeight * 0.28, 180);
    const positions = sections.map((section, index) => ({ index, ...section.getBoundingClientRect().toJSON() }));
    const started = positions.filter(section => section.top <= marker);
    const visible = started.filter(section => section.bottom > marker);
    const candidates = visible.length ? visible : started;
    const latestTop = Math.max(...candidates.map(section => section.top));
    const row = candidates.filter(section => Math.abs(section.top - latestTop) < 2);
    // Publications and projects share a row on desktop. Honor the chosen column.
    const preferred = row.find(section => sectionLinks[section.index].hash === preferredSection);
    const current = (preferred || row[0])?.index ?? 0;
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
  sectionLinks.forEach(link => link.addEventListener('click', () => {
    preferredSection = link.hash;
    scheduleSectionUpdate();
  }));
  window.addEventListener('hashchange', () => {
    preferredSection = window.location.hash || '#main';
    scheduleSectionUpdate();
  });
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
