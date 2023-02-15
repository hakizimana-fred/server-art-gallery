import argon2 from 'argon2'
import { v4 } from 'uuid'
import User, { IUser } from '../models/User'
import { sendEmail } from '../utils/sendEmail'

export const userService = {
  async createUser(input: IUser) {
    try {
      const { email, password } = input
      // check if user exits
      const userExists = await User.findOne({ email })
      if (userExists) throw new Error('User already exists')
      // Hash password
      const hashedPassword: string = await argon2.hash(password)
      const newUser = new User({ email })
      newUser.password = hashedPassword
      await newUser.save()
      return newUser
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  async userLogin(input: IUser) {
    try {
      const { email, password } = input
      // check if user exits
      const userExists = await User.findOne({ email })
      if (!userExists) throw new Error('User does not exist')
      // check password validity
      const isPasswordValid = await argon2.verify(userExists.password, password)
      if (!isPasswordValid) throw new Error('Invalid credentails')
      return userExists
    } catch (err) {
      throw new Error(err.message)
    }
  },
  async requestPasswordReset(email: string): Promise<boolean> {
    try {
      const user = await User.findOne({ email })
      if (!user) throw new Error('Email does not exist')
      const token = v4()

      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { resetToken: token } },
        { new: true }
      )
      //send email
      await sendEmail(
        email,
        `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
      )
      return true
    } catch (err) {
      throw new Error(err.message)
    }
  },
  async changePassword(input: any): Promise<boolean> {
    try {
      const { token, password } = input
      // check user with token
      const user = await User.findOne({ resetToken: token })
      if (!user) throw new Error('Invalid token')
      const hashedPassword = await argon2.hash(password)

      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: hashedPassword } },
        { new: true }
      )

      return true
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}
