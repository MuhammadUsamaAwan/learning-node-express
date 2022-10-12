export const loggerOptions = {
  useLogger: false,
  console: false,
  logMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
}

export interface loggerInterface {
  useLogger: boolean
  console: boolean
  logMethods: string[]
}
