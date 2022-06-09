const $title = document.querySelector(".title");
const $form = document.querySelector("form");
const $input = document.querySelector("input");
const $btn = document.querySelector(".form button");
const $backBtn = document.querySelector(".back-btn");
const $ul = document.querySelector(".list-ul");

$backBtn.addEventListener("click", () => {
  location.href = "main.html";
})

function paintUl(text) {
  const $li = document.createElement("li");
  $li.innerText = text;

  $ul.appendChild($li);
}

function onSubmit(e) {
  e.preventDefault();
  const value = $input.value;
  $input.value = "";
  $input.focus();
  paintUl(value);
}
$form.addEventListener("submit", onSubmit);