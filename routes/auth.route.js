import { Router } from 'express'
import {
  login,
  logout,
  refreshToken,
  register
} from '../controllers/auth.controller.js'
import checkRefreshToken from '../middlewares/checkRefreshToken.js'
import checkToken from '../middlewares/checkToken.js'
import { validatorLoginUser } from '../validators/loginValidator.js'
import { validatorRegisterUser } from '../validators/registerValidator.js'

const router = Router()

router.post('/login', validatorLoginUser, login)
router.post('/register', validatorRegisterUser, register)
router.get('/logout', logout)

router.get('/borrar', checkToken, (req, res) => {
  res.json({ id: req.userId })
})
router.get('/refresh', checkRefreshToken, refreshToken)

export default router
