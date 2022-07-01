/**
 * Save the refresh JWT in `cookie.refreshToken`.
 * @param {*} refreshToken
 * @param {*} res
 */
const saveCookieRefreshJWT = (refreshToken, res) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !(process.env.MODE === 'developer'),
    maxAge: 1000 * 60 * 60 * 24 * 15 //15 days
  })
}

export default saveCookieRefreshJWT
