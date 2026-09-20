/* ---------------- Hero code snippet — rotating typewriter ---------------- */
const codeSnippets = [
  `const dev = {\n  name: "Harsh Dahat",\n  stack: ["React", "Node", "Mongo"],\n  learning: true\n};`,
  `while (bugs.length) {\n  fix(bugs.pop());\n  coffee++;\n}`,
  `git commit -m "it works,\ndon't ask how"`,
  `export default function Life() {\n  return <Code onWeekends />;\n}`,
  `console.log("Hello World,\nI build things.");`,
];
function highlightCode(text) {
  return text
    .replace(/"(.*?)"/g, '<span class="str">"$1"</span>')
    .replace(
      /\b(const|while|export|default|function|return|true|false)\b/g,
      '<span class="key">$1</span>',
    );
}
const decoEl = document.getElementById("deco-code");
if (decoEl) {
  const reduceMotionTyping = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (reduceMotionTyping) {
    decoEl.innerHTML = highlightCode(codeSnippets[0]);
  } else {
    let snippetIndex = 0;
    function typeSnippet() {
      const text = codeSnippets[snippetIndex];
      let i = 0;
      decoEl.textContent = "";
      const typeTimer = setInterval(() => {
        i++;
        decoEl.textContent = text.slice(0, i);
        if (i >= text.length) {
          clearInterval(typeTimer);
          decoEl.innerHTML =
            highlightCode(text) + '<span class="cursor"></span>';
          setTimeout(eraseSnippet, 1800);
        }
      }, 28);
    }
    function eraseSnippet() {
      const text = codeSnippets[snippetIndex];
      let i = text.length;
      const eraseTimer = setInterval(() => {
        i--;
        decoEl.textContent = text.slice(0, i);
        if (i <= 0) {
          clearInterval(eraseTimer);
          snippetIndex = (snippetIndex + 1) % codeSnippets.length;
          setTimeout(typeSnippet, 300);
        }
      }, 14);
    }
    typeSnippet();
  }
}

/* ---------------- Skills / logos ---------------- */
const skills = [
  {
    name: "MongoDB",
    cat: "Database",
    color: "#47A248",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Mongoose",
    cat: "ODM",
    color: "#B0413E",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/mongoose.svg",
  },
  {
    name: "Express.js",
    cat: "Framework",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "React",
    cat: "Library",
    color: "#61DAFB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Node.js",
    cat: "Runtime",
    color: "#339933",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Next.js",
    cat: "Framework",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    cat: "Styling",
    color: "#38BDF8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Git",
    cat: "Version control",
    color: "#F05032",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    cat: "Platform",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Postman",
    cat: "Tool",
    color: "#FF6C37",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    name: "JavaScript",
    cat: "Language",
    color: "#F7DF1E",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Vercel",
    cat: "Deployment",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg",
  },
  {
    name: "Render",
    cat: "Deployment",
    color: "#46E3B7",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/render.svg",
  },
];
const skillChipHTML = skills
  .map(
    (s) => `
    <div class="skill-chip" style="--chip-color:${s.color}" data-icon="${s.icon}" data-color="${s.color}">
      <div class="icon-badge"><img src="${s.icon}" alt="${s.name} logo" loading="lazy"></div>
      <span>${s.name}</span>
      <div class="skill-cat">${s.cat}</div>
    </div>
  `,
  )
  .join("");
document.getElementById("skills-track").innerHTML = skillChipHTML;
document.getElementById("skills-track-2").innerHTML = skillChipHTML;

/* ---------------- Mobile peeking-stack carousel ---------------- */
const carouselStage = document.getElementById("carousel-stage");
const carouselDots = document.getElementById("carousel-dots");
let carouselIndex = 0;

carouselStage.innerHTML = skills
  .map(
    (s) => `
    <div class="carousel-card" style="--chip-color:${s.color}" data-icon="${s.icon}" data-color="${s.color}">
      <div class="icon-badge"><img src="${s.icon}" alt="${s.name} logo" loading="lazy"></div>
      <span>${s.name}</span>
      <div class="skill-cat">${s.cat}</div>
    </div>
  `,
  )
  .join("");
carouselDots.innerHTML = skills.map(() => `<span></span>`).join("");

