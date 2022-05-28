const $img = document.querySelector(".img-wrap");
function onClick(e) {
  console.log(e.target);
}
$img.addEventListener("click", onClick);