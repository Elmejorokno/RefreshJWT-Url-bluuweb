import mongoose, { Schema, model } from 'mongoose'

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

export default model('users', userSchema)
