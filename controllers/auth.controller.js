import { matchedData } from 'express-validator'
import saveCookieRefreshJWT from '../utils/saveCookieRefreshJWT.js'
import User from '../models/User.js'
import createJWT from '../utils/createJWT.js'
import createRefreshJWT from '../utils/createRefreshJWT.js'

/**
 * Login the user. Check the credentials with the db.
 * Select the credentials `email, password` from the `req.body`
 * @param {*} req
 * @param {*} res
 * @returns
 * Refresh JWT and save in `cookie.refreshToken`.
 */
export const login = async (req, res) => {
  const { email, password } = matchedData(req)

  try {
    const user = await User.findOne({ email })

    if (!user) {
      const error = new Error(`User isn't exists.`)
      error.status = 401
      throw error
    }

    if (!(await user.comparePassword(password))) {
      const error = new Error(`Incorrect password.`)
      error.status = 401
      throw error
    }

    const refreshToken = createRefreshJWT({ userId: user._id })
    saveCookieRefreshJWT(refreshToken, res)

    return res.status(200).json({ refreshToken })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}

/**
 * Register a new user to the db.
 * Select the credentials `email, password` from the `req.body`
 * @param {*} req
 * @param {*} res
 * @returns
 * Refresh JWT and save in `cookie.refreshToken`.
 */
export const register = async (req, res) => {
  const { email, password } = matchedData(req)

  try {
    const user = await User.create({ email, password })

    const refreshToken = createRefreshJWT({ userId: user._id })
    saveCookieRefreshJWT(refreshToken, res)

    return res.status(201).json({ refreshToken })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ error: { msg: `User already exists.` } })
    }

    return res.status(400).json({ error })
  }
}

/**
 * Delete the `cookie.refreshToken`
 * @param {*} req
 * @param {*} res
 */
export const logout = (req, res) => {
  res.clearCookie('refreshToken')

  res.end()
}

/**
 * Create a JWT for send it in the headers.
 * @param {*} req
 * @param {*} res
 * @returns
 * A JWT with the user id.
 */
export const refreshToken = (req, res) => {
  const token = createJWT({ userId: req.userId })

  return res.status(200).json({ token })
}
