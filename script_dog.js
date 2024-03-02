const profileCardContainer = document.getElementById("profile-card-container");
const showBtn = document.getElementById("show-btn");

//Read Random Dog Image
async function fetchRandomDogImage() {
  const randomDogRequest = await fetch(
    "https://dog.ceo/api/breeds/image/random"
  );

  let resultRandomDogRequest = await randomDogRequest.json();
  return resultRandomDogRequest;
}

//console.log(fetchRandomDogImage());

//Read Random User Profile
async function fetchRandomUserProfile() {
  try {
    const randomUserProfile = await fetch("https://randomuser.me/api/");
    const resultRandomUserProfile = await randomUserProfile.json();
    return resultRandomUserProfile.results[0];
  } catch (error) {
    console.error("Error fetching random user profile:", error);
  }
}

console.log(fetchRandomUserProfile());

//Read fetch and display profile card
//promise.all - https://www.geeksforgeeks.org/javascript-promise-all-method/
async function fetchAndShowProfile(index) {
  try {
    const [imgDog, profileUser] = await Promise.all([
      fetchRandomDogImage(),
      fetchRandomUserProfile(),
    ]);

    profileCard(imgDog, profileUser, index);

    //console.log("Inside fetch and show profile function", imgDog, profileUser, index);
  } catch (error) {
    console.error("Unable to load data", error);
  }
}

function profileCard(imgDog, profileUser, index) {
  const dogImg = `${imgDog.message}`;
  const userName = `${profileUser.name.first} ${profileUser.name.last}`;
  const userAddress = `${profileUser.location.city}, ${profileUser.location.country}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = "Delete";

  const chatBtn = document.createElement("button");
  chatBtn.className = "chat-btn";
  chatBtn.innerHTML = "Chat";

  const chatBox = document.createElement("div");
  chatBox.className = "chat-box";
  chatBox.style.display = "none";
  chatBox.innerHTML = `<h4>Hi, this is ${userName}!</h4>
                       <textarea rows="3"></textarea>
                       <button class="send-btn">Send</button>
                       <button class="close-btn">Close</button>`;

  const userProfileCard = document.createElement("div");
  userProfileCard.className = "profile-card";
  userProfileCard.innerHTML = `<img src="${dogImg}"/><h3>Navn : ${userName}</h3><h4>Bosted : ${userAddress}</h4>`;

  const existingCard = profileCardContainer.children[index];
  profileCardContainer.insertBefore(userProfileCard, existingCard);
  userProfileCard.appendChild(deleteBtn);
  userProfileCard.appendChild(chatBtn);
  userProfileCard.appendChild(chatBox);

  deleteBtn.addEventListener("click", () => {
    deleteCard(userProfileCard, index);
  });
  chatBtn.addEventListener("click", () => {
    showChatBox(chatBox, index);
  });

  const closeBtn = userProfileCard.querySelector(".close-btn");
  closeBtn.addEventListener("click", () => {
    closeChatBox(chatBox);
  });

  const sendBtn = userProfileCard.querySelector(".send-btn");
  sendBtn.addEventListener("click", () => {
    messageSend(chatBox);
  });
}

function showChatBox(chatBox) {
  chatBox.style.display = "block";
}

function closeChatBox(chatBox) {
  //console.log("i clicked the close button");
  chatBox.style.display = "none";
}

function messageSend(chatBox) {
  const messageArea = chatBox.querySelector("textarea");
  const message = messageArea.value.trim();
  if (message !== "") {
    console.log("Sent", message);
    messageArea.value = "";
  }
}

async function showProfileCards() {
  profileCardContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    await fetchAndShowProfile(i); //passing the index to the fetchAndShowProfile to identfy positioning
  }
}

showProfileCards();
showBtn.onclick = showProfileCards;

// Delete and replace
const deleteCard = async (userProfileCard, index) => {
  userProfileCard.remove();
  await fetchAndShowProfile(index);
};

const africanBtn = document.querySelector("#african");
const beagleBtn = document.querySelector("#beagle");
const chowBtn = document.querySelector("#chow");
const dingoBtn = document.querySelector("#dingo");
const eskimoBtn = document.querySelector("#eskimo");

document.addEventListener("click", async (e) => {
  let breed;
  if (e.target === africanBtn) {
    breed = "african";
  }
  if (e.target === beagleBtn) {
    breed = "beagle";
  }
  if (e.target === chowBtn) {
    breed = "chow";
  }
  if (e.target === dingoBtn) {
    breed = "dingo";
  }
  if (e.target === eskimoBtn) {
    breed = "eskimo";
  }
  if (breed) {
    await getTenBreedImagesUserPairs(breed);
  }
});

const getTenBreedImagesUserPairs = async (breed) => {
  const imageUserPairs = [];
  for (let i = 0; i < 10; i++) {
    const imageUrl = await fetchBreed(breed);
    const profile = await fetchRandomUserProfile();
    imageUserPairs.push({ imageUrl, profile });
  }
  displayCard(imageUserPairs);
};

const fetchBreed = async (breed) => {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const request = await fetch(url);
    const result = await request.json();
    return result.message; // Return the image URL
  } catch (error) {
    console.error("Error fetching breed:", error);
  }
};

const displayCard = (imageUserPairs) => {
  profileCardContainer.innerHTML = "";
  imageUserPairs.forEach((pair) => {
    const img = document.createElement("img");
    img.src = pair.imageUrl;
    const cardContainer = document.createElement("div");
    const userProfile = document.createElement("div");
    cardContainer.className = "profile-card";
    const userName = document.createElement("h3");
    const userAddress = document.createElement("h4");

    userName.innerHTML = `Name: ${pair.profile.name.first} ${pair.profile.name.last}`;
    userAddress.innerHTML = `Location: ${pair.profile.location.city}, ${pair.profile.location.country}`;
    userProfile.append(userName, userAddress);
    cardContainer.append(img, userProfile);
    profileCardContainer.appendChild(cardContainer);
  });
};
