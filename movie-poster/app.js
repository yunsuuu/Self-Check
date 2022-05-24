const $wrapper = document.querySelector(".wrapper");
let total = Number(prompt("카드 개수를 짝수로 입력하세요!", "최대 12"));
const posters = [
  "0.jpeg", "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"
];

let posterSlice = posters.slice(0, total / 2);
let posterCopy = posterSlice.concat(posterSlice);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;
let startTime;

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
  if(!clickable || completed.includes(this) || clicked[0] === this) {
    // 클릭할 수 없는 상황 || 클릭한 카드가 완료배열에 들어있을 때 || 카드를 처음 클릭했을 때
    return; // 카드를 다시 뒤집지 못하게 함수종료
  }
  this.classList.toggle("flipped"); // this = 클릭한 카드
  clicked.push(this);
  if(clicked.length !== 2) {
    return;
  }
  const firstBackImg = clicked[0].querySelector(".card-back").style.backgroundImage; // url("./img/0.jpeg")
  const secondBackImg = clicked[1].querySelector(".card-back").style.backgroundImage;
  if(firstBackImg === secondBackImg) {
    completed.push(clicked[0]);
    completed.push(clicked[1]);
    clicked = [];
    if(completed.length !== total) {
      return;
    }
    const endTime = new Date();
    setTimeout(() => {
      alert(`성공 🥳 ${Math.floor((endTime - startTime) / 1000)}초 걸렸습니다!`);
      resetGame();
    }, 500);
    return;
  }
  clickable = false; // 카드 4개 동시 클릭 방지
  setTimeout(() => {
    clicked[0].classList.remove("flipped");
    clicked[1].classList.remove("flipped");
    clicked = [];
    clickable = true;
  }, 500);
}

function startGame() {
  clickable = false;
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
    // 카드가 모두 뒤집힌 후 클릭할 수 있게
    clickable = true;
    startTime = new Date();
  }, 5000);
}
startGame();

function resetGame() {
  $wrapper.innerHTML = "";
  posterCopy = posters.concat(posters);
  shuffled = [];
  completed = [];
  startGame();
}