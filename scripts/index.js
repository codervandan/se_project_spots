// Array of objects
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

// OPEN MODAL 
editButton.addEventListener('click', function() {
    editModal.classList.add("modal_is-opened");
});

// CLOSE MODAL 
editCloseButton.addEventListener('click', function() {
    editModal.classList.remove("modal_is-opened");
});


// SELECT ELEMENTS FOR NEW POST MODAL
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

// forEach() Loop 
initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
})