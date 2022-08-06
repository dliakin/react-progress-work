const modal = document.querySelector("#modal");
const content = document.querySelector("#content");
const backdrop = document.querySelector("#modal-backdrop");
const progress = document.querySelector("#progress");

const APP_TITLE = document.title;

const technologies = [
  {
    title: "HTML",
    description: "HTML TEXT",
    type: "html",
    done: true,
  },
  {
    title: "CSS",
    description: "CSS TEXT",
    type: "css",
    done: false,
  },
  {
    title: "JavaScript",
    description: "JavaScript TEXT",
    type: "javascript",
    done: false,
  },
  {
    title: "REACT",
    description: "REACT TEXT",
    type: "react",
    done: false,
  },
];

content.addEventListener("click", openCard);
backdrop.addEventListener("click", closeModal);
modal.addEventListener("change", toggleTech);

function openCard(event) {
  const data = event.target.dataset;
  const tech = technologies.find((t) => t.type === data.cardtype);
  if (!tech) return;
  openModal(toModal(tech), tech.title);
}

function closeModal() {
  document.title = APP_TITLE;
  modal.classList.remove("open");
}

function openModal(html, title = APP_TITLE) {
  document.title = `${title} | ${APP_TITLE}`;
  modal.innerHTML = html;
  modal.classList.add("open");
}

function toModal(tech) {
  const checked = tech.done ? "checked" : "";
  return ` 
    <h2>${tech.title}</h2>
    <p>${tech.description}</p>
    <hr />
    <div>
        <input type="checkbox" id="done" ${checked} data-type="${tech.type}"/>
        <label for="done">Выучил</label>
    </div>
  `;
}

function toggleTech(event) {
  const type = event.target.dataset.type;
  const tech = technologies.find((t) => t.type === type);
  tech.done = event.target.checked;
  init();
}

function renderCards() {
  if (technologies.length === 0) {
    content.innerHTML = `<p class="empty">Технологий пока нет. Добавьте первую.</p>`;
  } else {
    content.innerHTML = technologies.map(toCard).join("");
  }
}

function toCard(tech) {
  return `<div class="card ${tech.done ? "done" : ""}" data-cardType="${tech.type}"><h3 data-cardType="${tech.type}">${tech.title}</h3></div>`;
}

function renderProgress() {
  const percent = computeProgressPersent();
  let background;
  if (percent <= 30) {
    background = "#e75a5a";
  } else if (percent <= 70) {
    background = "#f99415";
  } else {
    background = "#73ba3c";
  }
  progress.style.background = background;
  progress.style.width = percent + "%";
  progress.textContent = percent ? percent + "%" : "";
}

function computeProgressPersent() {
  if (technologies.length === 0) return 0;
  let doneCount = technologies.filter((tech) => tech.done === true).length;
  return Math.round((100 * doneCount) / technologies.length);
}

function init() {
  renderCards();
  renderProgress();
}

init();