const carouselCards = Array.from(
  carouselStage.querySelectorAll(".carousel-card"),
);
const carouselDotEls = Array.from(carouselDots.querySelectorAll("span"));
const n = carouselCards.length;

function renderCarousel() {
  carouselCards.forEach((card, i) => {
    let offset = (i - carouselIndex + n) % n;
    if (offset > n / 2) offset -= n;
    card.classList.remove("is-active", "is-prev", "is-next", "is-far");
    if (offset === 0) card.classList.add("is-active");
    else if (offset === -1) card.classList.add("is-prev");
    else if (offset === 1) card.classList.add("is-next");
    else card.classList.add("is-far");
  });
  carouselDotEls.forEach((dot, i) =>
    dot.classList.toggle("active", i === carouselIndex),
  );
}
function goToCarousel(newIndex) {
  carouselIndex = (newIndex + n) % n;
  renderCarousel();
}
renderCarousel();

let carouselTimer = setInterval(() => goToCarousel(carouselIndex + 1), 2600);
function resetCarouselTimer() {
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => goToCarousel(carouselIndex + 1), 2600);
}

let touchStartY = null;
carouselStage.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.touches[0].clientY;
  },
  { passive: true },
);
carouselStage.addEventListener("touchend", (e) => {
  if (touchStartY === null) return;
  const deltaY = e.changedTouches[0].clientY - touchStartY;
  if (Math.abs(deltaY) > 30) {
    goToCarousel(carouselIndex + (deltaY < 0 ? 1 : -1));
    resetCarouselTimer();
  }
  touchStartY = null;
});
carouselStage.addEventListener("click", (e) => {
  const card = e.target.closest(".carousel-card");
  if (!card) return;
  if (card.classList.contains("is-active")) {
    triggerBlast(card.dataset.icon, card.dataset.color);
  } else if (card.classList.contains("is-prev")) {
    goToCarousel(carouselIndex - 1);
    resetCarouselTimer();
  } else if (card.classList.contains("is-next")) {
    goToCarousel(carouselIndex + 1);
    resetCarouselTimer();
  }
});

