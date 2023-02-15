import { Request, Response } from 'express'
import { userService } from '../services/user.service'

export const userCtrl = {
  async signup(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body)
      return res.status(200).json({
        success: true,
        message: 'User created',
        data: {
          user,
        },
      })
    } catch (err) {
      return res.status(400).json({ sucess: false, error: err.message })
    }
  },

  async login(req: Request, res: Response) {
    try {
      const user = await userService.userLogin(req.body)
      return res.status(200).json({
        success: true,
        message: 'User created',
        data: {
          user,
        },
      })
    } catch (err) {
      return res.status(400).json({ success: false, error: err.message })
    }
  },
}
