class UserInfo {
  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this._name = document.querySelector(`.${userNameSelector}`)
    this._about = document.querySelector(`.${userInfoSelector}`)
    this._avatar = document.querySelector(`.${userAvatarSelector}`)
    this._id = ''
  }

  /**
   * Returns object with user info
   * @return {{name: string, about: string, avatar}}
   */
  getUserInfo = () => {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }
  }

  /**
   * Returns user id
   * @return {string}
   */
  getUserId = () => {
    return this._id
  }

  /**
   * Updates user info on the page
   * @param {Object} data
   * @param {string} data.name User name
   * @param {string} data.about User description
   * @param {string} data.avatar User avatar
   * @param {string} data._id User id
   */
  setUserInfo = ({name, about, avatar, _id}) => {
    this._name.textContent = name
    this._about.textContent = about
    this._avatar.src = avatar
    this._id = _id
  }

}

export default UserInfo