// start game interface
let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let scoreDiv = document.querySelector(".score span"),
  score = 0;
startBtn.addEventListener("click", () => {
  let name = prompt("Enter your name:");
  if (name == "" || name == null) {
    name = "Unkown";
  }
  document.querySelector(".name span").innerHTML = name;
  document.querySelector(".start").remove();
  document.querySelector(".actual-game").style.display = "block";
  let n = setInterval(function () {
    count();
    score++;
    // end game
    if (document.querySelectorAll(".done").length === 20) {
      clearInterval(n);
      document.querySelector(".win").style.display = "block";
      document.querySelectorAll(".win .container .content span")[0].innerHTML =
        name;
      document.querySelectorAll(".win .container .content span")[1].innerHTML =
        parseInt(10000 / score);
      document.querySelector(".actual-game").remove();
    }
  }, 1000);
  cards.forEach((card) => {
    card.style.setProperty("order", Math.floor(Math.random() * 20));
  });
});
// counter
let seconds = document.querySelector(".secondes");
let minutes = document.querySelector(".minutes");
function count() {
  if (seconds.innerHTML === "60") {
    seconds.innerHTML = "00";
    if (parseInt(minutes.innerHTML) < 9) {
      minutes.innerHTML = `0${parseInt(minutes.innerHTML) + 1}`;
    } else {
      minutes.innerHTML = parseInt(minutes.innerHTML) + 1;
    }
  } else {
    if (parseInt(seconds.innerHTML) < 9) {
      seconds.innerHTML = `0${parseInt(seconds.innerHTML) + 1}`;
    } else {
      seconds.innerHTML = parseInt(seconds.innerHTML) + 1;
    }
  }
}
// card rotating
let cards = document.querySelectorAll(".card");
function rotateCard(selectedCard) {
  selectedCard.classList.add("open");
  let flipedCards = Array.from(cards).filter((e) =>
    e.classList.contains("open")
  );
  if (flipedCards.length === 2) {
    document.querySelector(".father .container").classList.add("cant-click");
    setTimeout(function () {
      document
        .querySelector(".father .container")
        .classList.remove("cant-click");
    }, 1000);
    compaier(flipedCards[0], flipedCards[1]);
  }
}
// compair cards
function compaier(cardOne, cardTwo) {
  if (cardOne.getAttribute("data-set") !== cardTwo.getAttribute("data-set")) {
    setTimeout(() => {
      cardOne.classList.remove("open");
      cardTwo.classList.remove("open");
    }, 800);
  } else {
    cardOne.classList.add("done");
    cardTwo.classList.add("done");
    cardOne.classList.remove("open");
    cardTwo.classList.remove("open");
    scoreDiv.innerHTML = Number(scoreDiv.innerHTML) + 50;
  }
}

cards.forEach((card) => {
  card.addEventListener("click", function () {
    rotateCard(card);
  });
});
// restart button
restartBtn.addEventListener("click", () => {
  document.querySelector(".actual-game").style.display = "none";
  cards.forEach((card) => {
    card.classList.remove("open");
    card.classList.remove("done");
    card.style.setProperty("order", Math.floor(Math.random() * 20));
  });
  score = 0;
  minutes.innerHTML = 00;
  seconds.innerHTML = 00;
  scoreDiv.innerHTML = 0;
  setTimeout(() => {
    document.querySelector(".actual-game").style.display = "block";
  }, 300);
});
// restart after winning
document.querySelector("#reload").addEventListener("click", () => {
  document.location.reload();
});
