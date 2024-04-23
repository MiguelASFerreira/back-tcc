declare namespace Express {
  interface Request {
    user: {
      id: number;
    };
    empresa: {
      id: number;
    };
  }
}
