/* Tren sincronizado por secciones SIN RECARGAR */

const progressEl = document.getElementById("progress");
const trainEl = document.getElementById("train");
const trainBody = document.querySelector(".train-body");

const labels = [...document.querySelectorAll(".label")];
const stations = [...document.querySelectorAll(".station")];
const sections = [...document.querySelectorAll("main section")];

/* Colores por sección */
const sectionColors = [
  "var(--acero)",
  "var(--senal)",
  "var(--oxido)",
  "var(--verde)",
  "var(--gris)"
];

/* Función que actualiza TODO cuando cambias de sección */
function setTrainPosition(index) {
  const total = sections.length - 1;
  const fraction = index / total;

  // Progreso del track
  progressEl.style.transform = `scaleX(${fraction})`;
  progressEl.style.background = sectionColors[index];

  // Tren llega al borde REAL
  trainEl.style.left = `calc(${fraction * 100}% - 20px)`;

  // Color del tren
  if (trainBody) trainBody.style.fill = sectionColors[index];

  // Labels activos
  labels.forEach(l =>
    l.classList.toggle("is-active", Number(l.dataset.index) === index)
  );

  // Estaciones activas
  stations.forEach(s =>
    s.classList.toggle("is-active", Number(s.dataset.index) === index)
  );
}

/* OBSERVER PERFECTO (detecta sección sin refrescar) */
const observer = new IntersectionObserver(
  entries => {
    let mostVisible = null;

    entries.forEach(entry => {
      if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
        mostVisible = entry;
      }
    });

    if (mostVisible && mostVisible.isIntersecting) {
      const idx = sections.indexOf(mostVisible.target);
      if (idx >= 0) {
        setTrainPosition(idx);   // ← TODO SE ACTUALIZA SIN RECARGAR
      }
    }
  },
  {
    root: null,
    threshold: [0.3, 0.5, 0.7],       // ← detecta más rápido los cambios
    rootMargin: "-30% 0px -30% 0px"   // ← detecta la sección CENTRO de la pantalla
  }
);

/* Activar observer para cada sección */
sections.forEach(section => observer.observe(section));

/* Click en menú */
document.querySelector(".railway__labels").addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;

  e.preventDefault();

  const id = a.getAttribute("href").substring(1);
  const el = document.getElementById(id);

  const headerH = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--bar-h")
  ) || 80;

  const top =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    (headerH + 16);

  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

/* Estado inicial sin recargar */
setTrainPosition(0);
