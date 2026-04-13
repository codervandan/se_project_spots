const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

const showInputError = (formElement, inputElement, errorMsg) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = errorMsg;
    inputElement.classList.add(settings.inputErrorClass);
    // console.log(errorMsgID); <-- for testing purposes 
}

const hideInputError = (formElement, inputElement) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = "";
    inputElement.classList.remove(settings.inputErrorClass);
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
        buttonElement.classList.remove(settings.inactiveButtonClass); // removing the modifier here
    }
}

const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass); // adding the modifier here 
}

const resetValidation = (formElement, inputList, settings) => {
    inputList.forEach((input) => {
        hideInputError(formElement, input);
    })
}

// Use the settings objects in all functions instead of hard-coded strings 


const setEventListeners = (formElement, settings) => {
    console.log(formElement);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    // console.log(config.formSelector)
    const formList = document.querySelectorAll(settings.formSelector);
    formList.forEach((formElement) => {
            setEventListeners(formElement, settings);
        });
    };
enableValidation(settings);