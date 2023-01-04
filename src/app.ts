import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'

dotenv.config()
const PORT: Number | string = process.env.PORT || 3000
const app: Application = express()

app.use(express.json())

app.use(
  cors({
    origin: '*',
  }),
)

app.use(morgan('dev'))

app.listen(PORT, () => {
  console.log(`App service running at http://localhost:${PORT}`)
})
