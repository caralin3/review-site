import express from 'express';
import expressjwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import { getDbUser } from './database';

export const getTokenFromHeader = (req: express.Request) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ');
    if (token[0] === 'Token' || token[0] === 'Bearer') {
      return token[1];
    }
  }
  return null;
};

export const requiredMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authRequired = expressjwt({
    getToken: getTokenFromHeader,
    secret: 'secret',
    userProperty: 'currentUser'
  });
  const middleware = authRequired;
  const handleErrorNext = (err: expressjwt.UnauthorizedError) => {
    if (err) {
      if (err.name === 'UnauthorizedError') {
        res.status(err.status).json(err);
        return next();
      }
    }
    next(err);
  };
  middleware(req, res, handleErrorNext);
};

export const optionalMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authOptional = expressjwt({
    credentialsRequired: false,
    getToken: getTokenFromHeader,
    secret: 'secret',
    userProperty: 'currentUser'
  });
  const middleware = authOptional;
  middleware(req, res, next);
};

export const createToken = (userId: string) => jwt.sign({ userId }, 'secret');

export const getAuthUser = (req: express.Request) => {
  if (req.currentUser) {
    return getDbUser('id', req.currentUser.userId);
  }
  return null;
};
