// ARRAY OF OBJECTS 
const initialCards = [
  {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg" },
  {name: "Restaurant terrace" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg" },
  {name: "An outdoor cafe" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg" },
  {name: "A very long bridge, over the forest and through the trees" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
  {name: "Tunnel with morninig light" , link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg" },
  {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg" },

  {
    name: "Landscape test",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  }
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
// SELECT THE TEMPLATE BY ID 
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");
// SELECT PREVIEW SELECTORS
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseButton = previewModal.querySelector(".modal__close");

// FUNCTION getCardElement() 
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  // Select the clone’s title and image elements and store them in variables.
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Setting the data 
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name; 

  // Setting the like button 
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });
  // Setting the delete button
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  })
  // Adding image 
  cardImage.addEventListener("click", () => {
  previewImage.src = data.link;
  previewImage.alt = data.name;
  previewCaption.textContent = data.name;

  openModal(previewModal);
});
  // Return the element 
  return cardElement;
}

// DECLARE OPEN AND CLOSE MODAL FUNCTIONS HERE 
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// OPEN EDIT MODAL 
editButton.addEventListener('click', function() {
  // Prefill Inputs
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
  // editModal.classList.add("modal_is-opened");
  openModal(editModal);
});

// CLOSE EDIT MODAL 
editCloseButton.addEventListener('click', function() {
    // editModal.classList.remove("modal_is-opened");
    closeModal(editModal);
});

// PREVIEW CLOSE MODAL
previewCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

// NEW POST MODAL
newPostButton.addEventListener("click", () => {
  // newPostModal.classList.add("modal_is-opened");
  openModal(newPostModal);
});

// CLOSE NEW POST MODAL
newPostCloseButton.addEventListener("click", () => {
  // newPostModal.classList.remove("modal_is-opened");
  closeModal(newPostModal);
});

// FOREACH() LOOP 
initialCards.forEach(function (item) {
  const card = getCardElement(item);
  cardsContainer.prepend(card);
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
  // replace and comment this out: 
  // console.log(imageInput.value);
  // console.log(captionInput.value);
  const newCard = {
    name: captionInput.value,
    link: imageInput.value,
  };

  const cardElement = getCardElement(newCard);
  cardsContainer.prepend(cardElement);
  newPostForm.reset();
  closeModal(newPostModal);

  // CLOSE MODAL
  // newPostModal.classList.remove("modal_is-opened");
}

newPostForm.addEventListener("submit", handleNewPostSubmit);