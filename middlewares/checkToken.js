import jwt from 'jsonwebtoken'

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
