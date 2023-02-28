import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public loginUser = async (req: Request, res: Response) => {
    const token = await this.loginService.loginUser(req.body);
    if (token.type) {
      return res.status(401).json({ message: token.message });
    }
    res.status(200).json(token);
  };
}
