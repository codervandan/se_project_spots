// SELECT ELEMENTS
const editButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close");

// OPEN MODAL 
editButton.addEventListener('click', function() {
    editModal.classList.add("modal_is-opened");
});

// CLOSE MODAL 
editCloseButton.addEventListener('click', function() {
    editModal.classList.remove("modal_is-opened");
});


// SELECT ELEMENTS
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close");

// OPEN MODAL
newPostButton.addEventListener("click", () => {
  newPostModal.classList.add("modal_is-opened");
});

// CLOSE MODAL
newPostCloseButton.addEventListener("click", () => {
  newPostModal.classList.remove("modal_is-opened");
});

