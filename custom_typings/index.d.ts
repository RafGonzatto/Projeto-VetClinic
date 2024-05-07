declare namespace Express {
  interface Request extends ExpressRequest {
    context?: any
  }
}
