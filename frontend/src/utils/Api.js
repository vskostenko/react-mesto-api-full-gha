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
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: "include",
          })
          .then(res => this._handleResponse(res))
        } 
    getUserInfo() {
            return fetch(`${this._baseUrl}/users/me`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              credentials: "include",
            })
            .then(res => this._handleResponse(res))
        }
            
    editProfile (data) {
        return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))     
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        })
        .then(res => this._handleResponse(res))
    }

    addCardLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
        .then(res => this._handleResponse(res))
    }

    delCardLike(cardId){
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
        })
        .then(res => this._handleResponse(res))
    }
}
const apiConfig = {
  baseUrl: 'https://easystyle.nomoredomains.monster'
}
const api = new Api(apiConfig); 
export default api;