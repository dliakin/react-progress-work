const modal = document.querySelector("#modal");
const content = document.querySelector("#content");
const backdrop = document.querySelector("#modal-backdrop");
const progress = document.querySelector("#progress");
const form = document.querySelector("#form");

const APP_TITLE = document.title;
const LS_KEY = "MY_TECTS";

const technologies = getState();

content.addEventListener("click", openCard);
backdrop.addEventListener("click", closeModal);
modal.addEventListener("change", toggleTech);
form.addEventListener("submit", createTech);

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
  saveState();
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

function isInvalid(title, description) {
  return !title.value || !description.value;
}

function createTech(event) {
  event.preventDefault();
  const { title, description } = event.target;
  if (isInvalid(title, description)) {
    if (!title.value) title.classList.add("invalid");
    if (!description.value) description.classList.add("invalid");
    setTimeout(() => {
      title.classList.remove("invalid");
    }, 2000);
    return;
  }
  const newTech = {
    title: title.value,
    description: description.value,
    done: false,
    type: title.value.toLowerCase(),
  };

  technologies.push(newTech);
  title.value = description.value = "";
  saveState();
  init();
}

function saveState() {
  localStorage.setItem(LS_KEY, JSON.stringify(technologies));
}

function getState() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : [];
}

init();
