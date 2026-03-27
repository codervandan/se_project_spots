// ARRAY OF OBJECTS 
const initialCards = [
  {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  {name: "Restaurant terrace" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  {name: "An outdoor cafe" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  {name: "A very long bridge, over the forest and through the trees" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
  {name: "Tunnel with morninig light" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },
];


// SELECT ELEMENTS FOR EDITING MODAL
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileForm = editModal.querySelector(".modal__form");
const nameInput = editModal.querySelector("#profile-name");
const descriptionInput = editModal.querySelector("#profile-description");
// SELECT ELEMENTS FOR NEW POST MODAL
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close");
const newPostForm = newPostModal.querySelector(".modal__form");
const imageInput = newPostModal.querySelector("#image-link");
const captionInput = newPostModal.querySelector("#post-caption");

// OPEN EDIT MODAL 
editButton.addEventListener('click', function() {
  // Prefill Inputs
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
  editModal.classList.add("modal_is-opened");
});

// CLOSE EDIT MODAL 
editCloseButton.addEventListener('click', function() {
    editModal.classList.remove("modal_is-opened");
});

// NEW POST MODAL
newPostButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

// CLOSE NEW POST MODAL
newPostCloseButton.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});

// FOREACH() LOOP 
initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
})

// HANDLE FORM SUBMISSION 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // Update profile
  profileNameEl.textContent = nameInput.value;
  profileDescriptionEl.textContent = descriptionInput.value;
  // Close modal
  editModal.classList.remove("modal_is-opened");
}

profileForm.addEventListener("submit", handleProfileFormSubmit); 

// HANDLE NEW POST FORM SUBMIT
function handleNewPostSubmit(evt) {
  evt.preventDefault();

  console.log(imageInput.value);
  console.log(captionInput.value);

  // Close modal
  newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);