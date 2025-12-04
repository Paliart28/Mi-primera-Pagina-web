const sections = [
    "inicio",
    "san-bernardo",
    "senializacion",
    "territorio",
    "patrones",
    "metodologia",
    "equipo"
];

const train = document.getElementById("train-icon");
const stations = document.querySelectorAll(".station");
const rail = document.querySelector(".pc-line");

stations.forEach(btn => {
    btn.addEventListener("click", () => {

        const step = parseInt(btn.dataset.step);
        const width = rail.offsetWidth;

        const x = (step / (sections.length - 1)) * width;

        train.style.transform = `translateX(${x}px)`;

        stations.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");

        document.getElementById(btn.dataset.target).scrollIntoView({
            behavior: "smooth"
        });
    });
});

window.addEventListener("scroll", () => {

    let activeIndex = 0;

    sections.forEach((id, i) => {
        const sec = document.getElementById(id);
        if (!sec) return;

        const top = sec.offsetTop;
        if (window.scrollY >= top - window.innerHeight * 0.4) {
            activeIndex = i;
        }
    });

    const width = rail.offsetWidth;
    const x = (activeIndex / (sections.length - 1)) * width;
    train.style.transform = `translateX(${x}px)`;

    stations.forEach(s => s.classList.remove("is-active"));
    stations[activeIndex].classList.add("is-active");
});
