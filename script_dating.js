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
  }

  if (countDown.code === "ArrowLeft") {
    decrementCounter();
    await display();
  }

  //NY function om å bytte bilde og lagre dette i et array
  /*const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );
    if (!findCard) {
      cards.push(singleCard);
      console.log(singleCard);
    }*/
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
  console.log("inne i showUserCard", showUserCard);
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
  }
});
