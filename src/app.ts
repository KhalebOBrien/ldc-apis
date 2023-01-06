import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { Routes } from './routes'
import { Knex } from './database/knex/'

dotenv.config()
const PORT: Number | string = process.env.PORT || 3000
const app: Application = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    origin: '*',
  }),
)
app.use(Routes)

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`App service running at http://localhost:${PORT}`)
  })
}

if (process.env.MIGRATE_ON_START == 'true') {
  console.log('===== RUNNING MIGRATIONS =====')
  Knex.migrate
    .latest()
    .then(() => {
      console.log('===== DATABASE MIGRATION COMPLETED =====')
      /*console.log('===== SEEDING DATABASE =====')
      Knex.seed
        .run()
        .then(() => {
          console.log('===== SEEDING COMPLETED =====')
          startServer()
        })
        .catch(console.log)*/
    })
    .catch(console.log)
} else {
  startServer()
}
