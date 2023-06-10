const baseUrl = 'https://easystyle.nomoredomains.monster';

function handleResponse (res) {
  if (res.ok) {
    return res.json()}
  return Promise.reject(`Ошибка: ${res.status}`)
}

export function singUp (password,email) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "password" : password,
        "email" : email
      })
    }).then(res => handleResponse(res))

}
export function singIn (password,email) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password" : password,
      "email" : email
    })
  }).then(res => handleResponse(res))

}
export function checkToken (token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  }).then(res => handleResponse(res))

};