// ================================================
// TREN — NAVEGACIÓN SINCRONIZADA
// ================================================

document.addEventListener("DOMContentLoaded", () => {
    const stations = Array.from(document.querySelectorAll(".station"));
    const train = document.getElementById("train-icon");
    const rail = document.querySelector(".pc-line");

    if (!stations.length || !train || !rail) return;

    const sections = stations.map(btn => document.getElementById(btn.dataset.target));

    const moveTrain = (index) => {
        const total = stations.length - 1;
        if (total <= 0) return;
        const width = rail.offsetWidth;
        const x = (index / total) * width;
        train.style.transform = `translateX(${x}px)`;
    };

    const setActive = (index) => {
        stations.forEach((b, i) => {
            if (i === index) {
                b.classList.add("is-active");
            } else {
                b.classList.remove("is-active");
            }
        });
        moveTrain(index);
    };

    // Click en estación → scroll + tren
    stations.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setActive(index);
        });
    });

    // Scroll → detectar sección dominante
    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;

            const secId = visible.target.id;
            const index = sections.findIndex(sec => sec && sec.id === secId);
            if (index !== -1) {
                setActive(index);
            }
        },
        { threshold: 0.4 }
    );

    sections.forEach(sec => {
        if (sec) observer.observe(sec);
    });

    // Ajuste en resize
    window.addEventListener("resize", () => {
        const activeIndex = stations.findIndex(b => b.classList.contains("is-active"));
        if (activeIndex >= 0) moveTrain(activeIndex);
    });

    // Estado inicial
    setActive(0);
});
