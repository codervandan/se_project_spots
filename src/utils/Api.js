class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    // TODO - call the getUserInfo method inside this array, then add item in the index.js cards destructured array 
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    }).then(this._handleServerResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // TODO - Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }

  editAvatarInfo({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      // TODO - Send the data in the body as a JSON string.
      body: JSON.stringify({
        avatar
      }),
    }).then(this._handleServerResponse)
  }


  // other methods for working with the API
  // TODO - Create getUserInfo (different base url)
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then(this._handleServerResponse);
    }
  
  // NEW POST 
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._handleServerResponse);
  }
  // DELETE THE CARD 
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleServerResponse);
  }

  // LIKE CARD 
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._handleServerResponse);
}
  // ULINKE THE CARD
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._handleServerResponse);
  }

  // UPDATE AVATAR
  updateAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._handleServerResponse);
} 

}

export default Api;