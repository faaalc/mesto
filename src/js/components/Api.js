class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl
    this._headers = headers
  }
  _fetch = async (path, method) => {
    const res = await fetch(`${this._baseUrl}/${path}`, {
      method,
      headers: this._headers
    })
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  }
  _fetchWithBody = async (path, method, data) => {
    const res = await fetch(`${this._baseUrl}/${path}`, {
      method,
      headers: this._headers,
      body: JSON.stringify(data)
    })
    return res.ok
      ? res.json()
      : Promise.reject(`Ошибка: ${res.status}`)
  }
  getUserInfo = async () => {
    return await this._fetch('users/me', 'GET')
  }
  getInitialCards = async () => {
    return await this._fetch('cards', 'GET')
  }
  updateUserInfo = async (data) => {
    return await this._fetchWithBody('users/me', 'PATCH', data)
  }
  addCard = async (data) => {
    return await this._fetchWithBody('cards', 'POST', data)
  }
  deleteCard = async (id) => {
    return await this._fetch(`cards/${id}`, 'DELETE')
  }
  toggleLike = async (id, method) => {
    return await this._fetch(`cards/${id}/likes`, method)
  }
  updateAvatar = async (data) => {
    return await this._fetchWithBody('users/me/avatar', 'PATCH', data)
  }
}

export default Api