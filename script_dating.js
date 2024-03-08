const leftBtn = document.querySelector(`#left-Btn`);
const rightBtn = document.querySelector(`#right-Btn`);
const swipsTxtRewrite = document.querySelector(`#swipes-Txt`);
const cardList = document.querySelector(`#card-list`);
const savedContainer = document.querySelector(`#saved-Container`);
const femaleBtn = document.querySelector(`#female-Btn`);
const maleBtn = document.querySelector(`#male-Btn`);
const femaleMaleBtn = document.querySelector(`#female-Male-Btn`);

let cards = [];
let userCounter = 10;
let singleCard = {};
let allowGenderToShow = undefined;

window.onload = async () => {
  femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
  maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
  femaleMaleBtn.style.backgroundColor = "rgb(0, 154, 23)";

  await display();
};
document.addEventListener("click", async function (countDown) {
  if (countDown.target === rightBtn) {
    decrementCounter();
    await display();
    savedCard();
    FatchSavedCard();
  }

  if (countDown.target === leftBtn) {
    decrementCounter();
    await display();
  }
});

document.addEventListener("keyup", async function (countDown) {
  if (countDown.code === "ArrowRight") {
    decrementCounter();
    await display();
    savedCard();
    FatchSavedCard();
  }

  if (countDown.code === "ArrowLeft") {
    decrementCounter();
    await display();
  }
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

  const fullName = `${name.first} ${name.last}`;
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
  }
});

function savedCard() {
  if (cards.length <= 10) {
    const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );

    if (!findCard) {
      savedInLocalStorge(singleCard);
      cards.push(singleCard);
    }
  } else {
    alert("du kan ikke legge til flere matches for du har slettet minst 1");
  }
}

function savedInLocalStorge(singleCard) {
  if (cards.length < 10) {
    const savedCardLocal = JSON.parse(localStorage.getItem("Match")) || [];
    savedCardLocal.push(singleCard);

    localStorage.setItem("Match", JSON.stringify(savedCardLocal));
  } else {
  }
}
FatchSavedCard();
function FatchSavedCard() {
  const rewriteSavedCard = JSON.parse(localStorage.getItem("Match")) || [];
  savedContainer.innerHTML = "";
  rewriteSavedCard.forEach((cardSaved, index) => {
    const showSavedCard = document.createElement("div");
    const name = cardSaved.name;
    const gender = cardSaved.gender;
    const imageUrl = cardSaved.picture.large;
    const location = cardSaved.location;
    let city = location.city;
    let firstName = name.first;
    let lastName = name.last;
    showSavedCard.classList.add("saved-card");

    showSavedCard.innerHTML = `
    <div class="card ${gender}">
      <div class="card-image">
        <img
        src="${imageUrl}"
        alt="${name.first}"
      />
    </div>
    <div class="card-content">
    <p>Name: <strong>${firstName} ${lastName}</strong></p>
    <button class="rewrite" data-index="${index}">Redigere</button>
        <p>City: <strong>${city}</strong></p>
      </div>
      <button class="delete-btn" data-index="${index}">Delete</button>
    </div>
    `;

    savedContainer.appendChild(showSavedCard);
    const rewriteBtn = document.querySelector(
      `.rewrite[data-index='${index}']`
    );
    rewriteBtn.addEventListener("click", () => {
      rewrite(cardSaved, index);
    });

    const deleteBtn = document.querySelector(
      `.delete-btn[data-index='${index}']`
    );
    deleteBtn.addEventListener("click", () => {
      deleteSavedCard(index);
    });
  });
}

function deleteSavedCard(index) {
  const rewriteSavedCard = JSON.parse(localStorage.getItem("Match")) || [];
  rewriteSavedCard.splice(index, 1);
  try {
    cards = rewriteSavedCard;
    localStorage.setItem("Match", JSON.stringify(rewriteSavedCard));
    FatchSavedCard();
  } catch (error) {
    console.error("klarte ikke og oppdatere arrayet", error);
  }
}

function rewrite(cardSaved, index) {
  let newName = prompt("Skriv inn ny fornavn");
  let newLastName = prompt("Skriv inn ny etternavn");
  let newCity = prompt("Skriv inn ny by");
  console.log(newName);
  if (newName !== null && newName.trim() !== "") {
    cardSaved.name.first = newName;
  }

  if (newLastName !== null && newLastName.trim() !== "") {
    cardSaved.name.last = newLastName;
  }
  if (newCity !== null && newCity.trim() !== "") {
    cardSaved.location.city = newCity;
  }

  try {
    cards[index] = cardSaved;
    const savedCardLocal = JSON.parse(localStorage.getItem("Match")) || [];
    savedCardLocal[index] = cardSaved;

    localStorage.setItem("Match", JSON.stringify(savedCardLocal));
    FatchSavedCard();
  } catch (error) {
    console.error("Feil med endring av navn", error);
  }
}
