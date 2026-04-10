const showInputError = (formElement, inputElement, errorMsg) => {
    // const errorMsgID = inputElement.id + "-error";
    // const errorMsgEl = document.querySelector("#" + errorMsgID); <--- you can do this way or v
     const errorMsgEl = document.querySelector(`#${inputElement.id}-error`); // this way 
    errorMsgEl.textContent = errorMsg;
    // console.log(errorMsgID); <-- for testing purposes 
}

const checkInputValidity = (formElement, inputElement) => {
    // console.log(inputElement.validity); <-- for testing purposes
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
};


const setEventListeners = (formElement) => {
    console.log(formElement);
    const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
    const buttonElement = formElement.querySelector(".modal__save");

    // toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        // toggleButtonState(inputList, buttonElement);
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