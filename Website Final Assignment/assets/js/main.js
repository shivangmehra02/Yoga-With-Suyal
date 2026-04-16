const programs = [
  {
    id: "three-day",
    title: "3 Days / Week",
    tag: "Flexible Routine",
    daysPattern: "Mon-Wed-Fri or Tue-Thu-Sat",
    mode: "Online / Offline / Hybrid",
    duration: "60 minutes per class",
    price: "₹2,999 /month",
    description: "Steady weekly improvement with balanced rest days.",
    features: [
      "Two pattern options available",
      "Personal posture correction",
      "Morning and evening slots",
    ],
  },
  {
    id: "five-day",
    title: "5 Days / Week",
    tag: "Recommended",
    daysPattern: "Monday to Friday",
    mode: "Online / Offline / Hybrid",
    duration: "60 minutes per class",
    price: "₹4,499 /month",
    description: "Fastest track for flexibility, stamina, and consistency.",
    features: [
      "High-frequency progress plan",
      "Therapeutic breathing work included",
      "Best for obesity and flexibility goals",
    ],
  },
  {
    id: "weekend-only",
    title: "Weekend Program",
    tag: "Weekend Only",
    daysPattern: "Saturday and Sunday",
    mode: "Online / Offline",
    duration: "75 minutes per class",
    price: "₹1,999 /month",
    description: "Ideal for busy professionals and students with tight schedules.",
    features: [
      "Longer 75-minute sessions",
      "Focus on mobility and stress release",
      "Saturday and Sunday batches",
    ],
  },
];

const scheduleByDay = {
  mon: [
    {
      title: "Therapeutic Yoga",
      time: "6:00 AM - 7:00 AM",
      mode: "Online / Offline",
    },
    {
      title: "Corrective Evening Batch",
      time: "6:30 PM - 7:30 PM",
      mode: "Online / Offline",
    },
  ],
  tue: [
    { title: "Breathwork + Stretch", time: "6:00 AM - 7:00 AM", mode: "Online" },
    { title: "Back Care Session", time: "7:00 PM - 8:00 PM", mode: "Offline" },
  ],
  wed: [
    { title: "Strength + Flexibility", time: "6:00 AM - 7:00 AM", mode: "Online / Offline" },
    { title: "Cervical Relief Batch", time: "6:30 PM - 7:30 PM", mode: "Online / Offline" },
  ],
  thu: [
    { title: "Morning Mobility", time: "6:30 AM - 7:30 AM", mode: "Online" },
    { title: "Therapeutic Group", time: "7:00 PM - 8:00 PM", mode: "Offline" },
  ],
  fri: [
    { title: "Flexibility Builder", time: "6:00 AM - 7:00 AM", mode: "Online / Offline" },
    { title: "Fat Burn Yoga", time: "6:30 PM - 7:30 PM", mode: "Online / Offline" },
  ],
  sat: [
    { title: "Weekend Core Session", time: "7:00 AM - 8:00 AM", mode: "Online / Offline" },
    { title: "Evening Recovery Flow", time: "5:30 PM - 6:30 PM", mode: "Online / Offline" },
  ],
  sun: [
    { title: "Weekend Wellness", time: "7:30 AM - 8:30 AM", mode: "Weekend Program" },
  ],
};

function renderPrograms() {
  const cardsContainer = document.querySelector("#program-cards");
  if (!cardsContainer) return;

  cardsContainer.innerHTML = programs
    .map(
      (program) => `
        <article class="program-card" id="${program.id}">
          <div class="program-header">
            <h3>${program.title}</h3>
            <span class="program-tag ${program.tag === "Recommended" ? "featured" : ""}">
              ${program.tag}
            </span>
          </div>
          <p class="program-price">${program.price}</p>
          <p class="program-description">${program.description}</p>
          <ul class="program-features">
            <li><span>Pattern:</span> ${program.daysPattern}</li>
            <li><span>Mode:</span> ${program.mode}</li>
            <li><span>Duration:</span> ${program.duration}</li>
            ${program.features.map((feature) => `<li>✓ ${feature}</li>`).join("")}
          </ul>
          <a class="btn btn-primary js-inquire" href="#contact" data-program="${program.title}">
            Inquire for this Model
          </a>
        </article>
      `
    )
    .join("");
}

function renderSchedulePanels() {
  const panelRoot = document.querySelector("#schedule-panels");
  if (!panelRoot) return;

  panelRoot.innerHTML = Object.entries(scheduleByDay)
    .map(
      ([day, items], index) => `
      <div class="schedule-panel ${index === 0 ? "is-active" : ""}" data-panel="${day}">
        ${items
          .map(
            (item) => `
            <article class="schedule-card">
              <h3>${item.title}</h3>
              <p><strong>Time:</strong> ${item.time}</p>
              <p><strong>Mode:</strong> ${item.mode}</p>
            </article>
          `
          )
          .join("")}
      </div>
    `
    )
    .join("");
}

function setupScheduleTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".schedule-panel");
  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const day = button.dataset.day;
      if (!day) return;

      tabButtons.forEach((tab) => tab.classList.remove("is-active"));
      panels.forEach((panel) => panel.classList.remove("is-active"));

      button.classList.add("is-active");
      const panel = document.querySelector(`.schedule-panel[data-panel="${day}"]`);
      if (panel) panel.classList.add("is-active");
    });
  });
}

function setupMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#site-nav");
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("is-open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupProgramSelectorSync() {
  const programSelect = document.querySelector("#program");
  if (!programSelect) return;

  const options = programs
    .map((program) => `<option value="${program.title}">${program.title}</option>`)
    .join("");
  programSelect.insertAdjacentHTML("beforeend", options);

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const inquireButton = target.closest(".js-inquire");
    if (!(inquireButton instanceof HTMLElement)) return;

    const selectedProgram = inquireButton.dataset.program;
    if (!selectedProgram) return;

    programSelect.value = selectedProgram;
    programSelect.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function setupRevealAnimations() {
  const revealNodes = document.querySelectorAll(".reveal");
  if (!revealNodes.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupNewsletterForm() {
  const newsletterForm = document.querySelector("#newsletter-form");
  if (!newsletterForm) return;

  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailInput = newsletterForm.querySelector("#newsletter-email");
    if (!(emailInput instanceof HTMLInputElement) || !emailInput.value.trim()) return;
    window.location.href = `mailto:hello@yogawithsuyal.com?subject=${encodeURIComponent(
      "Newsletter Subscription"
    )}&body=${encodeURIComponent(`Please add me to updates: ${emailInput.value.trim()}`)}`;
    newsletterForm.reset();
  });
}

function setYear() {
  const yearNode = document.querySelector("#year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());
}

renderPrograms();
renderSchedulePanels();
setupScheduleTabs();
setupMobileNav();
setupProgramSelectorSync();
setupRevealAnimations();
setupNewsletterForm();
setYear();
