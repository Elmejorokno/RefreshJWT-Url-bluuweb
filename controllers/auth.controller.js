import { matchedData } from 'express-validator'
import User from '../models/User.js'

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

    const token = user.createJWT()

    return res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    res.status(error.status || 400).json({ error: { msg: error.message } })
  }
}

export const register = async (req, res) => {
  const { email, password } = matchedData(req)

  try {
    const user = await User.create({ email, password })

    const token = user.creatweJWT()

    return res.status(201).json({ token })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(403).json({ error: { msg: `User already exists.` } })
    }

    res.status(400).json({ error })
  }
}
