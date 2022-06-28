import express, { json } from 'express'
import 'dotenv/config'
import connectDb from './database/connection.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(json())
app.use(cookieParser())

app.use('/', authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)

  connectDb()
})
