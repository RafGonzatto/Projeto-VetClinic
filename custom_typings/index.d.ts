declare namespace Express {
  interface Request {
    context: {
      db: Connection; 
    };
  }
}
