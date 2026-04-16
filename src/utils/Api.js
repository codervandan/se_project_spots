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
    return Promise.all([this.getInitialCards()]);
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  // other methods for working with the API
  // TODO - Create getUserInfo (different base url)

}

export default Api;