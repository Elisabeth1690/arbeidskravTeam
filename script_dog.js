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

//console.log(fetchRandomDogImage());

//Read Random User Profile
async function fetchRandomUserProfile() {
  const randomUserProfile = await fetch("https://randomuser.me/api/");
  let resultRandomUserProfile = await randomUserProfile.json();
  return resultRandomUserProfile.results[0];
}

//console.log(fetchRandomUserProfile());

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

  const deleteBtn = document.createElement('button')
  deleteBtn.innerHTML = 'Delete'
  deleteBtn.style.backgroundColor = 'red'
  const userProfileCard = document.createElement("div");
  userProfileCard.innerHTML = `<img src="${dogImg}"/><h3>Navn : ${userName}</h3><h4>Bosted : ${userAddress}</h4>`;
  const existingCard = profileCardContainer.children[index];
  profileCardContainer.insertBefore(userProfileCard, existingCard)
  userProfileCard.appendChild(deleteBtn)
  //console.log( 'inne i profileCard funksjonen', existingCard)
  deleteBtn.addEventListener("click", ()=> {
    deleteCard(userProfileCard, index)
  })
  
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
const deleteCard = async(userProfileCard, index) =>{
  userProfileCard.remove()
  await fetchAndShowProfile(index)
}


const africanBtn = document.querySelector('#african');
const beagleBtn = document.querySelector('#beagle');
const chowBtn = document.querySelector('#chow');
const dingoBtn = document.querySelector('#dingo');
const eskimoBtn = document.querySelector('#eskimo');

document.addEventListener("click", async (e) =>{
  let breed
  if(e.target === africanBtn){
    breed = 'african';
  }
  if (e.target === beagleBtn) {
    breed = 'beagle';
  }
  if (e.target === chowBtn) {
    breed = 'chow';
  }
  if (e.target === dingoBtn) {
    breed = 'dingo';
  }
  if (e.target === eskimoBtn) {
    breed = 'eskimo';
  }
  if(breed) {
    await getTenBreedImages(breed)
  }
});

const getTenBreedImages = async(breed) =>{
  const imageUrls = [];
  for (let i = 0; i < 10; i++){
    const imageUrl = await fetchBreed(breed);
    imageUrls.push(imageUrl);
    
  }
  console.log(imageUrls, `array with 10 images of ${breed}`)
  displayImages(imageUrls);
  
}

const fetchBreed = async(breed) => {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`
    const request = await fetch(url)
    const result = await request.json()
    return result.message; // Return the image URL
  } catch (error) {
    console.error("Error fetching breed:", error);
    return null;
  }
};


function displayImages(imageUrls) {
  profileCardContainer.innerHTML = "";
  imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    profileCardContainer.appendChild(img);
  });
}