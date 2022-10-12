import { Request, Response, NextFunction } from 'express'
import { join } from 'path'
import { existsSync } from 'fs'
import fsPromises from 'fs/promises'
import { v4 as uuid } from 'uuid'
import { loggerInterface } from '../config/loggerOptions'

const dateTime = () =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date())

export const logEvents = async (message: string, logFileName: string) => {
  const logItem = `${dateTime()}\t${uuid()}\t${message}\n`

  try {
    if (!existsSync(join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(join(__dirname, '..', 'logs', logFileName), logItem)
  } catch (err) {
    console.log(err)
  }
}

export const logger = (options: loggerInterface) => (req: Request, res: Response, next: NextFunction) => {
  if (options.useLogger) {
    if (options.logMethods.includes(req.method))
      logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
  }
  if (options.console) console.log(`${req.method}\t${req.url}\t${req.headers.origin}`)
  next()
}
