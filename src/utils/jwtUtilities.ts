import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const jwtUtils = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generateToken(user: any) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: '1h' }
    )
  },
  auth(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers['authorization']
    if (!headers) {
      return res
        .status(401)
        .json({ success: false, error: 'Not token provided' })
    }
    const token = headers.split(' ')[1]
    try {
      const payload = jwt.verify(
        token,
        process.env.ACCESS_TOKEN as string
      ) as JwtPayload
      req.user = payload
      return next()
    } catch (err) {
      return res.status(401).json({ error: err.message })
    }
  },
}
