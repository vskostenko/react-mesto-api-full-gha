class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
    _handleResponse (res) {
      if (res.ok) {
        return res.json()}
      return Promise.reject(`Ошибка: ${res.status}`)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
          })
          .then(res => this._handleResponse(res))
        } 
    getUserInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
              method: 'GET',
              headers: this._headers,
            })
            .then(res => this._handleResponse(res))
        }
            
    editProfile (data) {
        return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))     
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(res => this._handleResponse(res))
    }

    delCard(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/`, {
        method: 'DELETE',
        headers: this._headers
        })
        .then(res => this._handleResponse(res))
    }

    addCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers})
        .then(res => this._handleResponse(res))
    }

    delCardLike(cardId){
      return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers})
        .then(res => this._handleResponse(res))
    }
    
    changeLikeCardStatus(cardId, isLiked) {
      if (isLiked) {
        return this.delCardLike(cardId);
      } else {
        return this.addCardLike(cardId);
      }
    }


    updateAvatar(data){
       return fetch(`${this._baseUrl}users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }
}
const apiConfig = {
  baseUrl: 'https://easystyle.nomoredomains.monster/',
  headers: {
    authorization: '894ca0c1-f322-46d5-9613-0b5b161eddf9',
    'Content-Type': 'application/json'
  }
}
const api = new Api(apiConfig); 
export default api;