/* ---------------- Skill click "blast" ---------------- */
function triggerBlast(icon, color) {
  const overlay = document.createElement("div");
  overlay.className = "blast-overlay show";
  overlay.style.setProperty("--chip-color", color);

  const logo = document.createElement("div");
  logo.className = "blast-logo";
  logo.style.setProperty("--chip-color", color);
  logo.innerHTML = `<img src="${icon}" alt="">`;
  overlay.appendChild(logo);
  document.body.appendChild(overlay);

  for (let i = 0; i < 14; i++) {
    const angle = (Math.PI * 2 * i) / 14;
    const dist = 90 + Math.random() * 60;
    const p = document.createElement("div");
    p.className = "blast-particle";
    p.style.setProperty("--chip-color", color);
    p.style.setProperty("--px", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--py", `${Math.sin(angle) * dist}px`);
    p.style.animationDelay = `${Math.random() * 0.1}s`;
    overlay.appendChild(p);
  }

  setTimeout(() => {
    overlay.classList.remove("show");
    overlay.classList.add("hide");
    setTimeout(() => overlay.remove(), 350);
  }, 1000);
}
document.querySelectorAll(".skill-chip").forEach((chip) => {
  chip.addEventListener("click", () =>
    triggerBlast(chip.dataset.icon, chip.dataset.color),
  );
});

/* ---------------- Rocket launch background ---------------- */
const rocketLayer = document.getElementById("rocket-layer");
const rocketSVG = `
    <svg viewBox="0 0 34 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="flame" cx="17" cy="62" rx="6" ry="12" fill="#e0a52e"/>
      <ellipse class="flame" cx="17" cy="60" rx="3.5" ry="8" fill="#f3cf7a"/>
      <path d="M17 2 C26 14 27 32 24 46 L10 46 C7 32 8 14 17 2 Z" fill="#1B1C1F" stroke="#3355E0" stroke-width="1.2"/>
      <path d="M17 2 C22 10 24 20 24 30 L10 30 C10 20 12 10 17 2 Z" fill="#3355E0"/>
      <circle cx="17" cy="24" r="4.5" fill="#EFEDE6"/>
      <path d="M10 34 L2 46 L10 46 Z" fill="#6C5CE7"/>
      <path d="M24 34 L32 46 L24 46 Z" fill="#6C5CE7"/>
    </svg>`;
function spawnRocket() {
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = `${5 + Math.random() * 85}%`;
  const dur = 7 + Math.random() * 3;
  rocket.style.animationDuration = `${dur}s`;
  rocket.innerHTML = rocketSVG;
  rocketLayer.appendChild(rocket);
  setTimeout(() => rocket.remove(), dur * 1000 + 200);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setTimeout(spawnRocket, 1500);
  setInterval(spawnRocket, 9000 + Math.random() * 4000);
}

/* ---------------- Projects (edit links below once deployed) ---------------- */
const projects = [
  {
    title: "E-Commerce Platform",
    short:
      "A full-featured e-commerce platform with separate admin and user panels.",
    desc: "A complete e-commerce web application built on the MERN stack, featuring distinct admin and user experiences. The admin panel handles product listings, inventory, and order management, while the user panel supports browsing, cart management, and a smooth checkout flow.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
      "JWT Authentication",
      "Role-based Authorization",
      "Responsive UI",
    ],
    live: "https://cartora-store.vercel.app/",
    git: "https://github.com/harshdahat20-web/ecommerce-frontend",
    video: "videos/ecommerce-bg.mp4",
  },
  {
    title: "Real-Time Chat Application",
    short:
      "A real-time messaging app powered by Socket.io for instant, bidirectional chat.",
    desc: "A real-time chat application enabling instant, bidirectional communication between users. Built with Socket.io to handle live message delivery and connection state, keeping conversations perfectly in sync without page reloads.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "Socket.io",
      "MongoDB",
      "JWT Authentication",
      "REST API",
      "Real-time Communication",
    ],
    live: "https://chat-application-seven-ruby.vercel.app",
    git: "https://github.com/harshdahat20-web/chat-Application",
    video: "videos/chat-bg.mp4",
  },
  {
    title: "Collaborative Code Editor",
    short:
      "A real-time collaborative editor where multiple users can code together simultaneously.",
    desc: "A collaborative code editor that lets multiple users write and edit code together in real time. Powered by Socket.io, it synchronizes changes instantly across all connected clients, enabling a shared live-coding experience.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "Socket.io",
      "JWT Authentication",
      "REST API",
      "Real-time Sync",
    ],
    live: "https://code-editor-eight-bice.vercel.app",
    git: "https://github.com/harshdahat20-web/Code-editor",
    video: "videos/codeeditor-bg.mp4",
  },
  {
    title: "School Management System (SMS)",
    short:
      "A role-based school management system with admin, teacher, and student panels.",
    desc: "A school management system built with dedicated, role-based panels for admins, teachers, and students. Covers day-to-day academic workflows — including managing records, communication, and access control tailored to each role.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "REST API",
      "Role-based Authorization",
      "Responsive UI",
    ],
    live: "https://school-management-system-phi-murex.vercel.app",
    git: "https://github.com/harshdahat20-web/School-Management-System",
    video: "videos/sms-bg.mp4",
  },
  {
    title: "Generative AI Project",
    short: "An AI-powered application — currently in active development.",
    desc: "A generative AI-based application currently in progress. Full details, tech stack, live demo, and source code will be added here once development is complete.",
    tags: ["Generative AI", "In progress"],
    live: "#",
    git: "#",
    pending: true,
  },
];
const projectsGrid = document.getElementById("projects-grid");
projectsGrid.innerHTML = projects
  .map(
    (p, i) => `
    <div class="project-card reveal reveal-up${p.pending ? " pending" : ""}" data-index="${i}" style="transition-delay:${i * 0.12}s">
      ${
        p.pending
          ? `<div class="card-ai-bg">
             <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
               <g class="ai-codelines">
                 <rect x="14" y="10" width="46" height="4" rx="2" fill="#3355E0" opacity="0.5"/>
                 <rect x="14" y="20" width="30" height="4" rx="2" fill="#6C5CE7" opacity="0.4"/>
                 <rect x="14" y="30" width="54" height="4" rx="2" fill="#3355E0" opacity="0.5"/>
                 <rect x="14" y="40" width="24" height="4" rx="2" fill="#12A594" opacity="0.4"/>
                 <rect x="14" y="50" width="40" height="4" rx="2" fill="#6C5CE7" opacity="0.4"/>
                 <rect x="14" y="60" width="50" height="4" rx="2" fill="#3355E0" opacity="0.5"/>
               </g>
               <g class="ai-gear" transform="translate(170,30)">
                 <circle r="12" fill="none" stroke="#6C5CE7" stroke-width="3"/>
                 <circle r="4" fill="#6C5CE7"/>
               </g>
               <g transform="translate(100,95)">
                 <rect x="-22" y="-30" width="44" height="34" rx="10" fill="#16171C" stroke="#3355E0" stroke-width="2.5"/>
                 <line x1="0" y1="-30" x2="0" y2="-40" stroke="#3355E0" stroke-width="2.5"/>
                 <circle cx="0" cy="-42" r="3.5" fill="#12A594" class="ai-antenna"/>
                 <circle cx="-10" cy="-16" r="4" fill="#12A594" class="ai-eye"/>
                 <circle cx="10" cy="-16" r="4" fill="#12A594" class="ai-eye"/>
               </g>
               <rect x="14" y="122" width="172" height="5" rx="2.5" fill="#2c2d35"/>
               <rect x="14" y="122" width="60" height="5" rx="2.5" fill="#3355E0" class="ai-progress"/>
             </svg>
           </div>`
          : `<video class="card-bg-video" muted loop playsinline preload="metadata" src="${p.video}"></video>`
      }
      <div class="card-tint"></div>
      <div class="card-num">${String(i + 1).padStart(2, "0")}</div>
      <div class="card-title">${p.title}${p.pending ? '<span class="card-status">In progress</span>' : ""}</div>
    </div>
  `,
  )
  .join("");

