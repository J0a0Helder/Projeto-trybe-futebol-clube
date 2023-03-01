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

  public getRole = async (req: Request, res: Response) => {
    const token = req.header('Authorization');
    const role = await this.loginService.findUser(token as string);
    if (role.type) {
      return res.status(401).json({ message: role.message });
    }
    res.status(200).json(role);
  };
}
