import { validationResult } from 'express-validator'

/**
 * Middleware that check if the validator from express-validator don't have any error.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * If there is no one error will return the next() function,
 * another case will throw a error.
 */
export const checkValidator = (req, res, next) => {
  try {
    validationResult(req).throw()

    next()
  } catch (error) {
    return res.status(400).json({ err: error.array() })
  }
}
