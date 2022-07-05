import mongoose from 'mongoose'
const { Schema, model } = mongoose

const urlSchema = new Schema(
  {
    originUrl: {
      type: String,
      required: [true, 'Must provide an url.'],
      trim: true,
      minLength: 6,
      maxLength: 2000
    },
    shortUrl: {
      type: String,
      required: [true, 'Must provide a short url.'],
      trim: true,
      unique: [true, 'short url is already in use.'],
      index: { unique: true },
      minLength: 4
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: [true, 'Must provide an user id.']
    }
  },
  { timestamps: true }
)

export default model('urls', urlSchema)
