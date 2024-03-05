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
    FatchSavedCard();
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
  const idCard = cardInfo.id.name;

  const fullName = `${name.first} ${name.last}`;
  const card = `
    <div class="card ${gender}" id="${idCard}">
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
  const retrieveSavedCard = JSON.parse(localStorage.getItem("Match")) || [];
  savedContainer.innerHTML = "";
  retrieveSavedCard.forEach((cardSaved) => {
    const showSavedCard = document.createElement("div");
    const name = cardSaved.name;
    const gender = cardSaved.gender;
    const imageUrl = cardSaved.picture.large;
    const location = cardSaved.location;
    const idCard = cardSaved.id.name;
    let city = location.city;
    let firstName = name.first;
    let lastName = name.last;

    savedContainer.innerHTML += `
    <div class="card ${gender}">
      <div class="card-image">
        <img
          src="${imageUrl}"
          alt="${name.first}"
        />
      </div>

      <div class="card-content">
        <p>Name: <strong>${firstName} ${lastName}</strong></p>
        
        <button id="rewrite">Redigere</button>
      
        <p>City: <strong>${city}</strong></p>
      </div>
    </div>
    `;
    const rewriteBtn = document.getElementById("rewrite");
    console.log(idCard);
    rewriteBtn.addEventListener("click", () => {
      rewrite(cardSaved, idCard);
    });

    savedContainer.appendChild(showSavedCard);
  });
}

function rewrite(cardSaved, idCard) {
  let newName = prompt("Skriv inn ny fornavn");
  let newLastName = prompt("Skriv inn ny etternavn");
  let newCity = prompt("Skriv inn ny by");
  if (newName !== null) {
    cardSaved.name.first = newName;
  }

  if (newLastName !== null) {
    cardSaved.name.last = newLastName;
  }
  if (newCity !== null) {
    cardSaved.location.city = newCity;
  }
  console.log(newCity, newLastName, newName);
  const savedCardLocal = JSON.parse(localStorage.getItem("Match")) || [];

  if (cardSaved.id.name === idCard) {
    console.log(idCard);
    savedCardLocal.push(cardSaved);
    console.log(savedCardLocal, "dette blir lagret", cardSaved);
    localStorage.setItem("Match", JSON.stringify(savedCardLocal));
    FatchSavedCard();
  }
}
