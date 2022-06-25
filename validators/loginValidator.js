import { check } from 'express-validator'
import { checkValidator } from '../middlewares/checkValidator.js'

export const validatorLoginUser = [
  check('email', 'Email invalid.')
    .trim()
    .notEmpty()
    .withMessage(`Email doesn't have to be empty.`)
    .isEmail()
    .withMessage(`Email invalid.`)
    .normalizeEmail(),
  check('password', 'Password invalid.')
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(`The password must be between 8 or 16 characters long`)
    .escape(),

  (req, res, next) => checkValidator(req, res, next)
]
