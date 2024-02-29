const leftBtn = document.getElementById("left-Btn");
const rightBtn = document.getElementById("right-Btn");
const swipsTxtRewrite = document.getElementById("swipes-Txt");
const cardList = document.getElementById("card-list");
const savedContainer = document.getElementById("saved-Container");
const femaleBtn = document.getElementById("female-Btn");
const maleBtn = document.getElementById("male-Btn");
const femaleMaleBtn = document.getElementById("female-Male-Btn");

let userCounter = 10;

let singleCard = {};
let femaleCardsFetch = {};
let maleCardfetch = {};

const cards = [];

window.onload = async () => {
  await display();
};
//test endring
document.addEventListener("keyup", async function (countDown) {
  if (countDown.code === "ArrowRight" && showFemale === "right") {
    decrementCounter();
    femaleCard();
    //NY function lagrer kortet i et eget array med plass til 10 og viser det fram og legger til slett knapp
    // functoinen øverst må kanskje lages i 2 seperate?
    // NY function lagrer kortet i localStorage
  }
  if (countDown.code === "ArrowRight" && showMale === "right") {
    decrementCounter();
    maleCard();
    //NY function lagrer kortet i et eget array med plass til 10 og viser det fram og legger til slett knapp
    // functoinen øverst må kanskje lages i 2 seperate?
    // NY function lagrer kortet i localStorage
  }
  if (countDown.code === "ArrowRight" && showFemaleMale === "right") {
    decrementCounter();
    display();
    //NY function lagrer kortet i et eget array med plass til 10 og viser det fram og legger til slett knapp
    // functoinen øverst må kanskje lages i 2 seperate?
    // NY function lagrer kortet i localStorage
  }

  /*const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );
    if (!findCard) {
      cards.push(singleCard);
      console.log(singleCard);
    }*/

  if (countDown.code === "ArrowLeft" && showFemale === "wrong") {
    decrementCounter();
    femaleCard();
  }
  if (countDown.code === "ArrowLeft" && showMale === "wrong") {
    decrementCounter();
    maleCard();
  }
  if (countDown.code === "ArrowLeft" && showFemaleMale === "wrong") {
    decrementCounter();
    display();
  }
});

function decrementCounter() {
  userCounter--;
  swipsTxtRewrite.innerHTML = `<p>Du har ${userCounter} Swipes igjen og bruke</p>`;
  if (userCounter === 0) {
    resetCounter();
  }
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

async function fetchRandomUser() {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();

  return data.results[0];
}

async function display() {
  singleCard = await fetchRandomUser();

  if (singleCard.email) {
    showUserCard(singleCard);
  }
}

async function femaleCard() {
  femaleCardsFetch = await fetchRandomUser();
  if (femaleCardsFetch.gender === "female") {
    showUserCard(femaleCardsFetch);
  } else {
    femaleCard();
  }
}
async function maleCard() {
  let maleCardfetch = await fetchRandomUser();

  if (maleCardfetch.gender === "male") {
    showUserCard(maleCardfetch);
  } else {
    maleCard;
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
let showFemale = "";
let showMale = "";
let showFemaleMale = "";

console.log(showFemale, showFemaleMale, showMale);
document.addEventListener("click", async (e) => {
  if (e.target === femaleBtn) {
    femaleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    femaleMaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    showFemale = "right";
    showMale = "wrong";
    showFemaleMale = "wrong";
    femaleCard();
  }
  if (e.target === maleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    femaleMaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    showFemale = "wrong";
    showMale = "right";
    showFemaleMale = "wrong";
    maleCard();
  }
  if (e.target === femaleMaleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    femaleMaleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    showFemale = "wrong";
    showMale = "wrong";
    showFemaleMale = "right";
    display();
  }
});
 