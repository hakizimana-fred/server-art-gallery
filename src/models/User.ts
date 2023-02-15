import { Document, model, Schema } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  resetToken?: string
  [key: string]: any
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 6,
  },
  resetToken: {
    type: String,
    default: '',
  },
})

export default model<IUser>('User', userSchema)
