const leftBtn = document.getElementById("left-Btn");
const rightBtn = document.getElementById("right-Btn");
const swipsTxtRewrite = document.getElementById("swipes-Txt");
rightBtn.onclick = decrementCounter; //legg til function om å bytte bilde og lagre dette i et array
leftBtn.onclick = decrementCounter; //legg til function om å bytte bilde og kaste dette
let userCounter = 10;

document.addEventListener("keydown", function (countDown) {
  if (countDown.code === "ArrowRight") {
    decrementCounter();
    //NY function om å bytte bilde og lagre dette i et array
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
    alert("Hei");
    //Ny function om spørsmål og setter userCounter tilbake til 10
  }
}
