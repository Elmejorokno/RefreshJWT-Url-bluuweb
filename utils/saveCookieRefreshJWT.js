const saveCookieRefreshJWT = (refreshToken, res) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: !(process.env.MODE === 'developer'),
    maxAge: 1000 * 60 * 60 * 24 * 15
  })
}

export default saveCookieRefreshJWT
