import { Router } from 'express'
import { userCtrl } from './controllers/user.controller'

const router = Router()

router.get('/healthcheck', (_, res) => res.send('Hi there'))
router.post('/user/signup', userCtrl.signup)
router.post('/user/login', userCtrl.login)

export default router
