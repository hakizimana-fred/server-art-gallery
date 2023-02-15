import { Router } from 'express'
import { galleryController } from './controllers/gallery.controller'
import { userCtrl } from './controllers/user.controller'
import { jwtUtils } from './utils/jwtUtilities'

const router = Router()

router.get('/healthcheck', (_, res) => res.send('Hi there'))
router.post('/user/signup', userCtrl.signup)
router.post('/user/login', userCtrl.login)

router
  .route('/moment')
  .get(jwtUtils.auth, galleryController.getMoments)
  .post(jwtUtils.auth, galleryController.saveMoment)

export default router
