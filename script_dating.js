const leftBtn = document.getElementById("left-Btn");
const rightBtn = document.getElementById("right-Btn");
const swipsTxtRewrite = document.getElementById("swipes-Txt");
const cardList = document.getElementById("card-list");
const femaleBtn = document.getElementById("female-Btn");
const maleBtn = document.getElementById("male-Btn");
const femaleMaleBtn = document.getElementById("female-Male-Btn");

rightBtn.addEventListener("click", decrementCounter); //legg til function om å bytte bilde og lagre dette i et array
leftBtn.onclick = decrementCounter; //legg til function om å bytte bilde og kaste dette

let userCounter = 10;

let singleCard = {};
const cards = [];

window.onload = async () => {
  await display();
};

document.addEventListener("keydown", async function (countDown) {
  if (countDown.code === "ArrowRight") {
    decrementCounter();
    femaleCard();

    //NY function om å bytte bilde og lagre dette i et array

    /*const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );
    if (!findCard) {
      cards.push(singleCard);
      console.log(singleCard);
    }*/
  }
  if (countDown.code === "ArrowRight" && countDown.target === maleBtn) {
    decrementCounter();
    maleCard();
  }
  if (countDown.code === "ArrowRight" && countDown.target === femaleMaleBtn) {
    decrementCounter();
    showUserCard();
  }
  if (countDown.code === "ArrowLeft") {
    decrementCounter();

    //Ny function om å bytte bilde og kaste dette
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
  try {
    let femaleCardFetch = await fetchRandomUser();
    if (femaleCardFetch.gender === "female") {
      console.log("inne i femaleCard", femaleCardFetch);
      showUserCard(femaleCardFetch);
    }
  } catch {
    console.error("Ops klarte ikke å laste ned hogwarts staff", error);
  }
}
async function maleCard() {
  let maleCardfetch = await fetchRandomUser();

  if (maleCardfetch.gender === "male") {
    let male = maleCardfetch;
    showUserCard(male);
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
    femaleCard();
  }
  if (e.target === maleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    femaleMaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleCard();
  }
  if (e.target === femaleMaleBtn) {
    femaleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    maleBtn.style.backgroundColor = "rgb(255, 37, 8)";
    femaleMaleBtn.style.backgroundColor = "rgb(0, 154, 23)";
    display();
  }
});
