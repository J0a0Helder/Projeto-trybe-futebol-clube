import { Request, Response, NextFunction } from 'express';
import validateLoginObject from './loginSchema';

export default class LoginMiddelware {
  public loginUserFields = async (req: Request, res: Response, next: NextFunction) => {
    const result = await validateLoginObject(req.body);
    if (result.error && result.error.message.includes('empty')) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }
    if (result.error) return res.status(401).send({ message: 'Invalid email or password' });
    next();
  };
}
