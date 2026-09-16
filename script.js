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
    cat: "Backend framework",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "React",
    cat: "Frontend library",
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
    cat: "Code hosting",
    color: "#8fa0b8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "Postman",
    cat: "API testing",
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
const skillsGrid = document.getElementById("skills-grid");
skillsGrid.innerHTML = skills
  .map(
    (s, i) => `
    <div class="skill-chip" style="--chip-color:${s.color}" data-icon="${s.icon}" data-color="${s.color}">
      <div class="icon-badge"><img src="${s.icon}" alt="${s.name} logo" loading="lazy"></div>
      <span>${s.name}</span>
      <div class="skill-cat">${s.cat}</div>
      <div class="click-hint">tap to launch &rarr;</div>
    </div>
  `,
  )
  .join("");

/* ---------------- Skill click "blast" ---------------- */
document.querySelectorAll(".skill-chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    const icon = chip.dataset.icon;
    const color = chip.dataset.color;
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
  });
});

/* ---------------- Rocket launch background ---------------- */
const rocketLayer = document.getElementById("rocket-layer");
const rocketSVG = `
    <svg viewBox="0 0 34 70" xmlns="http://www.w3.org/2000/svg">
      <ellipse class="flame" cx="17" cy="62" rx="6" ry="12" fill="#f59e0b"/>
      <ellipse class="flame" cx="17" cy="60" rx="3.5" ry="8" fill="#fde68a"/>
      <path d="M17 2 C26 14 27 32 24 46 L10 46 C7 32 8 14 17 2 Z" fill="#e2e8f0"/>
      <path d="M17 2 C22 10 24 20 24 30 L10 30 C10 20 12 10 17 2 Z" fill="#38bdf8"/>
      <circle cx="17" cy="24" r="4.5" fill="#0d1626"/>
      <path d="M10 34 L2 46 L10 46 Z" fill="#818cf8"/>
      <path d="M24 34 L32 46 L24 46 Z" fill="#818cf8"/>
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
    tags: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://cartora-store.vercel.app/",
    git: "https://github.com/harshdahat20-web/ecommerce-frontend",
    video: "videos/ecommerce-bg.mp4",
  },
  {
    title: "Real-Time Chat Application",
    short:
      "A real-time messaging app powered by Socket.io for instant, bidirectional chat.",
    desc: "A real-time chat application enabling instant, bidirectional communication between users. Built with Socket.io to handle live message delivery and connection state, keeping conversations perfectly in sync without page reloads.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    live: "https://chat-application-seven-ruby.vercel.app",
    git: "https://github.com/harshdahat20-web/chat-Application",
    video: "videos/chat-bg.mp4",
  },
  {
    title: "Collaborative Code Editor",
    short:
      "A real-time collaborative editor where multiple users can code together simultaneously.",
    desc: "A collaborative code editor that lets multiple users write and edit code together in real time. Powered by Socket.io, it synchronizes changes instantly across all connected clients, enabling a shared live-coding experience.",
    tags: ["React", "Node.js", "Socket.io"],
    live: "https://code-editor-eight-bice.vercel.app",
    git: "https://github.com/harshdahat20-web/Code-editor",
    video: "videos/codeeditor-bg.mp4",
  },
  {
    title: "School Management System (SMS)",
    short:
      "A role-based school management system with admin, teacher, and student panels.",
    desc: "A school management system built with dedicated, role-based panels for admins, teachers, and students. Covers day-to-day academic workflows — including managing records, communication, and access control tailored to each role.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
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
      <div>
        <div class="ph-num">Project 0${i + 1}${p.pending ? " · In progress" : ""}</div>
        <h3>${p.title}</h3>
        <p>${p.short}</p>
      </div>
      <div class="open-hint">${p.pending ? "more coming soon" : "click to view details"} <span>&rarr;</span></div>
    </div>
  `,
  )
  .join("");

const modal = document.getElementById("modal");
const modalBox = modal.querySelector(".modal-box");
const modalVideo = document.getElementById("modal-video");
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

    // Background: real project video, or the animated "in progress" AI scene
    if (p.pending) {
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalBox.classList.add("show-ai");
    } else {
      modalBox.classList.remove("show-ai");
      if (p.video) {
        if (modalVideo.getAttribute("src") !== p.video) {
          modalVideo.src = p.video;
        }
        modalVideo.currentTime = 0;
        modalVideo.play().catch(() => {});
      } else {
        modalVideo.pause();
        modalVideo.removeAttribute("src");
      }
    }

    modal.classList.add("active");
  });
});
function closeModal() {
  modal.classList.remove("active");
  modalVideo.pause();
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

/* ---------------- Floating background particles ---------------- */
const particleLayer = document.getElementById("bg-particles");
const particleColors = ["#38bdf8", "#818cf8", "#61dafb"];
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let particleCSS = "";
for (let i = 0; i < 40; i++) {
  const size = (Math.random() * 3 + 1.5).toFixed(1);
  const left = (Math.random() * 100).toFixed(2);
  const top = (Math.random() * 100).toFixed(2);
  const color = particleColors[i % particleColors.length];
  const dur = (Math.random() * 14 + 10).toFixed(1);
  const delay = (Math.random() * 8).toFixed(1);
  const dx = (Math.random() * 120 - 60).toFixed(0);
  const dy = (Math.random() * 120 - 60).toFixed(0);
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `width:${size}px;height:${size}px;left:${left}%;top:${top}%;background:${color};opacity:${(Math.random() * 0.5 + 0.35).toFixed(2)};animation:${reduceMotion ? "none" : `wander${i} ${dur}s ease-in-out ${delay}s infinite alternate`}`;
  particleLayer.appendChild(el);
  particleCSS += `@keyframes wander${i}{ from{ transform:translate(0,0); } to{ transform:translate(${dx}px, ${dy}px); } }`;
}
const styleTag = document.createElement("style");
styleTag.textContent = particleCSS;
document.head.appendChild(styleTag);

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
