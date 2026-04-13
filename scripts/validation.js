const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const showInputError = (formElement, inputElement, errorMsg) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = errorMsg;
    inputElement.classList.add("modal__input_type_error");
    // console.log(errorMsgID); <-- for testing purposes 
}

const hideInputError = (formElement, inputElement) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = "";
    inputElement.classList.remove("modal__input_type_error");
    // console.log(errorMsgID); <-- for testing purposes 
}

const checkInputValidity = (formElement, inputElement) => {
    // console.log(inputElement.validity); <-- for testing purposes
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    // console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove("modal__save_disabled"); // removing the modifier here
    }
}

const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__save_disabled"); // adding the modifier here 
}

const resetValidation = (formElement, inputList) => {
    inputList.forEach((input) => {
        hideInputError(formElement, input);
    })
}


const setEventListeners = (formElement) => {
    console.log(formElement);
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__save");

    toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = document.querySelectorAll(".modal__form");
    formList.forEach((formElement) => {
            setEventListeners(formElement);
        });
    };
enableValidation();