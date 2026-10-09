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
      <path d="M17 2 C26 14 27 32 24 46 L10 46 C7 32 8 14 17 2 Z" fill="#1C2033" stroke="#3F4FA3" stroke-width="1.2"/>
      <path d="M17 2 C22 10 24 20 24 30 L10 30 C10 20 12 10 17 2 Z" fill="#3F4FA3"/>
      <circle cx="17" cy="24" r="4.5" fill="#F5F3EE"/>
      <path d="M10 34 L2 46 L10 46 Z" fill="#C4553F"/>
      <path d="M24 34 L32 46 L24 46 Z" fill="#C4553F"/>
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
      "A full-featured e-commerce platform with separate admin and user panels for managing products, orders, and checkout.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Separate admin and user dashboards with role-based access",
      "Full cart-to-checkout flow with order management",
      "Product and inventory management for admins",
    ],
    live: "https://cartora-store.vercel.app/",
    git: "https://github.com/harshdahat20-web/ecommerce-frontend",
    video: "videos/ecommerce-bg.mp4",
  },
  {
    title: "Real-Time Chat Application",
    short:
      "A real-time messaging app powered by Socket.io for instant, bidirectional chat between users.",
    tags: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    features: [
      "Real-time bidirectional messaging via Socket.io",
      "Persistent chat history stored in MongoDB",
      "JWT-authenticated user sessions",
    ],
    live: "https://chat-application-seven-ruby.vercel.app",
    git: "https://github.com/harshdahat20-web/chat-Application",
    video: "videos/chat-bg.mp4",
  },
  {
    title: "Collaborative Code Editor",
    short:
      "A real-time collaborative editor where multiple users can write and edit code together simultaneously.",
    tags: ["Next.js", "Node.js", "Express", "Socket.io"],
    features: [
      "Live multi-user editing synced instantly via Socket.io",
      "Built with Next.js for fast, SEO-friendly performance",
      "Session-based access with JWT authentication",
    ],
    live: "https://code-editor-eight-bice.vercel.app",
    git: "https://github.com/harshdahat20-web/Code-editor",
    video: "videos/codeeditor-bg.mp4",
  },
  {
    title: "School Management System",
    short:
      "A role-based school management system with dedicated admin, teacher, and student panels.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    features: [
      "Role-based panels for admin, teacher, and student",
      "Attendance and academic record management",
      "Secure, role-based access control throughout",
    ],
    live: "https://school-management-system-phi-murex.vercel.app",
    git: "https://github.com/harshdahat20-web/School-Management-System",
    video: "videos/sms-bg.mp4",
  },
  {
    title: "Generative AI Project",
    short:
      "An AI-powered application currently in active development — more details coming soon.",
    tags: ["Generative AI"],
    features: [],
    live: "#",
    git: "#",
    pending: true,
  },
];

const aiBgSVG = `
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
      <g class="ai-codelines">
        <rect x="14" y="10" width="46" height="4" rx="2" fill="#3F4FA3" opacity="0.5"/>
        <rect x="14" y="20" width="30" height="4" rx="2" fill="#C4553F" opacity="0.4"/>
        <rect x="14" y="30" width="54" height="4" rx="2" fill="#3F4FA3" opacity="0.5"/>
        <rect x="14" y="40" width="24" height="4" rx="2" fill="#2E9C8F" opacity="0.4"/>
        <rect x="14" y="50" width="40" height="4" rx="2" fill="#C4553F" opacity="0.4"/>
        <rect x="14" y="60" width="50" height="4" rx="2" fill="#3F4FA3" opacity="0.5"/>
      </g>
      <g class="ai-gear" transform="translate(170,30)">
        <circle r="12" fill="none" stroke="#C4553F" stroke-width="3"/>
        <circle r="4" fill="#C4553F"/>
      </g>
      <g transform="translate(100,95)">
        <rect x="-22" y="-30" width="44" height="34" rx="10" fill="#14162A" stroke="#3F4FA3" stroke-width="2.5"/>
        <line x1="0" y1="-30" x2="0" y2="-40" stroke="#3F4FA3" stroke-width="2.5"/>
        <circle cx="0" cy="-42" r="3.5" fill="#2E9C8F" class="ai-antenna"/>
        <circle cx="-10" cy="-16" r="4" fill="#2E9C8F" class="ai-eye"/>
        <circle cx="10" cy="-16" r="4" fill="#2E9C8F" class="ai-eye"/>
      </g>
      <rect x="14" y="122" width="172" height="5" rx="2.5" fill="#2B2F55"/>
      <rect x="14" y="122" width="60" height="5" rx="2.5" fill="#3F4FA3" class="ai-progress"/>
    </svg>`;

