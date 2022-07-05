import { Router } from 'express'
import {
  getAllUrls,
  getSingleUrl,
  createUrl,
  updateUrl,
  deleteUrl
} from '../controllers/url.controller.js'
import { validatorUrl } from '../validators/urlValidator.js'

const router = Router()

router.get('/', getAllUrls)
router.get('/:urlId', getSingleUrl)
router.post('/', validatorUrl, createUrl)
router.patch('/:urlId', validatorUrl, updateUrl)
router.delete('/:urlId', deleteUrl)

export default router
