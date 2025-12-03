/* Tren sincronizado por secciones usando SCROLL (sin recargar) */

const progressEl = document.getElementById("progress");
const trainEl = document.getElementById("train");
const trainBody = document.querySelector(".train-body");

const labels = Array.from(document.querySelectorAll(".label"));
const stations = Array.from(document.querySelectorAll(".station"));
const sections = Array.from(document.querySelectorAll("main section"));

const sectionColors = [
  "var(--acero)",
  "var(--senal)",
  "var(--oxido)",
  "var(--verde)",
  "var(--gris)"
];

/* Mueve tren, barra, colores, labels, estaciones */
function setTrainPosition(index) {
  const total = sections.length - 1;
  if (total <= 0) return;

  const fraction = index / total;

  // Avance de la barra
  progressEl.style.transform = `scaleX(${fraction})`;
  progressEl.style.background = sectionColors[index];

  // Posición del tren (centrado en cada estación)
  trainEl.style.left = `${fraction * 100}%`;

  // Color del cuerpo del tren
  if (trainBody) {
    trainBody.style.fill = sectionColors[index];
  }

  // Activar label correspondiente
  labels.forEach(l =>
    l.classList.toggle("is-active", Number(l.dataset.index) === index)
  );

  // Activar estación correspondiente
  stations.forEach(s =>
    s.classList.toggle("is-active", Number(s.dataset.index) === index)
  );
}

/* Calcula qué sección está más cerca del centro de la pantalla */
function getActiveSectionIndex() {
  const viewportCenter = window.innerHeight / 2;
  let bestIdx = 0;
  let bestDistance = Infinity;

  sections.forEach((sec, idx) => {
    const rect = sec.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(sectionCenter - viewportCenter);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIdx = idx;
    }
  });

  return bestIdx;
}

/* Throttle con requestAnimationFrame para que sea suave */
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const idx = getActiveSectionIndex();
    setTrainPosition(idx);
    ticking = false;
  });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

/* Click en el menú: scroll suave a la sección */
document.querySelector(".railway__labels").addEventListener("click", e => {
  const a = e.target.closest("a[href^='#']");
  if (!a) return;

  e.preventDefault();

  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const headerH =
    parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--bar-h")
    ) || 72;

  const top =
    el.getBoundingClientRect().top +
    window.pageYOffset -
    (headerH + 16);

  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

/* Estado inicial */
setTrainPosition(0);
