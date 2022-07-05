import express, { json } from 'express'
import 'dotenv/config'
import connectDb from './database/connection.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route.js'
import urlRouter from './routes/url.route.js'
import redirectRouter from './routes/redirect.route.js'
import checkToken from './middlewares/checkToken.js'

const app = express()

app.use(json())
app.use(cookieParser())

app.use('/api/v1/urls', checkToken, urlRouter)
app.use('/', authRouter)
app.use('/', redirectRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)

  connectDb()
})
