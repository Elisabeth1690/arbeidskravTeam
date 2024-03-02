const leftBtn = document.getElementById("left-Btn");
const rightBtn = document.getElementById("right-Btn");
const swipsTxtRewrite = document.getElementById("swipes-Txt");
const cardList = document.getElementById("card-list");
const savedContainer = document.getElementById("saved-Container");
const femaleBtn = document.getElementById("female-Btn");
const maleBtn = document.getElementById("male-Btn");
const femaleMaleBtn = document.getElementById("female-Male-Btn");

//legg til function om å bytte bilde og lagre dette i et array
rightBtn.addEventListener("click", decrementCounter);
//legg til function om å bytte bilde og kaste dette
leftBtn.onclick = decrementCounter;

const cards = [];
let userCounter = 10;
let singleCard = {};
let allowGenderToShow = undefined;

window.onload = async () => {
  femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
  maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
  femaleMaleBtn.style.backgroundColor = "rgb(0, 154, 23)";

  await display();
};

document.addEventListener("keyup", async function (countDown) {
  if (countDown.code === "ArrowRight") {
    decrementCounter();
    await display();
    savedCard();
  }

  if (countDown.code === "ArrowLeft") {
    decrementCounter();
    await display();
  }

  //NY function om å bytte bilde og lagre dette i et array
});

function decrementCounter() {
  userCounter--;

  if (userCounter <= -1) {
    resetCounter();
  }

  swipsTxtRewrite.innerHTML = `<p>Du har ${userCounter} Swipes igjen og bruke</p>`;
}

function resetCounter() {
  let userAnswer = prompt("Har du lyst til å swipe mer? Ja/Nei").toLowerCase();

  if (userAnswer == "ja") {
    userCounter = 10;
    swipsTxtRewrite.innerHTML = `<p>Du har ${userCounter} Swipes igjen og bruke</p>`;
  } else {
    resetCounter();
  }
}

async function fetchRandomUser(gender = undefined) {
  const res = await fetch(
    `https://randomuser.me/api?` + new URLSearchParams({ gender })
  );
  const data = await res.json();
  return data.results[0];
}

async function display() {
  singleCard = await fetchRandomUser(allowGenderToShow);

  if (singleCard.email) {
    showUserCard(singleCard);
  }
}

function showUserCard(cardInfo) {
  const name = cardInfo.name;
  const gender = cardInfo.gender;
  const imageUrl = cardInfo.picture.large;
  const location = cardInfo.location;

  const fullName = `${name.title} ${name.first} ${name.last}`;
  const card = `
    <div class="card ${gender}">
      <div class="card-image">
        <img
          src="${imageUrl}"
          alt="${name.first}"
        />
      </div>

      <div class="card-content">
        <p>Name: <strong>${fullName}</strong></p>
        <p>Street: <strong>${location.street.name}</strong></p>
        <p>Street Number: <strong>${location.street.number}</strong></p>
        <p>State: <strong>${location.state}</strong></p>
        <p>City: <strong>${location.city}</strong></p>
      </div>
    </div>`;

  cardList.innerHTML = card;
}

document.addEventListener("click", async (e) => {
  if (e.target === femaleBtn) {
    femaleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    femaleMaleBtn.style.backgroundColor = "rgb(255, 37, 8)";

    allowGenderToShow = "female";
    display();
  }
  if (e.target === maleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    femaleMaleBtn.style.backgroundColor = "rgb(255, 37, 8)";

    allowGenderToShow = "male";
    display();
  }
  if (e.target === femaleMaleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    femaleMaleBtn.style.backgroundColor = "rgb(0, 154, 23)";

    allowGenderToShow = undefined;
    display();
    deleteSavedInLocalStorge();
  }
});

function savedCard() {
  if (cards.length <= 10) {
    const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );
    if (!findCard) {
      cards.push(singleCard);
      console.log(singleCard);
      savedInLocalStorge(singleCard);
    }
  }
}

function savedInLocalStorge(singleCard) {
  if (cards.length <= 10) {
    const savedCardLocal = JSON.parse(localStorage.getItem("Match")) || [];
    savedCardLocal.push(singleCard);
    localStorage.setItem("Match", JSON.stringify(savedCardLocal));
    console.log(cards, "kortene");
    console.log(savedCardLocal, "inne i localStorage");
  } else {
    alert("du kan ikke legge til flere matches for du har slettet minst 1");
  }
}

function deleteSavedInLocalStorge() {
  localStorage.removeItem("Match");
}

FatchSavedCard();
function FatchSavedCard() {
  const retiwSavedCard = JSON.parse(localStorage.getItem("Match")) || [];
  savedContainer.innerHTML = "";
  for (let i = 0; i <= 10; i++) {
    const showSavedCard = document.createElement("div");
    savedContainer.innerHTML = retiwSavedCard;

    savedContainer.appendChild(showSavedCard);
  }
}
