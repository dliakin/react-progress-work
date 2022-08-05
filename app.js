const modal = document.querySelector("#modal");
const content = document.querySelector("#content");
const backdrop = document.querySelector("#modal-backdrop");

content.addEventListener("click", openCard);
backdrop.addEventListener("click", closeCard);

function openCard() {
  modal.classList.add("open");
}

function closeCard() {
  modal.classList.remove("open");
}
