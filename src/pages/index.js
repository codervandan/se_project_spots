// ADD IMPORT LINES HERE 
import "../pages/index.css";
import { enableValidation, settings, resetValidation } from "../scripts/validation.js";
import Api from "../utils/Api.js";

// ARRAY OF OBJECTS
const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morninig light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },

  // {
  //   name: "Landscape test",
  //   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  // },
];

// INSTANTIATE THE CLASS 
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46d68034-b355-4513-ac51-674863048993", // Replace with your actual token
    "Content-Type": "application/json"
  }
});

  
// TODO - Destrucutre the second item in the callback of the .then() 
  api
  .getAppInfo().then(([cards, userData]) => {
    console.log(cards);
    // FOREACH() LOOP
    cards.forEach(function (item) {
      const card = getCardElement(item);
      cardsContainer.prepend(card);
    });
    // TODO - Handle the user's information
    // TODO - set the src of the avatar image 
    // TODO - set the textContent of both the text elements 
    // const profileAvatar = document.querySelector(".profile__avatar");
  
    profileAvatar.src = userData.avatar;
    profileNameEl.textContent = userData.name;
    profileDescriptionEl.textContent = userData.about;
  })
  .catch(console.error);

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
// SELECTING THE DISABLE BUTTON ELEMENT 
const cardSubmitBtn = newPostModal.querySelector(".modal__save");

// SELECT AVATAR DOM SELECTORS
const avatarModalBtn = document.querySelector(".profile__avatar-btn");
const avatarModal = document.querySelector("#edit-avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarCloseButton = avatarModal.querySelector(".modal__close");
const profileAvatar = document.querySelector(".profile__avatar");


// FUNCTION getCardElement()
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const likeCountEl = cardElement.querySelector(".card__like-count");
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
    const isLiked = cardLikeButton.classList.contains("card__like-button_active");

    const apiCall = isLiked
    ? api.unlikeCard(data._id)
    : api.likeCard(data._id);

    apiCall
      .then((updatedCard) => {
        cardLikeButton.classList.toggle("card__like-button_active");
        likeCountEl.textContent = updatedCard.likes.length;
      })
      .catch(console.error);

    // cardLikeButton.classList.toggle("card__like-button_active");
  });
  // Setting the delete button
  cardDeleteButton.addEventListener("click", () => {
    // cardElement.remove();
    api.deleteCard(data._id)
    .then(() => {
      cardElement.remove();
    })
    .catch(console.error);
  });

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
  document.addEventListener("keydown", closeOnEscape); // add listener here
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeOnEscape); // remove the listener 
}

// OPEN EDIT MODAL
editButton.addEventListener("click", function () {
  // Prefill Inputs
  nameInput.value = profileNameEl.textContent;
  descriptionInput.value = profileDescriptionEl.textContent;
  // editModal.classList.add("modal_is-opened");
  resetValidation(editModal, [nameInput, descriptionInput], settings);
  openModal(editModal);
});

// CLOSE EDIT MODAL
editCloseButton.addEventListener("click", function () {
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

// OPEN AVATAR MODAL
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
})
// avatarForm.addEventListener("submit", handleAvatarSubmit);

// HANDLE FORM SUBMISSION
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  submitBtn.textContent = "Saving...";

  api.editUserInfo({
    name: nameInput.value,
    about: descriptionInput.value
  })
  .then((data) => {
    profileNameEl.textContent = data.name;
    profileDescriptionEl.textContent = data.about;
    closeModal(editModal);
  })
  .catch(console.error)
  .finally(() => {
    submitBtn.textContent = "Save";
  });
}

profileForm.addEventListener("submit", handleProfileFormSubmit);


// AVATAR FUNCTION 
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  api.updateAvatar({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}
  avatarForm.addEventListener("submit", handleAvatarFormSubmit);
  profileAvatar.addEventListener("click", () => {
    openModal(avatarModal);
});

// HANDLE NEW POST FORM SUBMIT
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  // replace and comment this out:
  // console.log(imageInput.value);
  // console.log(captionInput.value);
  api.addCard({
    name: captionInput.value,
    link: imageInput.value
  })
  .then((cardData) => {
    const cardElement = getCardElement(cardData);
    cardsContainer.prepend(cardElement);
    evt.target.reset();
    disableButton(cardSubmitBtn, settings);
    closeModal(newPostModal);
  })
  .catch(console.error);
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

// HANDLING THE CLOSE MODAL FUNCTION USING ESC KEY 
const closeOnEscape = (evt) => {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_is-opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
};

// CLOSING MODAL BY CLICKING ON THE OVERLAY FUNCTION 
const modalList = document.querySelectorAll(".modal");

modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

// CALL THE EXPORTED enableValidation HERE 
enableValidation(settings); 