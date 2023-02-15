import argon2 from 'argon2'
import User, { IUser } from '../models/User'

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
}
