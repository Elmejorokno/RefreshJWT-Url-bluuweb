import express, { json } from 'express'
import 'dotenv/config'
import connectDb from './database/connection.js'
import authRouter from './routes/auth.route.js'

const app = express()

app.use(json())

app.use('/', authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)

  connectDb()
})
