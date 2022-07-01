import jwt from 'jsonwebtoken'

/**
 * Middleware that checks the refresh JWT saved in the `cookie.refreshToken`
 * Save the user id in `req.userId`.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If exists the refresh jwt and it's valid will
 * return the next() function, another case will return an error.
 */
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
