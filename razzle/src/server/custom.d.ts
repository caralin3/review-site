declare namespace Express {
  export interface Request {
    currentUser?: {
      iat: number;
      userId: string;
    };
  }
}
