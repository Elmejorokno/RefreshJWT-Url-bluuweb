import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDb from './database/connection.js'
import authRouter from './routes/auth.route.js'
import urlRouter from './routes/url.route.js'
import redirectRouter from './routes/redirect.route.js'
import checkToken from './middlewares/checkToken.js'

const app = express()

const whiteList = [process.env.ORIGIN]
app.use(
  cors({
    origin: function (origin, callback) {
      if (whiteList.includes(origin)) {
        return callback(null, origin)
      }

      return callback('Origin is not allowed.')
    }
  })
)

app.use(json())
app.use(cookieParser())

app.use('/api/v1/urls', checkToken, urlRouter)
app.use('/', authRouter)
app.use('/r', redirectRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is listenning on port ${PORT}.`)

  connectDb()
})
