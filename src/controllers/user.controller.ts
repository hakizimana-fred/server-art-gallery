import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { jwtUtils } from '../utils/jwtUtilities'

export const userCtrl = {
  async signup(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, mesage: 'Email and password are required' })
      }
      const user = await userService.createUser(req.body)
      const token = jwtUtils.generateToken(user)
      return res.status(200).json({
        success: true,
        message: 'User created',
        data: {
          user,
          token,
        },
      })
    } catch (err) {
      return res.status(400).json({ sucess: false, error: err.message })
    }
  },

  async login(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.password) {
        return res
          .status(400)
          .json({ success: false, mesage: 'Email and password are required' })
      }
      const user = await userService.userLogin(req.body)
      const token = jwtUtils.generateToken(user)
      return res.status(200).json({
        success: true,
        message: 'User Logged in',
        data: {
          user,
          token,
        },
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
  async resetPasswordRequest(req: Request, res: Response) {
    try {
      await userService.requestPasswordReset(req.body.email)
      return res.status(200).json({
        success: true,
        mesage:
          'We sent an email with further instructions on how to proceed with changing your password!',
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
  async changePassword(req: Request, res: Response) {
    try {
      await userService.changePassword(req.body)
      return res
        .status(200)
        .json({ success: true, message: 'change password successfull' })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
}

