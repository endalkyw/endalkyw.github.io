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

  const previews = [...document.querySelectorAll('.figure-preview')];
  function resetPreviews(except) {
    previews.forEach(preview => {
      if (preview !== except) preview.setAttribute('aria-pressed', 'false');
    });
  }
  // Touch, mouse clicks, Enter and Space only toggle a bounded in-place preview.
  document.addEventListener('click', event => {
    const preview = event.target.closest('.figure-preview');
    resetPreviews(preview);
    if (preview) {
      preview.setAttribute('aria-pressed', String(preview.getAttribute('aria-pressed') !== 'true'));
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') resetPreviews();
  });
})();
