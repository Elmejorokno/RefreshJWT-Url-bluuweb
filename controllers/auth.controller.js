import { matchedData } from 'express-validator'

export const login = (req, res) => {
  const { email, password } = matchedData(req)

  res.json({ email, password })
}

export const register = (req, res) => {
  const { email, password, repassword } = matchedData(req)

  res.json({ email, password, repassword })
}