// Autoplay each card's background video once it's in view (saves bandwidth off-screen)
const cardVideoObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const vid = entry.target.querySelector(".card-bg-video");
      if (!vid) return;
      if (entry.isIntersecting) vid.play().catch(() => {});
      else vid.pause();
    });
  },
  { threshold: 0.2 },
);
document
  .querySelectorAll(".project-card")
  .forEach((card) => cardVideoObserver.observe(card));

const modal = document.getElementById("modal");
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => {
    const p = projects[card.dataset.index];
    document.getElementById("modal-num").textContent =
      `Project 0${Number(card.dataset.index) + 1}`;
    document.getElementById("modal-title").textContent = p.title;
    document.getElementById("modal-desc").textContent = p.desc;
    document.getElementById("modal-tags").innerHTML = p.tags
      .map((t) => `<span>${t}</span>`)
      .join("");
    const liveBtn = document.getElementById("modal-live");
    const gitBtn = document.getElementById("modal-git");
    if (p.pending) {
      liveBtn.style.display = "none";
      gitBtn.style.display = "none";
    } else {
      liveBtn.style.display = "inline-block";
      gitBtn.style.display = "inline-block";
      liveBtn.href = p.live;
      gitBtn.href = p.git;
    }
    modal.classList.add("active");
  });
});
function closeModal() {
  modal.classList.remove("active");
}
document.getElementById("modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* ---------------- Mobile nav toggle ---------------- */
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  }),
);

/* ---------------- Flowing "snake" line background (replaces dot particles) ---------------- */
const snakeLayer = document.getElementById("bg-particles");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function buildWavePath(unitWidth, segWidth, amp, y) {
  let d = `M0,${y}`;
  let x = 0,
    up = true;
  while (x < unitWidth - 0.5) {
    const nx = x + segWidth;
    const cy = up ? y - amp : y + amp;
    d += ` Q${x + segWidth / 2},${cy.toFixed(1)} ${nx},${y}`;
    x = nx;
    up = !up;
  }
  return d;
}

const snakeConfigs = [
  {
    color: "#3355E0",
    top: 10,
    amp: 16,
    segWidth: 110,
    dur: 26,
    reverse: false,
  },
  { color: "#6C5CE7", top: 30, amp: 22, segWidth: 140, dur: 34, reverse: true },
  { color: "#12A594", top: 50, amp: 14, segWidth: 95, dur: 22, reverse: false },
  { color: "#D98A5A", top: 68, amp: 20, segWidth: 130, dur: 30, reverse: true },
  {
    color: "#D9A441",
    top: 86,
    amp: 12,
    segWidth: 100,
    dur: 20,
    reverse: false,
  },
];

