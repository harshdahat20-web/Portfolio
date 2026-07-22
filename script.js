document.getElementById("year").textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        if (e.target.id === undefined) {
        }
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => io.observe(el));

// Timeline fill animation
const fill = document.getElementById("timelineFill");
const timelineSection = document.querySelector(".timeline").parentElement;
const fillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        fill.classList.add("in");
        fillObserver.disconnect();
      }
    });
  },
  { threshold: 0.4 },
);
fillObserver.observe(timelineSection);

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(
      ".reveal, .badge, .hero h1, .hero-sub, .hero-actions, .hero-meta",
    )
    .forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
}
