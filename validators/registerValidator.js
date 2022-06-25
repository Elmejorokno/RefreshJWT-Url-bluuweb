import { check } from 'express-validator'
import { checkValidator } from '../middlewares/checkValidator.js'

export const validatorRegisterUser = [
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
  check('repassword', 'Password confirmation invalid.')
    .trim()
    .escape()
    .custom((val, { req }) => {
      if (val !== req.body.password) return false

      return true
    })
    .withMessage(`Password confirmation doesn't match password.`),

  (req, res, next) => checkValidator(req, res, next)
]
