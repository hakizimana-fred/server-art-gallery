import { Document, model, Schema } from 'mongoose'

export interface IGallery extends Document {
  title: string
  description: string
  image: string
}

const gallerySchema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  description: {
    type: String,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default model<IGallery>('Moment', gallerySchema)
