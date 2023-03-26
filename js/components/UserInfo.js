class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._data = {
      name: document.querySelector(`.${userNameSelector}`),
      info: document.querySelector(`.${userInfoSelector}`)
    }
  }

  getUserInfo = () => {
    const data = {}
    for (const key in this._data) {
      data[key] = this._data[key].textContent
    }
    return data
  }
  setUserInfo = (data) => {
    for (const key in data) {
      this._data[key].textContent = data[key]
    }
  }

}

export default UserInfo