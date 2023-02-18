import { Router } from 'express'
import { galleryController } from './controllers/gallery.controller'
import { userCtrl } from './controllers/user.controller'
import { jwtUtils } from './utils/jwtUtilities'

const router = Router()

router.get('/healthcheck', (_, res) => res.send('Hi there'))
/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: User signup
 *     tags:
 *      - Auth
 *     requestBody:
 *       description: please Fill the required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successfully Signup in
 *       '400':
 *         description: Something went wrong
 */
router.post('/user/signup', userCtrl.signup)

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User Login
 *     tags:
 *      - Auth
 *     requestBody:
 *       description: please Fill the required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successfully Logged in
 *       '400':
 *         description: Something went wrong
 */
router.post('/user/login', userCtrl.login)

/**
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     summary: User Password Reset
 *     tags:
 *      - Password Reset
 *     requestBody:
 *       description: please Fill the required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successfully Reset Password
 *       '400':
 *         description: Something went wrong
 */
router.post('/user/reset-password', userCtrl.resetPasswordRequest)

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     summary: User Change
 *     tags:
 *      - Password Reset
 *     requestBody:
 *       description: please Fill the required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - token
 *            properties:
 *              password:
 *                type: string
 *              token:
 *                type: string
 *     responses:
 *       '200':
 *         description: Successfully changed password
 *       '400':
 *         description: Something went wrong
 */
router.post('/user/change-password', userCtrl.changePassword)

/**
 * @swagger
 * '/api/v1/moment':
 *  get:
 *     tags:
 *     - User Moment
 *     summary: Fetch Moments
 *     content:
 *        application/json:
 *           schema:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                image:
 *                  type: string
 *                description:
 *                  type: string
 *     responses:
 *      200:
 *        description: Fetch moments
 *      400:
 *        description: Something went wrong
 *  post:
 *     tags:
 *     - User Moment
 *     summary: Create a Moment
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - image
 *            properties:
 *              title:
 *                type: string
 *                default: Sample title
 *              image:
 *                type: string
 *                default: https://images.unsplash.com/photo-1592609931095-54a2168ae893?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8amF2YXNjcmlwdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60
 *              description:
 *                type: string
 *                default: Sample description
 *     responses:
 *      200:
 *        description: Created moment
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
router
  .route('/moment')
  .get(jwtUtils.auth, galleryController.getMoments)
  .post(jwtUtils.auth, galleryController.saveMoment)

export default router
