import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Schema, model } = mongoose

const regExpEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const userSchema = Schema({
  email: {
    type: String,
    required: [true, 'Provide an email.'],
    trim: true,
    validate: {
      validator: function (v) {
        return regExpEmail.test(v)
      },
      message: (props) => `${props.value} is not a valid email.`
    },
    unique: [true, 'Email is already in use.'],
    lowercase: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: [true, 'Provide a password.'],
    trim: true
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    next()
  } catch (error) {
    throw new Error(`Error hashing the password. ${error.message}`)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.createRefreshJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.REFRESH_JWT_SECRET, {
    expiresIn: '15d'
  })
}

export default model('users', userSchema)
