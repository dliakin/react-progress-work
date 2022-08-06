const modal = document.querySelector("#modal");
const content = document.querySelector("#content");
const backdrop = document.querySelector("#modal-backdrop");
const progress = document.querySelector("#progress");

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
backdrop.addEventListener("click", closeCard);

function openCard() {
  modal.classList.add("open");
}

function closeCard() {
  modal.classList.remove("open");
}

function renderCards() {
  if (technologies.length === 0) {
    content.innerHTML = `<p class="empty">Технологий пока нет. Добавьте первую.</p>`;
  } else {
    content.innerHTML = technologies.map(toCard).join("");
  }
}

function toCard(tech) {
  return `<div class="card ${tech.done ? "done" : ""}"><h3>${tech.title}</h3></div>`;
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
