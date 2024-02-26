const profileCardContainer = document.querySelector(".profile-card-container");
const showBtn = document.getElementById("show-btn");

//Read Random Dog Image
async function fetchRandomDogImage() {
  const randomDogRequest = await fetch(
    "https://dog.ceo/api/breeds/image/random"
  );

  let resultRandomDogRequest = await randomDogRequest.json();
  return resultRandomDogRequest;
}

console.log(fetchRandomDogImage());

//Read Random User Profile
async function fetchRandomUserProfile() {
  const randomUserProfile = await fetch("https://randomuser.me/api/");
  let resultRandomUserProfile = await randomUserProfile.json();
  return resultRandomUserProfile.results[0];
}

console.log(fetchRandomUserProfile());

//Read fetch and display profile card
//promise.all - https://www.geeksforgeeks.org/javascript-promise-all-method/
async function fetchAndShowProfile() {
  try {
    const [imgDog, profileUser] = await Promise.all([
      fetchRandomDogImage(),
      fetchRandomUserProfile(),
    ]);

    profileCard(imgDog, profileUser);

    console.log("Inside fetch and show profile function", imgDog, profileUser);
  } catch (error) {
    console.error("Unable to load data", error);
  }
}

function profileCard(imgDog, profileUser) {
  const dogImg = `${imgDog.message}`;
  const userName = `${profileUser.name.first} ${profileUser.name.last}`;
  const userAddress = `${profileUser.location.city}, ${profileUser.location.country}`;

  const userProfileCard = document.createElement("div");

  userProfileCard.innerHTML = `<img src="${dogImg}"/><h3>Navn : ${userName}</h3><h4>Bosted : ${userAddress}</h4>`;
  profileCardContainer.appendChild(userProfileCard);
}

async function showProfileCards() {
  profileCardContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    await fetchAndShowProfile();
  }
}

showProfileCards();
showBtn.onclick = showProfileCards;
