declare namespace Express {
  interface Request {
    context: {
      db: Connection
    }
  }
}

interface CustomError extends Error {
  status?: number
}
