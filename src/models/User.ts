import { Document, model, Schema } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
}

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowecase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    min: [6, 'password length should be at least 6 chars'],
  },
})

export default model<IUser>('User', userSchema)
