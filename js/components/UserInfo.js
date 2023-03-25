class UserInfo {
  constructor({userNameSelector, userInfoSelector}) {
    this._userName = document.querySelector(`.${userNameSelector}`)
    this._userInfo = document.querySelector(`.${userInfoSelector}`)
  }

  getUserInfo = () => {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }
  setUserInfo = ({name, info}) => {
    this._userName.textContent = name
    this._userInfo.textContent = info
  }

}

export default UserInfo