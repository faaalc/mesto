class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._name = document.querySelector(`.${userNameSelector}`)
    this._about = document.querySelector(`.${userInfoSelector}`)
    this._avatar = document.querySelector(`.${userAvatarSelector}`)
    this._id = ''
  }

  getUserInfo = () => {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }
  getUserId = () => {
    return this._id
  }
  setUserInfo = ({name, about, avatar, _id}) => {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.src = avatar
    this._id = _id
  }

}

export default UserInfo