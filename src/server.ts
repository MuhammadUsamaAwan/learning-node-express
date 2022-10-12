import * as dotenv from 'dotenv'
import 'express-async-errors'
import express, { Request, Response } from 'express'
import cors from 'cors'
import errorHandler from './middleware/errorHandler'
import corsOptions from './config/corsOptions'
import { logger } from './middleware/logger'
import { loggerOptions } from './config/loggerOptions'
const PORT = process.env.PORT || 5000

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(logger(loggerOptions))
app.use(cors(corsOptions))

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok!' })
})

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ message: '404 - No Route Found' })
})

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`))
