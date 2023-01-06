import express, { Router, Request, Response } from 'express'
import { AuthRoutes } from './v1'

export const Routes: Router = express.Router()

Routes.use('/api/v1/auth', AuthRoutes)

Routes.use((req: Request, res: Response) => {
  res.status(404).json({
    message: 'ROUTE NOT FOUND',
  })
})
