import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { jwtUtils } from '../utils/jwtUtilities'

export const userCtrl = {
  async signup(req: Request, res: Response) {
    try {
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
}
