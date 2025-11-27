(() => {
  const progressEl = document.getElementById('progress');
  const trainEl = document.getElementById('train');
  const labels = Array.from(document.querySelectorAll('.label'));
  const stations = Array.from(document.querySelectorAll('.station'));
  const sections = Array.from(document.querySelectorAll('main section'));

  if (!progressEl || !trainEl || !labels.length || !stations.length || !sections.length) {
    return;
  }

  // ============================================================
  // 1) Progreso según la sección activa (no según todo el scroll)
  // ============================================================

  let activeIndex = 0;        // sección activa (0 = s1, 1 = s2, etc.)
  let renderedProgress = 0;   // valor que se está mostrando (para suavizar animación)

  function animate() {
    const total = sections.length > 1 ? sections.length - 1 : 1;
    const target = total > 0 ? activeIndex / total : 0;   // valor entre 0 y 1

    // Interpolación suave
    renderedProgress += (target - renderedProgress) * 0.15;

    // Actualizar barra
    progressEl.style.transform = `scaleX(${renderedProgress})`;

    // Actualizar posición del tren
    const percent = renderedProgress * 100;
    trainEl.style.left = `${percent}%`;

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // ============================================================
  // 2) IntersectionObserver: detecta qué sección domina la pantalla
  // ============================================================

  const io = new IntersectionObserver(
    (entries) => {
      let best = null;

      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }

      if (!best) return;

      const id = best.target.id;
      const index = sections.findIndex((s) => s.id === id);
      if (index === -1) return;

      activeIndex = index;

      // Activar label y estación correspondientes
      labels.forEach((l, i) => l.classList.toggle('label--active', i === index));
      stations.forEach((st, i) => st.classList.toggle('station--active', i === index));
    },
    {
      threshold: [0.3, 0.5, 0.7],
      rootMargin: '-20% 0px -40% 0px',
    }
  );

  sections.forEach((sec) => io.observe(sec));

  // ============================================================
  // 3) Click en los labels → hace scroll a la sección y actualiza estado
  // ============================================================

  const labelsContainer = document.querySelector('.railway__labels');

  if (labelsContainer) {
    labelsContainer.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document
        .querySelector('.railway')
        .getBoundingClientRect().height || 72;

      const top =
        target.getBoundingClientRect().top + window.pageYOffset - (headerHeight + 16);

      window.scrollTo({ top, behavior: 'smooth' });

      // por si acaso, adelantamos el índice activo
      const index = sections.findIndex((s) => s.id === id);
      if (index !== -1) {
        activeIndex = index;
      }
    });
  }
})();
