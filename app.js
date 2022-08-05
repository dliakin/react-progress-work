const modal = document.querySelector("#modal");
const content = document.querySelector("#content");
const backdrop = document.querySelector("#modal-backdrop");

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
    done: true,
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

function init() {
  if (technologies.length === 0) {
    content.innerHTML = `<p class="empty">Технологий пока нет. Добавьте первую.</p>`;
  } else {
    content.innerHTML = technologies.map(toCard).join("");
  }
}

function toCard(tech) {
  return `<div class="card ${tech.done ? "done" : ""}"><h3>${tech.title}</h3></div>`;
}

init();
