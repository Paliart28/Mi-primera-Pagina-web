// ===== SCRIPT MINIMAL PARA MOVER EL TREN =====
document.addEventListener("DOMContentLoaded", () => {
  
  const progress = document.getElementById("progress");
  const train = document.getElementById("train");

  function moveTrain() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    const maxScroll = docHeight - winHeight;
    const ratio = Math.min(scrollTop / maxScroll, 1);

    // ancho total de la vía
    const track = progress.parentElement.getBoundingClientRect();
    const trackWidth = track.width;

    // mover barra
    progress.style.transform = `scaleX(${ratio})`;

    // Mover tren
    const posX = ratio * trackWidth;
    train.style.left = `${posX}px`; 
    train.style.top = "50%";
    train.style.transform = "translate(-50%, -50%)";
  }

  window.addEventListener("scroll", moveTrain);
  window.addEventListener("resize", moveTrain);

  moveTrain();
});
