const progressEl = document.getElementById('progress');
  const trainEl = document.getElementById('train');
  const labels = Array.from(document.querySelectorAll('.label'));
  const stations = Array.from(document.querySelectorAll('.station'));
  const sections = Array.from(document.querySelectorAll('main section'));

  // rAF loop: calcula progreso en [0,1]
  let ticking = false;
  function onScrollResize(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      // barra de progreso y tren
      progressEl.style.transform = `scaleX(${p})`;
      trainEl.style.left = `${p * 100}%`;
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScrollResize, {passive:true});
  window.addEventListener('resize', onScrollResize);
  onScrollResize();

  // Resaltar estación/label de la sección más visible
  const io = new IntersectionObserver((entries) => {
    // elegimos la entrada con mayor intersección
    let best = null;
    for (const e of entries) {
      if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
    }
    if (best) {
      const idx = sections.indexOf(best.target);
      labels.forEach(l => l.classList.toggle('is-active', Number(l.dataset.index) === idx));
      stations.forEach(s => s.classList.toggle('is-active', Number(s.dataset.index) === idx));
    }
  }, {
    root: null,
    // margen top igual al alto del header para que "cuente" el centro de la pantalla útil
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--bar-h').trim()} 0px 0px 0px`,
    threshold: [0.25, 0.5, 0.75] // suficiente para detectar dominio visual
  });
  sections.forEach(sec => io.observe(sec));

  // Mejor comportamiento al hacer click en un label (desplaza considerando el header)
  document.querySelector('.railway__labels').addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar-h')) || 64;
    const top = el.getBoundingClientRect().top + window.pageYOffset - (header + 16);
    window.scrollTo({ top, behavior: 'smooth' });
  });