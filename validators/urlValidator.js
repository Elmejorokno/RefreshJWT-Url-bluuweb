import { check } from 'express-validator'
import { checkValidator } from '../middlewares/checkValidator.js'

export const validatorUrl = [
  check('originUrl', 'Invalid url.')
    .isURL({ protocols: ['https', 'https'] })
    .withMessage(
      'Invalid url. Make sure that the url has the http or https protocol.'
    ),
  (req, res, next) => checkValidator(req, res, next)
]
