document.addEventListener("DOMContentLoaded", () => {
  const progressEl = document.getElementById("progress");
  const trainEl = document.getElementById("train");
  const labels = [...document.querySelectorAll(".label")];
  const stations = [...document.querySelectorAll(".station")];
  const sections = [...document.querySelectorAll("main section")];

  function getActiveSection() {
    let index = 0, best = Infinity;
    const mid = window.innerHeight/2;

    sections.forEach((s,i)=>{
      const r=s.getBoundingClientRect();
      const d=Math.abs((r.top+r.height/2)-mid);
      if(d<best){best=d; index=i;}
    });

    return index;
  }

  function update() {
    const i=getActiveSection();
    const percent = i/(sections.length-1)*100;
    progressEl.style.width=percent+"%";
    trainEl.style.left=percent+"%";

    labels.forEach((l,idx)=>l.classList.toggle("is-active",idx===i));
  }

  window.addEventListener("scroll",update);
  window.addEventListener("resize",update);
  update();
});

