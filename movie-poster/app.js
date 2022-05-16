const $wrapper = document.querySelector(".wrapper");

const total = 12;
const poster = [
  "0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"
];
let posterCopy = poster.concat(poster);
let shuffled = [];
let clicked = [];

function shuffle() {
  for (let i = 0; posterCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * posterCopy.length);
    shuffled = shuffled.concat(posterCopy.splice(randomIndex, 1));
  }
}
// console.log(shuffled[4]); // 1.jpeg

function createCard(i) {
  const card = document.createElement("div");
  card.className = "card";
  const cardInner = document.createElement("div");
  cardInner.className = "card-inner";
  const cardFront = document.createElement("div");
  cardFront.className = "card-front";
  cardFront.innerText = "Poster Card";
  const cardBack = document.createElement("div");
  cardBack.className = "card-back";
  const posterUrl = `./img/${shuffled[i]}`;
  cardBack.style.backgroundImage = `url(${posterUrl})`;
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  return card;
}

function onClickCard() {
  this.classList.toggle("flipped"); // this = 클릭한 카드
  clicked.push(this);
  // if(clicked.length !== 2) {
  //   return;
  // }
  console.log(clicked[0]);
}

function startGame() {
  shuffle();
  for (let i = 0; i < total; i++) {
    const card = createCard(i);
    card.addEventListener("click", onClickCard);
    $wrapper.appendChild(card);
  }

  document.querySelectorAll(".card").forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("flipped");
    }, 1000 + 100 * index); // 1초, 1.1초, 1.2초 ...
  });

  setTimeout(() => {
    document.querySelectorAll(".card").forEach((card) => {
      card.classList.remove("flipped");
    });
  }, 5000);
}
startGame();