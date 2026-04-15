export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const showInputError = (formElement, inputElement, errorMsg, settings) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = errorMsg;
    inputElement.classList.add(settings.inputErrorClass);
    errorMsgEl.classList.add(settings.errorClass);
    // console.log(errorMsgID); <-- for testing purposes 
}

const hideInputError = (formElement, inputElement, settings) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = "";
    inputElement.classList.remove(settings.inputErrorClass);
    errorMsgEl.classList.remove(settings.errorClass);
    // console.log(errorMsgID); <-- for testing purposes 
}

const checkInputValidity = (formElement, inputElement, settings) => {
    // console.log(inputElement.validity); <-- for testing purposes
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
    // console.log(hasInvalidInput(inputList));
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, settings);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass); // removing the modifier here
    }
}

const disableButton = (buttonElement, settings) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass); // adding the modifier here 
}

 export const resetValidation = (formElement, inputList, settings) => {
    inputList.forEach((input) => {
        hideInputError(formElement, input, settings);
    })
}


const setEventListeners = (formElement, settings) => {
    console.log(formElement);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

// EXPORT THIS FUNCTION 
export const enableValidation = (settings) => {
    // console.log(config.formSelector)
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach((formElement) => {
            setEventListeners(formElement, settings);
        });
    };


// REMOVE THIS LINE SINCE NOW WE NEED TO CALL IT IN index.js FILE 
// enableValidation(settings);