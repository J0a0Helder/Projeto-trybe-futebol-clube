import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import validateLoginObject from './loginSchema';
import auth from '../Auth/AuthService';

export default class LoginMiddelware {
  public loginUserFields = async (req: Request, res: Response, next: NextFunction) => {
    const result = await validateLoginObject(req.body);
    if (result.error && result.error.message.includes('empty')) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    if (result.error) return res.status(401).send({ message: 'Invalid email or password' });
    next();
  };

  public loginToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    try {
      verify(token, auth.secret);
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