const REPEATS = 6;
let snakeCSS = "";
snakeConfigs.forEach((cfg, i) => {
  const unitWidth = cfg.segWidth * 4; // 4 segments per unit = 2 full up/down cycles
  const svgHeight = cfg.amp * 2 + 8;
  const y = svgHeight / 2;
  const d = buildWavePath(unitWidth, cfg.segWidth, cfg.amp, y);

  let pathsHTML = "";
  for (let k = 0; k < REPEATS; k++) {
    pathsHTML += `<path d="${d}" transform="translate(${k * unitWidth},0)" fill="none" stroke="${cfg.color}" stroke-width="2.5" stroke-linecap="round" opacity="0.35"/>`;
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${unitWidth * REPEATS} ${svgHeight}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.classList.add("snake-line");
  svg.style.cssText = `top:${cfg.top}%; width:${unitWidth * REPEATS}px; height:${svgHeight}px; animation:${reduceMotion ? "none" : `snakeMove${i} ${cfg.dur}s linear infinite`};`;
  svg.innerHTML = pathsHTML;
  snakeLayer.appendChild(svg);

  const from = cfg.reverse ? `-${unitWidth}px` : "0px";
  const to = cfg.reverse ? "0px" : `-${unitWidth}px`;
  snakeCSS += `@keyframes snakeMove${i}{ from{ transform:translateX(${from}); } to{ transform:translateX(${to}); } }`;
});
const snakeStyleTag = document.createElement("style");
snakeStyleTag.textContent = snakeCSS;
document.head.appendChild(snakeStyleTag);

/* Grid drifts gently on scroll for parallax depth */
let ticking = false;
function onScroll() {
  document.getElementById("bg-grid").style.transform =
    `translateY(${window.scrollY * 0.08}px)`;
  ticking = false;
}
window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
});

/* ---------------- Reveal on scroll ---------------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------------- Rocket launch transition for outbound links ---------------- */
const launchOverlay = document.getElementById("launch-transition");
function playLaunchTransition(href, target) {
  launchOverlay.classList.add("show");
  setTimeout(() => {
    if (target === "_blank") {
      window.open(href, "_blank", "noopener");
      launchOverlay.classList.remove("show");
    } else {
      window.location.href = href;
    }
  }, 950);
}
document.querySelectorAll(".launch-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return; // ignore unset project links
    e.preventDefault();
    playLaunchTransition(href, this.getAttribute("target"));
  });
});

/* ---------------- Scroll progress bar ---------------- */
const scrollProgress = document.getElementById("scroll-progress");
function updateScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + "%";
}
window.addEventListener("scroll", updateScrollProgress);
updateScrollProgress();

/* ---------------- Custom cursor (mouse-pointer devices only) ---------------- */
if (window.matchMedia("(pointer: fine)").matches) {
  document.body.classList.add("custom-cursor");
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  let ringX = window.innerWidth / 2,
    ringY = window.innerHeight / 2;
  let targetX = ringX,
    targetY = ringY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });

  function animateCursorRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursorRing);
  }
  animateCursorRing();

  document.querySelectorAll("a, button, .skill-chip").forEach((el) => {
    el.addEventListener("mouseenter", () => cursorRing.classList.add("hover"));
    el.addEventListener("mouseleave", () =>
      cursorRing.classList.remove("hover"),
    );
  });

  const cursorRingText = document.getElementById("cursor-ring-text");
  document.querySelectorAll(".project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.classList.add("project-hover");
      document.body.classList.add("project-hovering");
      cursorRingText.textContent = el.classList.contains("pending")
        ? "Soon"
        : "View";
    });
    el.addEventListener("mouseleave", () => {
      cursorRing.classList.remove("project-hover");
      document.body.classList.remove("project-hovering");
      cursorRingText.textContent = "";
    });
  });
}

/* ---------------- Back to top ---------------- */
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 600) backToTop.classList.add("show");
  else backToTop.classList.remove("show");
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
