import mongoose from 'mongoose'

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log(`Connected to the db ✨`)
  } catch (error) {
    console.log(`Error connecting to the db. ${error.message}`)

    process.exit(1)
  }
}

export default connectDb
