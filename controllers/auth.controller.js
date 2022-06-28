import { matchedData } from 'express-validator'
import saveCookieRefreshJWT from '../utils/saveCookieRefreshJWT.js'
import User from '../models/User.js'
import createJWT from '../utils/createJWT.js'

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

    const refreshToken = user.createRefreshJWT()
    saveCookieRefreshJWT(refreshToken, res)

    return res.status(200).json({ refreshToken })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}

export const register = async (req, res) => {
  const { email, password } = matchedData(req)

  try {
    const user = await User.create({ email, password })

    const refreshToken = user.createRefreshJWT()
    saveCookieRefreshJWT(refreshToken, res)

    return res.status(201).json({ refreshToken })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ error: { msg: `User already exists.` } })
    }

    return res.status(400).json({ error })
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken')

  res.end()
}

export const refreshToken = (req, res) => {
  const token = createJWT({ userId: req.userId })

  return res.status(200).json({ token })
}
