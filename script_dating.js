const leftBtn = document.getElementById("left-Btn");
const rightBtn = document.getElementById("right-Btn");
const swipsTxtRewrite = document.getElementById("swipes-Txt");
const cardList = document.getElementById("card-list");

rightBtn.onclick = decrementCounter; //legg til function om å bytte bilde og lagre dette i et array
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
    //NY function om å bytte bilde og lagre dette i et array
    const findCard = cards.some(
      (item) => item.id.value === singleCard.id.value
    );
    if (!findCard) {
      cards.push(singleCard);
    }
  }
  if (countDown.code === "ArrowLeft") {
    decrementCounter();

    await display();
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
