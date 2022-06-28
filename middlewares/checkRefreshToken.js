import jwt from 'jsonwebtoken'

const checkRefreshToken = (req, res, next) => {
  const cookieRefreshToken = req.cookies.refreshToken
  try {
    if (!cookieRefreshToken) {
      const error = new Error(`Cookie refresh token isn't exists.`)
      error.status = 401
      throw error
    }

    const { userId } = jwt.verify(
      cookieRefreshToken,
      process.env.REFRESH_JWT_SECRET
    )

    req.userId = userId

    next()
  } catch (error) {
    return res
      .status(error.status || 400)
      .json({ error: { msg: error.message } })
  }
}

export default checkRefreshToken
