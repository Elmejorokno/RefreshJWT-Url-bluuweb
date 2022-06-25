import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validatorLoginUser } from '../validators/loginValidator.js'
import { validatorRegisterUser } from '../validators/registerValidator.js'

const router = express.Router()

router.post('/login', validatorLoginUser, login)
router.post('/register', validatorRegisterUser, register)

export default router