const projectsGrid = document.getElementById("projects-grid");
projectsGrid.innerHTML = projects
  .map(
    (p, i) => `
    <div class="project-row frame-box${p.pending ? " pending" : ""}">
      <div class="frame-tab">${String(i + 1).padStart(2, "0")}<small>/ ${String(projects.length).padStart(2, "0")}</small></div>
      <div class="project-media">
        ${
          p.pending
            ? `<div class="card-ai-bg">${aiBgSVG}</div>`
            : `<video class="card-bg-video" muted loop playsinline preload="metadata" src="${p.video}"></video>`
        }
        <div class="card-tint"></div>
      </div>
      <div class="project-info">
        <h3>${p.title}${p.pending ? '<span class="card-status">In progress</span>' : ""}</h3>
        <p class="project-desc">${p.short}</p>
        <div class="project-tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        ${p.features.length ? `<ul class="project-features">${p.features.map((f) => `<li>${f}</li>`).join("")}</ul>` : ""}
        <div class="project-links">
          ${
            p.pending
              ? `<span class="pending-note">Live demo and source code will be added once development is complete.</span>`
              : `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary launch-link">Live Demo</a>
               <a href="${p.git}" target="_blank" rel="noopener" class="btn btn-ghost launch-link">GitHub</a>`
          }
        </div>
      </div>
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
  .querySelectorAll(".project-media")
  .forEach((media) => cardVideoObserver.observe(media));

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

/* ---------------- GSAP + ScrollTrigger availability ---------------- */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const gsapReady =
  typeof gsap !== "undefined" &&
  typeof ScrollTrigger !== "undefined" &&
  !prefersReducedMotion;
if (gsapReady) {
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-ready");
}

/* ---------------- Immersive 3D world (Three.js) ----------------
     One fixed canvas behind the page. Scrolling flies the camera through a
     series of "stations" (hero core, code panels, tech swarm, project frames,
     contact planet). Falls back to the plain CSS grid if WebGL is unavailable. */
(function initWorld() {
  const root = document.documentElement;
  const canvas = document.getElementById("world-canvas");
  if (!canvas || typeof THREE === "undefined") {
    root.classList.add("no-world");
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
  } catch (err) {
    canvas.style.display = "none";
    root.classList.add("no-world");
    return;
  }
  root.classList.add("world-on");
  renderer.setClearColor(0x000000, 0);

  const isMobile = window.innerWidth < 760;
  const sx = isMobile ? 0.4 : 1; // squeeze side objects on narrow screens
  const tScale = prefersReducedMotion ? 0 : 1; // freeze idle motion for reduced-motion users

  const LIGHT_FOG = new THREE.Color(0xf5f3ee);
  const DARK_FOG = new THREE.Color(0x14162a);
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf5f3ee, 12, isMobile ? 55 : 78);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 220);
  camera.position.set(0, 0, 11);

  scene.add(new THREE.AmbientLight(0xffffff, 0.85));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(3, 5, 6);
  scene.add(sun);

  const sage = 0x3f4fa3,
    clay = 0xe2725b,
    teal = 0x2e9c8f,
    rust = 0xb4547a,
    gold = 0xe3a72f,
    charcoal = 0x1c2033;
  const palette = [sage, clay, teal, charcoal];

  function rectLoop(w, h, color, opacity) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, -h / 2, 0),
      new THREE.Vector3(w / 2, h / 2, 0),
      new THREE.Vector3(-w / 2, h / 2, 0),
    ]);
    return new THREE.LineLoop(
      geo,
      new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
    );
  }
  function makeLabel(text, color) {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 128;
    const ctx = c.getContext("2d");
    ctx.font = 'italic 700 84px "Playfair Display", Georgia, serif';
    ctx.fillStyle = color;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 12, 64);
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(c),
        transparent: true,
        opacity: 0.6,
      }),
    );
    sprite.scale.set(2.6, 1.3, 1);
    return sprite;
  }

  /* ----- Station 0: hero core (wireframe icosahedron + rings + satellites) ----- */
  const hero = new THREE.Group();
  scene.add(hero);
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.3, 1),
    new THREE.MeshBasicMaterial({
      color: sage,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.3 : 0.42,
    }),
  );
  hero.add(core);
  const ring1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.3, 0.016, 8, 140),
    new THREE.MeshBasicMaterial({
      color: clay,
      transparent: true,
      opacity: 0.75,
    }),
  );
  ring1.rotation.x = Math.PI / 2.4;
  hero.add(ring1);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(2.85, 0.012, 8, 140),
    new THREE.MeshBasicMaterial({
      color: teal,
      transparent: true,
      opacity: 0.7,
    }),
  );
  ring2.rotation.set(Math.PI / 5, Math.PI / 3, 0);
  hero.add(ring2);
  const satGeoms = [
    new THREE.BoxGeometry(0.32, 0.32, 0.32),
    new THREE.OctahedronGeometry(0.27),
    new THREE.TetrahedronGeometry(0.32),
  ];
  const satellites = [];
  const satCount = isMobile ? 9 : 16;
  for (let i = 0; i < satCount; i++) {
    const m = new THREE.Mesh(
      satGeoms[i % 3],
      new THREE.MeshStandardMaterial({
        color: palette[i % 4],
        roughness: 0.55,
        metalness: 0.1,
        flatShading: true,
      }),
    );
    m.userData = {
      radius: 3.1 + Math.random() * 1.1,
      angle: Math.random() * Math.PI * 2,
      speed: (0.12 + Math.random() * 0.22) * (Math.random() < 0.5 ? 1 : -1),
      incl: (Math.random() - 0.5) * 1.6,
      spin: 0.4 + Math.random() * 0.8,
    };
    hero.add(m);
    satellites.push(m);
  }

  /* ----- Station 1 (About, z≈-40): floating code windows ----- */
  function codePanel(w, h, color) {
    const g = new THREE.Group();
    g.add(rectLoop(w, h, color, 0.85));
    const rows = 5;
    for (let i = 0; i < rows; i++) {
      const bw = w * (0.3 + Math.random() * 0.5);
      const bar = new THREE.Mesh(
        new THREE.PlaneGeometry(bw, 0.09),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.5,
          side: THREE.DoubleSide,
        }),
      );
      bar.position.set(
        -w / 2 + bw / 2 + 0.25,
        h / 2 - 0.5 - i * ((h - 0.9) / rows),
        0.01,
      );
      g.add(bar);
    }
    return g;
  }
  const panels = [];
  [
    { x: -6.6, y: 1.4, z: -38, w: 4.2, h: 2.8, ry: 0.5, c: sage },
    { x: 6.8, y: -1.2, z: -41, w: 3.8, h: 2.6, ry: -0.5, c: clay },
    { x: -5.2, y: -3.2, z: -46, w: 3.2, h: 2.2, ry: 0.35, c: teal },
    { x: 5.6, y: 3.2, z: -48, w: 3.6, h: 2.4, ry: -0.4, c: rust },
  ].forEach((p, i) => {
    const g = codePanel(p.w, p.h, p.c);
    g.position.set(p.x * sx, p.y, p.z);
    g.rotation.y = p.ry;
    g.userData = { baseY: p.y, baseRy: p.ry, phase: i * 1.7 };
    scene.add(g);
    panels.push(g);
  });

  /* ----- Station 2 (Skills, z≈-72): torus knot + orbiting swarm ----- */
  const knot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1.6, 0.36, 90, 12),
    new THREE.MeshBasicMaterial({
      color: clay,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    }),
  );
  knot.position.set(6.6 * sx, 0.6, -72);
  scene.add(knot);
  const swarm = new THREE.Group();
  swarm.position.set(-6.2 * sx, -0.6, -74);
  scene.add(swarm);
  const swarmItems = [];
  const swarmGeo = new THREE.OctahedronGeometry(0.28);
  for (let i = 0; i < 13; i++) {
    const m = new THREE.Mesh(
      swarmGeo,
      new THREE.MeshStandardMaterial({
        color: palette[i % 4],
        roughness: 0.5,
        flatShading: true,
      }),
    );
    m.userData = {
      r: 1.6 + (i % 3) * 0.55,
      a: (i / 13) * Math.PI * 2,
      s: 0.35 + (i % 4) * 0.08,
      tilt: (i % 5) * 0.4,
    };
    swarm.add(m);
    swarmItems.push(m);
  }

  /* ----- Station 3 (Projects, z -92…-122): a tunnel of numbered frames ----- */
  const frames = [];
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group();
    const col = [sage, clay, teal, rust, gold][i];
    g.add(rectLoop(13.5, 7.6, col, 0.45));
    const label = makeLabel(
      `0${i + 1}`,
      "#" + col.toString(16).padStart(6, "0"),
    );
    label.position.set(-5.0, 3.0, 0.02);
    g.add(label);
    g.position.set(0, 0, -92 - i * 6.5);
    g.rotation.z = (i - 2) * 0.05;
    g.userData = { spin: (i % 2 ? 1 : -1) * 0.04 };
    scene.add(g);
    frames.push(g);
  }

  /* ----- Station 4 (Contact, z≈-146): wireframe planet ----- */
  const planet = new THREE.Group();
  planet.position.set(4.8 * sx, -0.6, -148);
  scene.add(planet);
  const globe = new THREE.Mesh(
    new THREE.IcosahedronGeometry(6, 2),
    new THREE.MeshBasicMaterial({
      color: sage,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    }),
  );
  planet.add(globe);
  const planetRing = new THREE.Mesh(
    new THREE.TorusGeometry(9, 0.04, 8, 160),
    new THREE.MeshBasicMaterial({
      color: gold,
      transparent: true,
      opacity: 0.6,
    }),
  );
  planetRing.rotation.x = 1.25;
  planet.add(planetRing);

  /* ----- Ambient world: floor grid + dust + snake-tubes ----- */
  const grid = new THREE.GridHelper(260, 104, sage, sage);
  grid.material.transparent = true;
  grid.material.opacity = 0.18;
  grid.position.set(0, -7.5, -70);
  scene.add(grid);

  const dustCount = isMobile ? 450 : 1000;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 70;
    dustPos[i * 3 + 1] = (Math.random() - 0.5) * 32;
    dustPos[i * 3 + 2] = 20 - Math.random() * 190;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  scene.add(
    new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: sage,
        size: 0.09,
        transparent: true,
        opacity: 0.7,
      }),
    ),
  );

  const snakeColors = [sage, clay, teal, rust, gold];
  const snakes = [];
  const snakeCount = isMobile ? 3 : 5;
  for (let s = 0; s < snakeCount; s++) {
    const seed = s * 1.7;
    const pts = [];
    for (let k = 0; k <= 14; k++) {
      pts.push(
        new THREE.Vector3(
          Math.sin(k * 0.8 + seed) * (6 + s) * sx,
          Math.cos(k * 0.9 + seed * 1.3) * (3.2 + 0.4 * s),
          14 - k * 12,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    scene.add(
      new THREE.Mesh(
        new THREE.TubeGeometry(curve, 220, 0.032, 6, false),
        new THREE.MeshBasicMaterial({
          color: snakeColors[s],
          transparent: true,
          opacity: 0.4,
        }),
      ),
    );
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.17, 12, 12),
      new THREE.MeshBasicMaterial({ color: snakeColors[s] }),
    );
    scene.add(head);
    snakes.push({
      curve,
      head,
      t: Math.random(),
      speed: 0.012 + Math.random() * 0.02,
    });
  }

  /* ----- Layout / measurements ----- */
  let heroBaseX = 0,
    heroBaseY = 0,
    heroBaseScale = 1;
  let keys = [];
  let contactTop = 1e9;
  const heroEl = document.getElementById("hero");

  function measure() {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const top = (id) => {
      const el = document.getElementById(id);
      return el ? el.offsetTop : 0;
    };
    contactTop = top("contact") || 1e9;
    keys = [
      { y: 0, z: 11 },
      { y: top("about"), z: -28 },
      { y: top("skills"), z: -62 },
      { y: top("projects"), z: -86 },
      {
        y: Math.max(top("projects") + 1, contactTop - window.innerHeight),
        z: -116,
      },
      { y: Math.min(maxScroll, contactTop), z: -134 },
      { y: maxScroll + 1, z: -138 },
    ];
    for (let i = 1; i < keys.length; i++) {
      if (keys[i].y <= keys[i - 1].y) keys[i].y = keys[i - 1].y + 1;
    }
  }
  function layout() {
    const cw = document.documentElement.clientWidth;
    const ch = window.innerHeight;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(cw, ch, false);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();

    // Park the hero core where the code card sits (desktop) / top-right (mobile)
    const wide = cw > 980;
    const heroRight = heroEl ? (cw + heroEl.offsetWidth) / 2 : cw;
    const pxX = wide ? heroRight - (window.innerWidth * 0.06 + 150) : cw * 0.76;
    const pxY = wide ? ch * 0.5 : ch * 0.2;
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 11;
    heroBaseX = ((pxX / cw) * 2 - 1) * halfH * camera.aspect;
    heroBaseY = (1 - (pxY / ch) * 2) * halfH;
    heroBaseScale = wide ? Math.min(0.85, cw / 1500) : cw < 600 ? 0.42 : 0.6;
    measure();
  }

  function cameraZ(y) {
    if (y <= keys[0].y) return keys[0].z;
    for (let i = 1; i < keys.length; i++) {
      if (y <= keys[i].y) {
        let t = (y - keys[i - 1].y) / (keys[i].y - keys[i - 1].y);
        t = t * t * (3 - 2 * t); // ease: camera lingers at each station
        return keys[i - 1].z + (keys[i].z - keys[i - 1].z) * t;
      }
    }
    return keys[keys.length - 1].z;
  }

  /* ----- Interaction + loop ----- */
  const mouse = { x: 0, y: 0 },
    smooth = { x: 0, y: 0 };
  window.addEventListener(
    "mousemove",
    (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  const intro = { v: gsapReady ? 0 : 1 };
  if (gsapReady)
    gsap.to(intro, { v: 1, duration: 1.8, ease: "power3.out", delay: 0.3 });

  let scrollSmooth = window.scrollY,
    elapsed = 0,
    dark = false,
    running = false;
  let last = performance.now() / 1000;

  function update(dt) {
    const k = (rate) => (dt === 0 ? 1 : 1 - Math.exp(-dt * rate));
    elapsed += dt * tScale;
    smooth.x += (mouse.x - smooth.x) * k(3);
    smooth.y += (mouse.y - smooth.y) * k(3);
    scrollSmooth += (window.scrollY - scrollSmooth) * k(7);

    // Camera flies along the path, with a gentle sway + mouse parallax
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    const p = Math.min(1, Math.max(0, scrollSmooth / maxScroll));
    const z = cameraZ(scrollSmooth);
    const cx = Math.sin(p * 7) * 1.0 * sx + smooth.x * 0.7;
    const cy = Math.cos(p * 5) * 0.45 - smooth.y * 0.5;
    camera.position.set(cx, cy, z);
    camera.lookAt(cx * 0.4, cy * 0.4, z - 12);

    // Day → night: the world darkens as the contact section arrives
    const wantDark = window.scrollY + window.innerHeight * 0.6 > contactTop;
    if (wantDark !== dark) {
      dark = wantDark;
      document.body.classList.toggle("world-dark", dark);
    }
    scene.fog.color.lerp(dark ? DARK_FOG : LIGHT_FOG, k(2.5));

    // Hero core
    hero.position.set(heroBaseX, heroBaseY, 0);
    hero.scale.setScalar(Math.max(0.0001, heroBaseScale * intro.v));
    hero.rotation.y = elapsed * 0.12 + smooth.x * 0.5;
    hero.rotation.x = smooth.y * 0.3;
    core.rotation.y += dt * 0.18 * tScale;
    core.rotation.x += dt * 0.07 * tScale;
    ring1.rotation.z += dt * 0.25 * tScale;
    ring2.rotation.z -= dt * 0.2 * tScale;
    satellites.forEach((m) => {
      const d = m.userData;
      d.angle += d.speed * dt * tScale;
      const x = d.radius * Math.cos(d.angle),
        s = d.radius * Math.sin(d.angle);
      m.position.set(x, s * Math.sin(d.incl), s * Math.cos(d.incl));
      m.rotation.x += d.spin * dt * tScale;
      m.rotation.y += d.spin * dt * 0.7 * tScale;
    });

    // About panels bob + sway
    panels.forEach((g) => {
      const d = g.userData;
      g.position.y = d.baseY + Math.sin(elapsed * 0.6 + d.phase) * 0.25;
      g.rotation.y = d.baseRy + Math.sin(elapsed * 0.3 + d.phase) * 0.15;
    });

    // Skills knot + swarm
    knot.rotation.x += dt * 0.25 * tScale;
    knot.rotation.y += dt * 0.35 * tScale;
    swarmItems.forEach((m) => {
      const d = m.userData;
      d.a += d.s * dt * tScale;
      m.position.set(
        Math.cos(d.a) * d.r,
        Math.sin(d.a * 1.3) * 0.8 + d.tilt * 0.3,
        Math.sin(d.a) * d.r,
      );
      m.rotation.x += dt * tScale;
      m.rotation.y += dt * 0.8 * tScale;
    });

    // Project frames drift, planet turns, snakes slither
    frames.forEach((g) => {
      g.rotation.z += g.userData.spin * dt * tScale * 0.2;
    });
    globe.rotation.y += dt * 0.05 * tScale;
    planetRing.rotation.z += dt * 0.04 * tScale;
    snakes.forEach((sn) => {
      sn.t = (sn.t + sn.speed * dt * tScale) % 1;
      sn.head.position.copy(sn.curve.getPointAt(sn.t));
    });
  }

  function frame() {
    requestAnimationFrame(frame);
    const now = performance.now() / 1000;
    const dt = Math.min(now - last, 0.05);
    last = now;
    update(dt);
    renderer.render(scene, camera);
  }
  function start() {
    if (running) return;
    running = true;
    last = performance.now() / 1000;
    frame();
  }

  window.addEventListener("resize", layout);
  window.addEventListener("load", () => {
    layout();
    setTimeout(measure, 1200);
  });
  if (typeof ResizeObserver !== "undefined")
    new ResizeObserver(measure).observe(document.body);
  layout();
  update(0);
  renderer.render(scene, camera);
  start();
})();

/* ---------------- Reveal on scroll ---------------- */
if (gsapReady) {
  // 3D-flavoured entrances driven by GSAP ScrollTrigger
  document.querySelectorAll(".reveal").forEach((el) => {
    const from = {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      transformPerspective: 900,
    };
    if (el.classList.contains("reveal-left"))
      Object.assign(from, { x: -60, y: 0, rotateY: 12 });
    else if (el.classList.contains("reveal-right"))
      Object.assign(from, { x: 60, y: 0, rotateY: -12 });
    else if (el.classList.contains("reveal-flip"))
      Object.assign(from, {
        rotateX: 35,
        y: 30,
        transformOrigin: "top center",
      });
    else if (el.classList.contains("reveal-rotate"))
      Object.assign(from, { rotate: -5, scale: 0.93, y: 30 });
    else if (el.classList.contains("project-row"))
      Object.assign(from, { rotateX: -16, y: 70, transformOrigin: "50% 100%" });
    gsap.from(el, {
      ...from,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // About window + project frames: 3D "coverflow" tilt tied to scroll position
  // (tilted when entering, flat when centred, tilted back when leaving)
  const boxes = document.querySelectorAll(".window-card, .frame-box");
  if (window.innerWidth >= 760) {
    boxes.forEach((box) => {
      gsap.set(box, { transformPerspective: 1100, transformOrigin: "50% 50%" });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: box,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .fromTo(
          box,
          { rotateX: 16, scale: 0.93, opacity: 0.15 },
          { rotateX: 0, scale: 1, opacity: 1, ease: "none", duration: 1 },
        )
        .to(box, {
          rotateX: -12,
          scale: 0.96,
          opacity: 0.55,
          ease: "none",
          duration: 1,
        });
    });
  } else {
    boxes.forEach((box) => {
      gsap.from(box, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: box, start: "top 90%", once: true },
      });
    });
  }

  // Stagger project tags + feature bullets
  document.querySelectorAll(".project-row").forEach((row) => {
    gsap.from(
      row.querySelectorAll(".project-tags span, .project-features li"),
      {
        opacity: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.06,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 80%", once: true },
      },
    );
  });

  // Skills ticker / carousel fade-up
  gsap.from("#skills-viewport, #skills-carousel-mobile", {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: "#skills", start: "top 75%", once: true },
  });

  // Mouse-driven 3D tilt on project thumbnails
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-row").forEach((row) => {
      const media = row.querySelector(".project-media");
      if (!media) return;
      gsap.set(media, { transformPerspective: 800 });
      row.addEventListener("mousemove", (e) => {
        const r = media.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(media, {
          rotateY: px * 14,
          rotateX: -py * 14,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
      row.addEventListener("mouseleave", () => {
        gsap.to(media, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    });
  }

  window.addEventListener("load", () => ScrollTrigger.refresh());
} else {
  // Fallback: simple IntersectionObserver reveal (no GSAP / reduced motion)
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
}

/* ---------------- Rocket launch transition for outbound links ---------------- */
const launchOverlay = document.getElementById("launch-transition");
function playLaunchTransition(href, target) {
  launchOverlay.classList.add("show");
  const isProtocolLink = href.startsWith("mailto:") || href.startsWith("tel:");
  setTimeout(() => {
    if (target === "_blank") {
      window.open(href, "_blank", "noopener");
      launchOverlay.classList.remove("show");
    } else {
      window.location.href = href;
      // mailto:/tel: links don't actually navigate the page away, so the
      // overlay would otherwise stay stuck on screen — hide it as a fallback.
      if (isProtocolLink) {
        setTimeout(() => launchOverlay.classList.remove("show"), 800);
      }
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
  document.querySelectorAll(".project-media").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorRing.classList.add("project-hover");
      document.body.classList.add("project-hovering");
      cursorRingText.textContent = el
        .closest(".project-row")
        .classList.contains("pending")
        ? "Soon"
        : "Preview";
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
