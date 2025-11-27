(() => {
  const progressEl = document.getElementById('progress');
  const trainEl = document.getElementById('train');
  const labels = Array.from(document.querySelectorAll('.label'));
  const stations = Array.from(document.querySelectorAll('.station'));
  const sections = Array.from(document.querySelectorAll('main section'));

  // Si falta algo, no hacemos nada (evita errores)
  if (!progressEl || !trainEl || !labels.length || !stations.length || !sections.length) {
    return;
  }

  /* ========= PROGRESO GLOBAL SEGÚN SCROLL ========= */

  let ticking = false;

  function updateProgress() {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max)); // 0 a 1

    // Barra de progreso
    progressEl.style.transform = `scaleX(${p})`;

    // Posición del tren
    const trackRect = progressEl.parentElement.getBoundingClientRect();
    const startX = trackRect.left;
    const endX = trackRect.right;
    const x = startX + (endX - startX) * p;
    const percent = ((x - startX) / trackRect.width) * 100;

    trainEl.style.left = `${percent}%`;

    ticking = false;
  }

  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateProgress);
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize);

  /* ========= ACTIVAR SECCIÓN ACTUAL (LABELS + PUNTOS) ========= */

  const io = new IntersectionObserver(
    (entries) => {
      let best = null;

      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      });

      if (!best) return;

      const id = best.target.id;
      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) return;

      labels.forEach((l, i) => l.classList.toggle('label--active', i === index));
      stations.forEach((st, i) => st.classList.toggle('station--active', i === index));
    },
    {
      threshold: [0.3, 0.5, 0.7],
      rootMargin: '-20% 0px -40% 0px',
    }
  );

  sections.forEach((sec) => io.observe(sec));

  /* ========= CLIC EN LAS ETIQUETAS: SCROLL SUAVE ========= */

  const labelsContainer = document.querySelector('.railway__labels');

  if (labelsContainer) {
    labelsContainer.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.railway').getBoundingClientRect().height || 72;
      const top = target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 16);

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    });
  }

  // Estado inicial
  updateProgress();
})();
