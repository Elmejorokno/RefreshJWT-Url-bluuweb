import jwt from 'jsonwebtoken'

/**
 * Middleware that checks the JWT sent in the authorization
 * header against the Bearer standard.
 * Save the user id in `req.userId`.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If exists the jwt from the user and it's valid will
 * return the next() function, another case will return an error.
 */
const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization

  try {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error = new Error('Invalid authorization header.')
      error.status = 401
      throw error
    }

    const token = authHeader.split(' ')[1]

    const { userId } = jwt.verify(token, process.env.JWT_SECRET)

    req.userId = userId

    next()
  } catch (error) {
    return res
      .status(error.status || 400)
      .json({ error: { msg: error.message } })
  }
}

export default checkToken
